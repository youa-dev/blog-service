import express from "express";
import passport from "passport";
import AuthController from "./controllers/Auth.controller";
import validateInput from "./middleware/validateInput";

class Router {
  /**
   * We are instantiating two separate routers here.
   * This is done for easier endpoint management,
   * and for logic separation
   */
  public API_ROUTER = express.Router();
  constructor() {
    this.setAPIEndpoints();
  }
  private setAPIEndpoints(): void {
    // Your API endpoints go here
    this.API_ROUTER.post(
      "/auth/register",
      validateInput,
      AuthController.register
    );
    this.API_ROUTER.post("/auth/login", validateInput, AuthController.login);
    this.API_ROUTER.get(
      "/auth/me",
      passport.authenticate("jwt", { session: false }),
      AuthController.getCurrentUser
    );
    this.API_ROUTER.put(
      "/auth/edit",
      passport.authenticate("jwt", { session: false }),
      validateInput,
      AuthController.edit
    );
    this.API_ROUTER.delete(
      "/auth/delete",
      passport.authenticate("jwt", { session: false }),
      AuthController.delete
    );
    // OAuth routes
    this.API_ROUTER.get(
      "/oauth",
      passport.authenticate("google", {
        session: false,
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email"
        ]
      })
    );
    this.API_ROUTER.get(
      "/oauth/redirect",
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/login"
      }),
      AuthController.generateJWTfromOAuth
    );
  }
}

const { API_ROUTER } = new Router();

export { API_ROUTER };
