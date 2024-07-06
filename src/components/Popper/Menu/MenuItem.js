import PropTypes from 'prop-types';
import Button from '../../Button';
function MenuItem({ data, onClick }) {
    let classes = 'hover:bg-slate-100 px-1 py-1 ';
    if (data.separate) classes += 'border-t-2';
    return (
        <div className={classes}>
            <Button lefticon={data.icon} to={data.to} onClick={onClick}>
                {data.title}
            </Button>
        </div>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};
export default MenuItem;
