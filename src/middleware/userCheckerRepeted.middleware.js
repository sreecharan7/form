import userdata from "../modal/user.modal.js"

const userchecker=(req,res,next)=>{
    let {name,email,password}=req.body;
    name=name.trim();
    email=email.trim();
    if(userdata.searchEmailAndUserName(email,name)||(!(isValidEmail(email)))){
        res.render("signin",{username:req.session.username,javascript:null,css:null,errormessage:"the username/email is already taken"});
    }
    else{
        next();
    }
    
      
}
export default userchecker;

function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }