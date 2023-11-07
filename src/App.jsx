import React, { useState } from "react";
import "./style.css";

function App() {
  const [iconSrc, setIconSrc] = useState("./src/assets/icon-moon.svg"); // Starting with the moon icon
  const [darkMode, setDarkMode] = useState(false);

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
      elements.forEach((element) => {
        element.classList.remove("dark-hover");
        element.classList.add("light-hover");
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
      const elements = document.querySelectorAll(".page-word");
      elements.forEach((element) => {
        element.classList.add("dark-hover");
        element.classList.remove("light-hover");
      });
    }
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
            <div className="circle create-todo-circle">
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
            />
          </div>
        </form>
      </div>
      <div className="content">
        {/* <div className="created-task-div">
          <div className="circle-text-cross">
            <div className="circle-and-text">
              <div className="circle">
                <img
                  className="check-icon"
                  src="./src/assets/icon-check.svg"
                  alt="Check Icon"
                />
              </div>
              <p className="created-task"></p>
            </div>
            <img
              className="cross"
              src="./src/assets/icon-cross.svg"
              alt="Cross Icon"
            />
          </div>
        </div> */}
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
