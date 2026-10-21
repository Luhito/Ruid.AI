import app from "./app.js";

const PORT = 3030;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}, ${(new Date).toISOString()}`);
});