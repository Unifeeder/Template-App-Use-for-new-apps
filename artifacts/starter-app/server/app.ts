import express, { type Express, type Request, type Response, type NextFunction } from "express";
import cors from "cors";
import path from "path";
import "@workspace/db";
import router from "./routes/index.js";

const app: Express = express();

app.disable("x-powered-by");

const isDev = process.env.NODE_ENV !== "production";
app.use(cors(isDev ? {} : { origin: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.all("/api/{*splat}", (_req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

if (!isDev) {
  const bundleDir = path.dirname(process.argv[1]);
  const staticDir = path.resolve(bundleDir, "public");
  app.use(express.static(staticDir));

  app.get("/{*splat}", (_req: Request, res: Response) => {
    res.sendFile(path.join(staticDir, "index.html"));
  });
}

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    error: "Internal server error",
    ...(isDev && { message: err.message, stack: err.stack }),
  });
});

export default app;
