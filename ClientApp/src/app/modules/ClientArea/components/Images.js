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
    const [isLoading, setIsLoading] = useState(false);

    const loadMore = async () => {
        if (total === undefined || total > pageNumber * pageSize) {
            setIsLoading(true);
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
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const getImages = async () => {
            await loadMore()
            window.onresize = window.sortImagesDom;
        };
        getImages();
    }, []);

    if (pages.length === 0) {
        return <div className="text-center mx-3">Loading...</div>;
    }
    let persons = []
    pages.forEach(x => {
        persons = [...persons, ...x];
    })

    return (
        <>
            <div className="gridCentered">
                <div>
                    <div className="w-100">
                        <div className="position-relative;">
                            {
                                persons.map((person) => (
                                    <div key={person.name} className="grid-item position-absolute transform-animate">
                                        <div className="h-100">
                                            <Image person={person} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <LazyLoading callback={loadMore}/>
        </>
    );
};

export default ImagesCatalog;
