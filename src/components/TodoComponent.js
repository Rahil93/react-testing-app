import React from "react";

function TodoComponent({ todo }) {
  //   console.log(todo);
  const { id, title, completed } = todo;
  const h1 = <h1>{title}</h1>;
  const text = completed ? <strike data-testid="strike">{h1}</strike> : h1;
  return <div data-testid={`todo-${id}`}>{text}</div>;
}

export default TodoComponent;
