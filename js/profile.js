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

function load_profile(){
    let id = document.cookie.match(/\d+/)[0]
    let data = fetchData("https://hackathonutm2022.github.io/hackathon/users.json");
    data.then(
        function(value){
            profile = value[id];
            document.getElementById("avatar").src = profile.avatar;
            document.getElementById("username").innerHTML = profile.name;
            document.getElementById("description_body").value = profile.description;
            document.getElementById("name").innerHTML = profile.name;
            document.getElementById("e_mail").innerHTML = profile.mail;
            document.getElementById("age").innerHTML = profile.age;
            document.getElementById("gender").innerHTML = profile.gender;
            if(profile.desc != undefined){
                if(profile.desc.length>0){
                //Generate each element, remove the "add another" button at the 3rd tag.
                }
            }
        },
        function(error){console.log(error)}
    );
}

function log_out(){
    if(document.cookie.length>0){
        document.cookie = "ID="+document.cookie.match(/\d+/)[0]+"; expires=01 Jan 1970 00:00:01 GMT";
    }
    window.open("../index.html","_self");
}

function enable_edit(){
    let textarea = document.getElementById("description_body");
    textarea.disabled = false;
    textarea.placeholder = "Write about yourself!"
    let edit_toggle = document.getElementById("description_edit");
    edit_toggle.classList.remove("btn-danger");
    edit_toggle.classList.add("btn-success");
    edit_toggle.innerHTML = "✔";
    edit_toggle.onclick = disable_edit;
}

function disable_edit(){
    let textarea = document.getElementById("description_body");
    textarea.disabled = true;
    textarea.placeholder = "It's quite empty around here...";
    let edit_toggle = document.getElementById("description_edit");
    edit_toggle.classList.remove("btn-success");
    edit_toggle.classList.add("btn-danger");
    edit_toggle.innerHTML = "✎";
    edit_toggle.onclick = enable_edit;
    //Need a way to change a specific entry
    //send_data(textarea.innerHTML);
}