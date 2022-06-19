async function fetchData(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

//Basic hashing algorithm akin to SHA-1, to be improved later on
function stringToHash(string) {                 
    var hash = 0;
    if (string.length == 0) return hash;
    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash;
}
//If you logged in previously with the "Remember Me" option on, you should skip login altogether.
function check_for_cookies(){
    if(document.cookie.length>0){
        window.open("html/dashboard.html","_self");
        
    }
    check_login();
}

function check_login(){
    let data = fetchData("https://hackathonutm2022.github.io/hackathon/users.json");
    data.then(
        function(value){
            let err = document.getElementById("error_msg");
            let mail = document.getElementById("inputEmail").value;
            let pass = document.getElementById("inputPassword").value;
            let unique = true;
            let no_pass = false;
            value.forEach(element => {
                if(element.email == mail){
                    if(element.pass == stringToHash(pass)){
                        if(!document.getElementById("remember").checked){
                            document.cookie = "ID="+element.id;
                        }else{
                            //If login is passed, set a cookie to remember which user we're dealing with
                            //Setting expiriy date far off into the future
                            const d = new Date();
                            d.setTime(d.getTime() + (10000*24*60*60*1000));
                            console.log(d);
                            document.cookie = "ID="+element.id+"; expires = "+ d.toUTCString()+"; path=/"
                        }
                    }else{
                        no_pass = true;
                    }
                    unique = false;
                }
            });
            if(unique != false){
                err.innerHTML = "You haven't signed up yet!";
            }else if(no_pass == true){
                err.innerHTML = "Wrong password!";
            }else{
                window.open("html/dashboard.html","_self");
            }
        },
        function(error){console.log(error)}
    );
}