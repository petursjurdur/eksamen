document.addEventListener("DOMContentLoaded", function() {
    
    let itemForm =document.getElementById("updateProduct")

    itemForm.addEventListener("click",() => {


        let title = document.getElementById('existingtitle').value;
        let category = document.getElementById('newcategory').value;
        let price = document.getElementById('newprice').value;

        let opdateretVare = {
            title: title,
            category: category,
            price: price
        }

        //Fetch med PUT metoden
        fetch('http://localhost:3000/updateitems', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(opdateretVare)

        }).then(response => response.json())
        .then(data => {
            console.log(data)
            alert("Success" + data.msg)
        })
        .catch((error) => {
            console.log('Error:', error)
        })

    })
});
