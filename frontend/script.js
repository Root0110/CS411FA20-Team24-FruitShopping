// var tempUserEmail = "qingwen2@illinois.edu";
let selectedRow = null;

let d = new Date();
let month = String(d.getMonth() + 1).padStart(2, '0');
let day = String(d.getDate()).padStart(2, '0');
let output = d.getFullYear() + '-' + month + '-' + day;
console.log(output);

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

  document.getElementById("quantity").value="";
  // document.getElementById("pagetitle").innerHTML = "hhhhhhh"

	//document.getElementById("date").value = output;
}

function SearchFunction(){
  var tempUserEmail = document.getElementById("pagetitle").innerHTML;
  var productname = document.getElementById("productType").value;
  document.getElementById("quantity").value="";

	console.log(productname);
  if (productname == ''){
    alert("Please select the product you want.");
    return;
  }

  var searchTable = document.getElementById("ProductList");
  while(searchTable.rows.length > 1) {
    searchTable.deleteRow(1);
  };

  var xhttp = new XMLHttpRequest();
  var url = "http://studytonight.web.illinois.edu/products_keyword/"+productname;
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
            row.insertCell(1).innerHTML = searchResult[i].ProductID;
            var productid = searchResult[i].ProductID;
            console.log("check here");
            console.log(productid);
            row.insertCell(2).innerHTML = searchResult[i].StoreID;
            row.insertCell(3).innerHTML = searchResult[i].StoreName;
            row.insertCell(4).innerHTML = searchResult[i].ProductName;
            row.insertCell(5).innerHTML = searchResult[i].Unit;
            row.insertCell(6).innerHTML = searchResult[i].UnitPrice;

            
            var xhttptag=new XMLHttpRequest();
            var url = "http://studytonight.web.illinois.edu/review_product/"+productid;
            console.log(url);
            xhttptag.open("GET", url, false);
              xhttptag.onload =function() {
                if ( this.status == 200) {
                  console.log("successful");
                  reviewresult = JSON.parse(this.responseText);
                  console.log(reviewresult);
                  console.log(reviewresult[0].featureTags);
                  var tags=reviewresult[0].featureTags;
                  tags=tags.toString();
                  row.insertCell(7).innerHTML=tags;
                }else{
                  console.log("asdsadsads clicked");
                  //alert(this.responseText);
                }
            };
            console.log("aboou to send!")
            xhttptag.send();
            console.log("about to return!")
              
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

  
  var xhttp = new XMLHttpRequest();
  var url = "http://studytonight.web.illinois.edu/purchases_date/"+output+'/'+tempUserEmail;
  console.log(url);
  xhttp.open("GET", url, false);
  xhttp.onload = function() {
      console.log("button clicked");
      console.log(this.readyState);
      if ( this.status == 200) {
          console.log("successfully clicked");
          console.log(this.responseText);

          var searchTable = document.getElementById("shoppingList");

          while(searchTable.rows.length > 1) {
            searchTable.deleteRow(1);
          };

          searchResult = JSON.parse(this.responseText);

          var i;
          for (i = 0; i < searchResult.length; i++){
            //var rowCount = searchTable.rows.length;
            var row = searchTable.insertRow(1);
            row.insertCell(0).innerHTML = '<input type="checkbox" class="select-all checkbox" name="select-single-2" onclick="return ValidatePetSelection2();"/>';
            row.insertCell(1).innerHTML = searchResult[i].ProductID;
            row.insertCell(2).innerHTML = searchResult[i].StoreID;
            row.insertCell(3).innerHTML = searchResult[i].StoreName;
            row.insertCell(4).innerHTML = searchResult[i].ProductName;
            row.insertCell(5).innerHTML = searchResult[i].Unit;
            row.insertCell(6).innerHTML = searchResult[i].UnitPrice;
            row.insertCell(7).innerHTML = searchResult[i].Quantity;

          }

          //window.location = "main.html"; // Redirecting to other page.
      }else{
          console.log("asdsadsads clicked");
          //loginErrorMsg.style.opacity = 1;
          //alert(this.responseText);
      }
  };
  console.log("aboou to send!");
  xhttp.send();
  console.log("about to return!");
  
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
      alert("You can't select more than one product!");
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

function AddFunction(){
  var tempUserEmail = document.getElementById("pagetitle").innerHTML;
  var checkboxes = document.getElementsByName("select-single-1");
  var selectedProductID;
  var selectedStoreID;
  var selectedStoreName;
  var selectedProductName;
  var selectedUnit;
  var selectedUnitPrice;
  console.log(checkboxes);

  for (var i = 0; i < checkboxes.length; i++){
      if (checkboxes[i].checked){
        var row = checkboxes[i].parentNode.parentNode;
        selectedProductID = row.cells[1].innerHTML;
        selectedStoreID=row.cells[2].innerHTML;
        selectedStoreName = row.cells[3].innerHTML;
        selectedProductName = row.cells[4].innerHTML;
        selectedUnit = row.cells[5].innerHTML;
        selectedUnitPrice = row.cells[6].innerHTML;
        break;
      }
  };

  console.log("printquantity");
  var setquantity=document.getElementById("quantity").value;
  if (setquantity == ''){
    alert("Please fill in a Quantity!");
    return;
  };

  let d = new Date();
	let month = String(d.getMonth() + 1).padStart(2, '0');
	let day = String(d.getDate()).padStart(2, '0');
	let output = d.getFullYear() + '-' + month + '-' + day;
  console.log(output);

  var xhttp = new XMLHttpRequest();
  var url = "http://studytonight.web.illinois.edu/purchases/";
  console.log(url);
  xhttp.open("POST", url, false);
  xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhttp.onload = function() {
      console.log("button clicked");
      console.log(this.readyState);
      if ( this.status == 200) {
          console.log("successfully clicked");
          alert("Item added to shopping list!");
          console.log(this.responseText);

      }else{
          console.log("asdsadsads clicked");
          //loginErrorMsg.style.opacity = 1;
          alert("Item already exist or invalid quantity! Use edit to edit quantity or input a valid quantity!");
          // alert(this.responseText);
      }
  };

	var data = {
    PurchaseDate : output,
    Quantity : setquantity,
    EmailAccount : tempUserEmail,
    ProductID : selectedProductID,
    StoreID : selectedStoreID
  };

	var data_json = JSON.stringify(data)
  console.log(data_json);
  console.log("aboou to send!")
  xhttp.send(data_json);
  console.log("about to return!");

  var searchTable = document.getElementById("shoppingList");

  while(searchTable.rows.length > 1) {
    searchTable.deleteRow(1);
  };

  var xhttp = new XMLHttpRequest();
  var url = "http://studytonight.web.illinois.edu/purchases_date/"+output+'/'+tempUserEmail;
  console.log(url);
  xhttp.open("GET", url, false);
  xhttp.onload = function() {
      console.log("button clicked");
      console.log(this.readyState);
      if ( this.status == 200) {
          console.log("successfully clicked");
          console.log(this.responseText);

          searchResult = JSON.parse(this.responseText);

          var i;
          for (i = 0; i < searchResult.length; i++){
            //var rowCount = searchTable.rows.length;
            var row = searchTable.insertRow(1);
            row.insertCell(0).innerHTML = '<input type="checkbox" class="select-all checkbox" name="select-single-2" onclick="return ValidatePetSelection2();"/>';
            row.insertCell(1).innerHTML = searchResult[i].ProductID;
            row.insertCell(2).innerHTML = searchResult[i].StoreID;
            row.insertCell(3).innerHTML = searchResult[i].StoreName;
            row.insertCell(4).innerHTML = searchResult[i].ProductName;
            row.insertCell(5).innerHTML = searchResult[i].Unit;
            row.insertCell(6).innerHTML = searchResult[i].UnitPrice;
            row.insertCell(7).innerHTML = searchResult[i].Quantity;

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

function DeleteFunction(){
  var tempUserEmail = document.getElementById("pagetitle").innerHTML;
  var checkboxes = document.getElementsByName("select-single-2");
  var selectedProductID;
  var selectedStoreID;
  var selectedStoreName;
  var selectedProductName;
  var selectedUnit;
  var selectedUnitPrice;
  console.log(checkboxes);

  for (var i = 0; i < checkboxes.length; i++){
      if (checkboxes[i].checked){
        var row = checkboxes[i].parentNode.parentNode;
        selectedProductID = row.cells[1].innerHTML;
        selectedStoreID=row.cells[2].innerHTML;
        selectedStoreName = row.cells[3].innerHTML;
        selectedProductName = row.cells[4].innerHTML;
        selectedUnit = row.cells[5].innerHTML;
        selectedUnitPrice = row.cells[6].innerHTML;
        break;
      }
  };

  let d = new Date();
	let month = String(d.getMonth() + 1).padStart(2, '0');
	let day = String(d.getDate()).padStart(2, '0');
	let output = d.getFullYear() + '-' + month + '-' + day;
  console.log(output);

  var xhttp = new XMLHttpRequest();
  var url = "http://studytonight.web.illinois.edu/purchases_delete/"+output+'/'+tempUserEmail+'/'+selectedProductID;
  console.log(url);
  xhttp.open("DELETE", url, false);
  xhttp.onload = function() {
      console.log("button clicked");
      console.log(this.readyState);
      if ( this.status == 200) {
          console.log("successfully clicked");
          alert("Item deleted from shopping list!");
          console.log(this.responseText)

      }else{
          console.log("asdsadsads clicked");
          alert(this.responseText);
      }
  };
  console.log("aboou to send!")
  xhttp.send();
  console.log("about to return!");

  var searchTable = document.getElementById("shoppingList");
  while(searchTable.rows.length > 1) {
    searchTable.deleteRow(1);
  };

  var xhttp = new XMLHttpRequest();
  var url = "http://studytonight.web.illinois.edu/purchases_date/"+output+'/'+tempUserEmail;
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
            row.insertCell(2).innerHTML = searchResult[i].StoreID;
            row.insertCell(3).innerHTML = searchResult[i].StoreName;
            row.insertCell(4).innerHTML = searchResult[i].ProductName;
            row.insertCell(5).innerHTML = searchResult[i].Unit;
            row.insertCell(6).innerHTML = searchResult[i].UnitPrice;
            row.insertCell(7).innerHTML = searchResult[i].Quantity;
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


function EditFunction(){
  var tempUserEmail = document.getElementById("pagetitle").innerHTML;
  var checkboxes = document.getElementsByName("select-single-2");
  var selectedProductID;
  var selectedStoreID;
  var selectedStoreName;
  var selectedProductName;
  var selectedUnit;
  var selectedUnitPrice;
  console.log(checkboxes);

  for (var i = 0; i < checkboxes.length; i++){
      if (checkboxes[i].checked){
        var row = checkboxes[i].parentNode.parentNode;
        selectedProductID = row.cells[1].innerHTML;
        selectedStoreID=row.cells[2].innerHTML;
        selectedStoreName = row.cells[3].innerHTML;
        selectedProductName = row.cells[4].innerHTML;
        selectedUnit = row.cells[5].innerHTML;
        selectedUnitPrice = row.cells[6].innerHTML;
        break;
      }
  };

  var setquantity=document.getElementById("quantity").value;
  if (setquantity == ''){
    alert("Please fill in a Quantity!");
    return;
  }

  let d = new Date();
	let month = String(d.getMonth() + 1).padStart(2, '0');
	let day = String(d.getDate()).padStart(2, '0');
	let output = d.getFullYear() + '-' + month + '-' + day;
  console.log(output);


  var xhttp = new XMLHttpRequest();
  var url = "http://studytonight.web.illinois.edu/purchases_update/";
  console.log(url);
  xhttp.open("PUT", url, false);
  xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhttp.onload = function() {
      console.log("button clicked");
      console.log(this.readyState);
      if ( this.status == 200) {
          console.log("successfully clicked");
          alert("Item edited in shopping list!");
          console.log(this.responseText);

      }else{
          console.log("asdsadsads clicked");

          alert(this.responseText);
      }
  };

	var data = {
		ProductID : selectedProductID,
		StoreID : selectedStoreID,
		Quantity : setquantity,
		EmailAccount : tempUserEmail,
		PurchaseDate : output
	};
	var data_json = JSON.stringify(data)
  console.log(data_json);
  console.log("aboou to send!")
  xhttp.send(data_json);
  console.log("about to return!");

  var searchTable = document.getElementById("shoppingList");
  while(searchTable.rows.length > 1) {
    searchTable.deleteRow(1);
  };

  var xhttp = new XMLHttpRequest();
  var url = "http://studytonight.web.illinois.edu/purchases_date/"+output+'/'+tempUserEmail;
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
            row.insertCell(0).innerHTML = '<input type="checkbox" class="select-all checkbox" name="select-single" onclick="return ValidatePetSelection();"/>';
            row.insertCell(1).innerHTML = searchResult[i].ProductID;
            row.insertCell(2).innerHTML = searchResult[i].StoreID;
            row.insertCell(3).innerHTML = searchResult[i].StoreName;
            row.insertCell(4).innerHTML = searchResult[i].ProductName;
            row.insertCell(5).innerHTML = searchResult[i].Unit;
            row.insertCell(6).innerHTML = searchResult[i].UnitPrice;
            row.insertCell(7).innerHTML = searchResult[i].Quantity;

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