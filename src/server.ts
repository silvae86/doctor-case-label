import express from 'express';
import {ApplicationConfig, DoctorCaseLabelApplication} from './application';
import * as http from 'http';
import {once} from 'events';
import * as path from 'path';
import {HomeController} from './controllers/home.controller';
const pEvent = require('p-event');

export {ApplicationConfig};

export class ExpressServer {
  public readonly app: express.Application;
  public readonly lbApp: DoctorCaseLabelApplication;
  public readonly homeController: HomeController;
  private server?: http.Server;

  constructor(options: ApplicationConfig = {}) {
    this.app = express();
    this.lbApp = new DoctorCaseLabelApplication(options);
    this.homeController = new HomeController();

    // add ejs rendering middleware
    this.app.engine('html', require('ejs').renderFile);
    this.app.set('view engine', 'ejs');

    // set views folder location
    this.app.set('views', path.resolve(__filename, '../views'));

    // set folder for static files
    const staticFilesPath = path.resolve(__filename, '../../public');
    this.app.use(express.static(staticFilesPath));

    this.app.use('/api', this.lbApp.requestHandler);

    this.app.get('/', this.homeController.index);
  }

  async boot() {
    await this.lbApp.boot();
  }

  public async start() {
    await this.lbApp.start();
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
