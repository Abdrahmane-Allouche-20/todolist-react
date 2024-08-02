import React, { useRef, useState, useEffect } from "react";
import "./todo.css"; // Assuming your CSS file is named todo.css
import Refresh from "../assets/icons8-refresh.gif";
import Fireworks from "../assets/fireworks.gif";
import { FaCheck } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import Colors from "../assets/wheel.png";

function Todo() {
  const getFromLocalStorage = () => {
    let task = localStorage.getItem("tasks");
    if (task) {
      return JSON.parse(task);
    } else {
      return [];
    }
  };

  const [editIndex, setEditIndex] = useState(null);
  const [textEdit, setEditText] = useState("");
  const [tasks, setTasks] = useState(getFromLocalStorage());
  const [completedCount, setCompletedCount] = useState(0);
  const [color, setColor] = useState("#151515");
  const [showColors, setShowColors] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const ref = useRef();

  // Save tasks to local storage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleTask() {
    const task = ref.current.value;
    if (task !== "") {
      setTasks([...tasks, { text: task.toLowerCase(), done: false }]);
      ref.current.value = "";
    }
    setErrorMessage('')
  }

  function deleteTask(index) {
    const isDone = tasks[index].done;
    setTasks(tasks.filter((_, i) => i !== index));
    if (isDone) {
      setCompletedCount(completedCount - 1);
    }
     setErrorMessage('')
  }

  function handleFinish(index) {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        task.done = !task.done;
        setCompletedCount(task.done ? completedCount + 1 : completedCount - 1);
      }
      return task;
    });
    setTasks(updatedTasks);
    setErrorMessage('')
  }

  function handleEdit(index) {
    setEditIndex(index);
    setEditText(tasks[index].text);
  }

  function updateTask(index) {
    if (textEdit.trim() === "") {
      setErrorMessage("Task cannot be empty");
      return;
    }
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        task.text = textEdit;
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditText("");
    setErrorMessage("");
  }

  const progressPercentage = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div>
      <div className="static ml-2 mt-2 lg:mt-0 lg:ml-0 lg:fixed lg:top-2 lg:left-2 ">
        <div
          onClick={() => setShowColors(!showColors)}
          className="relative top-0 left-0 lg:top-10 lg:left-2 flex p-1.5 md:p-3 rounded-lg shadow lg w-fit bg-white justify-center items-center cursor-pointer"
        >
          <img src={Colors} className="h-6 w-6 md:w-8 md:h-8 lg:w-10 lg:h-10" alt="Colors" />
          <div
            className={`absolute ${showColors ? ' lg:h-fit p-2 md:p-3.5 ' : 'lg:h-0 w-0 '} duration-300 lg:w-fit overflow-hidden top-0 left-10 md:left-16 lg:top-[70px] lg:left-0 rounded-lg bg-white gap-3 md:gap-4 justify-between lg:justify-center items-center shadow-xl flex flex-row lg:flex-col`}
          >
            <div onClick={() => setColor("#FFDB00")} className="rounded-full w-6 h-5 md:w-8 md:h-7 lg:w-10 lg:h-10 bg-[#FFDB00] cursor-pointer"></div>
            <div onClick={() => setColor("#f83434")} className="rounded-full w-6 h-5 md:w-8 md:h-7 lg:w-10 lg:h-10 bg-[#f83434] cursor-pointer"></div>
            <div onClick={() => setColor("#6FDCE3")} className="rounded-full w-6 h-5 md:w-8 md:h-7 lg:w-10 lg:h-10 bg-[#6FDCE3] cursor-pointer"></div>
            <div onClick={() => setColor("#FF4E88")} className="rounded-full w-6 h-5 md:w-8 md:h-7 lg:w-10 lg:h-10 bg-[#FF4E88] cursor-pointer"></div>
            <div onClick={() => setColor("#FB773C")} className="rounded-full w-6 h-5 md:w-8 md:h-7 lg:w-10 lg:h-10 bg-[#FB773C] cursor-pointer"></div>
            <div onClick={() => setColor("#88D66C")} className="rounded-full w-6 h-5 md:w-8 md:h-7 lg:w-10 lg:h-10 bg-[#88D66C] cursor-pointer"></div>
            <div onClick={() => setColor("#151515")} className="cursor-pointer">
              <img src={Refresh} className="w-6 h-5 md:w-8 md:h-7 lg:w-10 lg:h-10" alt="Refresh" />
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-2xl lg:max-w-5xl mx-auto flex flex-col-reverse lg:flex-row justify-end items-center lg:items-start lg:justify-center gap-5">
        <div className="w-11/12 lg:flex-1 my-3 rounded-xl border-2 border-slate-100 bg-white p-1.5 lg:p-3 shadow-xl h-fit">
          <div className="rounded-lg lg:rounded-2xl relative overflow-hidden">
            <input
              ref={ref}
              type="text"
              placeholder="Add Tasks..."
              style={{ color: color, borderColor: color }}
              className={`p-1.5 lg:px-3 w-full outline-none pr-10 lg:pr-20 h-full duration-300 placeholder:text-[${color}] text-[#${color}] text-sm lg:text-xl font-black py-2 lg:py-4 rounded-lg lg:rounded-2xl border-2 border-[${color}]`}
            />
            <button
              onClick={handleTask}
              className={`absolute right-0 top-0 duration-300 hover:bg-[#2f2282] w-20 lg:w-28 bg-[${color}] h-full text-sm lg:text-xl text-white font-bold rounded`}
              style={{ background: color }}
            >
              Add Task
            </button>
          </div>
          <div className="p-1.5 lg:p-3 gap-4">
            {tasks.length > 0 ? (
              <p
                className={`text-lg lg:text-2xl font-bold duration-300 text-[${color}] my-2 text-color-transition`}
                style={{ color: color }}
              >
                Your Tasks :
              </p>
            ) : (
              <p
                className={`text-lg lg:text-2xl font-bold duration-300 text-[${color}] my-2 text-color-transition`}
                style={{ color: color }}
              >
                Add More Tasks Captain...
              </p>
            )}
            {tasks.map((task, index) => (
              <div
                key={index}
                className={`${task.done ? 'line-through cursor-no-drop opacity-40' : ''} 'bg-[${color}] flex duration-300 flex-wrap justify-between items-center border-2 p-2 lg:p-3 rounded-lg lg:rounded-xl my-1 shadow-lg`}
                style={{ backgroundColor:color ? color : '#fff' }}
              >
                {editIndex === index ? (
                  <input
                    type="text"
                    value={textEdit}
                    onChange={(e) => setEditText(e.target.value)}
                    className={`p-1 w-10/12 outline outline-white  border-[${color}] text-base md:text-2xl font-bold border-2 rounded-lg`}
                    style={{borderColor:color}}
                  />
                ) : (
                  <span
                    className={`${
                      task.done ? "line-through" : ""
                    } decoration-[3px] md:decoration-[5px] text-base md:text-2xl font-bold ${
                      color !== "#1C1259" && color !== "#151515"
                        ? "text-black"
                        : "text-white"
                    } duration-300 text-color-transition`}
                  >
                    {task.text}
                  </span>
                )}
                <div className="flex justify-between items-center gap-1">
                  {editIndex === index ? (
                    <button
                      className="bg-white hover:scale-110 duration-300 rounded-full p-1 shadow-md shadow-white"
                      onClick={() => updateTask(index)}
                    >
                      <FaCheck className="text-base md:text-xl text-green-600" />
                    </button>
                  ) : (
                    <div className="flex justify-between items-center gap-1">
                    <button
                      className={`${ task.done && 'pointer-events-none' } bg-white hover:scale-110 duration-300 rounded-full p-1 shadow-md shadow-white`}
                      onClick={() => handleEdit(index)}
                    >
                      <MdEdit className="text-sm md:text-xl text-slate-900" />
                    </button>
                    <button
                      className="bg-white hover:scale-110 duration-300 rounded-full p-1 shadow-md shadow-white"
                      onClick={() => handleFinish(index)}
                    >
                      <FaCheck className="text-base md:text-xl text-green-600" />
                    </button>
                    <button
                    className="bg-white hover:scale-110 duration-300 rounded-full p-1 shadow-md shadow-white"
                    onClick={() => deleteTask(index)}
                  >
                    <MdDelete className="text-base md:text-xl text-red-500" />
                  </button>
                    </div>
                  )}
                  
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-11/12 md:flex-1 my-3 h-fit rounded-xl border-2 border-slate-200 bg-white px-3 md:px-5 py-6 md:py-10 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 my-3">
              <h2
                className={`text-lg md:text-2xl text-[${color}] font-black text-color-transition duration-300`}
                style={{ color: color }}
              >
                Your Progress :
              </h2>
              <p
                className={`text-base md:text-lg text-[${color}] font-bold text-color-transition duration-300 mt-2`}
                style={{ color: color }}
              >
                {progressPercentage === 100 ? "I AM PROUD OF YOU" : "Keep up captain"}
              </p>
              <div className="w-full h-4 md:h-6 bg-gray-300 rounded-full overflow-hidden mt-4">
                <div
                  className="h-full rounded-full transition-all duration-500 progress-bar"
                  style={{
                    width: `${progressPercentage}%`,
                    backgroundColor: color,
                  }}
                ></div>
              </div>
              <div className={`text-[${color}] font-black mt-2`} style={{ color: color }}>
                Progress: {Math.floor(progressPercentage)} %
              </div>
            </div>

            <div className="mt-2">
              <div
                className={`w-28 md:w-32 mx-auto md:mx-0 h-28 md:h-32 rounded-full flex justify-center duration-300 items-center ${color !== "#1C1259" ? 'border-slate-100' : 'border-white'} border-4 shadow-xl`}
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}, 0 0 5px ${color}, 0 0 5px ${color}`,
                }}
              >
                <div className="text-white font-black text-2xl md:text-3xl">
                  <span>{completedCount}</span> / <span>{tasks.length}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 md:mt-0 items-center">
            {progressPercentage === 100 && (
              <div className="flex justify-between items-center">
                <img src={Fireworks} className="w-1/3" />
                <img src={Fireworks} className="w-1/3" />
                <img src={Fireworks} className="w-1/3" />
              </div>
            )}
          </div>
        </div>
      </div>
      {errorMessage && (
        <div className={`text-[${color}] text-xl duration-300 font-bold
         md:text-3xl text-center mt-2`}
        style={{color:color}}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default Todo;
