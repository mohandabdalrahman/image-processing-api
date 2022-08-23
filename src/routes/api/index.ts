import express from "express";
import fs from "fs";
import path from "path";
import validateParams from "../../middlewares/validate-params";
import resizeImage from "../../resize-image";
const routes = express.Router();

export interface QueryObj {
  filename: string;
  width: number;
  height: number;
}

routes.get(
  "/images",
  validateParams,
  (
    req: express.Request,
    res: express.Response
  ): void | express.Response<Record<any, string>> => {
    const { filename, width, height } = req.query as unknown as QueryObj;
    const imagePath = path.join(
      __dirname,
      "..",
      "..",
      "assets",
      "full",
      filename
    );
    // output path
    const outputPath = path.join(
      __dirname,
      "..",
      "..",
      "assets",
      "thumb",
      `${filename.split(".")[0]}-${width}-${height}.jpg`
    );
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({
        error: "Image not found"
      });
    }
    // check if the image not exist
    if (!fs.existsSync(outputPath)) {
      resizeImage(imagePath, outputPath, +width!, +height!, res);
    } else {
      return res.sendFile(outputPath);
    }
  }
);

export default routes;
