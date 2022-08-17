import supertest from "supertest";
import app from "../../index";

const request = supertest(app);

describe("validateParams", () => {
  it("should return 400 if no filename", async () => {
    const response = await request.get("/api/images?width=200&height=500");
    expect(response.status).toBe(400);
  });
  it("should return 400 if no width", async () => {
    const response = await request.get(
      "/api/images?filename=fjord.jpg&height=500"
    );
    expect(response.status).toBe(400);
  });
  it("should return 400 if no height", async () => {
    const response = await request.get(
      "/api/images?filename=fjord.jpg&width=200"
    );
    expect(response.status).toBe(400);
  });
  it("should return 400 if width is not a number", async () => {
    const response = await request.get(
      "/api/images?filename=fjord.jpg&width=test&height=500"
    );
    expect(response.status).toBe(400);
  });
  it("should return 400 if height is not a number", async () => {
    const response = await request.get(
      "/api/images?filename=fjord.jpg&width=200&height=test"
    );
    expect(response.status).toBe(400);
  });
  it("should return 400 if width is not a positive number", async () => {
    const response = await request.get(
      "/api/images?filename=fjord.jpg&width=-200&height=500"
    );
    expect(response.status).toBe(400);
  });
  it("should return 400 if height is not a positive number", async () => {
    const response = await request.get(
      "/api/images?filename=fjord.jpg&width=200&height=-500"
    );
    expect(response.status).toBe(400);
  });
});
