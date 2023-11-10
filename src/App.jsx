import React, { useState, useEffect } from "react";
import "./style.css";

function App() {
  const [iconSrc, setIconSrc] = useState("./src/assets/icon-moon.svg"); // Starting with the moon icon
  const [darkMode, setDarkMode] = useState(false);
  const [allTasksArray, setAllTasksArray] = useState([]);
  const [completedTasksArray, setCompletedTasksArray] = useState([]);
  const [activeTasksArray, setActiveTasksArray] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [leftItemsDisplay, setLeftItemsDisplay] = useState("block");
  const [lastWindowDisplay, setLastWindowDisplay] = useState(
    window.innerWidth >= 1440 ? "none" : "flex"
  );
  const [lastWindowDesktopDirection, setLastWindowDesktopDirection] =
    useState("row");
  const [crossIconDisplay, setCrossIconDisplay] = useState("block");
  const [allTasksWordColor, setAllTasksWordColor] = useState("#3A7CFD");
  const [activeTasksWordColor, setActiveTasksWordColor] = useState("#9495a5");
  const [completedTasksWordColor, setCompletedTasksWordColor] =
    useState("#9495a5");

  //Creating a function which toggles dark and light mode styles on elements
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

    if (darkMode) {
      setIconSrc("./src/assets/icon-moon.svg");
      document
        .querySelector(".heading-div")
        .classList.remove("dark-mode-backgroundImage");
      document.querySelector("body").classList.remove("body-dark");
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
      document.querySelector("body").classList.add("body-dark");
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
        circleBackgroundColor: "transparent",
        textDecoration: "none",
        textColor: "#494c6b",
      };

      if (newTask.circleBackgroundColor === "transparent") {
        setActiveTasksArray([...activeTasksArray, newTask]);
      }

      setTasks([...tasks, newTask]);
      setAllTasksArray([...allTasksArray, newTask]);
      setTaskText(""); // Clear the input field after adding the task
    }
  };

  // Creating the function for cross icon that deletes task while onClick
  const handleCrossIconClick = (index) => {
    const updatedTasks = [...tasks];
    const updatedAllTasksArray = [...allTasksArray];
    const updatedActiveTasksArray = [...activeTasksArray];
    const updatedCompletedTasksArray = [...completedTasksArray];

    // Getting the task being removed
    const removedTask = updatedTasks[index];

    // Removing the task from all arrays
    updatedTasks.splice(index, 1);
    updatedAllTasksArray.splice(index, 1);

    // If the removed task is in completedTasksArray, removing it
    if (completedTasksArray.includes(removedTask)) {
      updatedCompletedTasksArray.splice(
        updatedCompletedTasksArray.indexOf(removedTask),
        1
      );
    } else {
      // If the removed task is not in completedTasksArray, assume it's an active task and removing it from activeTasksArray
      updatedActiveTasksArray.splice(
        updatedActiveTasksArray.indexOf(removedTask),
        1
      );
    }

    setTasks(updatedTasks);
    setAllTasksArray(updatedAllTasksArray);
    setActiveTasksArray(updatedActiveTasksArray);
    setCompletedTasksArray(updatedCompletedTasksArray);
  };

  // Creating the function which deletes every created task on clicking "clear completed"
  const handleClearCompletedClick = () => {
    const updatedAllTasksArray = allTasksArray.filter(
      (task) => !allTasksArray.includes(task)
    );

    setAllTasksArray([]);
    setActiveTasksArray([]);
    setCompletedTasksArray([]);

    setTasks(updatedAllTasksArray);
  };

  // Creating the function for tasks' circles to mark task as completed
  const handleTaskCircleClick = (index) => {
    const updatedTasks = [...tasks]; // Create a copy of the tasks array
    const task = updatedTasks[index];

    if (task.circleBackgroundColor === "transparent") {
      task.circleBackgroundColor = "blue";
      task.iconDisplay = "block";
      task.textDecoration = "line-through";
      task.textColor = "#D1D2DA";
      if (darkMode) {
        task.textColor = "#4D5067 !important";
        task.circleOpacity = "1";
      }

      // Adding the task to completedTasksArray
      setCompletedTasksArray([...completedTasksArray, task]);

      // Removing the task from activeTasksArray
      setActiveTasksArray(
        activeTasksArray.filter((activeTask) => activeTask !== task)
      );
    } else {
      task.circleBackgroundColor = "transparent";
      task.textDecoration = "none";
      task.iconDisplay = "none";
      task.textColor = "#494C6B";
      if (darkMode) {
        task.circleOpacity = "0.5";
        task.textColor = "#C8CBE7";
      }

      // Removing the task from completedTasksArray
      setCompletedTasksArray(
        completedTasksArray.filter((completedTask) => completedTask !== task)
      );

      // Adding the task to activeTasksArray
      setActiveTasksArray([...activeTasksArray, task]);
    }

    // Update the state with the modified tasks array outside the loop
    setTasks(updatedTasks);
  };

  const handleActiveWordClick = () => {
    setTasks(activeTasksArray);
    setLastWindowDisplay("none");
    setCrossIconDisplay("none");
    setLeftItemsDisplay("none");
    setLastWindowDesktopDirection("column");
    setActiveTasksWordColor("#3a7cfd ");
    setAllTasksWordColor("#9495a5 ");
    setCompletedTasksWordColor("#9495a5 ");
  };

  const handleAllWordClick = () => {
    setTasks(allTasksArray);
    setLastWindowDisplay(window.innerWidth >= 1440 ? "none" : "flex");
    setCrossIconDisplay("block");
    setLeftItemsDisplay("block");
    setLastWindowDesktopDirection("row");
    setActiveTasksWordColor("#9495a5 ");
    setAllTasksWordColor("#3a7cfd ");
    setCompletedTasksWordColor("#9495a5 ");
  };

  const handleCompletedWordClick = () => {
    setTasks(completedTasksArray);
    setLastWindowDisplay("none");
    setCrossIconDisplay("none");
    setLeftItemsDisplay("none");
    setLastWindowDesktopDirection("column");
    setActiveTasksWordColor("#9495a5 ");
    setAllTasksWordColor("#9495a5 ");
    setCompletedTasksWordColor("#3a7cfd ");
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
              className="create-todo-circle "
              onClick={handleCreateCircleClick}
            >
              {/* <img
                className="check-icon"
                src="./src/assets/icon-check.svg"
                alt="Check Icon"
              /> */}
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
                <div
                  className="circle"
                  onClick={() => handleTaskCircleClick(index)}
                  style={{
                    background: task.circleBackgroundColor,
                    opacity: task.circleOpacity,
                  }}
                >
                  <img
                    className="check-icon"
                    src="./src/assets/icon-check.svg"
                    alt="Check Icon"
                    style={{
                      display: task.iconDisplay,
                    }}
                  />
                </div>
                <p
                  className="created-task"
                  style={{
                    color: task.textColor,
                    textDecoration: task.textDecoration,
                  }}
                >
                  {task.text}
                </p>
              </div>
              <img
                className="cross"
                src="./src/assets/icon-cross.svg"
                alt="Cross Icon"
                onClick={() => handleCrossIconClick(index)}
                style={{
                  display: crossIconDisplay,
                }}
              />
            </div>
          </div>
        ))}
        <div
          className="last-window"
          style={{
            display: lastWindowDisplay,
          }}
        >
          <p className="left-items">
            {allTasksArray.length - completedTasksArray.length} items left
          </p>
          <p className="clear-completed" onClick={handleClearCompletedClick}>
            Clear Completed
          </p>
        </div>
        <div
          className="last-window-desktop"
          style={{
            flexDirection: lastWindowDesktopDirection,
          }}
        >
          <p
            className="left-items page-word"
            style={{
              display: leftItemsDisplay,
            }}
          >
            {allTasksArray.length - completedTasksArray.length} items left
          </p>
          <div className="footer-div-desktop">
            <p
              className="all page-word"
              onClick={handleAllWordClick}
              style={{
                color: allTasksWordColor,
              }}
            >
              All
            </p>
            <p
              className="active page-word"
              onClick={handleActiveWordClick}
              style={{
                color: activeTasksWordColor,
              }}
            >
              Active
            </p>
            <p
              className="completed page-word"
              onClick={handleCompletedWordClick}
              style={{
                color: completedTasksWordColor,
              }}
            >
              Completed
            </p>
          </div>
          <p
            className="clear-completed page-word"
            style={{
              display: leftItemsDisplay,
            }}
            onClick={handleClearCompletedClick}
          >
            Clear Completed
          </p>
        </div>
      </div>

      <div className="footer">
        <div className="footer-div">
          <p
            className="all"
            style={{
              color: allTasksWordColor,
            }}
            onClick={handleAllWordClick}
          >
            All
          </p>
          <p
            className="active"
            style={{
              color: activeTasksWordColor,
            }}
            onClick={handleActiveWordClick}
          >
            Active
          </p>
          <p
            className="completed"
            style={{
              color: completedTasksWordColor,
            }}
            onClick={handleCompletedWordClick}
          >
            Completed
          </p>
        </div>
      </div>
      <p className="drag-n-drop">Drag and drop to reorder list</p>
    </div>
  );
}

export default App;
