import PropTypes from 'prop-types';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HeaderPopper({ title, onBack }) {
    return (
        <header className="relative h-12 -mt-2 shrink-0">
            <button className="w-12 h-full bg-transparent" onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h4 className="absolute left-1/3 top-1/2 transform -translate-y-2/4 -inset-2translate-x-2/4 font-semibold">
                {title}
            </h4>
        </header>
    );
}

HeaderPopper.propTypes = {
    title: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
};
export default HeaderPopper;
