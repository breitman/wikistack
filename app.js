const express = require('express');
const morgan = require("morgan");
const app = express();
const layout = require("./views/layout");
const models = require("./models");

models.db.authenticate().
then(() =>{
  console.log('connected to the database');
});

app.use(morgan("dev"));

app.get("/", (req, res) =>{
  res.send(layout(""));
});

const PORT = 3000;

const init = async () =>{
  await models.db.sync({force: true});
  app.listen(PORT, () =>{
    console.log(`App listening to Port: ${PORT}`);
  });
};
init();
