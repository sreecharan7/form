import formQue from "../modal/formuserque.modal.js"
import formView from "../modal/formview.modal.js"
export default class formscontroller{
    formMain(req,res,next){
        res.render("formMain",{username:req.session.username,javascript:'<script type="text/javascript" src="./formMain.js"></script><script type="text/javascript" src="./jquery-3.7.0.min.js"></script>',css:null});
    }
    formnew(req,res,next){
        res.render("formCreate",{username:req.session.username,javascript:' <script type="text/javascript" src="./jquery-3.7.0.min.js"></script><script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script><script type="text/javascript" src="./fileMaking.js"></script>',css:"<link href=\"./fileMaking.css\" rel=\"stylesheet\">"});
    }
    formId(req,res,next){
        const type=req.params.id;
       if(type=="thankyou"){
        res.render("thankyou",{username:req.session.username,javascript:null,css:null});return;
       }
        var que=formView.getQuestion(type);
        if(que){
            res.render("formView",{username:req.session.username,javascript:' <script type="text/javascript" src="./jquery-3.7.0.min.js"></script><script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script><script type="text/javascript" src="./formView.js"></script>',css:"<link href=\"./formView.css\" rel=\"stylesheet\">"});
        }
        else{
            res.render("404error",{username:req.session.username,javascript:null,css:null});
        }
        
    }
    formQuestionData(req,res,next){
        var data=req.body;
        var key=formQue.addForm(data,req.session.username)
        res.json({key:key,error:null});
    }
    formDataQusetionGet(req,res){
        var {key}=req.body;
        var que=formView.getQuestion(key);
        res.json({dataQuestion:que});
    }
    formData(req,res,next){
        const type=req.params.id;
        if(type=="recent"){
            var datar=formQue.GetDataincompresed(req.session.username);
            res.json({dataRecent:datar});
        }
        else if(type=="answers"){
            var {key}=req.body;
            if(!formView.checkKey(key)&&formQue.checkKeyInUser(key,req.session.username)){
                res.json({answer:formView.getAnswers(key),error:null});
            }
            else{
                res.json({error:"adress are wrong",answer:null});
            }

        }
    }
    formedit(req,res,next){
        var key=req.params.id;
        if(!formView.checkKey(key)&&formQue.checkKeyInUser(key,req.session.username)){
            res.render("formCreate",{username:req.session.username,javascript:' <script type="text/javascript" src="./jquery-3.7.0.min.js"></script><script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script><script type="text/javascript" src="./fileEdit.js"></script>',css:"<link href=\"./fileMaking.css\" rel=\"stylesheet\">"});
        }
        else{
            res.render("404error",{username:req.session.username,javascript:null,css:null});
        }
    }
    formeditData(req,res,next){
        var data=req.body;
        var key=data["key"];
        delete data["key"];
        formView.addFormQue(data,key);
        res.json({sucess:"sucess",error:null});
    }
    formAnswerDataAdd(req,res,next){
        var {answers,email,name,key}=req.body;
        formView.addDataAnswers(key,answers);
        res.json({thankyou:"thankyou",error:null});
        next();
    }
    formDataVisulaztion(req,res,next){
        const type=req.params.id;
        var da=formView.getQuestion(type);
        if(da){
        res.render("formData",{username:req.session.username,javascript:'<script type="text/javascript" src="./formData.js"></script><script type="text/javascript" src="./jquery-3.7.0.min.js"></script>',css:"<link href=\"./formData.css\" rel=\"stylesheet\">"})
        }
        else{
            res.render("404error",{username:req.session.username,javascript:null,css:null});
        }
    }
    formDataAnswerdelete(req,res,next){
        var {key}=req.body;
        if(!formView.checkKey(key)&&formQue.checkKeyInUser(key,req.session.username)){
            formView.deleteAnswer(key);
            res.json({success:"sucessfully deleted",error:null})
        }
        else{
            res.json({error:"unable to delete",success:null});
        }
    }
    formDelete(req,res,next){
        var {key}=req.body;
        if(!formView.checkKey(key)&&formQue.checkKeyInUser(key,req.session.username)){
            formQue.removeForm(key,req.session.username);
            formView.deleteQuestion(key);
            formView.deleteAnswer(key);
            res.json({success:"sucessfully deleted",error:null})
        }
        else{
            res.json({error:"unable to delete",success:null});
        }
    }
}