import express, { Application, Router } from "express";
import { route } from "../services/routes";

export class App {
  public server: Application;
  public route: Router;

  constructor() {
    this.server = express();
    this.route = route;

    this.appMiddlewares();
    this.router();
  }

  private appMiddlewares() {
    this.server.use(express.json({ limit: '5mb' }));
    this.server.use(express.urlencoded({ extended: true }));
  }

  private router() {
    this.server.use('/api', this.route);
  }

}
