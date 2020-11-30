const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const {studentModel} = require("./models/information");
const bcrypt = require("bcryptjs");


// express application
const app = new express();


//Variables

const PORT = process.env.PORT || 8000;
const htmlFilePath = path.join(__filename,"../templates/views");
const partialPathFile = path.join(__filename,"../templates/partials");
console.log(htmlFilePath);


// REgistering
app.set("view engine", "hbs");
app.set("views",htmlFilePath);
hbs.registerPartials(partialPathFile);

// We can also use body-parser instead of express.json()
app.use(express.json());
app.use(express.urlencoded({extended:false}));




app.get("/", (req,res) => {
    res.render("index");
});

app.post("/register",async(req,res) => {
   try {
       let studentInfo = new studentModel({
           name : req.body.name,
           email : req.body.email,
           phoneNumber : req.body.phoneNumber,
           password : req.body.password
       });

       const result = await studentInfo.save();
       console.log(result);
       res.status(200).end("Signed in Successully");
   } catch (error) {
       console.log(`Error is ${error}`);
       res.status(404).send("error");
   }
});

app.get("/login",(req,res) => {
    res.render("login");
})

app.post("/login" , async(req,res) => {
    try {
        
        const studentInfo = await studentModel.findOne({
            email : req.body.email
        });
        console.log(studentInfo);
        if(studentInfo == null) res.status(401).send("Email and passowrd are inCorrect");
        // if(studentInfo.password === req.body.password) res.status(201).send("Loged in");
        // else res.status(404).send("Email and password are incorrect");
        const isMatch = await bcrypt.compare(req.body.password , studentInfo.password);
        if(isMatch) res.status(200).render("home");
        else res.status(404).render("login");



    } catch (error) {
        console.log(`Error in getting infor : ${error}`);
    }
})


app.listen(PORT,()=> {
    console.log(`Listening on the port Number ${PORT}`);
});
