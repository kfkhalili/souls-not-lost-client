import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

import ImageModal from './ImageModal';

const imgDescriptionLayer = {
    position:'absolute', top:0, bottom:0, left:0, right:0,
    background:'rgba(0, 0, 0, 0.6)', color:'#fff',
    display:'flex', alignItems:'center', justifyContent:'center',
    transition:'opacity 0.2s, visibility 0.2s',
}

const imgDescription = {
    transition:'0.2s',
    textAlign:'center',
}

const useStyles = makeStyles((theme) => ({
    imgDescriptionLayerNoHover: Object.assign(
        {}, imgDescriptionLayer, { visibility:'hidden', opacity:0 }),
    imgDescriptionLayerHover: Object.assign(
        {}, imgDescriptionLayer, { visibility:'visible', opacity:'1' }),

    imgDescriptionNoHover: Object.assign(
        {}, imgDescription, { transform: 'translateY(1em)' }),
    imgDescriptionHover: Object.assign(
        {}, imgDescription, { transform: 'translateY(0)' }),

    imgHover: {filter: 'grayscale(100%)'},

    figure: {position:'relative'},
  }));

const Image = ({ person }) => {
    const classes = useStyles();

    const [hover, setHover] = useState(false);
    const onHover = () => {
        setHover(true);
    };
    const onLeave = () => {
        setHover(false);
    };

    const [isModalOpen, setOpenModal] = React.useState(false);
    const openModal = () => {
        setOpenModal(true);
    };
    return (
    <>
        <figure className={classes.figure} onMouseEnter={onHover} onMouseLeave={onLeave} onClick={openModal}>
            
            { hover ?
                <>
                {person.image?.length > 0 ? <img className={classes.imgHover} src={person.image[0]} alt={person.name}/> : <img className={classes.imgHover} src={"/images/placeholder.png"} alt={person.name}/> }
                <div className={classes.imgDescriptionLayerHover}>
                <h2 className={classes.imgDescriptionHover}>{person.name}</h2>
                </div>
                </>
                :
                <>
                {person.image?.length > 0 ? <img className={classes.imgHover} src={person.image[0]} alt={person.name}/> : <img className={classes.imgHover} src={"/images/placeholder.png"} alt={person.name}/> }
                <div className={classes.imgDescriptionLayerNoHover}>
                <h2 className={classes.imgDescriptionNoHover}>{person.name}</h2>
                </div>
                </>
            }
        </figure>
        { isModalOpen ? <ImageModal image={person} open={isModalOpen} setOpen={setOpenModal}/> : null }
    </>
  )
}

export default Image