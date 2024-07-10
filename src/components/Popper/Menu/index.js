import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import Wrapper from '../Wrapper';
import MenuItem from './MenuItem';
import Header from './HeaderPopper';
import { useState } from 'react';
const defaultFn = () => {};
function Menu({ children, items = [], hideOnClick = false, onChange = defaultFn, onClick }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1];
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory([...history, item.children]);
                        } else {
                            onChange(item);
                        }
                        if (item.onClick) {
                            onClick();
                        }
                    }}
                />
            );
        });
    };
    return (
        <Tippy
            interactive
            offset={[12, 8]}
            delay={[0, 500]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={(attrs) => (
                <div className="w-56 max-w-lg" tabIndex="-1" {...attrs}>
                    <Wrapper>
                        {history.length > 1 && (
                            <Header
                                title={current.title}
                                onBack={() => {
                                    setHistory(history.slice(0, -1));
                                }}
                            />
                        )}
                        <div className="overflow-y-auto">{renderItems()}</div>
                    </Wrapper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    onChange: PropTypes.func,
};
export default Menu;
