import React, { useState } from "react";
import "./style.css";

function App() {
  return (
    <div className="main">
      <div className="heading-div">
        <div className="logo-and-moon">
          <img className="logo" src="./src/assets/logo.svg" alt="Logo" />
          <img className="moon" src="./src/assets/icon-moon.svg" alt="Moon" />
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
          <p className="left-items">items left</p>
          <div className="footer-div-desktop">
            <p className="all">All</p>
            <p className="active">Active</p>
            <p className="completed">Completed</p>
          </div>
          <p className="clear-completed">Clear Completed</p>
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
