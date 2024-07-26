import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import Image from '../image';

const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: vi });
};

const CourseProgress = ({ progress }) => {
    if (!progress.length) return <p className="text-sm text-gray-500">Bạn chưa đăng kí khóa học nào</p>;
    return (
        <div>
            {progress.map((progress) => (
                <div key={progress._id} className="flex items-center space-x-4">
                    <Image className="flex-shrink-0 w-24 h-16 rounded-md" src={progress.course.image} />
                    <div className="flex-grow">
                        <h4 className="font-medium">{progress.course.title}</h4>
                        <p className="text-sm text-gray-500">{timeAgo(progress.updatedAt)}</p>
                        <div className="relative pt-1">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                                <div
                                    style={{ width: `${progress.progress}%` }}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseProgress;
