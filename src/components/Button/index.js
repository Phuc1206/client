import { Link } from 'react-router-dom';
function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    disable = false,
    children,
    // className,
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
            {lefticon && <span className="mr-2">{lefticon}</span>}
            <span className="">{children}</span>
            {righticon && <span className="ml-2">{righticon}</span>}
        </Comp>
    );
}
export default Button;
