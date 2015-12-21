// Michael Bamesberger
// AJAX Calls CS 290 

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
    var myButton = document.getElementById('myBtn');

    myButton.addEventListener('click', function(event){
        
        var req = new XMLHttpRequest();
        
        var payload = {'name': null, 'reps': null, 'weight':null, 'date':null, 'lbs':null};
        payload.name = document.getElementById('name').value;
        payload.reps = document.getElementById('reps').value;
        payload.weight = document.getElementById('weight').value;
        payload.date = document.getElementById('date').value;
        payload.lbs = document.getElementById('lbs').value;
        
        req.open('POST', 'http://52.89.7.205:3000/insert', true)
        req.setRequestHeader('Content-Type', 'application/json');
        
        req.addEventListener('load', function(event){
            if(req.status >= 200 && req.status < 400){
                var response = JSON.parse(req.responseText);
                var finishedTable = tableMaker(response);
                document.getElementById("rowContainer").innerHTML= "";
                document.getElementById("rowContainer").appendChild(finishedTable);
                
          } else {
                console.log("Error");
                
          }
      });
        
        req.send(JSON.stringify(payload));
        event.preventDefault(); 
});

};


function deleteFunction(num){
    var req = new XMLHttpRequest();
    
    var payload = {id: null};
    payload.id = num;
    
    req.open('POST', 'http://52.89.7.205:3000/delete', true)
    req.setRequestHeader('Content-Type', 'application/json');
        
        req.addEventListener('load', function(event){
            if(req.status >= 200 && req.status < 400){
                var response = JSON.parse(req.responseText);
                var finishedTable = tableMaker(response);
                document.getElementById("rowContainer").innerHTML= "";
                document.getElementById("rowContainer").appendChild(finishedTable);
                
          } else {
                console.log("Error");
                
          }
      });
        
        
        req.send(JSON.stringify(payload));
        event.preventDefault(); 

};














function editFunction(num){

    var req = new XMLHttpRequest();
    
    var payload = {id: null};
    payload.id = num;
    
    req.open('POST', 'http://52.89.7.205:3000/retrieve', true)
    req.setRequestHeader('Content-Type', 'application/json');
        
        req.addEventListener('load', function(event){
            if(req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            var newForm = actualTable(response);

            document.getElementById("editContainer").appendChild(newForm);
            
                
          } else {
                console.log("Error");
                
          }
      });
        
        
        req.send(JSON.stringify(payload));
        event.preventDefault(); 

};    
    
   
function actualTable(response){
    
 
    var newForm = document.createElement("form");
    var newCaption = document.createElement("caption");
    newCaption.textContent = "Edit Here";
    newForm.appendChild(newCaption);
                  
    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("value", response[0].name);
    nameInput.setAttribute("id", "editname");
    newForm.appendChild(nameInput);
                    
                  var repsInput = document.createElement("input");
                  repsInput.setAttribute("type", "text");
                  repsInput.setAttribute("value", response[0].reps);
                  repsInput.setAttribute("id", "editreps");
                  newForm.appendChild(repsInput);
                  
                  var weightInput = document.createElement("input");
                  weightInput.setAttribute("type", "text");
                  weightInput.setAttribute("value", response[0].weight);
                  weightInput.setAttribute("id", "editweight");
                  newForm.appendChild(weightInput);
                  
                  var dateInput = document.createElement("input");
                  dateInput.setAttribute("type", "date");
                  dateInput.setAttribute("value", response[0].date);
                  dateInput.setAttribute("id", "editdate");
                  newForm.appendChild(dateInput);
                  
                  var lbsInput = document.createElement("input");
                  lbsInput.setAttribute("type", "text");
                  lbsInput.setAttribute("value", response[0].lbs);
                  lbsInput.setAttribute("id", "editlbs");
                  newForm.appendChild(lbsInput);
                  
                  
                  var subButton = document.createElement("button");
                  subButton.textContent = "Update";
                  subButton.id = response[0].id;
                  subButton.addEventListener('click', function(){
                    updateThis(subButton.id);
                  });
                  newForm.appendChild(subButton);        
                  
                 return newForm; 
    
};



function updateThis(num){
    
    var req = new XMLHttpRequest();
    
    var payload = {'name': null, 'reps': null, 'weight':null, 'date':null, 'lbs':null, 'id': null};
        payload.name = document.getElementById('editname').value;
        payload.reps = document.getElementById('editreps').value;
        payload.weight = document.getElementById('editweight').value;
        payload.date = document.getElementById('editdate').value;
        payload.lbs = document.getElementById('editlbs').value;
        payload.id = num;
    
    req.open('POST', 'http://52.89.7.205:3000/update', true)
    req.setRequestHeader('Content-Type', 'application/json');
        
        req.addEventListener('load', function(event){
            if(req.status >= 200 && req.status < 400){
                var response = JSON.parse(req.responseText);
                var finishedTable = tableMaker(response);
                document.getElementById("editContainer").innerHTML="";
                document.getElementById("rowContainer").innerHTML= "";
                document.getElementById("rowContainer").appendChild(finishedTable);
                return;
          } else {
                console.log("Error");
                return;
          }
      });
        
        
        req.send(JSON.stringify(payload));
        event.preventDefault(); 

    
    
    };



function tableMaker (response){
    
    
    var newTable = document.createElement("table");
    var headerRow = document.createElement("tr");
    newTable.appendChild(headerRow);
    var Header1 = document.createElement ("th");
    Header1.textContent="Workout Name";
    headerRow.appendChild(Header1);
    
    var Header2 = document.createElement ("th");
    Header2.textContent="Number of Reps";
    headerRow.appendChild(Header2);
    
     var Header3 = document.createElement ("th");
    Header3.textContent="Weight";
    headerRow.appendChild(Header3);
    
     var Header4 = document.createElement ("th");
    Header4.textContent="Date";
    headerRow.appendChild(Header4);
    
     var Header5 = document.createElement ("th");
    Header5.textContent="Pounds or Kilograms";
    headerRow.appendChild(Header5);
    
    var Header6 = document.createElement ("th");
    Header6.textContent="Edit/Delete";
    headerRow.appendChild(Header6);
       
    
    for(i = 0; i < response.length; i++){
        var newRow = document.createElement("tr");
        newTable.appendChild(newRow);
        
        var nameItem = document.createElement("td");
        nameItem.textContent = response[i].name;
        newRow.appendChild(nameItem);
        
        var repsItem = document.createElement("td");
        repsItem.textContent = response[i].reps;
        newRow.appendChild(repsItem);
        
        var weightItem = document.createElement("td");
        weightItem.textContent = response[i].weight;
        newRow.appendChild(weightItem);
        
        var dateItem = document.createElement("td");
        dateItem.textContent = response[i].date;
        newRow.appendChild(dateItem);
        
        var lbsItem = document.createElement("td");
        lbsItem.textContent = response[i].lbs;
        newRow.appendChild(lbsItem);
        
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "buttonClass";
        deleteButton.id = response[i].id;
        deleteButton.addEventListener('click', function(){
            deleteFunction(deleteButton.id);
            
        })
        newRow.appendChild(deleteButton);
                                     
        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "buttonClass";
        editButton.id = response[i].id;
        editButton.addEventListener('click', function(){
            editFunction(editButton.id);    
        });
        newRow.appendChild(editButton);
        
    }
    return newTable;


};







