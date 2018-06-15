const express = require("express");
const router = express.Router();

const {Page} = require("../models");
const {User} = require("../models");
const {addPage} = require("../views");
const wikiPage = require("../views/wikipage");
const main = require("../views/main");

router.get("/", async (req,res,next)=>{
  const foundMain = await Page.findAll();
  res.send(main(foundMain));
});

router.post("/", async (req,res,next)=>{

  try{
    const foundUser = await User.findOrCreate(
      {where:
        {name: req.body.name,
        email: req.body.email}
    });
    const page = await Page.create(req.body);
    page.setAuthor(foundUser[0]);

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
    const user = await foundPost.getAuthor();
    res.send(wikiPage(foundPost, user));
  } catch(error){
    next(error);
  }
});


module.exports = router;
