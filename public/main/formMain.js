fetch("/form/data/recent", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: null
  }).then(response => response.json())
  .then(data => {
    // console.log(data);
    renderRecent(data);
  })
  function renderRecent(data){
    data=data.dataRecent;
    var cardholder=$(".cardholder");
    const n=data.length;
    for(let i=0;i<n;i++){
    var card='<div class="card mx-2 my-2" style="width: 18rem;"><div class="card-body"><h6 class="card-subtitle mb-2 text-body-secondary" style="	display: flex;justify-content: space-between;">Name of the form:-<span><button type="button" class="btn-close" aria-label="Close" onclick="deleteform(\''+data[n-i-1].key+'\')"></button></span></h6><h4 class="card-title" >'+data[n-i-1].name+'</h4><br><h5 class="card-subtitle mb-2 text-body-secondary">Description of the form:-</h5><p class="card-text">'+data[n-i-1].description+'</p><a href="http://localhost:5000\\form\\'+data[n-i-1].key+'" class="card-link">Form link</a><a href="http://localhost:5000\\form\\edit\\'+data[n-i-1].key+'" class="card-link">Edit form</a><a href="http://localhost:5000\\form\\data\\'+data[n-i-1].key+'" class="card-link">get form</a></div></div>'
    cardholder.append(card);
    }
  }

  function deleteform(key){
    console.log(key);
    key={key:key};
    $('#confirmationModal').modal('show');
    document.getElementById('confirmDelete').addEventListener('click', function () {
      fetch("/form/data/delete/formtotal", {
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

    
  }
document.getElementById('dismiss-delete').addEventListener('click', function () {
      $('#confirmationModal').modal('hide'); 
  });
  document.getElementById('dismiss-delete-cross').addEventListener('click', function () {
    $('#confirmationModal').modal('hide'); 
});