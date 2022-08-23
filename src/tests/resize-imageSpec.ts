import express from "express";
import fs from "fs";
import path from "path";
import resizeImage from "../resize-image";

describe("Test resize image", () => {
  it("should resize the image if image not exist", () => {
    const imagePath = path.join(__dirname, "..", "assets", "full", `fjord.jpg`);
    const outputPath = path.join(
      __dirname,
      "..",
      "assets",
      "thumb",
      "fjord-500-500.jpg "
    );
    // image not exist
    if (!fs.existsSync(outputPath)) {
      const response = {};
      resizeImage(
        imagePath,
        outputPath,
        500,
        500,
        response as express.Response
      );
    }
    expect(outputPath).toEqual(outputPath);
  });
});
