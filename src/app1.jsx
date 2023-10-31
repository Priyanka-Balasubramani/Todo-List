import { useState,useEffect } from 'react'
import './App.css'
import {AiOutlineDelete} from 'react-icons/ai'
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription,  setnewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState ([]);
  // const buttonStyle = {
  //   backgroundColor: isCompleteScreen ? 'rgb(5, 223, 168)' : 'grey',
  // };
  // const buttonStylea = {
  //   backgroundColor: isCompleteScreen==true ? 'rgb(5, 223, 168)' : 'grey',
  // };
  const savedTodo = JSON.parse(localStorage.getItem('todolist'));
  
  const handleAddTodo = ()=>{
    let newTodoItem ={
      title:newTitle,
      description:newDescription,
    };
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    setNewTitle('');
    setnewDescription('');
  };

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    let savedCompletedToDos = JSON.parse (
      localStorage.getItem ('completedTodos')
    );
    if(savedTodo){
      setTodos(savedTodo);
    }
    if (savedCompletedToDos) {
      setCompletedTodos (savedCompletedToDos);
    }
  },[]);

  const handleToDoDelete = index => {
    let reducedTodos = [...allTodos];
    reducedTodos.splice (index,1);
    localStorage.setItem ('todolist', JSON.stringify (reducedTodos));
    setTodos(reducedTodos);
  };
  
  const handleCompletedTodoDelete = index => {
    let reducedCompletedTodos = [...completedTodos];
    reducedCompletedTodos.splice (index);
    localStorage.setItem (
      'completedTodos',
      JSON.stringify (reducedCompletedTodos)
    );
    setCompletedTodos (reducedCompletedTodos);
  };
  
  const handleComplete = index => {
    const date = new Date ();
    var dd = date.getDate ();
    var mm = date.getMonth () + 1;
    var yyyy = date.getFullYear ();
    var hh = date.getHours ();
    var minutes = date.getMinutes ();
    var ss = date.getSeconds ();
    var finalDate =
      dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

    let filteredTodo = {
      ...allTodos[index],
      completedOn: finalDate,
    };
    let updatedCompletedList = [...completedTodos, filteredTodo];
    console.log (updatedCompletedList);
    setCompletedTodos (updatedCompletedList);
    localStorage.setItem (
      'completedTodos',
      JSON.stringify (updatedCompletedList)
    );
    handleToDoDelete (index);
  };

  return (
    <>
      <div className='My-ToDo'>
        <div className='todo-wrapper'>
          <div className='todo-header'>
            <h2>My ToDo-List</h2>
          </div>
          <div className='todo-input'>

            <div className='todo-input-item'>
              <label>Title</label>
              <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="Add task title"/>
            </div>
            <div className='todo-input-item'>
              <label>Description</label>
              <input type="text" value={newDescription} onChange={(e)=>setnewDescription(e.target.value)} placeholder="Add task description"/>
            </div>
            <div className='todo-input-item'>
              <button type="button" onClick={handleAddTodo} className='primaryButton'>Add</button>
            </div>

          </div>

          <div className='todo-button-area'>
            <button type="button" className='secondaryButton'>ToDo</button>
            <button type="button" className='secondaryButton'>Completed</button>
            {/* <button className={`isCompleteScreen ${isCompleteScreen===false && "active"}`} onClick={()=>setIsCompleteScreen(false)} style={buttonStyle}>ToDo</button>
            <button className={`isCompleteScreen ${isCompleteScreen===true && "active"}`}  onClick={()=>setIsCompleteScreen(true)} style={buttonStylea}>Completed</button> */}
          </div>

          <div className='todo-list'>
            {isCompleteScreen === false && allTodos.map((item,index) => {
              return(
                <div className='todo-list-item' key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <AiOutlineDelete className='icon' title="Delete?" onClick={() => handleToDoDelete(index)}/>
                    <BsCheckLg className='check-icon' title="Complete?" onClick={() => handleComplete (index)}/>
                  </div>
                </div>
              )}
            )}
            {isCompleteScreen === true &&
            completedTodos.map ((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p> <i>Completed at: {item.completedOn}</i></p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleCompletedTodoDelete (index)}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default App
