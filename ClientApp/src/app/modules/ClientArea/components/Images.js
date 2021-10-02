import React from "react";
import Image from "./Image/Image";
import './Images.css'
import {useState, useEffect} from "react";
import axios from 'axios'

const ImagesCatalog = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const getImages = async () => {

            const images = await axios.get("/api/public/person");
            const imagesFromServer = [
                {
                    name: "Ghassan Kanafani",
                    url: "https://images.gr-assets.com/authors/1506632700p8/16473822.jpg",
                },
                {
                    name: "Naji Al-Ali",
                    url: "https://i2-prod.hulldailymail.co.uk/incoming/article601610.ece/ALTERNATES/s615b/Naji-Al-Ali.jpg",
                },
                {
                    name: "Yusuf Abu Hussein",
                    url: "https://www.egypttoday.com/siteimages/Larg/202105190238173817.jpg",
                },
                {
                    name: "Razan Al Najjar",
                    url: "https://www.medico.de/fileadmin/_processed_/6/a/csm_Razan_Al-Najja_dc6cf4f633.jpg",
                },
                {
                    name: "Ali Abu Alia",
                    url: "https://live-production.wcms.abc-cdn.net.au/f8ac396c7bcce4e317819445ebb1a4a0",
                },
                {
                    name: "Tom Hurndall",
                    url: "https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/cartoons/2010/7/20/1279616891136/Tom-Hurndall-006.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=ba2bb33c5b24a9c0d8556f192ebae014",
                },
                {
                    name: "Wadie Haddad",
                    url: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Wadie_Addad2.jpg",
                },
                {
                    name: "Ahmed Bouchikhi",
                    url: "https://upload.wikimedia.org/wikipedia/en/7/71/Ahmed_Bouchiki.jpg",
                },
                {
                    name: "Imad Mughniyeh",
                    url: "https://upload.wikimedia.org/wikipedia/en/e/ed/Imad_Mughniyeh.jpeg",
                },
                {
                    name: "Mai Afaneh",
                    url: "https://www.palestinechronicle.com/wp-content/uploads/2021/06/Mai-Afaneh-678x455.png",
                },
                {
                    name: "Fadi Mohammad al-Batsh",
                    url: "https://cdnimg.vietnamplus.vn/uploaded/mtpyelagtpy/2018_04_21/fadi_mohammad_albatsh_21.jpg",
                },
                {
                    name: "Rachel Corrie",
                    url: 'https://imemc.org/wp-content/uploads/2017/03/rachel-corriecourtesy-rachel-corrie-foundation-1.jpg'
                },
                {
                    name: "Bassel al-Araj",
                    url: "https://upload.wikimedia.org/wikipedia/en/c/cd/Bassel_al-Araj.jpg"
                },
                {
                    name: 'İbrahim Bilgen',
                    url: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Bilgen.jpg'
                },
                {
                    name: 'Çetin Topçuoğlu',
                    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Cetintopcu.jpg'
                },
                {
                    name: 'Furkan Doğan',
                    url: 'https://upload.wikimedia.org/wikipedia/en/7/7d/Furkan_Do%C4%9Fan.jpg'
                },
            ];
            setImages(images?.data?.entities || []);
        };

        getImages();
    }, []);

    if (images.length == 0) {
        return "No Images To Show";
    }

    return (
        <div id="imagesContainer">
            {images.map((image) => (
                <Image key={image.url} image={image}/>
            ))}
        </div>
    );
};

export default ImagesCatalog;
