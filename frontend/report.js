

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

  }

function StoreFunction(){
    var tempUserEmail = document.getElementById("pagetitle").innerHTML;
    var xhttp = new XMLHttpRequest();
    //need to modify the url
    var url = "http://studytonight.web.illinois.edu/totalPurchases/stores/"+tempUserEmail;
    console.log(url);
    xhttp.open("GET", url, false);
    xhttp.onload = function() {
        console.log("button clicked");
        console.log(this.readyState);
        if ( this.status == 200) {
            console.log("successfully clicked");
            // alert("Login successfully");
            console.log(this.responseText)
  
            var searchTable = document.getElementById("DateList");
            while(searchTable.rows.length > 1) {
              searchTable.deleteRow(1);
            };
  
            searchResult = JSON.parse(this.responseText);
  
            var i;
            for (i = 0; i < searchResult.length; i++){
              //var rowCount = searchTable.rows.length;
              var row = searchTable.insertRow(1);
              row.insertCell(0).innerHTML = searchResult[i].StoreID;
              var amount=searchResult[i].TotalPurchase;
              row.insertCell(1).innerHTML = Math.round(amount * 100) / 100;
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