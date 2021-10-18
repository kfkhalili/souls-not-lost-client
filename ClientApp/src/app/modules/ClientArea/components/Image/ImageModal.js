import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Table} from 'react-bootstrap';
import moment from "moment";
const dateFormatter = (date) => moment(date).format('yyyy-MM-DD');
const getModalStyle = () => {
  const top = 50, left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ImageModal = ({ person, open, setOpen }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const handleClose = () => setOpen(false);

  return (
    <Modal size={'lg'} centered={true} show={open} onHide={handleClose}>
      <Modal.Body className='p-0 '>
        <div className='container-fluid p-0'>
          <div className='row no-gutters'>
            <div className='col-12 col-md-6 d-flex justify-content-center align-items-center'>
              {person.image?.length > 0 ? <img className='w-100' src={person.image[0]} alt={person.name}/> : <img className={classes.imgHover} src={"/images/placeholder.png"} alt={person.name}/> }
            </div>
            <div className='col-12 col-md-6'>
              <Table>
                <tbody>
                <tr>
                  <td>Name</td>
                  <td>{person.name}</td>
                </tr>
                <tr>
                  <td>Occupation</td>
                  <td>{person.occupation?.join(', ')}</td>
                </tr>
                <tr>
                  <td>Nationality</td>
                  <td>{person.nationality?.name}</td>
                </tr>             
                <tr>
                  <td>Date of Birth</td>
                  <td>{dateFormatter(person.birth)}</td>
                </tr>
                <tr>
                  <td>Date of Death</td>
                  <td>{dateFormatter(person.death)}</td>
                </tr>                
                <tr>
                  <td>Death place</td>
                  <td>{person.deathPlace?.name}</td>
                </tr>
                <tr>
                  <td>Cause of death</td>
                  <td>{person.causeOfDeath}</td>
                </tr>         
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;
