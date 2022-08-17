import express from "express";
import routes from "./routes/api";
const app = express();
const port = process.env.PORT || 5000;

app.use("/api", routes);

app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
