import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdb-react-ui-kit';
import { useState } from 'react';

const ListTask = ({task, deleteTask, updateTask, taskId}) => {
    const [openModal, setopenModal] = useState(false);

    const handleEditTask = (task) => {
        if(openModal){
            taskId(task.id);
            updateTask(task);
        }
        setopenModal(!openModal);
    }
    return(
        <>
            <MDBTable hover>
                <MDBTableHead>
                    <tr >
                        <th>ID</th>
                        <th>TITLE</th>
                        <th>DESCRIPTION</th>
                        <th>EXP. DATE</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                    </tr>
                </MDBTableHead>   
                <MDBTableBody>
                    {task.map((task) => (
                   
                        <tr onClick={() => handleEditTask(task)}
                        style = {{cursor: "pointer"}}
                        key={task.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <th component="th" scope="row">
                                {task.id}
                            </th>
                            <th>{task.title}</th>
                            <th>{task.description}</th>
                            <th>{task.date}</th>
                            <th>{task.status}</th>
                            <th><MDBBtn className='me-1' color='danger' onClick={()=>deleteTask(task.id)}> delete </MDBBtn></th>

                        </tr>
                     
                    ))}
                </MDBTableBody>
            </MDBTable>
        </>
    );
}

export default ListTask;




 
