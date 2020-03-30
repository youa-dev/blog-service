import axios from "axios";
import {
  testingPost,
  testingKeys,
  testProfile,
  testingAccount
} from "./testingUtils";
import { expect } from "chai";
import { server } from "../config";
import apiTester from "../utils/apiTester";

let token;

// (async () => {
//   // Register the test user
//   const register = await axios.post(
//     `${server.services.auth.url}/auth/register`,
//     testingAccount
//   );
//   // Log the user in
//   const login = await axios.post(`${server.services.auth.url}/auth/login`, {
//     email: testingAccount.email,
//     password: testingAccount.password
//   });

//   console.log(register, "\n", login);
// })();

describe("Posts Controller", () => {
  describe("Create Post", () => {
    // it("should return an object containing the post", async done => {
    // const res = await apiTester("post", "/post/create", testingPost, token);
    // expect(await res.data).to.include.all.keys(...testingKeys.post);
    // done();
    // });
  });
});
