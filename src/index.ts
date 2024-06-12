import express from "express";
import bodyParser from "body-parser";
import userRoutes from "@/routes/users.js";
import session from "express-session";
import "dotenv/config";
import "@/strategies/local-strategy.js";
import passport, { Passport } from "passport";
import cors from "cors";

import productRouter from "./routes/admin/products.js";
import orderRoutes from "./routes/admin/orders.js";

const app = express();

//body parser middleware to parse request body
// this parses the json type

console.log(process.env.COOKIE_SECRET as string);
const sessionMiddleware = session({
  secret: process.env.COOKIE_SECRET as string,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
  },
});
const corsOptions = {
  origin: "http://localhost:5173", //(https://your-client-app.com)
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

// ......................Routes registration...................................
app.use("/api", userRoutes);
app.use("/api/admin", productRouter);
app.use("/api/admin", orderRoutes);

// app.post("/api/auth/login", (req, res, next) => {
//   passport.authenticate(
//     "local",
//     (
//       err: any,
//       user: Express.User | false | null,
//       info: object | string | Array<string | undefined>
//     ) => {
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         return res.status(401).send(info);
//       }
//       console.log("info: ", info);
//       req.user = user;
//       req.login(user, (err) => {
//         // ! important
//         if (err) {
//           return res.status(500).json({ error: "Login failed." });
//         }
//         res.status(200).send();
//       });
//     }
//   )(req, res, next);
// });

app.post("/api/auth/login", passport.authenticate("local"), (req, res) => {
  // req.session.visited = true;
  console.log(req.session);
  //console.log(req.sessionID);
  res.send("login page");
});

app.get("/api/auth/status", (request, response) => {
  console.log("User ID: ", request.user);
  response.send("hello world");
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});

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
