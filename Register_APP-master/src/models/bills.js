const mongoose = require('mongoose')

const billSchema = new mongoose.Schema({
    products:[{
            name:{
                type: String,
               // required:true
            },
            price:{
                type: Number,
                //required:true
            } 
    }],
    cashier:{
        type: String,
        //required: true
    },
    totalPrice:{
        type:Number,
        //required:true
    }
},{
    timestamps:true
})

const Bill = mongoose.model('Bill', billSchema)
module.exports = Bill