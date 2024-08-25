document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');
    const addTaskBtn = document.getElementById('add-task-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let tasks = [];

    // Add Task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            tasks.push(task);
            renderTasks();
            taskInput.value = '';
        }
    });

    // Render Tasks
    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'all') return true;
            if (filter === 'pending') return !task.completed;
            if (filter === 'completed') return task.completed;
        });

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="edit" onclick="editTask(${task.id})">Edit</button>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${task.id})">
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    // Edit Task
    window.editTask = (id) => {
        const task = tasks.find(task => task.id === id);
        const newTaskText = prompt('Edit Task', task.text);
        if (newTaskText !== null) {
            task.text = newTaskText.trim();
            renderTasks();
        }
    };

    // Delete Task
    window.deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    };

    // Toggle Task Completion
    window.toggleTask = (id) => {
        const task = tasks.find(task => task.id === id);
        task.completed = !task.completed;
        renderTasks();
    };

    // Filter Tasks
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            renderTasks(filter);
        });
    });

    renderTasks();
});
