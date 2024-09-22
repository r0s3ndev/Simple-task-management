
import { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput
} from 'mdb-react-ui-kit';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

const BasicModal = ({isOpen, toggleOpen, mode, taskData, handleSubmit}) => {
  const [error, setError] = useState('');
  const [data, setData] = useState({
    title: '',
    description: '',
    date: '',
    status: 'To start'
  });

  useEffect(()=>{
    if(mode === 'add'){
      resetForm();
    }
    if(taskData){
      setData({
        title: taskData.title || '',
        description: taskData.description || '',
        date: taskData.date || '',
        status:  taskData.status || 'To Start'
      });
    }
   
  }, [taskData, mode]);

  //remove data from the modal when closing it
  const resetForm = () => {
    setData({
      title: '',
      description: '',
      date: '',
      status: 'To start'
    });
    setError('');
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    setError('')
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(data.title === "" || data.description === "" || data.date === "" || data.status === ""){
      setError("Please fill all the field!");
    } else {
      handleSubmit(data);
      toggleOpen();
      resetForm();
    }
  }
  

  return (
    <div>
      <MDBModal tabIndex='-1' open={isOpen} onClose={toggleOpen}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{mode === 'edit' ? "Edit Task" : "What's your plan?"}</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={onSubmit}>
              <MDBModalBody>
                    <MDBInput className="mt-3" label="Title" name="title" id="title" type="text" value={data.title} onChange={handleChange}/>
                    <MDBInput className="mt-3" label="Description" name="description" id="description" type="text" value={data.description} onChange={handleChange}/>
                    <InputGroup className="mt-3">
                        <InputGroup.Text className="bg-secondary bg-gradient text-white">Date & status</InputGroup.Text>
                        <input
                        name="date"
                        type="date"
                        id="dateInput"
                        className="form-control mb-3"
                        min={new Date().toISOString().split('T')[0]}
                        value={data.date}
                        onChange={handleChange}
                        />

                        <Form.Select aria-label="Default select example" className="form-control" name="status" value={data.status} onChange={handleChange}>
                            <option value="To start">To start</option>
                            <option value="In progress">In progress</option>
                            <option value="Completed">Completed</option>
                        </Form.Select>
                    </InputGroup>
              </MDBModalBody>

              <MDBModalFooter>
                {error && <p className='text-danger'>{error}</p>}
                <MDBBtn type="button" color='secondary' onClick={toggleOpen}>
                  Close
                </MDBBtn>
                <MDBBtn type='submit'>{mode === 'edit' ? 'Save Changes' : 'Save Task'}</MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export default BasicModal;