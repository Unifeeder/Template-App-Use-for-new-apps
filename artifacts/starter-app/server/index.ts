import app from "./app.js";

const port = Number(process.env.SERVER_PORT || process.env.PORT || 3001);

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

function shutdown() {
  console.log("Shutting down gracefully...");
  server.close(() => {
    process.exit(0);
  });
  setTimeout(() => {
    console.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10000);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
