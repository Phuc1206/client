import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Image from '../image';

function truncateDescription(description) {
    const lineHeight = 16; // Adjust based on your font size and line height
    const maxHeight = lineHeight * 2; // Show up to 2 lines

    // Create a temporary element to measure the height
    const tempElement = document.createElement('div');
    tempElement.style.position = 'absolute';
    tempElement.style.visibility = 'hidden';
    tempElement.style.width = 'calc(100% - 20px)'; // Adjust width based on your container
    tempElement.style.maxHeight = `${maxHeight}px`;
    tempElement.style.overflow = 'hidden';
    tempElement.style.whiteSpace = 'pre-wrap';
    tempElement.style.wordWrap = 'break-word';
    tempElement.style.lineHeight = '1.5'; // Adjust based on your line height
    document.body.appendChild(tempElement);

    // Set text content and measure
    tempElement.textContent = description;

    // Check if the content exceeds the height limit
    if (tempElement.scrollHeight > maxHeight) {
        let truncatedText = description;
        // Loop to find the correct truncation point
        while (tempElement.scrollHeight > maxHeight && truncatedText.length > 0) {
            truncatedText = truncatedText.slice(0, -1); // Remove one character
            tempElement.textContent = truncatedText + '...';
        }
        return tempElement.textContent; // Return truncated text with ellipsis
    }

    // Clean up and return original text if it fits within the limit
    document.body.removeChild(tempElement);
    return description;
}

function CourseItem({ data }) {
    const truncatedDescription = truncateDescription(data.description);

    return (
        <Link to={`/course/${data.slug}`} className="flex items-center py-1.5 px-4 cursor-pointer hover:bg-slate-100">
            <Image src={data.image} alt={data.title} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1 ml-3">
                <div className="flex items-center">
                    <h4 className="text-sm font-semibold truncate">{data.title}</h4>
                    {data.students_count && (
                        <FontAwesomeIcon className="text-sm text-sky-400 ml-1" icon={faCheckCircle} />
                    )}
                </div>
                <span
                    className="block text-xs text-slate-400 overflow-hidden"
                    style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        maxHeight: '2.5em', // Adjust based on your line height and font size
                    }}
                    dangerouslySetInnerHTML={{ __html: truncatedDescription }}
                />
            </div>
        </Link>
    );
}

CourseItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default CourseItem;
