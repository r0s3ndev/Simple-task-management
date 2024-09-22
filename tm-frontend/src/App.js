import ListTask from "./component/ListTask";
import DenseAppBar from "./component/DenseAppBar";
import BasicModal from "./component/BasicModal";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MDBBtn } from 'mdb-react-ui-kit';

function App() {
  const [task, setTask] = useState([]);
  const [taskId, setTaskId] = useState('');
  const [currentTask, setCurrentTask] = useState(null); 
  const [filteredTask, setFilteredTask] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');

  useEffect(() => {
    renderAllTask();
  }, []);
  
  const toggleModal = (mode, taskData = null) => {
    setModalMode(mode);         //'add' or 'edit'
    setCurrentTask(taskData);   //null if mode = 'add' || Task obj if mode = 'edit'
    setOpenModal(!openModal);   //toggle the modal
  };

  const handleSubmit = (data) => {
    if (modalMode === 'add') {
      addTask(data);
    } else {
      updateTask(data);
    }
  };

  // API CALL
  const renderAllTask = () => {
      axios.get("http://localhost:8080/getAllTask")
      .then(res => {
          const t = res.data;
          setTask(t);
          setFilteredTask(t);
      })
  }

  const deleteTask = (id) => {
    axios.delete(`http://localhost:8080/deleteTask/${id}`)
    .then(() => {
        
        renderAllTask();
    })
    .catch(err => {
        console.error("Error deleting task:", err);
    });
  }

  const addTask = (data) => {
    console.log(data);
    axios.post("http://localhost:8080/addTask", data)
    .then(()=>{
      console.log("task added");
      renderAllTask();
    })
    .catch(()=>{
      console.error("something went wrond while adding a new task!");
    })
  }

  const updateTask = (data) => {
    axios.post(`http://localhost:8080/updateTask/${taskId}`, data)
    .then(() => {
      console.log("task updated!");
      renderAllTask();
    })
    .catch(()=>{
      console.error("something went wrond while updating task!");
    })
  }

  const searchTask = (searchText) => {
    if(!searchText){
      setFilteredTask(task);
    } else {
      const filtered = task.filter(t => 
        t.title.toLowerCase().includes(searchText.toLowerCase())|| 
        t.description.toLowerCase().includes(searchText.toLowerCase())
      );
      if(filtered.length === 0){
        renderAllTask();
        return;
      } else {
        setFilteredTask(filtered);
      }
    }
  }

  return (
    <div style={{"backgroundImage":"url('https://freerangestock.com/sample/139899/abstract-background--blue-waves-and-particles--technology--li.jpg')", "backgroundAttachment": "fixed"}}>
      <div style={{"width":"1100px","height": "1000px", "margin": "auto", "backgroundColor": "white", "textColor" : "white"}}>
        <DenseAppBar 
          searchTask={searchTask}
        />
        <MDBBtn  
          style={{"opacity" : "80%"}}
          className="w-100 p-4 " 
          color='secondary' 
          rippleColor='dark' 
          onClick={() => toggleModal('add')}> <h3><strong>ADD TASK</strong></h3>
        </MDBBtn>
        <ListTask 
          task={filteredTask} 
          deleteTask={deleteTask} 
          updateTask={(task) => toggleModal('edit', task)} 
          taskId={(taskId)=>
          setTaskId(taskId)}
        />
        <BasicModal isOpen={openModal}
          toggleOpen={() => setOpenModal(false)}
          mode={modalMode}
          taskData={currentTask}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default App;
