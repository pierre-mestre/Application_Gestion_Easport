import app from "./app";

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`Server started on port ${port}`);
});
