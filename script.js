async function getUsers() {
    let url = 'https://hackathonutm2022.github.io/hackathon/users.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderUsers() {
    let users = await getUsers();
    let html = '';
    users.forEach(user => {
        //condition 
            location.href = ' '//url of the profile page
        
        
    });

}

$("#search_button").on("click",function() {
    renderUsers();
})

