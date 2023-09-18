
const questioncheckDetails=(req,res,next)=>{

    var data=req.body;
    var error=false;
    try{
    if(!data.descripton&&data.description.trim()==""){error=true;}
    else if(!data.name&&data.name.trim()==""){error=true;}
    else if(!data.q||typeof(data.q)!="object"){error=true}
    else{var q=data.q;
        if(q.length>0){
            for(let i=0;i<q.length;i++){
                if(!q[i].question||q[i].question.trim()==""){error=true;break;}
                else if(!q[i].type||q[i].type.trim()==""){error=true;break;}
                else if(!(q[i].type=="single"||q[i].type=="multiple")){error=true;break;}
                else if(q[i]["options"].length==0){error=true;break;}
                for(let j=0;j<q[i]["options"].length;j++){
                    if(!q[i]["options"][j]&&q[i]["options"][j].trim()==""){error=true;break;}
                }
                if(error){break;}
            }
        }
        else{error=true;}
    }
    }
    catch(error1){
        error=true;
    }
    if(error){res.json({key:null,error:"error happned while adding"});}
    else{next();}
}

export default questioncheckDetails;