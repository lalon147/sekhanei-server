const jwt=require("jsonwebtoken");
const {usersCollection}=require("./database")

const verifyJwt=(req,res,next)=>{
    const auth=req.headers.authorization;console.log(req.headers)
    if(!auth){
      return res.status(401).send({message:"Forbidden"})
    }
    const token =auth.split(" ")[1];
    jwt.verify(token,process.env.ACCESS_TOKEN,function(err,decoded){
       if(err){
          return res.status(403).send({message:"Forbidden"})
       }
       req.decoded=decoded
       next();
    })
   
    
  }

const verifyAdmin=async(req,res,next)=>{
    const user= await usersCollection.findOne({email:req.decoded.email})
    if(!user.role==="admin"){
      return  res.status(403).send({message:"YOU ARE NOT ADMIN"})
    }
    next();

}

module.exports={
    verifyJwt,verifyAdmin
  }