import express from "express";

class Router {
  public API_ROUTER = express.Router();
  constructor() {
    this.setAPIEndpoints();
  }
  private setAPIEndpoints(): void {}
}

const { API_ROUTER } = new Router();

export { API_ROUTER };
