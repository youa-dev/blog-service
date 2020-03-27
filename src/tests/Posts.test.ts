import { testingPost, testingKeys } from "./testingUtils";
import { expect } from "chai";
import apiTester from "../utils/apiTester";

let token;

describe("Posts Controller", () => {
  describe("Create Post", () =>
    it("should return an object containing the post", async () => {
      const res = await apiTester("post", "/post/create", testingPost, token);
      expect(res).to.include.all.keys(...testingKeys.post);
    }));
});
