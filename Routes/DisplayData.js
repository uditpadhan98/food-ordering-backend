const express=require('express');
const router=express.Router();

router.post('/foodData',(req,res)=>{
    try{
        // console.log(global.fooditem);
        res.send([global.fooditem,global.foodCategory])
    } catch{error}{
        console.log("error.message");
        res.send("server Error")
    }
})

module.exports=router;