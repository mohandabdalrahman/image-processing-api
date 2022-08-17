import express from "express";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import validateParams from "../../middlewares/validate-params";
import resizeImage from "../../resize-image";
const routes = express.Router();

routes.get(
  "/images",
  validateParams,
  (req: express.Request, res: express.Response) => {
    const { filename, width, height } = req.query;
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "assets",
      "full",
      filename as string
    );
    // output path
    const outputPath = path.join(
      __dirname,
      "..",
      "..",
      "assets",
      "thumb",
      filename as string
    );
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({
        error: "Image not found",
      });
    }
    // check if the output file exists
    if (fs.existsSync(outputPath) && width && height) {
      sharp.cache(false);
      const image = sharp(outputPath);
      image.metadata().then((metadata) => {
        if (metadata.width === +width && metadata.height === +height) {
          return res.sendFile(outputPath);
        } else {
          resizeImage(imagePath, outputPath, +width, +height, res);
        }
      });
    } else {
      resizeImage(imagePath, outputPath, +width!, +height!, res);
    }
  }
);

export default routes;
