var mongoose = require('mongoose')

var reviewSchema = new mongoose.Schema({
    author:String,
    reviewText:String,
    rating:{
        type:Number,
        required:true,
        min:0,
        max:5
    },
    createdOn:{
        type:Date,
        'default': Date.now
    }
})

let Review = mongoose.model('Review', reviewSchema)
module.exports = Review