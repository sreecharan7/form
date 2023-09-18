// var data={"q":[{"id":1,"question":"the tallest animal?","options":["girafee","elephant","tiger"],"type":"single"},{"id":2,"question":"the mamals ?","options":["human","dog","wahle","dolphin"],"type":"multiple"}],"name":"animal control","description":"the name of the animals"};
var noerror=true;
var alertColor="rgb(241, 128, 126)";


// feching the link adress
function extractDataFromURL(url) {
    const parts = url.split('/');
    const data = parts.filter(part => part !== "");
    return data;
}

let currentUrl = window.location.href;
currentUrl=extractDataFromURL(currentUrl);
var key={key:currentUrl[3]};


fetch("/form/data/question", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(key)
  }).then(response => response.json())
  .then(data => {
    // console.log(data.dataQuestion);
    datakpper(data.dataQuestion);
  })





function datakpper(data){
	$("#form-description").html(data["name"]);
	$('#form-name').html(data["description"]);
	const n=data["q"].length;
	var container=$('.QuestionContainer');
	for(let i=0;i<n;i++){
		let a='<div class="card question" id="question-'+(i+1)+'" ><div class="card-body"> <h5 class="card-title">Question-'+(i+1)+'<span style="color:red"> *</span></h5>  <p class="card-text">'+data["q"][i]["question"]+'</p></div><div class="card-body">';
		for(let j=0;j<data["q"][i]["options"].length;j++){
			if(data["q"][i]["type"]=="single"){
			 a=a+'<div class="form-check"><input class="form-check-input border-secondary options" type="radio" value="" id="'+i+''+j+'" name="radioGroup'+i+'"><label class="form-check-label" for="'+i+''+j+'">'+data["q"][i]["options"][j]+'</label></div>'
	     	}
			else{
			 a=a+'<div class="form-check"><input class="form-check-input border-secondary options" type="checkbox" value="" id="'+i+''+j+'"><label class="form-check-label" for="'+i+''+j+'">'+data["q"][i]["options"][j]+'</label></div>'
			}
		}
		a=a+'</div></div>'
		// console.log(a);
		container.append(a);
	}
}




function dataColector(){
	var qc=$(".QuestionContainer .question");
	const n=qc.length;
	let datas=[];
	for(let i=0;i<n;i++){
		var temp=qc[i].querySelectorAll(".options");
		var dataQuestion=[];
		for(let j=0;j<temp.length;j++){
			if(temp[j].checked){
				dataQuestion.push(j+1);
			}
		}
		if(dataQuestion.length==0){alertQuestionBox(qc[i],"you should fill this question");break;}
		if($(qc[i]).css("background-color")==alertColor){$(qc[i]).css("background-color","");}

		datas.push(dataQuestion);
	}
	return datas;
}

function alertQuestionBox(c,messg){
    $(c).css("background-color",alertColor);
    window.alert(messg);
    noerror=false;
}


function submit(){
	var answer=dataColector();
	var data={};
	data["name"]=$("#name").val();
	data["email"]=$("#email").val();
	data["answers"]=answer;
	data["key"]=key.key;
	if(noerror){
		fetch("/form/submit/data", {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		  }).then(response => response.json())
		  .then(data => {
			window.location.href = "http://localhost:5000/form/thankyou";
		  })
	}
	else{noerror=true;}
}

function cleatdata(){
	location.reload();
}