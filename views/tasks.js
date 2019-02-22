module.exports = {
  index(tasks) {
    console.log(tasks);
    return `
        <html>
        <head>
        <title>To Do App</title>
        <style>
        body {
        margin: 3px;
        }
        
        h1 {
        color: deeppink;
        text-align: center;
        }
        
        form {
        display: flex;
        justify-content: center;
        width: 100%;
        }
        
        form > * {
        margin: 20px;
        }
        
        .taskContainer{
        display: flex;
        justify-content: space-evenly;
        padding-left: 30px;
        }
        
        .done {
        display: inline-block;
        text-decoration: line-through;
        color: grey;
        font-style: italic;
        }
        
        .symbols {
        display: inline-block;
        margin-left: 10px;
        }
        
        </style>
        </head>
        <body>
        <h1>To Do App</h1>
        <form method='POST' action='/tasks'>
        <label>Add a task
        <input name='title' placeholder="i.e. buy groceries" required/>
        </label>
        <!--<br/>-->
        <div id="container">
        <label>
        Add a description
        <input name='description' id="description"/>
        </label>
        <span class="addDescription">more</span>
        <!--<br/>-->
        </div>
        <br/>
        <input type='submit' value='add task'/>
        </form>
        <div class="taskContainer">
        <div class="taskCol">
        Tasks
        ${tasks.map(showTask).join("")}
        </div>
        <div class="archiveCol">
        Archive
        </div>
        </div>
        
        <script>
            document.querySelectorAll(".completeAction").forEach(task => task.addEventListener('click', () => {
              const state = task.dataset.state === 'open' ? 'done' : 'open';
              
              fetch("/tasks/" + task.dataset.id, {
                method: 'PATCH', 
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({state})
                })
              .then(() => location.reload());
            }));
            
            document.querySelectorAll(".deleteTask").forEach(task => task.addEventListener('click', () => {
              fetch("/tasks/" + task.dataset.id, {method: 'DELETE'}).then(() => /*location.reload()*/ task.parentNode.parentNode.remove());
            }));
            
            document.querySelectorAll(".addDescription").forEach(description => description.addEventListener('click', () => {
              console.log("CLICK");
              const container = document.getElementById("container");
              const input = document.createElement("input");
              input.type = "text";
              input.name = "description[]";
              container.appendChild(input);
              container.appendChild(document.createElement("br"));
            }));
        </script>
        </body>
        </html>
        `
  }
};

function showTask(task) {
  const isDone = task.state === 'done';
  const taskClass = isDone ? 'done': '';

  return `
        <div id="singleTask">
            <span class="${taskClass}">
                ${task.title} ${task.description}
            </span>
            <div class="symbols">
                <span class="completeAction" data-id=${task.id} data-state=${task.state}>✅</span>
                <span class="deleteTask" data-id=${task.id}>🗑</span> 
            </div>
        </div>`
// <form method='POST' action='/tasks/${task.id}/delete'>
//                  <input value='delete' type='submit'/></form></div>
}