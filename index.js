const express = require("express");
const app = express();
const requireAll = require("require-dir-all");
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const morgan = require("morgan");
const cors = require("cors");
const Sequelize = require("sequelize");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(morgan("dev"));

app.use(cors());

global.sequelize = new Sequelize(null, null, null, {
  dialect: "sqlite",
  storage: "database.sqlite"
});

Object.values(requireAll("./controllers")).forEach(c => app.use(c));

global.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`MVC app listening on port ${port}!`);
  });
});