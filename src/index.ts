import express from "express"
import bodyParser from "body-parser"

const app = express()

//body parser middleware to parse request body
// this parses the json type
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}))

app.get("/", (req, res)=>{
    res.send("Hello world")
    
})

app.post("/users", (req, res)=>{
 console.log(req.body)
 res.status(200).send({msg:"Gotten"})
})

app.get("/users/:id", (req, res)=>{
    console.log(req.query)
    console.log(req.params)
})

app.listen(4000, ()=>{
    console.log("Listening on port 4000")
})

// import { db } from "@/db/db.js";
// import { users } from "@/db/schema.js";


// async function insert(){
//     try{
// await db.insert(users).values({
//     name: "FaithFul",
//     password: "asecret",
//     address: "Ogun state of nigeria",
//     email: "faithful@gmail.com",
//     phone: "0704562996"
// })
//     }catch(err){
//         console.log("Error: ",err)
//     }
// }

//   insert()

// async function select(){
//      const result = await db.select().from(users);
//      console.log(result)
// }

// //select()