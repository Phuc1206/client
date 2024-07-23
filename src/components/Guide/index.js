import React from 'react';
import PropTypes from 'prop-types';

function Guide({ show, onClose }) {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">Chào cậu! Mình là Miu - hướng dẫn viên tại F8</h2>
                <p className="mb-4">
                    Mình sẽ đưa cậu đi thăm quan và giới thiệu cho cậu hiểu rõ hơn về F8 nhé. Đi thôi!
                </p>
                <div className="flex justify-between items-center">
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Nghe giọng Miu @_@
                    </label>
                    <button onClick={onClose} className="bg-orange-500 text-white px-4 py-2 rounded">
                        Theo Miu
                    </button>
                </div>
            </div>
        </div>
    );
}

Guide.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Guide;
