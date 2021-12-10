document.addEventListener("DOMContentLoaded",function(){
    let logout = document.getElementById('logout')
    logout.addEventListener("click",()=>{
        localStorage.removeItem("user");
        location.href = "/logind.html"
    })
});

let deleteProduct = document.getElementById('deleteproduct')
deleteProduct.addEventListener("click", (e) => {
    e.preventDefault();

        let title = document.getElementById('title').value;
   
        fetch("http://localhost:3000/items/" + title, {
            method: "DELETE",
            headers: {
                "Content-Type": "application.json",
            },
        })
            .then(response => response.json())
                .then(data=>{ 
                console.log(data)
                    alert("Success"+data.msg)
                }).catch((err)=>{
                    console.log('Error:', err)
                })

            })