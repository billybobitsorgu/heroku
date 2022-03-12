var debug = require('debug')('demo')
var Review = require('../models/review.model')

function sendJSONresponse(res, status, content){
    res.status(status)
    res.json(content)
}

module.exports.readReviewsSorted = function(req,res){
    debug('Getting all reviews')
    console.log('Getting all reviews')
    Review.find().exec().then(function(results){
        
        //format var dict as a sort of "dictionary" with
        //"0" as the index and results[x].rating as the value
        var dict = {"0" : parseInt(results[0].rating)}

        //Add each rating from results to dict
        //unordered
        for(var x = 1; x < results.length; x++){
            dict[x] = parseInt(results[x].rating)
        }

        //format var endR like a "dictionary"
        var endR = {0 : "test"}

        //a counter for adding things to endR
        var endRctr = 0
        for(var y = 5; y > 0; y--){
            //check for books with 5 rating, then 4, then 3...
            for(var x = 0; x < results.length; x++){
                console.log(dict[x])
                if(dict[x] == y){
                    console.log(results.length)
                    console.log(results[x])
                    endR[endRctr] = results[x]
                    console.log(endR[0])
                    endRctr = endRctr + 1
                }
            }
        }
        sendJSONresponse(res, 200, endR)
    }).catch(function(err){
        sendJSONresponse(res, 404, err)
    })
}

module.exports.readReviewsAll = function(req, res){
    debug('Getting all reviews')
    console.log('Getting all reviews')
    Review.find().exec().then(function(results){
        sendJSONresponse(res, 200, results)
    }).catch(function(err){
        sendJSONresponse(res, 404, err)
    })
}

module.exports.reviewsReadOne = function(req, res){
    debug('Reading one review')
    console.log('Reading one review')
    console.log(res)
    if(req.params && req.params.reviewid){
        var list = {0 : "test"}
        for(var x = 0; x < res.length; x++){
            list[x] = res[x].author
        }
        for(var x = 0; x < list.length; x++){
            if(req.params.reviewid == res[x].author){
                sendJSONresponse(res,200,res[x])
            }
        }
        /*Review.findById(req.params.reviewid).exec().then(
            function(result){
                sendJSONresponse(res,200,result)
            }
        ).catch(function(err){
            sendJSONresponse(res,404,err)
        })*/
    }else{
        sendJSONresponse(res, 404, {"message":"Review not found."})
    }
}

module.exports.queryPage = function(req, res){
    res.render("QueryExample", {title: "Query"})
}

module.exports.reviewCreate = function(req, res){
    debug('Create one review', req.body)
    console.log('Create one review', req.body)

    Review.create({
        author:req.body.author,
        rating:req.body.rating,
        reviewText:req.body.reviewText
    }).then(function(dataSaved){
        sendJSONresponse(res, 201, dataSaved)
    }).catch(function(err){
        debug(err)
        sendJSONresponse(res, 404, err)
    })

}

module.exports.reviewUpdateOne = function(req, res){
    debug('Update one review')
    console.log('Update one review')
    if(!req.params.reviewid){
        sendJSONresponse(res, 404, {"message":"Not found...request id required"})
        return
    }

    Review.findById(req.params.reviewid).exec().then(
        function(reviewData){
            reviewData.author = req.body.author;
            reviewData.rating = req.body.rating;
            reviewData.reviewText = req.body.reviewText;
            return reviewData.save()
        }
    ).then(function(data){
        sendJSONresponse(res,200, data)
    }).catch(function(err){
        sendJSONresponse(res, 400, err)
    })

}

module.exports.reviewDeleteOne = function(req, res){
    debug('Delete one review')
    console.log('Delete one review')

    if(!req.params.reviewid){
        sendJSONresponse(res, 404, {"message":"Not found...request id required"})
        return
    }

    Review.findByIdAndRemove(req.params.reviewid).exec().then(
        function(reviewData){
            console.log("Review ID " + req.params.reviewid + " deleted")
            debug(reviewData)
        }
    ).catch(function(err){
        sendJSONresponse(res, 400, err)
    })
}