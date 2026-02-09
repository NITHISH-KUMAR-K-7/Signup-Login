import Users from "../model/usermodel.js";
import bcrypt from 'bcrypt'

export const signup = async (req,res)=>{
    try{
        const {username,email,password} = req.body

        //check Require field
        if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

        // check pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      // email validate
        if (!emailPattern.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

        //password validate
        if (!passwordPattern.test(password)) {
        return res.status(400).json({
        message:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
      });
    }

        //check user exists
        const existsuser = await Users.findOne({email})

        if(existsuser){
            return res.status(400).json({message:"User already exists"})
        }

        //hash password
        const hashedpassword = await bcrypt.hash(password,10)

        //create user 
        const user = await Users.create({username,email,password:hashedpassword})
        res.status(201).json({message:"User created succesully",user})

    }catch(error){
        res.status(500).json({message:error.message})
    }
}


    export const login = async (req,res)=>{
        try{   
            const {email,password} = req.body

            const user = await Users.findOne({email})

            if(!user){
                res.status(400).json({message:"Invalid email"})
            }

            const isMatch = await bcrypt.compare(password,user.password)

            if(!isMatch){
                return res.status(400).json({message:"Invalid Password"})
            }

            res.json({
                message:"Login Sucess",user
            })
        }catch(error){
            res.status(500).json({message:error.message})
        }

    } 

    