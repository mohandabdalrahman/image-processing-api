import express from "express";
const validateParams = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response<any, Record<string, any>> | undefined => {
  const { filename, width, height } = req.query;
  if (!filename) {
    return res.status(400).json({
      error: "You must provide a filename",
    });
  }
  if (!width || !height) {
    return res.status(400).json({
      error: "You must provide a width and height",
    });
  }
  if (isNaN(Number(width)) || isNaN(Number(height))) {
    return res.status(400).json({
      error: "Width and height must be numbers",
    });
  }
  if (Number(width) <= 0 || Number(height) <= 0) {
    return res.status(400).json({
      error: "Width and height must be positive numbers",
    });
  }
  next();
};

export default validateParams;
