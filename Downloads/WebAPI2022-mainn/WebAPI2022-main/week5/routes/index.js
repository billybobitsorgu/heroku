var express = require('express');
var router = express.Router();
var ctrlReviews = require('./controllers/review.controller')

//include routes for REST API Example
router.get('/reviews', ctrlReviews.readReviewsAll)
router.get('/reviews/search/:reviewid', ctrlReviews.reviewsReadOne)
router.post('/reviews', ctrlReviews.reviewCreate)

router.get('/reviews/sort', ctrlReviews.readReviewsSorted)

router.get('/QueryExample', ctrlReviews.queryPage)
router.put('/reviews/:reviewid', ctrlReviews.reviewUpdateOne)
router.delete('/reviews/:reviewid', ctrlReviews.reviewDeleteOne)


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
