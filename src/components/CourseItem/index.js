import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import Image from '../image';
function CourseItem({ data }) {
    return (
        <Link to={`/${data.nickname}`} className="flex items-center py-1.5 px-4 cursor-pointer hover:bg-slate-100">
            <Image src={data.avatar} alt={data.full_name} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1 ml-3">
                <h4 className="text-sm font-semibold">
                    <span>{data.full_name}</span>
                    {data.tick && <FontAwesomeIcon className="ml-1 text-sm text-sky-400" icon={faCheckCircle} />}
                </h4>
                <span className="text-xs text-slate-400">{data.nickname}</span>
            </div>
        </Link>
    );
}
CourseItem.propTypes = {
    data: propTypes.object.isRequired,
};
export default CourseItem;
