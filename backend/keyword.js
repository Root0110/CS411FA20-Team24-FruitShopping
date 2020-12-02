//  include the Keyword Extractor
var keyword_extractor = require("keyword-extractor/lib/keyword_extractor.js");

//  Opening sentence to NY Times Article at
//  http://www.nytimes.com/2013/09/10/world/middleeast/surprise-russian-proposal-catches-obama-between-putin-and-house-republicans.html
var sentence = "The apple is not fresh!"

//  Extract the keywords
var extraction_result = keyword_extractor.extract(sentence,{
                                                                language:"english",
                                                                remove_digits: true,
                                                                return_changed_case:true,
                                                                remove_duplicates: false

                                                           });

console.info(extraction_result);
//document.getElementById('keywordTest').innerHTML = extraction_result.join(', ');
/*
  extraction result is:

  [
        "president",
        "obama",
        "woke",
        "monday",
        "facing",
        "congressional",
        "defeat",
        "parties",
        "believed",
        "hobble",
        "presidency"
    ]
*/
