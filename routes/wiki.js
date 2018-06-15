const express = require("express");
const router = express.Router();

router.get("/", (req,res,next)=>{
  res.redirect('/wiki');
});

const {Page} = require("../models");
const {addPage} = require("../views");
const wikiPage = require("../views/wikipage");

router.post("/", async (req,res,next)=>{

  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });
  try{
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
    console.log(page);
  } catch(error) {
    next(error);
  }
});

router.get('/add', (req,res,next)=>{
  res.send(addPage());
});

router.get('/:slug', async (req,res,next)=>{
  try {
    const foundPost = await Page.findOne({
      where: { slug: req.params.slug }
    });
    res.send(wikiPage(foundPost));
  } catch(error){
    next(error);
  }
});


module.exports = router;
