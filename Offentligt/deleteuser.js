
      let deleteUser = document.getElementById('delete')
      deleteUser.addEventListener("click", (e) => {
          e.preventDefault();

              let username = document.getElementById('username').value;
         //Fetch med Delete
              fetch("http://localhost:3000/brugerarray/" + username, {
                  method: "DELETE",
                  headers: {
                      "Content-Type": "application.json",
                  },
              })
                  .then(response => response.json())
                      .then(data=>{ 
                      console.log(data)
                          alert("Success"+data.msg)
                        res.redirect("/logind.html")
                      }).catch((err)=>{
                          console.log('Error:', err)
                      })

                  })
  
  