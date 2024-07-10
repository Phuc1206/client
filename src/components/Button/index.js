import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    disable = false,
    children,
    // className,
    topicon,
    lefticon,
    righticon,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        // className,
        onClick,
        ...passProps,
    };
    let classes = 'item-center inline-flex justify-center text-base font-semibold min-w-24 py-2 px-4 rounded ';
    if (primary) classes += 'bg-orange-500 text-white hover:bg-orange-600 ';
    if (outline) classes += 'border-2 border-orange-500 text-orange-500 hover:border-orange-600 hover:bg-orange-50 ';
    if (text) classes += 'hover:underline hover:decoration-2 ';
    if (disable) {
        classes += 'pointer-events-none opacity-50 select-none';
        Object.keys(props).forEach((keys) => {
            if (keys.startsWith('on') && typeof props[keys] === 'function') {
                delete props[keys];
            }
        });
    }
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    return (
        <Comp className={classes} {...props}>
            {lefticon && <span className="mr-2 inline-block w-6 text-center">{lefticon}</span>}
            {topicon && <span className="mb-2 inline-block w-6 text-center">{topicon}</span>}
            <span className="">{children}</span>
            {righticon && <span className="ml-2 inline-block w-6 text-center">{righticon}</span>}
        </Comp>
    );
}
Button.propTypes = {
    to: propTypes.string,
    href: propTypes.string,
    primary: propTypes.bool,
    outline: propTypes.bool,
    text: propTypes.bool,
    disable: propTypes.bool,
    children: propTypes.node.isRequired,
    lefticon: propTypes.node,
    righticon: propTypes.node,
    onClick: propTypes.func,
};
export default Button;
