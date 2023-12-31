import React, { useState, useEffect } from "react";
import "./style.css";

function App() {
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
          <svg
            width="109"
            height="20"
            viewBox="0 0 109 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.0266 10.0266C25.0266 8.25354 25.4743 6.59575 26.3697 5.05319C27.2651 3.51063 28.4796 2.28281 30.0133 1.36968C31.547 0.456556 33.2092 0 35 0C36.7908 0 38.453 0.456556 39.9867 1.36968C41.5204 2.28281 42.7438 3.51063 43.6569 5.05319C44.57 6.59575 45.0266 8.25354 45.0266 10.0266C45.0266 11.8351 44.57 13.5018 43.6569 15.0266C42.7438 16.5514 41.5204 17.7615 39.9867 18.6569C38.453 19.5523 36.7908 20 35 20C33.1915 20 31.5248 19.5523 30 18.6569C28.4752 17.7615 27.2651 16.5514 26.3697 15.0266C25.4743 13.5018 25.0266 11.8351 25.0266 10.0266ZM13.1915 0.212766V3.93617H8.43085V19.7872H4.57447V3.93617H0V0.212766H13.1915ZM29.8271 13.1649C29.2863 12.2074 29.016 11.1614 29.016 10.0266C29.016 8.85638 29.2819 7.79256 29.8138 6.83511C30.3457 5.87766 31.0683 5.11968 31.9814 4.56117C32.8945 4.00266 33.9096 3.7234 35.0266 3.7234C36.1436 3.7234 37.1587 4.00266 38.0718 4.56117C38.9849 5.11968 39.7074 5.87766 40.2394 6.83511C40.7713 7.79256 41.0372 8.85638 41.0372 10.0266C41.0372 11.1791 40.7801 12.2296 40.266 13.1782C39.7518 14.1268 39.0426 14.8803 38.1383 15.4388C37.234 15.9973 36.2323 16.2766 35.133 16.2766C33.9982 16.2766 32.9654 15.9973 32.0346 15.4388C31.1037 14.8803 30.3679 14.1223 29.8271 13.1649ZM58.8564 0.212766H64.7075C67.2075 0.212766 69.2642 0.695917 70.8777 1.66223C72.4911 2.62855 73.6658 3.87854 74.4016 5.41223C75.1374 6.94593 75.5053 8.59042 75.5053 10.3457C75.5053 12.2252 75.0621 13.883 74.1755 15.3191C73.289 16.7553 72.0966 17.859 70.5984 18.6303C69.1002 19.4016 67.4557 19.7872 65.6649 19.7872H58.8564V0.212766ZM69.7606 14.5213C68.5904 15.5497 67.0036 16.0638 65 16.0638H62.7128V3.90957H65.8511C66.6135 3.90957 67.4246 4.08688 68.2846 4.44149C69.1445 4.7961 69.898 5.43439 70.5452 6.35638C71.1924 7.27837 71.516 8.5195 71.516 10.0798C71.516 12.0124 70.9309 13.4929 69.7606 14.5213ZM88.1383 10.0266C88.1383 8.25354 88.586 6.59575 89.4814 5.05319C90.3768 3.51063 91.5913 2.28281 93.125 1.36968C94.6587 0.456556 96.3209 0 98.1117 0C99.9025 0 101.565 0.456556 103.098 1.36968C104.632 2.28281 105.855 3.51063 106.769 5.05319C107.682 6.59575 108.138 8.25354 108.138 10.0266C108.138 11.8351 107.682 13.5018 106.769 15.0266C105.855 16.5514 104.632 17.7615 103.098 18.6569C101.565 19.5523 99.9025 20 98.1117 20C96.3032 20 94.6365 19.5523 93.1117 18.6569C91.5869 17.7615 90.3768 16.5514 89.4814 15.0266C88.586 13.5018 88.1383 11.8351 88.1383 10.0266ZM92.9255 6.83511C92.3936 7.79256 92.1277 8.85638 92.1277 10.0266C92.1277 11.1614 92.398 12.2074 92.9388 13.1649C93.4796 14.1223 94.2154 14.8803 95.1463 15.4388C96.0771 15.9973 97.1099 16.2766 98.2447 16.2766C99.344 16.2766 100.346 15.9973 101.25 15.4388C102.154 14.8803 102.863 14.1268 103.378 13.1782C103.892 12.2296 104.149 11.1791 104.149 10.0266C104.149 8.85638 103.883 7.79256 103.351 6.83511C102.819 5.87766 102.097 5.11968 101.184 4.56117C100.27 4.00266 99.2553 3.7234 98.1383 3.7234C97.0213 3.7234 96.0062 4.00266 95.0931 4.56117C94.18 5.11968 93.4575 5.87766 92.9255 6.83511Z"
              fill="white"
              className="logo"
              alt="Logo"
            />
          </svg>
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              onClick={toggleDarkMode}
            >
              <path
                fill="#FFF"
                fillRule="evenodd"
                d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              onClick={toggleDarkMode}
            >
              <path
                fill="#FFF"
                fillRule="evenodd"
                d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
              />
            </svg>
          )}
        </div>
        <form id="create-new">
          <div className="circle-and-input">
            <div
              className="create-todo-circle "
              onClick={handleCreateCircleClick}
            ></div>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                    <path
                      fill="none"
                      stroke="#FFF"
                      strokeWidth="2"
                      className="check-icon"
                      alt="Check Icon"
                      style={{
                        display: task.iconDisplay,
                      }}
                      d="M1 4.304L3.696 7l6-6"
                    />
                  </svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                <path
                  fill="#494C6B"
                  fillRule="evenodd"
                  className="cross"
                  alt="Cross Icon"
                  onClick={() => handleCrossIconClick(index)}
                  style={{
                    display: crossIconDisplay,
                  }}
                  d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
                />
              </svg>
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
