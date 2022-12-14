const Order = require('../models/Order');
const { verifyToken,verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('./verifyToken');

const router = require('express').Router();

// CREATE
router.post('/', verifyToken, async(req, res)=>{
    const newOrder = new Order(req.body);
    try {

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
        
    } catch (err) {
        res.status(500).json(err);
    }
});

//PUT
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    //
    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id,
            {$set: req.body},{new:true});

        res.status(200).json(updateOrder);
        
    } catch (err) {
        res.status(500).json(err);
    }
    
});

//DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id);

        res.status(200).json('Order has been deleted...');
        
    } catch (err) {
        res.status(500).json(err);
    }
    
})

// GET USER ORDER
router.get('/find/:userid', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const order = await Order.find({userid:req.params.userid});
        
        res.status(200).json(order);
        
    } catch (err) {
        res.status(500).json(err);
    }
    
});

//GET ALL
router.get('/', verifyTokenAndAdmin, async(req, res)=>{
    try {
        const orders = await Order.find();
        
        res.status(200).json(orders);
        
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET MONTHLY INCOME
router.get('/income', verifyTokenAndAdmin, async(req, res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() -1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() -1));

    try {
        const data = await Order.aggregate([
            {$match:{ createdAt: {$gte: prevMonth}}},
            {$project:{
                month:{ $month: "$createdAt"},
                sales: "$amount",
            }},
            {
                $group:{
                    _id: "$month",
                    total:{$sum: "$sales"},
                }
            }
        ])

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;