import request from "supertest";
import app from "../server/app";

describe("Test the post-example", () => {
  test("It should return what is sent", async () => {
    const expectedJson = {
      pseudo: "Eliot",
      password: "test"
    };

    const response = await request(app)
      .post("/post-login")
      .send(expectedJson);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(`<form>
                <div class="form-group">
                <label for="username">Nom d'utilisateur</label>
                <input type="text" class="form-control" id="username" placeholder="Pseudo" value="${req.body.pseudo}">
                </div>
                <div class="form-group">
                <label for="password">Mot de passe</label>
                <input type="password" class="form-control" id="password">
                </div>
                <button id="login-submit" type="button" class="btn btn-primary">Connexion</button>
              </form>`);
  });
});
