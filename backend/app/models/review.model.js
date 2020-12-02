var MongoClient = require('mongodb').MongoClient;
var keyword_extractor = require("../../keyword-extractor/lib/keyword_extractor.js");

const dburl = 'mongodb+srv://zzhu31:mongodb@test.zzbhg.mongodb.net/ReviewsDB?retryWrites=true&w=majority';

const Review = function(review) {
  this.userAccount = review.userAccount;
  this.productID = review.productID;
  this.productDetails = review.productDetails;
  this.purchaseDate = review.purchaseDate;
};

Review.create = (newReview, result) => {
  var extraction_result = keyword_extractor.extract(newReview.productDetails,{
                                                                  language:"english",
                                                                  remove_digits: true,
                                                                  return_changed_case:true,
                                                                  remove_duplicates: false

                                                             });
  console.info(extraction_result);
  MongoClient.connect(dburl, function (err, client) {
    if (err) throw err

    var db = client.db('ReviewsDB')

    try {
    db.collection('reviews').insertOne({
                                    "userAccount" : newReview.userAccount,
                                    "productID" : newReview.productID,
                                    "purchaseDate" : newReview.purchaseDate,
                                    "productDetails" : newReview.productDetails,
                                    "featureTags" : extraction_result
                                  });
    } catch (e) {
      console.log("error: ", e);
      result(err, null);
      return;
    }


    console.log("created review: ", {...newReview }, "with tags: ", extraction_result);
    result(null, {...newReview });
  });
};


Review.findById = (targetProduct, result) => {
  MongoClient.connect(dburl, function (err, client) {
    if (err) throw err

    var db = client.db('ReviewsDB')

    var productID = Number(targetProduct)

    db.collection('reviews').find({"productID" : productID}).toArray(function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        var i;
          for (i = 0; i < res.length; i++) {
            console.log("found reviews: ", res[i]);
          }
        result(null, res);
        return;
      }

      result({kind: "not_found"}, null);
    })
  })
};

Review.remove = (targetUserAccount, targetDate, targetProductID, result) => {
  MongoClient.connect(dburl, function(err, client) {
  if (err) throw err;
  var db = client.db("ReviewsDB");
  // var myquery = {$and: [ {"userAccount" : targetUserAccount},
  //                        {"purchaseDate" : targetDate},
  //                        {"productID" : Number(targetProductID)}
  //                        ]};
  var myquery = {"userAccount" : targetUserAccount,
                        "purchaseDate" : targetDate,
                        "productID" : Number(targetProductID)
                        };
  // myquery = {"productID" : Number(targetProductID)};
  console.info(myquery);
  // db.collection('reviews').find(myquery).toArray(function (err, res) {
  //   if (err) {
  //     console.log("error: ", err);
  //     result(err, null);
  //     return;
  //   }
  //
  //   if (res.length) {
  //     var i;
  //       for (i = 0; i < res.length; i++) {
  //         console.log("found reviews: ", res[i]);
  //       }
  //     result(null, res);
  //     return;
  //   }
  //
  //   result({kind: "not_found"}, null);
  // });

  db.collection("reviews").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    if (obj.deletedCount){
      console.log(obj.deletedCount, "reviews deleted with",targetUserAccount, targetDate, targetProductID);
      result(null, obj.deletedCount);
      return;
    }

    console.log("No such reviews found with",targetUserAccount, targetDate, targetProductID);
    result({kind: "not_found"}, null);
    return;
  });
});
};

module.exports = Review;
