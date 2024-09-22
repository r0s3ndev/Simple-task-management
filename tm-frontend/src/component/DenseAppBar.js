import { useState} from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBInputGroup ,
  MDBBtn,
  MDBInput
} from 'mdb-react-ui-kit';

const DenseAppBar = ({searchTask}) =>{
  const [searchText, setSearchText] = useState('');
  const handleChange = (e) => {
    setSearchText(e.target.value);
  }
  return (
    <>
      <MDBNavbar bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand>Task Management</MDBNavbarBrand>
            <MDBInputGroup  className='d-flex w-auto mb-3'>
            <MDBInput 
              className='form-control' 
              label="Type something..."
              aria-label="Search"
              onChange={handleChange}
              onKeyDown={()=>searchTask(searchText)}
              />
              <MDBBtn outline onClick={()=>searchTask(searchText)}>Search</MDBBtn>
            </MDBInputGroup >
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}

export default DenseAppBar;