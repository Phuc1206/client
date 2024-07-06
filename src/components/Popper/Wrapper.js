import PropTypes from 'prop-types';
function Wrapper({ children, className }) {
    return (
        <div className="w-full bg-white shadow-lg rounded-lg max-h-96 min-h-24 pt-2 pb-2 flex flex-col">{children}</div>
    );
}

Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
export default Wrapper;
