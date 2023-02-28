const TODOLIST = "TODOLIST";
let data = [
    {
        task: 'Run 2km',
        is_complete : true
    }
]

const saveData =(data) => {
    localStorage.setItem(TODOLIST,JSON.stringify(data))
}
saveData(data);

const loadData = () => {
    let data;
    data = JSON.parse(localStorage.getItem(TODOLIST))
    data = data?data : [];
    return data;
}
// let result =loadData();
// console.log(result)

const addTask = (new_task) => {
    let data;
    data =  loadData();
    data = [...data,new_task];
    saveData(data);
}

const createTaskItem = (task,is_complete,index) =>{
    return `
    <li class="task-item" index=${index} is-complete=${is_complete} >
                    <span class="task" onClick = "markTaskComplete(${index})">${task}</span>
                    <div class="task-action">
                        <button onClick="pushEditTask(this,${index})" class="edit-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                              </svg> 
                        </button>
                        <button onClick="deleteTask(this,${index})">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </li>
    `
 }
const renderTasks = () => {
    let data, ulTasks, ulTasksHtml,task_result,countTask;
    countTask =0;
    task_result = document.querySelector('span.task-result')
    ulTasks = document.querySelector('ul.tasks');
    data = loadData();
    ulTasksHtml = data.map((element,index) =>{
        if(element.is_complete == true) countTask++;
        return createTaskItem(element.task,element.is_complete,index);
    })
    ulTasks.innerHTML = ulTasksHtml.join('');
    task_result .textContent = countTask > 0 ? `Yeah, ${countTask} tasked complete` : `Yeah, 0 tasked complete`;
}

const markTaskComplete = (index) =>{
    // console.log(index)
    let data;
    data = loadData();
    data[index].is_complete = data[index].is_complete == true ? false : true
    saveData(data);
    renderTasks();
    console.log(data[index])
}

const deleteTask = (element,index) =>{
    // console.log(element)
    // console.log(index)

    let data;
    let delete_confirm = confirm('Bạn có chắc chắn xóa')
    if (delete_confirm == false) return false;
    data = loadData();
    data.splice(index,1);
    saveData(data);
    renderTasks();
    // console.log(data)
}

const pushEditTask = (element,index) =>{
    let data = loadData();
    const btn = document.querySelector('#add_task button')
    const btn_edit =document.getElementsByClassName('edit-btn');

    
    const setAttribute=element.setAttribute('index',index);

    const task =document.getElementById('task');
            task.value = data[index].task;
            task.setAttribute('index',index);
            btn.innerHTML = 'EDIT TASK';
}

const editTask = (task,index) =>{
    const btn = document.querySelector('#add_task button')
    let data = loadData();
    data[index].task = task;
    btn.innerHTML = 'ADD TASK';
    saveData(data);
   
}
renderTasks()


 const formAddTask =document.forms.add_task;
 formAddTask.addEventListener('submit',(e) => {
    let new_task;
    const task =document.getElementById('task');
    const index = task.getAttribute('index');
    const lenght = task.value.length;
    if(lenght <2){
        alert('Enter your task');
        return false;
    }

    if(index ){
        editTask(task.value,index)
        task.removeAttribute('index')
    }else{
        new_task = {
            task: task.value,
            is_complete : false
        }
        addTask(new_task);
    }
    renderTasks();
    task.value = '';
    e.preventDefault()
 })