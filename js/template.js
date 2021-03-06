export const teamItemTemplate = (item) => (
  `<div class="team-card-container">
    <a href="/kanban.html?id=${item._id}" class="card">
      <div class="card-title">
        ${item.name}
      </div>
    </a>
  </div>`
);

export const teamAddItemTemplate = () => (
  `<div class="add-team-button-container">
    <button id="add-team-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </div>`
);

export const addMemberTemplate = () => (
  `<li class="add-user-button-container">
    <button id="add-user-button" class="ripple">
      <span class="material-icons">add</span>
    </button>
  </li>`
);

export const prioritySelectTemplate = (hidden = false) => (
  `<select class="chip select ${hidden ? 'hidden' : ''}">
    <option value="0" selected>순위</option>
    <option value="1">1순위</option>
    <option value="2">2순위</option>
  </select>`
);

export const priorityTemplate = ([
  prioritySelectTemplate(),
  `<span class="chip primary">1순위</span>${prioritySelectTemplate(true)}`,
  `<span class="chip secondary">2순위</span>${prioritySelectTemplate(true)}`,
]);

export const todoItemTemplate = (todo) => (
  `<li class="todo-list-item ${todo.isCompleted ? 'completed' : ''}" data-id="${todo._id}">
    <div class="view">
      <input class="toggle" type="checkbox" ${todo.isCompleted ? 'checked' : ''}/>
      <label class="label">
        <div class="chip-container">
          ${priorityTemplate[todo.priority]}
        </div>
        ${todo.contents}
      </label>
      <button class="destroy"></button>
    </div>
    <input class="edit" />
  </li>`
);

export const todoListTemplate = (item) => (
  `<li class="todoapp-container" id="${item._id}">
    <h2>
      <span><strong>${item.name}</strong>'s Todo List</span>
    </h2>
    <div class="todoapp">
      <section class="input-container">
        <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus />
      </section>
      <section class="main">
        <ul class="todo-list">
          ${item.todoList.map((todo) => todoItemTemplate(todo))}
        </ul>
      </section>
      <div class="count-container">
        <span class="todo-count">총 <strong>${item.todoList.length}</strong> 개</span>
        <ul class="filters">
          <li>
            <a href="#all" class="selected">전체보기</a>
          </li>
          <li>
            <a href="#priority">우선 순위</a>
          </li>
          <li>
            <a href="#active">해야할 일</a>
          </li>
          <li>
            <a href="#completed">완료한 일</a>
          </li>
        </ul>
        <button class="clear-completed">모두 삭제</button>
      </div>
    </div>
  </li>`
);
