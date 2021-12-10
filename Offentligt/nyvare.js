let form = document.getElementById('submitForm');
form.addEventListener('submit', async(e)=>{
    e.preventDefault();
    const formData = new FormData(form);
    //Bruger await fetch fordi det er en async function
    await fetch('http://localhost:3000/item',{
        method:'POST',
        body: formData
    });
});


let refresh = document.getElementById("ref");
let list = document.getElementById("list");
//Laver en liste
refresh.addEventListener("click", async()=>{
    list.innerHTML =`
    <tr>
    <th>Title</th> 
    <th>Price</th>
    <th>Category</th>
    <th>Image</th>
    </tr>
    `;
    //Awat fetch igen fordi det er en async function
await fetch('http://localhost:3000/items',{
    method: "GET"
})
.then((res)=>res.json())
.then((res)=>{
    console.log(res);
//Igen en liste, men med ${e. } i stedet
    res.forEach((e) => {
        list.innerHTML += `
        <tr>
        <td>${e.title}</td>
        <td>${e.price}</td>
        <td>${e.category}</td>
        <td><img src ="${e.thumbnail}" style="height:50px;width:50px;"></td>     
        </tr>
        `;
    });
})
});
//Det er inspireret af Edrises video om hvordan man uploader billeder i en express server. 
    