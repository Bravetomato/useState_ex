import React, { useState, useRef } from "react";

import "./App.css";

// 날짜 입력 기능 추가
function NewTodoForm({todosState}) {
  const onSubmit = (e) => {
    e.preventDefault();
    
    const form = e.target;
    
    form.content.value = form.content.value.trim();
    
    if ( form.content.value.length == 0 ) {
      alert('Write your todo!');
      form.content.focus();
      
      return;
    }
    
    todosState.addTodo(form.content.value);
    form.content.value = '';
    form.content.focus();
  }
  
  return (
    <form onSubmit={onSubmit}>
      <input autoComplete="off" name="content" type="text" placeholder="Write your todo" />
      <input type="submit" value="Add" />
      <input type="reset" value="Reset" />
    </form>
  );
}

function TodoApp({ todosState }) {
  return (
    <>
      <NewTodoForm todosState={todosState} />
      <hr />
      <ul>
        {todosState.todos.map((todo, index) => (
          <li key={index}>
            {todo.id} {dateToStr(todo.regDate)} {todo.content}
            {/* 유틸리티 dateToStr 의 todo에서 regDate 값을 보여줌*/}
          </li>
        ))}
      </ul>
    </>
  );
}

function useTodosState() {
  const [todos, setTodos] = useState([]);
  const lastTodoIdRef = useRef(0);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;

    const newTodo = {
      id,
      content: newContent,
      regDate: new Date()
      // new Date() : 현재 날짜, 시간 표시를 해주는 함수.
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const modifyTodo = (index, newContent) => {
    const newTodos = todos.map((todo, _index) =>
      _index != index ? todo : { ...todo, content: newContent }
    );
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, _index) => _index != index);
    setTodos(newTodos);
  };

  return {
    todos,
    addTodo,
    modifyTodo,
    removeTodo
  };
}

function App() {
  const todosState = useTodosState();

  return (
    <>
      <TodoApp todosState={todosState} />
    </>
  );
}

// 유틸리티
// 날짜 객체 입력받아서 문장(yyyy-mm-dd hh:mm:ss)으로 반환한다.
function dateToStr(d) {
  const pad = (n) => {
    return n < 10 ? "0" + n : n;
  }

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds())
  );
}

export default App;