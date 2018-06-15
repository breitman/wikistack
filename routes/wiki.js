const express = require("express");
const router = express.Router();

router.get("/", (req,res,next)=>{
  res.redirect('/wiki');
});

router.post("/", (req,res,next)=>{
  res.send('got to POST /wiki/');
});

const {addPage} = require("../views");
router.get('/add', (req,res,next)=>{
  res.send(addPage());
});

module.exports = router;
