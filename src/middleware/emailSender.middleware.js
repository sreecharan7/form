import email from "nodemailer"

const mail=async function mailer(req,res,next){
    var emaila=req.body.email;
    var name=req.body.name
    var data=req.body;
    var key=data["key"];
    if(emaila==""){return;}
    const transpoter=email.createTransport({
        service:"Gmail",
        auth:{
            user:"sreecharan245@gmail.com",
            pass:"ftebwqlxidmsjkpq"
        }
    })
    const message={
        from:"sreecharan245@gmail.com",
        to: emaila,
        subject:"form submission",
        text:"thank you for the submition of the "+key+" form \n"+name+" hope tou are doing well \nthank you"
    };
    transpoter.sendMail(message,(error,info)=>{
        if(error){
            console.log("error happened while sending ,mail");
        }
        else{
            // console.log("email sent",info.response);
        }
    })
}

export default mail;