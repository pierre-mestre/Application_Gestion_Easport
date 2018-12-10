import request from "supertest";
import app from "../server/app";

describe("Test the post-login", () => {
  test("It should return the logged page", async () => {
    const connectionJson = {
      pseudo: "Eliot",
      password: "test"
    };

    const response = await request(app)
      .post("/post-login")
      .send(connectionJson);
    expect(response.statusCode).toBe(200);
    expect(response.body.html).toEqual('<p>Bienvenue</p>');
  });
});
