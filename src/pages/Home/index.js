import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import * as apiService from '../../services/apiService';
import Image from '../../components/image';

function Home() {
    const [courses, setCourses] = useState([]);

    const fetchCourses = async () => {
        try {
            const response = await apiService.getHome();
            setCourses(response);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const banners = [
        { id: 1, src: 'https://i.pinimg.com/736x/b6/9a/34/b69a34c28a3434411e484b875aec1d13.jpg', alt: 'Banner 1' },
        { id: 2, src: 'https://i.pinimg.com/564x/da/8d/28/da8d287d2cf4941ed9f77b4c9e60225f.jpg', alt: 'Banner 2' },
        { id: 3, src: 'https://i.pinimg.com/564x/5a/b2/c2/5ab2c27f7b78f9caad6f2cf5205ac56e.jpg', alt: 'Banner 3' },
    ];

    return (
        <div className="h-full flex flex-col w-full justify-center items-center p-2">
            <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={3000}
                transitionTime={500}
                className="w-full mb-8"
            >
                {banners.map((banner) => (
                    <div key={banner.id} className="flex justify-center items-center">
                        <img src={banner.src} alt={banner.alt} className="max-h-96 object-contain" />
                    </div>
                ))}
            </Carousel>
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-2 xl:p-5">
                {courses.map((course) => (
                    <div
                        key={course._id}
                        className="relative bg-white border rounded-lg shadow-md transform transition duration-500 hover:scale-105"
                    >
                        <div className="absolute top-3 right-3 rounded-full bg-violet-600 text-gray-200 w-6 h-6 text-center">
                            {course.students_count.length}
                        </div>
                        <div className="p-2 flex justify-center">
                            <Link to={`/course/${course.slug}`}>
                                <Image src={course.image} className="rounded-md"></Image>
                            </Link>
                        </div>

                        <div className="px-4 pb-3">
                            <div>
                                <Link to={`/course/${course.slug}`}>
                                    <h5 className="text-xl font-semibold tracking-tight hover:text-violet-800 text-gray-900">
                                        {course.title}
                                    </h5>
                                </Link>

                                <p className="antialiased text-gray-600 text-sm truncate">{course.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
