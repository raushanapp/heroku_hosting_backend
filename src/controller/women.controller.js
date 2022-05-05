
const express = require('express');
const authenticate =require("../middleWare/authentication")
const Women =require("../model/women.model")
const authorise = require("../middleWare/authorise")
const router = express.Router();

router.post("",authenticate,async(req,res)=>{
    req.body.userId =req.user._id

    try{
        const women = await Women.create(req.body);

        return res.status(201).send({women:women});

    }catch(err){
        return res.status(500).send({message: err.message});
    }
});


router.patch("/:id",authenticate, authorise(["admin","seller","user"]), async(req,res)=>{

    req.body.userId = req.user._id;
    try{
        const women = await Women.findByIdAndUpdate(req.params.id,req.body,{new:true});

        res.status(200).send({women:women}) 

    }
    catch(err){
        return res.status(500).send({message: err.message});
    }
})

router.delete("/:id",authenticate, authorise(["admin","seller","user"]), async(req,res)=>{

    req.body.userId = req.user._id;
    try{
        const women = await Women.findByIdAndDelete(req.params.id);

        res.status(200).send({women:women}) 

    }
    catch(err){
        return res.status(500).send({message: err.message});
    }
})


router.get("",async(req,res)=>{

    try{
        const women = await Women.find().lean().exec();

        return res.status(201).send({women:women});

    }catch(err){
        return res.status(500).send({message: err.message});
    }
})

module.exports = router;