const express = require('express');
const { getFoodItemsData } = require('../db'); // Replace with the actual path to your module

const router = express.Router();

router.post('/foodData',(req,res)=>{
    try {
        res.send([global.fooditems,global.foodCategory]);
        
    }catch (error) {
        res.send("server Error")
    }
})



module.exports = router;