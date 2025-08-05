function addTodo() {
	const inputElement = document.getElementById('todo');
	const text = inputElement.value;
	const taskList = document.querySelector('.task_list');

	if (text === '') {
		alert('You must write something');
	} else {
		const li = document.createElement('li');
		li.innerHTML = `
		<input type="checkbox" class="checkbox task_item">
		<span>${text}</span>
		<div class="task_buttons">
		   <span><button class="edit_btn"><img src="images/pen.png"/></button></span>
		   <span><button class="delete_btn"><img src="images/trash.png"/></button></span>
		</div>`;

		const checkbox = li.querySelector('.checkbox');

		const editBtn = li.querySelector('.edit_btn');

		editBtn.addEventListener('click', () => {
			if (!checkbox.checked) {
				inputElement.value = li.querySelector('span').textContent;
				li.remove();
				saveToLocalStorage();
			}
		});

		li.querySelector('.delete_btn').addEventListener('click', () => {
			li.remove();
			saveToLocalStorage();
		});
		taskList.appendChild(li);
		inputElement.value = '';
		saveToLocalStorage();
	}
}

todo.addEventListener('keypress', function (event) {
	if (event.key === 'Enter') {
		addTodo(event);
	}
});

function saveTasksToArray() {
	const allListedTasks = [];
	const taskItems = task_list.getElementsByClassName('task_item');

	for (let i = 0; i < taskItems.length; i++) {
		const listedTask = {
			text: taskItems[i].textContent,
		};
		allListedTasks.push(listedTask);
	}
	return allListedTasks;
}

function saveToLocalStorage() {
	const savingTasks = saveTasksToArray();
	localStorage.setItem('MyTodo-listApp', JSON.stringify(savingTasks));
}
