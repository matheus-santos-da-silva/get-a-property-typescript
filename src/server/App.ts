import express from 'express';
import UserRoutes from '../routes/user-routes';
import PropertyRoutes from '../routes/property-routes';
import ContractorRoutes from '../routes/contractor-routes';

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
    this.express.use('/properties', PropertyRoutes);
    this.express.use('/contractor', ContractorRoutes);
  }
}

export default new App().express;