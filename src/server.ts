import express, {Request, Response} from 'express';
import {ApplicationConfig, DoctorCaseLabelApplication} from './application';
import * as http from 'http';
import {once} from 'events';
import * as path from 'path';
import {HomeController} from './controllers/home.controller';
import {AuthController} from './controllers/auth.controller';
import {migrate} from './migrate';
const pEvent = require('p-event');
const async = require('async');
const session = require('express-session');
const cookieParser = require('cookie-parser');
import {v4 as uuidv4} from 'uuid';
import {MedicalCasesController} from './controllers';
const bodyParser = require('body-parser');
const crypto = require('crypto');
const HttpStatus = require('http-status-codes');

export {ApplicationConfig};

const cookieSecret = crypto.randomBytes(64).toString('hex');
const sessionSecret = crypto.randomBytes(64).toString('hex');

export class ExpressServer {
  public readonly app: express.Application;
  public readonly lbApp: DoctorCaseLabelApplication;
  public readonly medicalCasesController: MedicalCasesController;
  public server?: http.Server;

  constructor(options: ApplicationConfig = {}) {
    this.app = express();
    this.lbApp = new DoctorCaseLabelApplication(options);

    // add ejs rendering middleware
    this.app.engine('html', require('ejs').renderFile);
    this.app.set('view engine', 'ejs');

    // set views folder location
    this.app.set('views', path.resolve(__filename, '../views'));

    // set folder for static files
    const staticFilesPath = path.resolve(__filename, '../../public');
    this.app.use(express.static(staticFilesPath));

    // setup session-related middlewares
    this.app.use(
      cookieParser(cookieSecret, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      }),
    );
    this.app.use(
      session({
        genid: function (req: Request) {
          return uuidv4(); // use UUIDs for session IDs
        },
        secret: sessionSecret,
        resave: true,
        saveUninitialized: true,
      }),
    );

    this.app.use(function (req: Request, res: Response, next: Function) {
      res.locals.session = req.session;

      res.locals.messages = {
        success: req.query.success,
        error: req.query.error,
      };

      next();
    });

    this.app.use(bodyParser.urlencoded({extended: false}));

    // parse application/json
    this.app.use(bodyParser.json());

    this.app.get(
      '/medical-cases/label',
      async.apply(this.requireAuth, MedicalCasesController.index),
    );
    this.app.use('/reset', async.apply(this.requireAuth, HomeController.reset));
    this.app.use(
      '/api',
      async.apply(this.requireAuth, this.lbApp.requestHandler),
    );
    this.app.get('/', HomeController.index);
    this.app.post('/login', AuthController.login);
    this.app.post('/logout', AuthController.logout);
  }

  // this should be implemented with an authentication strategy in Loopback,
  // which would read the Express session to make sure that the user is
  // authenticated! This does not handle Accept: application/json requests
  // properly, for example.
  // @see https://loopback.io/doc/en/lb4/Implement-your-own-strategy.html
  async requireAuth(
    requestHandler: Function,
    req: Request,
    res: Response,
    next: Function,
  ) {
    if (!req?.session?.loggedUser) {
      const backURL = (req.header('Referer') ?? '/').split('?')[0];
      if (req.accepts()) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .redirect(
            `${backURL}?error=${encodeURIComponent(
              'User is not authenticated',
            )}`,
          );
      }
    } else requestHandler(req, res, next);
  }

  async boot() {
    await this.lbApp.boot();
  }

  public async start() {
    await this.lbApp.start();
    await migrate([], true);
    const port = this.lbApp.restServer.config.port ?? 3000;
    const host = this.lbApp.restServer.config.host ?? '127.0.0.1';
    this.server = this.app.listen(port, host);
    await once(this.server, 'listening');
  }

  // For testing purposes
  public async stop() {
    if (!this.server) return;
    await this.lbApp.stop();
    this.server.close();
    await pEvent(this.server, 'close');
    this.server = undefined;
  }
}
