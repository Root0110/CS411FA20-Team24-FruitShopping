// var userpassword =document.getElementById("InputPassword").value;
// const loginErrorMsg = document.getElementById("login-error-msg");
// var useremail = document.getElementById("InputEmail").value;


function myFunction(){
  // console.log("???")
  var useremail = document.getElementById("InputEmail").value;
  var userpassword =document.getElementById("InputPassword").value;
  const loginErrorMsg = document.getElementById("login-error-msg");

  console.log(useremail);
  console.log(userpassword);
    if (useremail == '' || userpassword == ''){
      alert("email or password is empty!!");
      return;
    }
    var xhttp = new XMLHttpRequest();
    var redirect_flag = 0;
    var url = "http://studytonight.web.illinois.edu/customers_verify/"+useremail+"/"+userpassword;
    console.log(url);
    xhttp.open("GET", url, false);
    xhttp.onload = function() {
        console.log("button clicked");
        console.log(this.readyState);
        if ( this.status == 200) {
            console.log("successfully clicked");
            // var url = 'main.html?name=' + encodeURIComponent(useremail);

            // alert("Login successfully");
            //console.log(this.responseText);
            //localStorage.setItem("storageName",useremail);
            console.log("datastore");
            // window.location.replace("http://localhost:8000/main.html"); // Redirecting to other page.
            redirect_flag = 1;
            console.log("redirect");


            // location.reload();

        }else{
            console.log("asdsadsads clicked");
            //loginErrorMsg.style.opacity = 1;
            alert(JSON.parse(this.responseText).message);
        }
    };
    console.log("aboou to send!");
    xhttp.send();
    console.log("about to return!");
    
    if(redirect_flag == 1){
      url = '/main.html?name=' + encodeURIComponent(useremail);
      console.log(url);
      try {window.location.replace("test");} catch(e) {alert("set test failed");}
      window.location = url;
    }
  }
