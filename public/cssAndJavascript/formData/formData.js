


// feching the link adress
function extractDataFromURL(url) {
    const parts = url.split('/');
    const data = parts.filter(part => part !== "");
    return data;
}

let currentUrl = window.location.href;
currentUrl=extractDataFromURL(currentUrl);
var key={key:currentUrl[4]};


fetch("/form/data/question", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(key)
  }).then(response => response.json())
  .then(data => {
    datakpper(data.dataQuestion);
  })


  fetch("/form/data/answers", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(key)
  }).then(response => response.json())
  .then(data => {
    if(data.error){console.log("error")}
    // console.log(data.answer);
    analaysis(data.answer);
  })


  function datakpper(data){
    $("#form-description").html(data["name"]);
    $('#form-name').html(data["description"]);
    const n=data["q"].length;
    var container=$('.QuestionContainer');
    for(let i=0;i<n;i++){
      let a='<div class="card question" id="question-'+(i+1)+'" ><div class="card-body"> <h5 class="card-title">Question-'+(i+1)+'</h5>  <p class="card-text">'+data["q"][i]["question"]+' ('+data["q"][i]["type"]+')</p></div><div class="card-body"><ul>';
      for(let j=0;j<data["q"][i]["options"].length;j++){
        a=a+'<li><span id="'+i+''+j+'">( 0% ) </span>'+data["q"][i]["options"][j]+'</li>'
      }
      a=a+'</ul></div></div>'
      container.append(a);
    }
  }
  
function analaysis(data){
  var percentage={};
  for(let z=0;z<data.length;z++){
    for(let j=0;j<data[z].length;j++){
      for(let i=0;i<data[z][j].length;i++){
        var temp2=data[z][j][i]-1;
        var temp=""+j+""+temp2+""
        if(!percentage[temp]){
          percentage[temp]=0;
        }
        percentage[temp]+=1;
      }
    }
  }
// console.log(percentage);
const n=data.length/100;
for(let temp in percentage){
  // console.log(percentage[temp]/n);
  $("#"+temp+"").html(" ( "+(percentage[temp]/n)+"% ) ")
}
}



    document.getElementById('deleteformdataButton').addEventListener('click', function () {
        $('#confirmationModal').modal('show');
    });

    document.getElementById('confirmDelete').addEventListener('click', function () {
      fetch("/form/data/delete/answers", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(key)
      }).then(response => response.json())
      .then(data => {
        if(data.error){return;}
        else{alert('deleted sucessfully');location.reload();}
      })
         
        $('#confirmationModal').modal('hide'); 
    });

    document.getElementById('dismiss-delete').addEventListener('click', function () {
      $('#confirmationModal').modal('hide'); 
  });
  document.getElementById('dismiss-delete-cross').addEventListener('click', function () {
    $('#confirmationModal').modal('hide'); 
});

