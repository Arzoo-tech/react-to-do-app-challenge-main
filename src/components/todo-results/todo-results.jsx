import * as React from 'react';
import './todo-results.scss';
import { TodosContext } from '../../todo-context';

export const TodoResults = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const calculateChecked = () => {
    let count = 0;
    todos.forEach((element) => {
      if (element.checked) { count += 1; }
    });
    return count;
  };

  return (
    <div className="todo-results">
      Done:
      {calculateChecked()}
    </div>
  );
};
