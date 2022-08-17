import supertest from "supertest";
import app from "../index";

const request = supertest(app);
describe("Test endpoint response", () => {
  // it("should return 200", async () => {
  //   const response = await request.get(
  //     "/api/images?filename=fjord.jpg&width=200&height=500"
  //   );
  //   expect(response.status).toBe(200);
  // }),
  it("should return 400", async () => {
    const response = await request.get("/api/images");
    expect(response.status).toBe(400);
  }),
    it("should return 404", async () => {
      const response = await request.get(
        "/api/images?filename=test.jpg&width=200&height=500"
      );
      expect(response.status).toBe(404);
    }),
    it("should return 404", async () => {
      const response = await request.get("/api/notfound");
      expect(response.status).toBe(404);
    });
});
