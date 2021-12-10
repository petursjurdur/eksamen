const express = require('express');
const formData = require('express-form-data');
const app = express();
const cors = require('cors');
const fs = require("fs");
const Parse = require('parse/node');


//Jeg require mine routes 
const routes = require("./index")


app.use('/', express.static("./front"));
app.use('/', express.static("./public"));
app.use('/',express.static("./Offentligt"));
app.use("/", routes);
app.use(cors());
app.use(express.json())

app.get('/hjem', (req, res) => {
    res.send('Hello World')
});




//Opret bruger
app.post("/newuser", (req, res) => {

    let userArray = JSON.parse(fs.readFileSync('db/brugere.json'))

    userArray.push(req.body)

    fs.writeFile('db/brugere.json', JSON.stringify(userArray, null, 4), err => {
        if(err) res.send(err)
        res.send({
            msg: "Success"
        })
    })
    
});

// Opdatere bruger

app.put("/brugerarray", (req, res) => {

    let userArray = JSON.parse(fs.readFileSync('db/brugere.json'))

    for(let i = 0; i < userArray.length; i++) {
        
        if(userArray[i].username == req.body.username) {

           userArray[i].password = req.body.password

            fs.writeFile('db/brugere.json', JSON.stringify(userArray, null, 4), err => {
                if(err) res.send(err)

                res.status(200).json({
                    msg: "Success"
            })
                    
                })
            
        }
    
    }
})

//Logind 
app.post("/login", (req, res) => {

   var existingUser = JSON.parse(fs.readFileSync('db/brugere.json'));

    for(let i = 0; i < existingUser.length; i++) {

        if(existingUser[i].username == req.body.username) {
            if(existingUser[i].password == req.body.password) {

                res.status(200).send(true);
            } else {
                res.status(400).send(false);
            }
        }
    }
});

//Slet bruger
app.delete("/brugerarray/:username", (req, res) => {
    let userArray = JSON.parse(fs.readFileSync('db/brugere.json'))
    for (let i = 0; i < userArray.length; i++){
        if(userArray[i].username==req.params.username){
            userArray.splice(i,1)
            fs.writeFile('db/brugere.json',JSON.stringify(userArray,null,4), err=>{
                if (err) res.send(err)
                res.status(200).json({
                    msg:'success'
                })
            })
      }  }
    })

   
//Opret vare
app.use('/uploads',  express.static('uploads'))

const options ={
    uploadDir: "./uploads"
}

const products =[];

app.post('/item',formData.parse(options),(req, res, next)=>{
    let{title, price, category} = req.body;
    let thumbnail = req.files.thumbnail.path.replace('\\', '/');

    products.push({title, price, category, thumbnail});
    fs.writeFile('db/varer.json', JSON.stringify(products, null, 4),
    err=>{
        if(err) res.send(err)
    });
    
    
    });

app.get('/items',(req,res)=>{
    res.json(products);
});

//Opdater vare

app.put("/updateitems", (req, res) => {

    let productArray = JSON.parse(fs.readFileSync('db/varer.json'))

    for(let i = 0; i < productArray.length; i++) {
        
        if(productArray[i].title == req.body.title) {
            productArray[i].price = req.body.price,
            productArray[i].category = req.body.category

            fs.writeFile('db/varer.json', JSON.stringify(productArray, null, 4), err => {
                if(err) res.send(err)

                res.status(200).json({
                    msg: "Success"
                })
            })
        }
    
    }
    
});

//Slet vare

app.delete("/items/:title", (req, res) => {
    let productArray = JSON.parse(fs.readFileSync('db/varer.json'))

    for(let i = 0; i < productArray.length; i++) {
        
        if(productArray[i].title == req.params.title) {

            productArray.splice(i, 1)

            fs.writeFile('db/varer.json', JSON.stringify(productArray, null, 4), err => {
                if(err) res.send(err)

                res.status(200).json({
                    msg: "Success"
                })
            })
        }
    
    }
})


//Starter serveren
app.listen(3000, () => {});