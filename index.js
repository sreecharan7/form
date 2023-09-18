import express from "express";
import ejsLayot from "express-ejs-layouts";
import path from "path";
import userc from "./src/controller/user.controller.js";
import fromc from "./src/controller/form.controller.js"
import session from'express-session';
import { authLogin } from "./src/middleware/auth.middleware.js";
import mail from"./src/middleware/emailSender.middleware.js"
import bodyParser from "body-parser"
import userchecker from "./src/middleware/userCheckerRepeted.middleware.js";
import questioncheckDetails from"./src/middleware/detailsQuestionCheck.middleware.js";
const app=express();
app.use(ejsLayot);
app.set('view engine','ejs');
app.set('views',path.resolve("src","views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public/main"))
app.use("/form/new",express.static("public/cssAndJavascript/addForm"));
app.use("/form/edit/:id",express.static("public/cssAndJavascript/addForm"));
app.use("/form/edit/:id",express.static("public/main"));
app.use("/form/:id",express.static("public/main"));
app.use("/form/:id",express.static("public/cssAndJavascript/formView"));
app.use("/form/data/:id",express.static("public/main"));
app.use("/form/data/:id",express.static("public/cssAndJavascript/formData"));

app.use(session({
    secret:"sercet email",
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false}
}))
app.use(express.urlencoded({extended:true}))

const usercontroller= new userc();
const formscontroller=new fromc();

app.get("/",usercontroller.main);
app.get("/signin",usercontroller.signin);
app.get("/login",usercontroller.login);
app.get("/signout",usercontroller.singout);

app.post("/signin",userchecker,usercontroller.signinpost);
app.post("/login",usercontroller.loginpost);


app.get("/form",authLogin,formscontroller.formMain);
app.get("/form/new",authLogin,formscontroller.formnew);
app.get("/form/:id",formscontroller.formId);
app.get("/form/edit/:id",authLogin,formscontroller.formedit);
app.get("/form/data/:id",authLogin,formscontroller.formDataVisulaztion);

app.post("/form/new/data",authLogin,questioncheckDetails,formscontroller.formQuestionData);
app.post("/form/edit/data",authLogin,questioncheckDetails,formscontroller.formeditData);
app.post("/form/data/question",formscontroller.formDataQusetionGet);
app.post("/form/data/:id",authLogin,formscontroller.formData);
app.post("/form/submit/data",formscontroller.formAnswerDataAdd,mail);
app.post("/form/data/delete/answers",authLogin,formscontroller.formDataAnswerdelete);
app.post("/form/data/delete/formtotal",authLogin,formscontroller.formDelete);

app.listen(5000);
console.log("server has started at 5000");