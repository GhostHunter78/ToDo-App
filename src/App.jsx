import React, { useState, useEffect } from "react";
import "./style.css";

function App() {
  const [iconSrc, setIconSrc] = useState("./src/assets/icon-moon.svg"); // Starting with the moon icon
  const [darkMode, setDarkMode] = useState(false);
  const [allTasksArray, setAllTasksArray] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);

  //Creating a function which toggles dark and light mode styles on elements
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

    if (darkMode) {
      setIconSrc("./src/assets/icon-moon.svg");
      document
        .querySelector(".heading-div")
        .classList.remove("dark-mode-backgroundImage");
      document.querySelector("body").classList.remove("dark-background-color");
      document
        .getElementById("create-new")
        .classList.remove("dark-background-color");
      document
        .querySelector(".create-todo")
        .classList.remove("dark-background-color");
      document
        .querySelector(".last-window")
        .classList.remove("dark-background-color", "boxShadow-dark");
      document
        .querySelector(".last-window-desktop")
        .classList.remove("dark-background-color", "boxShadow-dark");
      document
        .querySelector(".footer-div")
        .classList.remove("dark-background-color", "boxShadow-dark");
      const elements = document.querySelectorAll(".page-word");
      const pageWords = document.querySelectorAll(".page-word");
      pageWords.forEach((pageWord) => {
        pageWord.classList.remove("dark-hover");
        pageWord.classList.add("light-hover");
        const createdTaskDivs = document.querySelectorAll(".created-task-div");
        createdTaskDivs.forEach((createdTaskDiv) => {
          createdTaskDiv.classList.remove(
            "dark-background-color",
            "boxShadow-dark"
          );
        });
      });
    } else {
      setIconSrc("./src/assets/icon-sun.svg");
      document
        .querySelector(".heading-div")
        .classList.add("dark-mode-backgroundImage");
      document.querySelector("body").classList.add("dark-background-color");
      document
        .getElementById("create-new")
        .classList.add("dark-background-color");
      document
        .querySelector(".create-todo")
        .classList.add("dark-background-color");
      document
        .querySelector(".last-window")
        .classList.add("dark-background-color", "boxShadow-dark");
      document
        .querySelector(".last-window-desktop")
        .classList.add("dark-background-color", "boxShadow-dark");
      document
        .querySelector(".footer-div")
        .classList.add("dark-background-color", "boxShadow-dark");
      const pageWords = document.querySelectorAll(".page-word");
      pageWords.forEach((pageWord) => {
        pageWord.classList.add("dark-hover");
        pageWord.classList.remove("light-hover");

        const createdTaskDivs = document.querySelectorAll(".created-task-div");
        createdTaskDivs.forEach((createdTaskDiv) => {
          createdTaskDiv.classList.add(
            "dark-background-color",
            "boxShadow-dark"
          );
        });
      });
    }
  };

  //Creating a function which creates new tasks on clicking create-todo-circle and adds it in allTasksArray
  const handleCreateCircleClick = () => {
    if (taskText.trim() !== "") {
      const newTask = {
        text: taskText,
      };
      setTasks([...tasks, newTask]);
      setAllTasksArray([...allTasksArray, newTask]);
      setTaskText(""); // Clear the input field after adding the task
    }
  };

  // useEffect(() => {
  //   console.log("allTasksArray:", allTasksArray);
  // }, [allTasksArray]);

  const handleCrossIconClick = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div className="main">
      <div className="heading-div">
        <div className="logo-and-moon">
          <img className="logo" src="./src/assets/logo.svg" alt="Logo" />
          <img className="moon" src={iconSrc} onClick={toggleDarkMode} />
        </div>
        <form id="create-new">
          <div className="circle-and-input">
            <div
              className="circle create-todo-circle "
              onClick={handleCreateCircleClick}
            >
              <img
                className="check-icon"
                src="./src/assets/icon-check.svg"
                alt="Check Icon"
              />
            </div>
            <input
              type="text"
              className="create-todo"
              placeholder="Create a new todo…"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="content">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="created-task-div"
            style={{
              backgroundColor: darkMode ? "#25273d" : "#fff",
            }}
          >
            <div className="circle-text-cross">
              <div className="circle-and-text">
                <div className="circle">
                  <img
                    className="check-icon"
                    src="./src/assets/icon-check.svg"
                    alt="Check Icon"
                  />
                </div>
                <p
                  className="created-task"
                  style={{
                    color: darkMode ? "#fff" : "#494c6b",
                  }}
                >
                  {task.text}
                </p>
              </div>
              <img
                className="cross"
                src="./src/assets/icon-cross.svg"
                alt="Cross Icon"
                onClick={handleCrossIconClick}
              />
            </div>
          </div>
        ))}
        <div className="last-window">
          <p className="left-items">items left</p>
          <p className="clear-completed">Clear Completed</p>
        </div>
        <div className="last-window-desktop">
          <p className="left-items page-word">items left</p>
          <div className="footer-div-desktop">
            <p className="all page-word">All</p>
            <p className="active page-word">Active</p>
            <p className="completed page-word">Completed</p>
          </div>
          <p className="clear-completed page-word">Clear Completed</p>
        </div>
      </div>

      <div className="footer">
        <div className="footer-div">
          <p className="all">All</p>
          <p className="active">Active</p>
          <p className="completed">Completed</p>
        </div>
      </div>
      <p className="drag-n-drop">Drag and drop to reorder list</p>
    </div>
  );
}

export default App;
