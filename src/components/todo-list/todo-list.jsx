import * as React from 'react';
import { Checkbox } from '../checkbox';
import { TodosContext } from '../../todo-context';
import './todo-list.scss';

export const TodoList = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const { filteredTodos, setFilteredTodos } = React.useContext(TodosContext);
  const { status, setStatus } = React.useContext(TodosContext);

  const filterHandler = () => {
    switch (status) {
      case 'all':
        setFilteredTodos(todos);
        break;
         case 'checked':
           setFilteredTodos(todos.filter((todo) => todo.checked === true));
           break;
         case 'unchecked':
           setFilteredTodos(todos.filter((todo) => todo.checked === false));
           break;
         default:
           setTodos(todos);
           break;
     }
   };

   React.useEffect(() => {
     filterHandler();
   }, [todos, status]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCheck = (id) => {
    setTodos(
      todos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            checked: !item.checked,
          };
        }
        return item;
      }),
    );
  };

  const selectHandler = (e) => {
    setStatus(e.target.value);
  };

  const handleKeyUp = (e, id) => {
    if (e.keyCode === 13) {
      toggleCheck(id);
    }
  };

  return (
    <div className="todo-list">
      <div className="heading">
        <span className="todo-list-title">Things to do:</span>
        <select onClick={(e) => selectHandler(e)} className="filter-todo">
          <option value="all">All</option>
          <option value="checked">Completed</option>
          <option value="unchecked">Uncompleted</option>
        </select>
      </div>
      {filteredTodos.length ? (
        <div className="todo-list-content">
          {filteredTodos.map((todoItem) => (
            <Checkbox
              key={todoItem.id}
              label={todoItem.label}
              checked={todoItem.checked}
              onClick={() => toggleCheck(todoItem.id)}
              onKeyUp={(e) => handleKeyUp(e, todoItem.id)}
              onDelete={() => handleDelete(todoItem.id)}
            />
          ))}
        </div>
      ) : (
        <div className="no-todos">
          Looks like you&apos;re up for a challenge!
        </div>
      )}
    </div>
  );
};
