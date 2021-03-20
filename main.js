let inputForm = document.querySelector('.todo-add-item__form')
let inputItem = document.querySelector('.todo-add-item__input')
let todoList = document.querySelector('.todo-list')
let listLisTags = todoList.getElementsByTagName('li')
let todoItem;

let tasks = [
    {
        name: null,
        createAt: null,
        completed: null
    }
]


//Listeners
inputForm.addEventListener("submit" , function(e){  
    e.preventDefault()   
    todoItem = inputItem.value    
    
    addTask(todoItem)
    renderTasks()
  
    clearInput()    
})

todoList.addEventListener('click' , clickInTodoList)






//Functions
function clearInput(){
    inputItem.value = ''
    inputItem.focus()
}

function renderTasks(){
    todoList.innerHTML = ''

    tasks.forEach( task => {
        todoList.appendChild(generateTask(task))
    })
}

function generateTask(obj){            

        let buttonCancel = document.createElement('button')
        buttonCancel.className = 'todo-list__cancel-button'
        buttonCancel.innerHTML = 'Cancel'
        buttonCancel.setAttribute('data-event', 'buttonCancel')

        let buttonEdit = document.createElement('button')
        buttonEdit.className = 'todo-list__edit-button'
        buttonEdit.innerHTML = 'Edit'
        buttonEdit.setAttribute('data-event' , 'buttonEdit')

        let input = document.createElement('input')
        input.className = 'todo-list__edit-input'
        input.setAttribute('type' , 'text')
        input.value = obj.name

        let div = document.createElement('div')
        div.className = 'todo-list__edit-container'
        div.appendChild(input)
        div.appendChild(buttonEdit)
        div.appendChild(buttonCancel)

        let iconRemove = document.createElement('i')
        iconRemove.className = 'todo-list__icon-remove fas fa-trash-alt'
        iconRemove.setAttribute('data-event' , 'iconRemove')

        let iconEdit = document.createElement('i')
        iconEdit.className = 'todo-list__icon-edit fas fa-edit'
        iconEdit.setAttribute('data-event' , 'iconEdit')

        let itemName = document.createElement('p')
        itemName.className = `todo-list__item-name ${obj.completed ? "" : "not-check"}`
        itemName.id = 'item-name'
        itemName.textContent = obj.name    
        itemName.setAttribute('data-event' , 'itemName')

        let iconCheck = document.createElement('i')
        iconCheck.className =  `fas fa-check ${obj.completed ? "" : "not-check" }`
        iconCheck.setAttribute('data-event' , 'buttonCheck')

        let buttonCheck = document.createElement('button')
        buttonCheck.className = 'todo-list__item-check'
        buttonCheck.setAttribute('data-event' , 'buttonCheck')
        buttonCheck.appendChild(iconCheck)

        let li = document.createElement('li')
        li.className = 'todo-list__item'
        li.appendChild(buttonCheck)
        li.appendChild(itemName)
        li.appendChild(iconEdit)
        li.appendChild(div)
        li.appendChild(iconRemove)        

        return li
    
}

function addTask(task){
    if (task !== '') {

        tasks.push({
            name: task,
            createAt: Date.now(),
            completed: false
        })
    }else{        
        clearInput()
        return
    }
       
}   


function clickInTodoList(e){
    let dataEvent = e.target.getAttribute('data-event')
    if (!dataEvent) {
        return
    }

    let currentElement = e.target
    
    while(currentElement.nodeName !== 'LI'){
        currentElement = currentElement.parentElement
    }
    
    let currentElementIndex = [...listLisTags].indexOf(currentElement)
    

    //Click in elements
    let events = {
        buttonCheck: function () {  
            tasks[currentElementIndex].completed = !tasks[currentElementIndex].completed             
            
            if (tasks[currentElementIndex].completed) {                
                currentElement.querySelector('.fa-check').classList.remove('not-check')        
                currentElement.querySelector('.todo-list__item-name').classList.remove('not-check')         
                 
            }else{
                currentElement.querySelector('.fa-check').classList.add('not-check')
                currentElement.querySelector('.todo-list__item-name').classList.add('not-check')
            }

            renderTasks()
        },    
            
        iconEdit: function () {   
            let editContainer = currentElement.querySelector('.todo-list__edit-container');        
           
           [...todoList.querySelectorAll('.todo-list__edit-container')].forEach(container => {
                container.removeAttribute('style')
           })
           
            editContainer.style.display = "flex"
            
        },


        iconRemove: function () {   
            tasks.splice(currentElementIndex, 1) 
            console.log(tasks)
            renderTasks()        
        },


        buttonEdit: function(){
            let btn = currentElement.querySelector('.todo-list__edit-button')
            let val = currentElement.querySelector('.todo-list__edit-input').value
            
            if (val === '') {   
                return                
            }else{
                tasks[currentElementIndex].name = val
                renderTasks()  
            }
        },


        buttonCancel: function(){
            let editContainer = currentElement.querySelector('.todo-list__edit-container');        

            editContainer.style.display = "none"

            currentElement.querySelector('.todo-list__edit-input').value = tasks[currentElementIndex].name
            console.dir(todoList)
        }
        
    }
     

    //Existindo o data-event no elemento clicado
    if(events[dataEvent]){
        events[dataEvent]()
    }
    
}


//Limpando primeiro elemento vazio
tasks.splice(0, 1)

//Renderizando na tela
renderTasks()