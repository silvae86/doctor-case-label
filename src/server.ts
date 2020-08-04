import express, {Request, Response} from 'express';
import {ApplicationConfig, DoctorCaseLabelApplication} from './application';
import * as http from 'http';
import {once} from 'events';
import * as path from 'path';
import {HomeController} from './controllers/home.controller';
import {AuthController} from './controllers/auth.controller';
const pEvent = require('p-event');
const session = require('express-session');
const cookieParser = require('cookie-parser');
import {v4 as uuidv4} from 'uuid';
import {LabelController} from './controllers';
const bodyParser = require('body-parser');
const crypto = require('crypto');

export {ApplicationConfig};

const cookieSecret = crypto.randomBytes(64).toString('hex');
const sessionSecret = crypto.randomBytes(64).toString('hex');

export class ExpressServer {
  public readonly app: express.Application;
  public readonly lbApp: DoctorCaseLabelApplication;
  public readonly labelController: LabelController;
  private server?: http.Server;

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
    this.app.use(cookieParser(cookieSecret, { httpOnly: true, sameSite: 'None', secure: true}));
    this.app.use(
      session({
        genid: function (req: Request) {
          return uuidv4(); // use UUIDs for session IDs
        },
        saveUninitialized: true,
        resave: true,
        secret:
sessionSecret
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

    this.app.use('/api', this.lbApp.requestHandler);
    this.app.post('/login', AuthController.login);
    this.app.post('/logout', AuthController.logout);
    this.app.get('/label', LabelController.index);
    this.app.get('/', HomeController.index);
  }

  async boot() {
    await this.lbApp.boot();
  }

  public async start() {
    await this.lbApp.start();
    await this.lbApp.migrateSchema();
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
