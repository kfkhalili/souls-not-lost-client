import React from "react";
import Image from "./Image/Image";
import './Images.css'
import {useState, useEffect} from "react";
import axios from 'axios'

const ImagesCatalog = () => {
    const [persons, setImages] = useState([]);

    useEffect(() => {
        const getImages = async () => {
            const response = await axios.get("/api/public/person");
            setImages(response?.data?.entities || []);
        };
        getImages();
    }, []);

    if (persons.length == 0) {
        return "No Images To Show";
    }

    return (
        <div id="imagesContainer" style={{margin: "-39px -26px"} }>
            {persons.map((person) => (
                <Image key={person.name} person={person}/>
            ))}
        </div>
    );
};

export default ImagesCatalog;
