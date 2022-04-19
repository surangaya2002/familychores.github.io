$(document).ready(function () { });

// function on login.html page 
function navigateLogin() {
  var username = document.getElementById("floatingInput").value;
  var password = document.getElementById("floatingPassword").value;

  if (username == "parent" && password == "parent") {
    window.location.href = "parentview.html";
  } else if (username == "child" && password == "child") {
    window.location.href = "childview.html";
  }
}
