function checkPass()
{
    var password = document.getElementById('password');
    var repassword = document.getElementById('repassword');
    var message = document.getElementById('error-nwl');
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
 	
    if(password.value.length > 5)
    {
        password.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "character number ok!"
    }
    else
    {
        password.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = " you have to enter at least 6 digits!"
        return;
    }
  
    if(password.value == repassword.value)
    {
        repassword.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "ok!"
    }
	else
    {
        repassword.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = " passwords don't match"
    }
}  

function Validate() {
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("repassword").value;
    if (password.length < 6){
        return false;
    }
    if (password != confirmPassword) {
        return false;
    }
    return true;
}