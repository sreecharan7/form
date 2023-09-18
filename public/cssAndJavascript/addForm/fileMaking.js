
var current=1;
var alertColor="rgb(241, 128, 126)";
var noerror=true;
var nameofForm="";
var desc="";
$("#add").click(()=>{
    var b=$('<div class="card  border-light m-3 background-card" style="width: 18rem;" id="'+(++current)+'-question"><div class="card-body"><div class="close-button-div"><h5 class="card-title">Question box</h5><button type="button" class="btn-close" aria-label="Close" onclick="questionboxremover('+current+')"></button></div><p class="card-text">enter the question</p><input type="text" class="form-control  border-warning input-background" id="question" required ><input type="checkbox" class="form-check-input  border-warning" id="checkbox" required><label class="form-check-label" for="exampleCheck1">If multiple options present</label></div><div class="card-body"><p class="card-text">enter the Options:-</p><input type="text" class="form-control my-1  border-warning options" required><input type="text" class="form-control  border-warning options" required></div><div class="card-body"><button type="button" class="btn btn-outline-success mx-1" onclick="optionadd('+current+')">Add option</button><button type="button" class="btn btn-outline-danger" onclick="optionremove('+current+')">Remove option</button></div></div>');
    $("#question-container").append(b);
})

function alertmessage(mesg){
    window.alert(mesg);
}

function optionadd(n){
    className=n+"-question"
    var a=document.getElementById(className).children;
    $(a[1]).append(' <input type="text" class="form-control  border-warning my-1 options" required>');
    // console.log(a[1]);
}
function optionremove(n){
    className=n+"-question"
    var a=document.getElementById(className).children;
    a=a[1].querySelectorAll(".form-control");
    if(a.length>1){
        a=a[a.length-1].remove();
    }
    else{
        window.alert("atleast one option should present so cannot delete the option");
    }
}
function questionboxremover(n){
    className=n+"-question"
    var a=document.getElementById(className)
    a.remove();
}
function alertQuestionBox(c,messg){
    $(c).css("background-color",alertColor);
    alertmessage(messg);
    noerror=false;
}
function dataCollector(){
    var c=document.querySelectorAll("#question-container .card");
    const n=c.length;
    let data={};
    q="q";
    data[q]=[];
    for(let i=0;i<n;i++){
        let que=c[i].querySelector("#question").value;
        que=que.trim();
        if(que==""){alertQuestionBox(c[i],"the question input should not be empty");break;}
        data[q].push({"id":i+1});
        data[q][i]["question"]=c[i].querySelector("#question").value;
        data[q][i]["options"]=[];
        const temp=c[i].querySelectorAll(".options");
        let optionnotpresent=true;
        for(let j=0;j<temp.length;j++){
            if(temp[j].value.trim()!=""){data[q][i]["options"].push(temp[j].value.trim()); optionnotpresent=false;}
        }
        if(optionnotpresent){
            alertQuestionBox(c[i],"the options input atleat one should be filled");break;
        }
        if(c[i].querySelector("#checkbox").checked){
            data[q][i]["type"]="multiple";
        }
        else{
            data[q][i]["type"]="single"
        }
        if($(c[i]).css("background-color")==alertColor){$(c[i]).css("background-color","");}
    }
    return data;
}

function submit(){
   data=dataCollector()
   if(noerror){
    data["name"]=nameofForm;
    data["description"]=desc;
    fetch("/form/new/data", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => response.json())
      .then(data => {
        if(data.error){
            errorshower(data.error)
        }
        else{
            linkshower("http://localhost:5000\\form\\"+data.key);
        }
      })
   }
   else{
    noerror=true;
   }
}

let chekDataOfForm=()=>{
    nameofForm=$("#nameOfForm").val().trim();
    desc=$("#About-form").val().trim();

   if(nameofForm==""||desc==""){
       var add='<div class="alert alert-danger" role="alert">Invalid credials</div>';
       $(".alert-name-showing").html(add);
   }
   else{
       $('#modal-1').modal('hide');
   }
}
$('#save-form-data').on('click', chekDataOfForm);


$(document).ready(function () {
       $('#modal-1').modal('show');
});




function linkshower(link){
    const body=$("#modal-1 .modal-body");
    const footer=$("#modal-1 .modal-footer");
    $("#staticBackdropLabel").html("subimted form sucessfully")
    footer.html('<a href="/form"><button type="button" class="btn btn-primary" id="move-to-form">form</button></a><a href="/"><button type="button" class="btn btn-primary" id="move-to-home">home</button></a>');
    body.html(' <div class="copy-box" id="copyBox" data-link="https://example.com">'+link+'</div>');
    footer.css({"display":"flex","justify-content":"space-around"});
    body.css({"display":"flex","justify-content":"space-around","flex-direction":"column","align-items":"center"});
    body.append('<ul><li class="para-modal-link">you can now copy the link can fill the form </li></ul>')
    clicktocopy();
    $('#modal-1').modal('show');
}

function errorshower(err){
    const body=$("#modal-1 .modal-body");
    const footer=$("#modal-1 .modal-footer");
    $("#staticBackdropLabel").html("error happend")
    footer.html('<a href="/form"><button type="button" class="btn btn-primary" id="move-to-form">form</button></a><a href="/"><button type="button" class="btn btn-primary" id="move-to-home">home</button></a>');
    footer.css({"display":"flex","justify-content":"space-around"});
    body.html('<ul><li class="para-modal-link">please check the form and resubmit the form</li><li class="para-modal-link">'+err+'</li></ul>')
    $('#modal-1').modal('show');
}

function clicktocopy(){
const copyBox = document.getElementById('copyBox');

    copyBox.addEventListener('click', function () {
      const linkToCopy = this.getAttribute('data-link');
      const tempInput = document.createElement('input');
      tempInput.value = linkToCopy;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
    });

}


//some css
let width = screen.width;
if(width<=650){
    var a=$("#add");
    var b=$("#submit")
    a.text("+");
    b.text("s");
    a.css({"border-radius":"50%","width":"40px","height":"40px","text-align":"center"});
    b.css({"border-radius":"50%","width":"40px","height":"40px","text-align":"center"});
}