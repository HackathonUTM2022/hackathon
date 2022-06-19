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

//Need to somehow check if this function works
async function sendData(url, data) {
    try{
        let xhr = new XMLHttpRequest();
        xhr.open("POST",url);
        xhr.setRequestHeader("Accept","application/json")
        xhr.onload = () => console.log(xhr.responseText);
        xhr.send(data);
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

function start_login(){
    let pass = document.getElementById("inputPassword").value;
    let err = document.getElementById("error_msg");
    if(pass.length<6){
        err.innerHTML = "Password is less than 6 characters!";
    }else if(pass != document.getElementById("inputPassConfirm").value){
        err.innerHTML = "Confirmation does not match password!";
    }else if(document.getElementById("male_gender").checked == document.getElementById("female_gender").checked){
        err.innerHTML = "Choose a gender!";
    }else{
        validate_login()
    }
}

async function validate_login(){
    let username = document.getElementById("inputUsername").value;
    let data = fetchData("https://hackathonutm2022.github.io/hackathon/users.json");
    data.then(
        function(value){
            let len = value.length;
            let unique = true;
            value.forEach(element => {
                if(element.name == username){
                    unique = false;
                }
            });
            if(unique != false){
                new_entry = {}
                new_entry.id = len+1;
                new_entry.name = document.getElementById("inputName").value;
                new_entry.username = username;
                new_entry.mail = document.getElementById("inputEmail").value;
                new_entry.pass = stringToHash(document.getElementById("inputPassword").value);
                document.getElementById("male_gender").checked ? new_entry.gender = "male" : "female" ;
                new_entry.avatar = "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/"+new_entry.id+".jpg"
                //geographical position is not included if user does not allow it to be so
                coords = navigator.geolocation.getCurrentPosition(function(position){
                    new_entry.latitude = position.coords.latitude;
                    new_entry.longitude = position.coords.longitude;
                new_entry.desc = "";
                new_entry.prefs = "";
                },
                function(error) {
                  console.log("Location permission denied");
                });
                data = JSON.stringify(new_entry);
                sendData("https://hackathonutm2022.github.io/hackathon/users.json",data);
            }
        },
        function(error){err.innerHTML = "Server Error, try again!"; console.log(error)}
    );
}