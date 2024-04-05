require("dotenv").config({});
const express = require("express");
const mongoose = require("mongoose");
const validator = require("email-validator")

const app = express();

app.use(express.json())

const dbConnect = async () => {
  try {
    const joined = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database Connected to ${joined.connection.host}`);

    app.listen(8000, () => {
      console.log(`App is running on http://localhost:8000`);
    });
  } catch (error) {
    console.error("Error connecting db", error.message);
    process.exit(1)
  }
};

dbConnect();

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [2, "Min length should be of 2 characters"],
      maxLength: [25, "Min length should be of 2 characters"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model("User", userSchema);

// Writing the API to get the user detail from frontend and save it to DB

app.post("/signUp", async (req,res)=>{
    const {name, email, password} = req.body

    try{        
        if(!name || !email || !password){
            throw new Error("All fields are required !")
        }

        const validEmail = validator.validate(email)

        if(!validEmail){
            throw new Error("Email is not valid !")
        }

        const user = await User.create({
            name,
            email, 
            password 
        })

        await user.save()

        res.status(200).json({
            message: "Kaam ho Gya",
            success: true,
            data: user
        })
    }catch(error){
        res.status(400).json({
            message: error.message,
            success: false
        })
    }
})


app.post("/logIn", async (req,res)=>{
 const {email, password} = req.body 
//  email = null
try {
    // check if email is empty 
    if ( !email ) {
        throw new Error("Please enter email")
    }

    // check if password is empty
    if (!password) {
        throw new Error("Please enter password")
    }
    const isValid = validator.validate(email)
    if (!isValid) {
        throw new Error("invalid email format") 
    }

  const userFromDb = await User.findOne({email})
 
   if ( !(password === userFromDb.password) ){
        throw new Error("Invalid Password")
   }

   res.status(200).json({
    message: "HO gya login",
    success: true,
    data: userFromDb
   })

} catch (error) { 
    res.status(400)
    .json({
        message: error.message,
        success: false
    })
}
})


/******************************************************************************/

// app.get('/', (req, res)=>{
//     res.setHeader('content-type', 'text/plain');
//     res.status(200).json({
//         "Home Page": "This is Home Page",
//         message: "Kaam ho gya ",
//         success: true
//     })
// })

// app.get("/about", ( _ ,res)=>{
//     res.send('<h2 style="color:red; background-color:blue; display:inline; margin-left:40%; border-radius: 5px" >this is about page</h2>')
// })

// app.get("/contact", (req,res)=>{
//     res.send('<h2 style="color:red; background-color:blue; display:inline; margin-left:40%; border-radius: 5px" >this is contact page</h2>')
// })
