import app from "./app.js";

const port = Number(process.env.SERVER_PORT || process.env.PORT || 3001);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
