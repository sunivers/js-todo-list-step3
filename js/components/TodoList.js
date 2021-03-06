import { isValidContent } from '../util.js';
import { KEYCODE_ESC, KEYCODE_ENTER } from '../constants.js';

function TodoList({
  $rootElement, deleteTodo, toggleTodo, editTodo, setPriority,
}) {
  this.todoList = [];
  const $todoList = $rootElement.querySelector('.todo-list');

  this.setState = (newTodoList) => {
    this.todoList = newTodoList;
  };

  this.onClickTodoItem = async (event) => {
    event.preventDefault();
    const { target } = event;
    const { classList } = target;
    const $clickedItem = target.closest('.todo-list-item');
    if (!$clickedItem) return;
    const itemId = $clickedItem.dataset.id;
    if (classList.contains('destroy')) {
      await deleteTodo(itemId);
      return;
    }
    if (classList.contains('toggle')) {
      await toggleTodo(itemId);
      return;
    }
    if (classList.contains('chip')) {
      const $chipSelect = target.closest('.chip-container').querySelector('select');
      target.classList.add('hidden');
      $chipSelect.classList.remove('hidden');
    }
  };

  this.onEnterEditMode = async (event) => {
    const { target } = event;
    const $todoItem = target.closest('.todo-list-item');
    const itemId = $todoItem.dataset.id;
    $todoItem.classList.add('editing');

    const $editInput = $todoItem.querySelector('.edit');
    const originValue = (this.todoList.find((item) => item._id === itemId) || {}).contents;
    $editInput.value = originValue || '';
    $editInput.focus();
    const { length } = $editInput.value;
    $editInput.setSelectionRange(length, length); // set cursor position
  };

  this.onKeyUpTodoItem = async (event) => {
    const $editTodoInput = event.target.closest('.edit');
    if (!$editTodoInput) return;
    this.editTodo(event);
  };

  this.editTodo = async (event) => {
    if (event.key !== KEYCODE_ESC && event.key !== KEYCODE_ENTER) return;

    const { target } = event;
    const $todoItem = target.closest('.todo-list-item');
    if (event.key === KEYCODE_ESC) {
      $todoItem.classList.remove('editing');
    }
    const newTodoContents = target.value;
    if (!isValidContent(newTodoContents)) return;
    if (event.key === KEYCODE_ENTER) {
      const itemId = $todoItem.dataset.id;
      editTodo(itemId, newTodoContents);
    }
  };

  this.setPriority = async (event) => {
    const { target } = event;
    const $todoItem = target.closest('.todo-list-item');
    const itemId = $todoItem.dataset.id;
    const priority = target.value;
    setPriority(itemId, priority);
  };

  $todoList.addEventListener('click', this.onClickTodoItem);
  $todoList.addEventListener('dblclick', this.onEnterEditMode);
  $todoList.addEventListener('keyup', this.onKeyUpTodoItem);
  $todoList.addEventListener('change', this.setPriority);
}

export default TodoList;
