import { useState, useEffect } from 'react';
import * as apiService from '../../services/apiService';

function Home() {
    const [courses, setCourses] = useState([]);
    const fetchCourses = async () => {
        try {
            const response = await apiService.getHome();
            console.log(response);
            setCourses(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    useEffect(() => {
        fetchCourses();
    }, []);
    return (
        <div className="h-full flex w-full justify-center items-center  p-2">
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5">
                {courses.map((course) => (
                    <div
                        key={course._id}
                        className="relative bg-white border rounded-lg shadow-md   transform transition duration-500 hover:scale-105"
                    >
                        <div className="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200  w-6 h-6 text-center">
                            {course.students_count.length}
                        </div>
                        <div className="p-2 flex justify-center">
                            <a href="#">
                                <img className="rounded-md" src={course.image} loading="lazy"></img>
                            </a>
                        </div>

                        <div className="px-4 pb-3">
                            <div>
                                <a href="#">
                                    <h5 className="text-xl font-semibold tracking-tight hover:text-violet-800  text-gray-900  ">
                                        {course.title}
                                    </h5>
                                </a>

                                <p className="antialiased text-gray-600  text-sm truncate">{course.description}</p>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="relative bg-white border rounded-lg shadow-md   transform transition duration-500 hover:scale-105">
                    <div className="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200  w-6 h-6 text-center">
                        19
                    </div>

                    <div className="p-2 flex justify-center">
                        <a href="#">
                            <img
                                className="rounded-md"
                                src="https://tailwindflex.com/public/images/thumbnails/radio-buttons/thumb_u.min.webp"
                                loading="lazy"
                            ></img>
                        </a>
                    </div>

                    <div className="px-4 pb-3">
                        <div>
                            <a href="#">
                                <h5 className="text-xl font-semibold tracking-tight hover:text-violet-800  text-gray-900  ">
                                    Input
                                </h5>
                            </a>

                            <p className="antialiased text-gray-600  text-sm break-all">description</p>
                        </div>
                    </div>
                </div>

                <div className="relative bg-white border rounded-lg shadow-md   transform transition duration-500 hover:scale-105">
                    <div className="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200  w-6 h-6 text-center">
                        18
                    </div>
                    <div className="p-2 flex justify-center">
                        <a href="#">
                            <img
                                className="rounded-md"
                                src="https://tailwindflex.com/public/images/thumbnails/buttons-with-border-bottom/thumb_u.min.webp"
                                loading="lazy"
                            ></img>
                        </a>
                    </div>

                    <div className="px-4 pb-3">
                        <div>
                            <a href="#">
                                <h5 className="text-xl font-semibold tracking-tight hover:text-violet-800  text-gray-900  ">
                                    Button
                                </h5>
                            </a>
                            <p className="antialiased text-gray-600  text-sm break-all">description</p>
                        </div>
                    </div>
                </div>
                <div className="relative bg-white border rounded-lg shadow-md   transform transition duration-500 hover:scale-105">
                    <div className="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200  w-6 h-6 text-center">
                        18
                    </div>
                    <div className="p-2 flex justify-center">
                        <a href="#">
                            <img
                                className="rounded-md"
                                src="https://tailwindflex.com/public/images/thumbnails/buttons-with-border-bottom/thumb_u.min.webp"
                                loading="lazy"
                            ></img>
                        </a>
                    </div>

                    <div className="px-4 pb-3">
                        <div>
                            <a href="#">
                                <h5 className="text-xl font-semibold tracking-tight hover:text-violet-800  text-gray-900  ">
                                    Button
                                </h5>
                            </a>
                            <p className="antialiased text-gray-600  text-sm break-all">description</p>
                        </div>
                    </div>
                </div>

                <div className="relative bg-white border rounded-lg shadow-md   transform transition duration-500 hover:scale-105">
                    <div className="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200  w-6 h-6 text-center">
                        15
                    </div>

                    <div className="p-2 flex justify-center">
                        <a href="https://tailwindflex.com/tag/form">
                            <img
                                className="rounded-md"
                                src="https://tailwindflex.com/public/images/thumbnails/sb-admin-2-login-page-with-tailwind/canvas.min.webp"
                                loading="lazy"
                            ></img>
                        </a>
                    </div>

                    <div className="px-4 pb-3">
                        <div>
                            <a href="https://tailwindflex.com/tag/form">
                                <h5 className="text-xl font-semibold tracking-tight hover:text-violet-800  text-gray-900  ">
                                    Form
                                </h5>
                            </a>

                            <p className="antialiased text-gray-600  text-sm break-all">description</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
