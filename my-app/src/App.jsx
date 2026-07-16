import Navbar from "./component/Navbar";
import { useState, useEffect } from "react";
import "./App.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdOutlineRestorePage } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [trash, setTrash] = useState([]);
  const [showBin, setShowBin] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    let trashString = localStorage.getItem("trash");

    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }

    if (trashString) {
      let trash = JSON.parse(trashString);
      setTrash(trash);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
      localStorage.setItem("trash", JSON.stringify(trash));
    }
  }, [todos, trash, isLoaded]);

  const handleEdit = (e, id) => {
    const t = todos.filter((i) => i.id === id);

    setTodo(t[0].todo);

    const newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);

  };

  const handleDelete = (e, id) => {
    const deletedTodo = todos.find((item) => item.id === id);

    setTrash((prevTrash) => [...prevTrash, deletedTodo]);

    const newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);

  };

  const handleAdd = () => {
    if (todo.trim() === "") return;

    setTodos([
      ...todos,
      {
        id: uuidv4(),
        todo,
        iscompleted: false,
      },
    ]);

    setTodo("");

  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handlecheckbox = (e) => {
    const id = e.target.name;

    const index = todos.findIndex((item) => {
      return item.id === id;
    });

    const newtodos = [...todos];

    newtodos[index].iscompleted = !newtodos[index].iscompleted;

    setTodos(newtodos);

  };

  const handleRestore = (id) => {
    const restoredTodo = trash.find((item) => item.id === id);

    setTodos([...todos, restoredTodo]);

    setTrash(trash.filter((item) => item.id !== id));
  };

  const handlePermanentDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure? This todo will be permanently deleted."
    );

    if (confirmDelete) {
      setTrash(trash.filter(item => item.id !== id));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <>
      <Navbar setShowBin={setShowBin} />

      {showBin ? (
        /* ================= TRASH BIN ================= */
        <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold">🗑️ Trash Bin</h2>

            <button
              onClick={() => setShowBin(false)}
              className="bg-violet-800 hover:bg-violet-900 p-2 py-1 text-white rounded-md font-bold"
            >
              Back to Tasks
            </button>
          </div>

          {trash.length === 0 ? (
            <div className="m-5">
              Trash is empty
            </div>
          ) : (
            trash.map(item => (
              <div
                key={item.id}
                className="todo flex justify-between items-center my-3"
              >
                <div>
                  {item.todo}
                </div>

                <div>
                  <button
                    onClick={() => handleRestore(item.id)}
                    className="bg-green-600 hover:bg-green-700 p-2 py-1 text-white rounded-md mx-2 font-bold"
                  >
                    <MdOutlineRestorePage />
                  </button>

                  <button
                    onClick={() => handlePermanentDelete(item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-2 font-bold"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* ================= YOUR TASKS ================= */
        <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
          <div className="addtodo my-5">
            <h2 className="text-lg font-bold flex justify-center m-4">Add a Todo</h2>
            <div className="box flex justify-center">
              <input
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={todo}
                type="text"
                className="bg-white border-0 outline-0 w-1/2 p-2 rounded-4xl py-2 "
              />

              <button
                onClick={handleAdd}
                className="bg-violet-800 hover:bg-violet-900 p-4 py-1 text-white mx-6 font-bold rounded-3xl"
              >
                Save
              </button>
            </div>
          </div>

          <h2 className="text-4xl font-bold flex justify-center ">Your Todos</h2>
          <div className="line h-1 bg-black opacity-15 m-6"></div>

          <div className="todos">
            {todos.length === 0 && (
              <div className="m-5">No Tasks ?</div>
            )}

            {todos.map((item) => {
              return (
                <div
                  key={item.id}
                  className="todo flex justify-between my-3"
                >
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handlecheckbox}
                      type="checkbox"
                      checked={item.iscompleted}
                    />

                    <div
                      className={
                        item.iscompleted ? "line-through" : ""
                      }
                    >
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-900 p-2 py-1 text-white rounded-md mx-2 font-bold"
                    >
                      <FaRegEdit /> 
                    </button>

                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-violet-800 hover:bg-violet-900 p-2 py-1 text-white rounded-md mx-2 font-bold"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default App;