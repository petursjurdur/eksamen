

document.addEventListener("DOMContentLoaded", function() {
    
    let brugerForm =document.getElementById("changePasswordSubmit")

    brugerForm.addEventListener("click", (e) => {
e.preventDefault();

        let username = document.getElementById('username').value;

        let password = document.getElementById('newpassword').value;

        let opdaterBruger = {
            username: username,
            password: password
        }

        //Fetch med PUT metoden
        fetch('http://localhost:3000/brugerarray/', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(opdaterBruger)

        }).then(response => response.json())
        .then(data => {
            console.log(data)
            alert("Success" + data.msg)
        })
        .catch((error) => {
            console.log('Error:', error)
        })



    })
})
