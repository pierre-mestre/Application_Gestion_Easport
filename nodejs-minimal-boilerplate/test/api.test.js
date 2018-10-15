import request from "supertest";
import app from "../server/app";

describe("Test the post-example", () => {
  test("It should return what is sent", async () => {
    const expectedJson = {
      email: "Foo",
      hello: "world"
    };

    const response = await request(app)
      .post("/post-example")
      .send(expectedJson);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedJson);
  });
});
