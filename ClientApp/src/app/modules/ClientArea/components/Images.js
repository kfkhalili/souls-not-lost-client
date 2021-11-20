import React from "react";
import Image from "./Image/Image";
import './Images.css'
import {useState, useEffect} from "react";
import axios from 'axios'
import {LazyLoading} from "./LazyLoading";
import {isArray} from "lodash";
const pageSize = 5;

const ImagesCatalog = () => {
    const [pages, setPages] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [total, setTotal] = useState(undefined);

    const loadMore = async () => {
        if (total === undefined || total > pageNumber * pageSize) {
            const response = await axios.get("/api/public/person", {
                params: {
                    filterBy: "death",
                    pageNumber: pageNumber + 1,
                    pageSize: pageSize
                }
            });
            if (isArray(response?.data?.entities)) {
                setPages([...pages, response?.data?.entities]);
                setTotal(response?.data?.totalCount || 0);
            }
            setPageNumber(pageNumber + 1);
        }
    }

    useEffect(() => {
        const getImages = async () => {
            await loadMore()
        };
        getImages();
    }, []);

    if (pages.length === 0) {
        return <div className="text-center mx-3">Loading...</div>;
    }

    return (
        <>
            <div id="imagesContainer">
                {pages.map(persons => (
                    <>
                        {
                            persons.map((person) => (
                                <Image key={person.name} person={person}/>
                            ))
                        }
                        {persons.length && <LazyLoading callback={loadMore}/>}
                    </>
                ))}
            </div>
        </>
    );
};

export default ImagesCatalog;
