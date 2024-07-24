import React from 'react';
import PropTypes from 'prop-types';

function Guide({ show, onClose }) {
    if (!show) {
        return null;
    }
    const steps = ['1', '2', '3'];
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-4">Chào cậu! Mình là Miu - hướng dẫn viên tại F8</h2>
                <p className="mb-4">
                    Mình sẽ đưa cậu đi thăm quan và giới thiệu cho cậu hiểu rõ hơn về F8 nhé. Đi thôi!
                </p>
                <label className="flex items-center text-orange-400 mb-4">
                    <input type="checkbox" className="mr-2" />
                    Nghe giọng Miu @_@
                </label>
                <div className="flex justify-between items-center">
                    <button>Quay lại</button>
                    <div className="flex justify-between">
                        {steps.map((step, i) => (
                            <div
                                key={i}
                                className="relative flex flex-col justify-center items-center w-10 before:content-[''] before:(bg-slate-200 absolute w-full h-[3px] right-2/4 top-1/3 -translate-y-2/4)"
                            >
                                <div className="w-10 h-10 flex z-10 relative bg-slate-700 rounded-full font-semibold text-white ">
                                    {i + 1}
                                </div>
                                <p className="text-orange-400">{step}</p>
                            </div>
                        ))}
                    </div>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded">Theo Miu</button>
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
