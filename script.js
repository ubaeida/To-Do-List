var input = document.getElementById('input-val')
var tasksBody = document.getElementById('tasksBody')
var tasksArr = []

if (localStorage.getItem('tasksArr') === null) {
    localStorage.setItem('tasksArr', JSON.stringify(tasksArr));
} else {
    tasksArr = JSON.parse(localStorage.getItem(`tasksArr`))
    for (let i = 0; i < tasksArr.length; i++) getTasks(tasksArr[i])
}

var addTask = function () {
    if (input.value != '') {
        var task = {}
        task.id = tasksArr.length;
        task.text = input.value.trim();
        let max = 255;
        let min = 100;
        task.r = Math.floor(Math.random() * (max - min) + min);
        task.g = Math.floor(Math.random() * (max - min) + min);
        task.b = Math.floor(Math.random() * (max - min) + min);
        tasksArr.push(task)
        input.value = ''
    } else {
        alert('You forget to enter the task!')
        return
    }
    localStorage.setItem('tasksArr', JSON.stringify(tasksArr))
    getTasks(task)
}

function getTasks(task) {
    let newDiv = document.createElement('div')
    newDiv.className = `task`;
    newDiv.id = `task${task.id}`
    newDiv.onmouseover =  "this.className='hover';"
    newDiv.style.backgroundColor = `rgb(${task.r}, ${task.g}, ${task.b})`
    newDiv.innerHTML =
        `<p id="pTxt${task.id}">${task.text}</p>
        <div>
            <span class="material-symbols-outlined done" id="${task.id}" onclick="lineThroughDoneTask(this.id)" >done</span> 
            <span class="material-symbols-outlined delete" id="${task.id}" onclick="deleteTask(this.id)" >cancel</span>
        </div>
        `
    tasksBody.appendChild(newDiv)
}

function lineThroughDoneTask(elId) {
   pTxt = document.getElementById(`pTxt${elId}`)
   console.log('111')
   pTxt.classList.toggle('pTxt');

}

function deleteTask(elId) {
    document.getElementById(`task${elId}`).style.display = 'none'
    tasksArr.pop(elId)
    localStorage.setItem('tasksArr', JSON.stringify(tasksArr))
}