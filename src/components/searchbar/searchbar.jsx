import * as React from 'react';
import './searchbar.scss';
import { TodosContext } from '../../todo-context';

export const Searchbar = () => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const { searchField, setSearchField } = React.useContext(TodosContext);
  const { filteredTodos, setFilteredTodos } = React.useContext(TodosContext);

  const handleSearch = (e) => {
    e.preventDefault();
    setFilteredTodos(todos.filter((todo) => (
        todo.label.toLowerCase().includes(searchField.toLowerCase()))));
};
  const handleChange = (e) => {
    setSearchField(e.target.value);
  };
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };
  return (
    <div className="top-bar">
      <a className="home" href="/">
        Home
      </a>
      <div className="search-container">
        <form action="/" method="get">
          <input
            type="text"
            id="header-search"
            placeholder="Search your todos"
            name="s"
            onChange={(e) => handleChange(e)}
            onKeyUp={handleKeyUp}
          />
          <button type="submit" onClick={(e) => handleSearch(e)}>Search</button>
        </form>
      </div>
    </div>
  );
};
