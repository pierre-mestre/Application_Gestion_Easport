import request from "supertest";
import app from "../server/app";

describe("Test the root path", () => {
  test("It should serve html content on /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.header["content-type"]).toBe("text/html; charset=utf-8");
  });
  test("It should serve css file", async () => {
    const response = await request(app).get("/static/style.css");
    expect(response.statusCode).toBe(200);
  });
});
