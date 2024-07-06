import axios from 'axios';
import React, { useEffect, useState } from 'react';
function Home() {
    const [listOfCourses, setlistOfCourses] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/').then((response) => {
            setlistOfCourses(response.data);
        });
    }, []);
    return (
        <div className="Home h-full">
            {listOfCourses.map((value, index) => {
                return (
                    <div className="" key={index}>
                        <h2>{value.name}</h2>
                    </div>
                );
            })}
        </div>
    );
}
export default Home;
