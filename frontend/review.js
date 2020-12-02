window.onload = function() {

    //var getuser=localStorage.getItem("storageName");
    //document.getElementById("pagetitle").value=getuser;

    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;

    for (var i = 0, l = params.length; i < l; i++) {
        console.log(params[i])
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1].split('#')[0];
    }
    document.getElementById('pagetitle').innerHTML = decodeURIComponent(data.name);
    document.getElementById("userreview").value="";
  }

function HistoryFunction(){
    var tempUserEmail = document.getElementById("pagetitle").innerHTML;

    var searchTable = document.getElementById("DateList");
    while(searchTable.rows.length > 1) {
      searchTable.deleteRow(1);
    };

    var xhttp = new XMLHttpRequest();
    //need to modify the url
    var url = "http://studytonight.web.illinois.edu/totalPurchases/dates/"+tempUserEmail;
    console.log(url);
    xhttp.open("GET", url, false);
    xhttp.onload = function() {
        console.log("button clicked");
        console.log(this.readyState);
        if ( this.status == 200) {
            console.log("successfully clicked");
            // alert("Login successfully");
            console.log(this.responseText);

            searchResult = JSON.parse(this.responseText);

            var i;
            for (i = 0; i < searchResult.length; i++){
              //var rowCount = searchTable.rows.length;
              var row = searchTable.insertRow(1);
              row.insertCell(0).innerHTML = '<input type="checkbox" class="select-all checkbox" name="select-single-1" onclick="return ValidatePetSelection1();"/>';
              var d = new Date(searchResult[i].PurchaseDate);
              console.log(d)
              let month = String(d.getMonth() + 1).padStart(2, '0');
              let day = String(d.getDate()).padStart(2, '0');
              let output = d.getFullYear() + '-' + month + '-' + day;
              console.log(output);
              row.insertCell(1).innerHTML = output;
              var amount=searchResult[i].TotalPurchase;
              row.insertCell(2).innerHTML = Math.round(amount * 100) / 100;
            }

            //window.location = "main.html"; // Redirecting to other page.
        }else{
            console.log("asdsadsads clicked");
            //loginErrorMsg.style.opacity = 1;
            alert(this.responseText);
        }
    };
    console.log("aboou to send!")
    xhttp.send();
    console.log("about to return!")

}

function ValidatePetSelection1(){
    var checkboxes = document.getElementsByName("select-single-1");
    var numberOfCheckedItems = 0;
    for(var i = 0; i < checkboxes.length; i++)
    {
        if(checkboxes[i].checked)
            numberOfCheckedItems++;
    }
    if(numberOfCheckedItems > 1)
    {
        alert("You can't select more than one date!");
        return false;
    }

}

function ValidatePetSelection2(){
    var checkboxes = document.getElementsByName("select-single-2");
    var numberOfCheckedItems = 0;
    for(var i = 0; i < checkboxes.length; i++)
    {
        if(checkboxes[i].checked)
            numberOfCheckedItems++;
    }
    if(numberOfCheckedItems > 1)
    {
        alert("You can't select more than one product!");
        return false;
    }
}

function ValidatePetSelection3(){
    var checkboxes = document.getElementsByName("select-single-3");
    var numberOfCheckedItems = 0;
    for(var i = 0; i < checkboxes.length; i++)
    {
        if(checkboxes[i].checked)
            numberOfCheckedItems++;
    }
    if(numberOfCheckedItems > 1)
    {
        alert("You can't select more than one product!");
        return false;
    }
}

function ProductFunction(){

    var tempUserEmail = document.getElementById("pagetitle").innerHTML;
    var checkboxes = document.getElementsByName("select-single-1");
    var selectedDate;
    console.log(checkboxes);

    for (var i = 0; i < checkboxes.length; i++){
        if (checkboxes[i].checked){
          var row = checkboxes[i].parentNode.parentNode;
          selectedDate = row.cells[1].innerHTML;
          break;
        }
    };

    var searchTable = document.getElementById("ProductList");
    while(searchTable.rows.length > 1) {
      searchTable.deleteRow(1);
    };

    var xhttp = new XMLHttpRequest();
    var url = "http://studytonight.web.illinois.edu/purchases_date/"+selectedDate+'/'+tempUserEmail;
    console.log(url);
    xhttp.open("GET", url, false);
    xhttp.onload = function() {
        console.log("button clicked");
        console.log(this.readyState);
        if ( this.status == 200) {
            console.log("successfully clicked");
            // alert("Login successfully");
            console.log(this.responseText);

            searchResult = JSON.parse(this.responseText);

            var i;
            for (i = 0; i < searchResult.length; i++){
              //var rowCount = searchTable.rows.length;
              var row = searchTable.insertRow(1);
              row.insertCell(0).innerHTML = '<input type="checkbox" class="select-all checkbox" name="select-single-2" onclick="return ValidatePetSelection2();"/>';
              row.insertCell(1).innerHTML = searchResult[i].ProductID;
              row.insertCell(2).innerHTML = searchResult[i].StoreName;
              row.insertCell(3).innerHTML = searchResult[i].ProductName;
              row.insertCell(4).innerHTML = searchResult[i].Unit;
              row.insertCell(5).innerHTML = searchResult[i].UnitPrice;
              row.insertCell(6).innerHTML = searchResult[i].Quantity;
            };
        }else{
            console.log("asdsadsads clicked");
            //loginErrorMsg.style.opacity = 1;
            alert(this.responseText);
        }
    };
    console.log("aboou to send!");
    xhttp.send();
    console.log("about to return!");
}

function ReviewFunction(){

    var tempUserEmail = document.getElementById("pagetitle").innerHTML;
    var checkboxes = document.getElementsByName("select-single-2");
    var selectedProductID;


    for (var i = 0; i < checkboxes.length; i++){
        if (checkboxes[i].checked){
          var row = checkboxes[i].parentNode.parentNode;
          selectedProductID = row.cells[1].innerHTML;
          break;
        }
    };
    console.log(selectedProductID);

    var searchTable = document.getElementById("ReviewList");
    while(searchTable.rows.length > 1) {
      searchTable.deleteRow(1);
    };

    var xhttp = new XMLHttpRequest();
    var url = "http://studytonight.web.illinois.edu/review_product/"+selectedProductID;
    console.log(url);
    xhttp.open("GET", url, false);
    xhttp.onload = function() {
        console.log("button clicked");
        console.log(this.readyState);
        if ( this.status == 200) {
            console.log("successfully clicked");
            // alert("Login successfully");
            console.log(this.responseText);
            searchResult = JSON.parse(this.responseText);

            var i;
            for (i = 0; i < searchResult.length; i++){
              //var rowCount = searchTable.rows.length;
              var row = searchTable.insertRow(1);
              row.insertCell(0).innerHTML = '<input type="checkbox" class="select-all checkbox" name="select-single-3" onclick="return ValidatePetSelection3();"/>';
              row.insertCell(1).innerHTML = searchResult[i].userAccount;
              row.insertCell(2).innerHTML = searchResult[i].purchaseDate;
              row.insertCell(3).innerHTML = searchResult[i].productID;

              console.log("check here!");
              var productid=searchResult[i].productID;
              var xhttppro=new XMLHttpRequest();
              var url = "http://studytonight.web.illinois.edu/products_id/"+productid;
              console.log(url);
              xhttppro.open("GET", url, false);
              xhttppro.onload =function() {
                if ( this.status == 200) {
                  console.log("successful");
                  result = JSON.parse(this.responseText);
                  console.log(result);
                  row.insertCell(4).innerHTML=result.ProductName;
                }else{
                  console.log("asdsadsads clicked");
                  //alert(this.responseText);
                }
              };
              console.log("aboou to send!")
              xhttppro.send();
              console.log("about to return!");

              //row.insertCell(4).innerHTML="";
              row.insertCell(5).innerHTML = searchResult[i].productDetails;
              row.insertCell(6).innerHTML = searchResult[i].featureTags;

            }

            //window.location = "main.html"; // Redirecting to other page.
        }else{
            console.log("asdsadsads clicked");
            //loginErrorMsg.style.opacity = 1;
            alert(this.responseText);
        }
    };
    console.log("aboou to send!");
    xhttp.send();
    console.log("about to return!");

}

function AddReviewFunction(){
    var adduserAccount = document.getElementById("pagetitle").innerHTML;
    var checkboxes1 = document.getElementsByName("select-single-1");
    var checkboxes2 = document.getElementsByName("select-single-2");
    var addproductID;
    var addproductDetails;
    var addpurchaseDate;

    for (var i = 0; i < checkboxes1.length; i++){
        if (checkboxes1[i].checked){
          var row = checkboxes1[i].parentNode.parentNode;
          addpurchaseDate = row.cells[1].innerHTML;
          break;
        }
    };

    for (var i = 0; i < checkboxes2.length; i++){
        if (checkboxes2[i].checked){
          var row = checkboxes2[i].parentNode.parentNode;
          addproductID = row.cells[1].innerHTML;
          break;
        }
    };

    addproductDetails=document.getElementById("userreview").value;
    if (addproductDetails == ''){
      alert("Please fill in your reviews!");
      return;
    };

    var xhttp = new XMLHttpRequest();
    var url = "http://studytonight.web.illinois.edu/review_new/";
    console.log(url);
    xhttp.open("POST", url, false);
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.onload = function() {
        console.log("button clicked");
        console.log(this.readyState);
        if ( this.status == 200) {
            console.log("successfully clicked");
            alert("Reviews added to review list!");
            console.log(this.responseText);

        }else{
            console.log("asdsadsads clicked");
        };
    };

    var data = {
          userAccount : adduserAccount,
          productID : addproductID,
          productDetails : addproductDetails,
          purchaseDate : addpurchaseDate
    };

    var data_json = JSON.stringify(data)
    console.log(data_json);
    console.log("aboou to send!")
    xhttp.send(data_json);
    console.log("about to return!")

    var searchTable = document.getElementById("ReviewList");

    while(searchTable.rows.length > 1) {
      searchTable.deleteRow(1);
    };

    var xhttp = new XMLHttpRequest();
    var url = "http://studytonight.web.illinois.edu/review_product/"+addproductID;
    console.log(url);
    xhttp.open("GET", url, false);
    xhttp.onload = function() {
        console.log("button clicked");
        console.log(this.readyState);
        if ( this.status == 200) {
            console.log("successfully clicked");
            // alert("Login successfully");
            console.log(this.responseText);
            searchResult = JSON.parse(this.responseText);

            var i;
            for (i = 0; i < searchResult.length; i++){
              //var rowCount = searchTable.rows.length;
              var row = searchTable.insertRow(1);
              row.insertCell(0).innerHTML = '<input type="checkbox" class="select-all checkbox" name="select-single-3" onclick="return ValidatePetSelection3();"/>';
              row.insertCell(1).innerHTML = searchResult[i].userAccount;
              row.insertCell(2).innerHTML = searchResult[i].purchaseDate;
              row.insertCell(3).innerHTML = searchResult[i].productID;

              console.log("check here!");
              var productid=searchResult[i].productID;
              var xhttppro=new XMLHttpRequest();
              var url = "http://studytonight.web.illinois.edu/products_id/"+productid;
              console.log(url);
              xhttppro.open("GET", url, false);
              xhttppro.onload =function() {
                if ( this.status == 200) {
                  console.log("successful");
                  result = JSON.parse(this.responseText);
                  console.log(result);
                  row.insertCell(4).innerHTML=result.ProductName;
                }else{
                  console.log("asdsadsads clicked");
                  //alert(this.responseText);
                }
              };
              console.log("aboou to send!")
              xhttppro.send();
              console.log("about to return!");

              //row.insertCell(4).innerHTML="";
              row.insertCell(5).innerHTML = searchResult[i].productDetails;
              row.insertCell(6).innerHTML = searchResult[i].featureTags;

            }

            //window.location = "main.html"; // Redirecting to other page.
        }else{
            console.log("asdsadsads clicked");
            //loginErrorMsg.style.opacity = 1;
            alert(this.responseText);
        }
    };
    console.log("aboou to send!");
    xhttp.send();
    console.log("about to return!");

}

function DelReviewFunction(){
    var tempUserEmail;
    var checkboxes3 = document.getElementsByName("select-single-3");
    var checkboxes1 = document.getElementsByName("select-single-1");
    var selectedProductID;
    var selectedDate;

    for (var i = 0; i < checkboxes1.length; i++){
        if (checkboxes1[i].checked){
          var row = checkboxes1[i].parentNode.parentNode;
          selectedDate = row.cells[1].innerHTML;
          break;
        }
    };

    for (var i = 0; i < checkboxes3.length; i++){
        if (checkboxes3[i].checked){
          var row = checkboxes3[i].parentNode.parentNode;
          selectedProductID = row.cells[3].innerHTML;
          tempUserEmail=row.cells[1].innerHTML;
          break;
        }
    };

    var xhttp = new XMLHttpRequest();
    var url = "http://studytonight.web.illinois.edu/review_delete/"+tempUserEmail+'/'+selectedDate+'/'+selectedProductID;
    console.log(url);
    xhttp.open("DELETE", url, false);
    xhttp.onload = function() {
        console.log("button clicked");
        console.log(this.readyState);
        if ( this.status == 200) {
            console.log("successfully clicked");
            alert("Item deleted from review list!");
            console.log(this.responseText)

        }else{
            console.log("asdsadsads clicked");
            alert(this.responseText);
        }
    };
    console.log("aboou to send!")
    xhttp.send();
    console.log("about to return!");

    var searchTable = document.getElementById("ReviewList");
    while(searchTable.rows.length > 1) {
      searchTable.deleteRow(1);
    };

    var xhttp = new XMLHttpRequest();
    var url = "http://studytonight.web.illinois.edu/review_product/"+tempUserEmail;
    console.log(url);
    xhttp.open("GET", url, false);
    xhttp.onload = function() {
        console.log("button clicked");
        console.log(this.readyState);
        if ( this.status == 200) {
            console.log("successfully clicked");
            // alert("Login successfully");
            console.log(this.responseText);

            searchResult = JSON.parse(this.responseText);

            var i;
            for (i = 0; i < searchResult.length; i++){
              //var rowCount = searchTable.rows.length;
              var row = searchTable.insertRow(1);
              row.insertCell(0).innerHTML = '<input type="checkbox" class="select-all checkbox" name="select-single-3" onclick="return ValidatePetSelection3();"/>';
              row.insertCell(1).innerHTML = searchResult[i].userAccount;
              row.insertCell(2).innerHTML = searchResult[i].purchaseDate;
              row.insertCell(3).innerHTML = searchResult[i].productID;

              console.log("check here!");
              var productid=searchResult[i].productID;
              var xhttppro=new XMLHttpRequest();
              var url = "http://studytonight.web.illinois.edu/products_id/"+productid;
              console.log(url);
              xhttppro.open("GET", url, false);
              xhttppro.onload =function() {
                if ( this.status == 200) {
                  console.log("successful");
                  result = JSON.parse(this.responseText);
                  console.log(result);
                  row.insertCell(4).innerHTML=result.ProductName;
                }else{
                  console.log("asdsadsads clicked");
                  //alert(this.responseText);
                }
              };
              console.log("aboou to send!")
              xhttppro.send();
              console.log("about to return!");

              //row.insertCell(4).innerHTML="";
              row.insertCell(5).innerHTML = searchResult[i].productDetails;
              row.insertCell(6).innerHTML = searchResult[i].featureTags;

            }

            //window.location = "main.html"; // Redirecting to other page.
        }else{
            console.log("asdsadsads clicked");
            //loginErrorMsg.style.opacity = 1;
            //alert(this.responseText);
        }
    };
    console.log("aboou to send!")
    xhttp.send();
    console.log("about to return!")

}

function GoReviewFunction(){
    var tempUserEmail = document.getElementById("pagetitle").innerHTML;
    url = '/review.html?name=' + encodeURIComponent(tempUserEmail);
    console.log(url);
    try {window.location.replace("test");} catch(e) {alert("set test failed");}
    window.location = url;
}

function GoReportFunction(){
    var tempUserEmail = document.getElementById("pagetitle").innerHTML;
    url = '/report.html?name=' + encodeURIComponent(tempUserEmail);
    console.log(url);
    try {window.location.replace("test");} catch(e) {alert("set test failed");}
    window.location = url;
}

function GoShopFunction(){
    var tempUserEmail = document.getElementById("pagetitle").innerHTML;
    url = '/main.html?name=' + encodeURIComponent(tempUserEmail);
    console.log(url);
    try {window.location.replace("test");} catch(e) {alert("set test failed");}
    window.location = url;
}

function SignOutFunction(){
    url = '/index.html';
    console.log(url);
    try {window.location.replace("test");} catch(e) {alert("set test failed");}
    window.location = url;
}
