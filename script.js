// Responsible for displaying live date
let liveDate = document.querySelectorAll('#todayDate');
liveDate.forEach(lDate => lDate.textContent =
    new Date().toLocaleDateString('en-Gb',{day: "numeric", month: "long", year:"numeric"}))

// Responsible for switching between tabs seemlesly
function showTab(tabId, element){
    let tabs = document.querySelectorAll('.tab');
    let buttons = document.querySelectorAll('.page1');

    tabs.forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';

    buttons.forEach(btn => btn.classList.remove('active'))
    
    element.classList.add('active')

    if(tabId === 'tab5'){
        mergeTasks()
    }
}
// DISPLAY MY DAY(PAGE1) AS THE DEFAULT
document.addEventListener("DOMContentLoaded", function() {
    showTab('tab1', document.querySelector('#page1'));
});



// Responsible for displaying "ADD NEW TASK CONTAINER"
function btn(thisElement){
    let parent = thisElement.closest('.tab')
    let taskconatiner = parent.querySelector('.newTask')

    taskconatiner.style.visibility = (taskconatiner.style.visibility === 'visible' ) ? 'hidden' : 'visible';
}

// Responsible for pushing NEW TASK to list
function save(saveThis) {
   let taskContainer = saveThis.closest('.newTask');
   if (!taskContainer) return alert("Task container not found!");//DEBUG

   let mainTaskContainer = taskContainer.closest('.tab');
   if (!mainTaskContainer) return alert("Main container not found!");//DEBUG

   let template = mainTaskContainer.querySelector('.taskBar');

   let newDiv = template.cloneNode(true);
   let task = taskContainer.querySelector('#task')?.value.trim();
   let date = taskContainer.querySelector('#date')?.value.trim();
   let time = taskContainer.querySelector('#time')?.value.trim();
  
   newDiv.style.display = 'flex';

   newDiv.id ='task-' + Math.random().toString(36).substr(2,9);
   let taskInfo = newDiv.querySelector('#taskInfo');
   let taskDate = newDiv.querySelector('#taskDate');
   let taskTime = newDiv.querySelector('#taskTime');
   
   taskInfo.innerHTML = task;
   taskDate.innerHTML = date;
   taskTime.innerHTML = time;
 if (!taskInfo || !taskDate || !taskTime) { // DEBUG
        return alert("Some elements are missing inside the cloned template!");
    }
// ENSURE THAT TASK IS NOT EMPTY BEFORE PUSHING IT TO THE LIST
    if(task === ''){
        alert(`Task input can't be empty`)
        return;
    }
// TO PUSH OUT NEW CONTAINER WITH TASK TO TH LIST
    let output = mainTaskContainer.querySelector('.taskContainer');
    output.appendChild(newDiv)
    
    if(!output) return alert('taskconatiner not found'); //DEBUGG
     
    taskContainer.style.visibility = 'hidden'
}




// Responsible for STRIKING A LINE THROUH WHEN CHECK BOX IS CLICKED
function checkBox(thisCheckBox) {
    let text = thisCheckBox.closest('.taskBar').querySelector('#taskInfo')
    if (text) { // Ensure that the element exists before applying class
      text.style.textDecoration = (text.style.textDecoration === 'line-through') ? 'none' : 'line-through'
    }
}


// RESPONSIBLE FOR DELETING 
let menu = document.getElementById('menu');
let selectedDiv = null;
document.addEventListener('contextmenu', function(e){
    e.preventDefault();
    selectedDiv = e.target.closest('.taskBar');

    if(selectedDiv){
        menu.style.top = `${e.clientY}px`;
        menu.style.left = `${e.clientX}px`;
        menu.style.display = 'flex';
    }
});

document.getElementById('delete').addEventListener("click", function(e){
    if(selectedDiv){
        selectedDiv.remove();
        menu.style.display = 'none';
    }
})

document.addEventListener('click',function(){
    menu.style.display = 'none';
})


// RESPONSIBLE FOR EDITING TASK
document.getElementById('delete').addEventListener("click", function(e){
    if(selectedDiv){
        selectedDiv.remove();
        menu.style.display = 'none';
    }
});


// RESPONSIBLE FOR EDITING TASK
document.getElementById('edit').addEventListener("click", function(e){
    if(selectedDiv){
        // Responsible for getting the initail task,date,time
        let taskInfo = selectedDiv.querySelector('#taskInfo').innerText;
        let taskDate = selectedDiv.querySelector('#taskDate').innerText;
        let taskTime = selectedDiv.querySelector('#taskTime').innerText;
        //Responsible for pushing initail task,date,time to FORM INPUT FOR EDIT
        document.getElementById('editTaskInfo').value = taskInfo;
        document.getElementById('editTaskDate').value = taskDate;
        document.getElementById('editTaskTime').value = taskTime;

        // Show the edit form
        editForm.style.display = 'block';
        menu.style.display = 'none';
    }
});
//RESPONSIBLE FOR SAVING EDITED TASK
document.getElementById('saveEdit').addEventListener("click", function(e){
    if(selectedDiv){
        // Responsible for pushing out updated task,date,time TO THEIR INITAL POSITION
        selectedDiv.querySelector('#taskInfo').innerText = document.getElementById('editTaskInfo').value;
        selectedDiv.querySelector('#taskDate').innerText = document.getElementById('editTaskDate').value;
        selectedDiv.querySelector('#taskTime').innerText = document.getElementById('editTaskTime').value;

        // Hide the edit form
        editForm.style.display = 'none';
    }
});

document.getElementById('cancelEdit').addEventListener("click", function(e){
    // Hide the edit form without saving changes
    editForm.style.display = 'none';
});

document.addEventListener('click', function(e){
    if (e.target !== menu && e.target !== editForm && !menu.contains(e.target) && !editForm.contains(e.target)) {
        menu.style.display = 'none';
        editForm.style.display = 'none';
    }
});

//RESPONSIBLE FOR SHOWING ALL TASK 
document.getElementById("tab5").addEventListener("click", mergeTasks);

function mergeTasks() {
    let allTasksContainer = document.querySelector("#tab5 .taskContainer");
    allTasksContainer.innerHTML = ""; // Clear previous tasks

    // Responsible in Selecting all taskContainers from Tab 1 to Tab 4
    document.querySelectorAll("#tab1 .taskContainer, #tab2 .taskContainer, #tab3 .taskContainer, #tab4 .taskContainer").forEach(taskContainer => {
        taskContainer.querySelectorAll(".taskBar").forEach(task => {
            let clonedTask = task.cloneNode(true); // Clone the task
            allTasksContainer.appendChild(clonedTask); // Append to Tab 5
        });
    });
}
