import express from "express";
import sharp from "sharp";

const resizeImage = (
  imagePath: string,
  outputPath: string,
  width: number,
  height: number,
  res: express.Response
): void => {
  sharp(imagePath)
    .resize(Number(width), Number(height))
    .toFile(outputPath)
    .then(() => {
      return res.sendFile(outputPath);
    })
    .catch((err: express.Errback) => {
      console.log(err);
      return res.status(500).json({
        error: "Something went wrong when resizing the image",
      });
    });
};

export default resizeImage;
