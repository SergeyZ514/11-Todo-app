import TodoAdd from "../todoAdd/TodoAdd";
import TodoList from "../todoList/TodoList";
import Footer from "../footer/Footer";
import "./App.scss";

function App() {
  return (
    <div className='app'>
      <header>
        <h1 className='app-title'>TODOS</h1>
      </header>
      <TodoAdd />
      <TodoList />
      <Footer />
    </div>
  );
}

export default App;
