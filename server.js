var express = require("express"), app = express();
app.use(express.static(__dirname + "/public"))
app.use("/:page", express.static(__dirname + "/public"));
app.listen(4258);
