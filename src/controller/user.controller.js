import userdata from "../modal/user.modal.js"
export default class usercontroller{
    main(req,res,next){
        res.render("home",{username:req.session.username,javascript:null,css:"<link href=\"./home.css\" rel=\"stylesheet\">"});
    }
    signin(req,res){
        //render the sign in page
        res.render("signin",{username:req.session.username,javascript:null,css:null,errormessage:null});
    }
    signinpost(req,res,next){
        let {name,email,password}=req.body;
        name=name.trim();
        email=email.trim();
        userdata.add(name,email,password);
        //redirect to login and if error is show them
        res.redirect("/login");
    }
    login(req,res){
        //reneder login 
        res.render("login",{username:req.session.username,errormessage:null,javascript:null,css:null});
    }
    loginpost(req,res){
        //check data and req.session.username
        const {email,password}=req.body;
        const n=userdata.searchAccount(email,password);
        if(n){
            req.session.username=n;
            res.redirect("/");
        }
        else{
            res.render("login",{username:req.session.username,errormessage:"invalid credatioals",javascript:null,css:null});
        }
    }
    singout(req,res){
        req.session.destroy((err)=>{
            if(err){console.log(err);}
            else{res.redirect("/");}
        })
    }
}