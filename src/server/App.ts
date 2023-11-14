import express from 'express';
import UserRoutes from '../routes/user-routes';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.use('/users', UserRoutes);
  }
}

export default new App().express;