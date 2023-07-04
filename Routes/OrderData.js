const express=require("express");
const router=express.Router();
const Order=require('../models/Orders');


router.post('/OrderData', async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0,0,{Order_date:req.body.order_date})

    //if email not existing in db then create: else: InsertMany()
    let eId = await Order.findOne({email: req.body.email })    
    // console.log(eId)
    // console.log(req.body.email);
    if (eId===null) {
        try {
            await Order.create({
                email:req.body.email,
                order_data:[data]
            })
            res.json({ success: true })
            // .then(() => {
            //     console.log("created");
            //     res.json({ success: true })
            // })
        } catch (error) {
            console.log(error);
            res.json({success:false});
        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myOrderData', async (req, res) => {
    try {
        // console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
});

module.exports=router;