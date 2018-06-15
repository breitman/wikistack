const express = require('express');
const morgan = require("morgan");
const app = express();

const layout = require("./views/layout");
const models = require("./models");

const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/user");

const bodyParser = require("body-parser");


models.db.authenticate().
then(() =>{
  console.log('connected to the database');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

app.get("/", (req, res) =>{
  res.redirect('/wiki');
});

const PORT = 3000;

const init = async () =>{
  await models.db.sync({force: false}); //deletes models from db on every refresh
  app.listen(PORT, () =>{
    console.log(`App listening to Port: ${PORT}`);
  });
};
init();
