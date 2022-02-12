const inputText = document.querySelector(".inputText");
const inputButton =document.querySelector(".inputbutton")
const listText = document.querySelector(".listText")
const filter = document.querySelector(".selectFilter");

document.addEventListener("DOMContentLoaded" , getTodosLocalstorage);


inputButton.addEventListener("click" , addFunction);
function addFunction(event){
    event.preventDefault();
 
    const listDiv = document.createElement("div");
    listDiv.classList.add("listDiv") ;

    listText.appendChild(listDiv);

    const todoItem = document.createElement("li")
    todoItem.classList.add("todoItem")
    todoItem.innerText=inputText.value;

    listDiv.appendChild(todoItem)

    const tickButton = document.createElement("button");
    tickButton.innerHTML = `<i class="fas fa-check"></i>`;
    tickButton.classList.add("fa-check1")

    listDiv.appendChild(tickButton)

    const trashButton = document.createElement("button");
    trashButton.innerHTML=`<i class="fas fa-trash"></i>`;
    trashButton.classList.add("fa-trash1")

    listDiv.appendChild(trashButton);
    
    
    saveItemsTolocalstorage (inputText.value);

    inputText.value ="";

}

listText.addEventListener("click" , trashOrCheckTodo);
function trashOrCheckTodo(event){
    const item = event.target;
    if(item.classList[0] === "fa-check1" ){
       const todo1 = item.parentElement;
       todo1.classList.toggle("completed");
    }
    if(item.classList[1] === "fa-check"){
        const todo = item.parentElement.parentElement;
        todo.classList.toggle("completed");
    }
    if (item.classList[0] === "fa-trash1"){
        const todo1 = item.parentElement;
        todo1.remove();
        removeFromLocalstorage(todo1)
    }
    if(item.classList[1] === "fa-trash"){
        const todo = item.parentElement.parentElement;
        todo.remove();
        removeFromLocalstorage(todo)
    }

}


filter.addEventListener("click" , selectFilter )
function selectFilter(event){
const todos = listText.childNodes;

todos.forEach(function(todo){
    switch(event.target.value){
        case "all":
            todo.style.display = "flex";
            break;
        case "completed":
            if(todo.classList.contains("completed")){
                todo.style.display = "flex";
            }else{
                todo.style.display = "none";
            }
            break;
        case "uncompleted":
            if(todo.classList.contains("completed")){
                todo.style.display = "none";
            }else{
                todo.style.display = "flex";
            }
        
    }
})

}


function saveItemsTolocalstorage (newTodo){
    let todos ;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(newTodo);
    localStorage.setItem("todos" , JSON.stringify(todos));

}

function removeFromLocalstorage(todo){
    let todos ;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex) , 1 );
    localStorage.setItem("todos" , JSON.stringify(todos))
}

function getTodosLocalstorage(){
    let todos ;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }


    todos.forEach(function(todo){
        
    const listDiv = document.createElement("div");
    listDiv.classList.add("listDiv") ;

    listText.appendChild(listDiv);

    const todoItem = document.createElement("li")
    todoItem.classList.add("todoItem")
    todoItem.innerText= todo;

    listDiv.appendChild(todoItem)

    const tickButton = document.createElement("button");
    tickButton.innerHTML = `<i class="fas fa-check"></i>`;
    tickButton.classList.add("fa-check1")

    listDiv.appendChild(tickButton)

    const trashButton = document.createElement("button");
    trashButton.innerHTML=`<i class="fas fa-trash"></i>`;
    trashButton.classList.add("fa-trash1")

    listDiv.appendChild(trashButton);
    
    })

}