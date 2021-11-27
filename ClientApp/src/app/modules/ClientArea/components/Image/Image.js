import React, {useRef, useState} from "react";
import {makeStyles} from "@material-ui/core";

import ImageModal from './ImageModal';

const imgDescriptionLayer = {
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.6)', color: '#fff',
    display: 'block',
    transition: 'opacity 0.2s, visibility 0.2s',
}

const imgDescription = {
    transition: '0.2s',
    textAlign: 'center',
}

const useStyles = makeStyles((theme) => ({
    imgDescriptionLayerNoHover: Object.assign(
        {}, imgDescriptionLayer, {visibility: 'hidden', opacity: 0}),
    imgDescriptionLayerHover: Object.assign(
        {}, imgDescriptionLayer, {visibility: 'visible', opacity: '1'}),

    imgDescriptionNoHover: Object.assign(
        {}, imgDescription, {transform: 'translateY(1em)'}),
    imgDescriptionHover: Object.assign(
        {}, imgDescription, {transform: 'translateY(0)'}),

    imgHover: {filter: 'grayscale(100%)', position: 'absolute'},
    img: {filter: 'grayscale(0%)'},

    figure: {position: 'relative', marginBottom: 0},
}));

const Description = ({classes, image, name}) => (<div  style={{height: image ? `${image.height}px` : "auto"}} className={classes.imgDescriptionLayerHover}>
    <h2 className={classes.imgDescriptionHover} style={{lineHeight: image ? `${image.height}px` : "auto"}}>{name}</h2>
</div>);

const Image = ({person}) => {
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
    const image = useRef();
    return (
        <>
            <figure key={person._id} className={classes.figure} onMouseEnter={onHover} onMouseLeave={onLeave}
                    onClick={openModal}>
                <img
                    ref={image}
                    onLoad={window.sortImagesDom}
                    alt={person.name}
                    className={classes.imgHover + " w-100"}
                    loading="auto"
                    src={person.image?.length > 0 ? person.image[0] : "/images/placeholder.png"}
                />
                
                {hover && <Description classes={classes} image={image.current} name={person.name}/>}
            </figure>
            {isModalOpen ? <ImageModal person={person} open={isModalOpen} setOpen={setOpenModal}/> : null}
        </>
    )
}

export default Image