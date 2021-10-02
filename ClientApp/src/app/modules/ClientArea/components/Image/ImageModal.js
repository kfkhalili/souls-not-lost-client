import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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

const ImageModal = ({ image, open, setOpen }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const handleClose = () => setOpen(false);

  return (
    <Modal open={open} onClose={handleClose}>
      <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">{image.name}</h2>
      <p id="simple-modal-description">{image.name}</p>
      </div>
    </Modal>
  );
};

export default ImageModal;
