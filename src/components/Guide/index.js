import React, { useRef, useEffect, useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../../helpers/AuthContext';

function Guide({ show, onClose }) {
    const modalRef = useRef(null);
    const { authState } = useContext(AuthContext);
    const [currentStep, setCurrentStep] = useState(0);
    const steps = useMemo(
        () => [
            {
                title: 'Step 1',
                description:
                    'Chào cậu! Mình là Miu - hướng dẫn viên tại F8, mình sẽ đưa cậu đi thăm quan và giới thiệu cho cậu hiểu rõ hơn về F8 nhé. Đi thôi!.',
                highlightId: 'section1',
                position: 'center',
                removeBackground: false,
            },
            {
                title: 'Step 2',
                description: `Đây là khu vực trung tâm của màn hình này, toàn bộ nội dung các bài học như là video, hình ảnh, văn bản sẽ được hiển thị ở đây ${authState.username} nhé ^^ .`,
                highlightId: 'section2',
                position: 'right',
                removeBackground: true,
            },
            {
                title: 'Step 3',
                description:
                    'Tiếp theo là khu vực quan trọng không kém, đây là danh sách các bài học tại khóa này. Cậu sẽ rất thường xuyên tương tác tại đây để chuyển bài học đấy >_<.',
                highlightId: 'section3',
                position: 'top',
                removeBackground: true,
            },
            {
                title: 'Step 4',
                description:
                    ' theo mặc định các bài học tại F8 đều bị khóa. Khi cậu hoàn thành bài học phía trước thì bài sau sẽ tự động được mở. Mà lúc học cậu đừng có tua video, vì sẽ không được tính là hoàn thành bài học đâu đấy nhé ^^.',
                highlightId: 'section3',
                position: 'center',
                removeBackground: false,
            },
        ],
        [authState.username],
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setCurrentStep(0);
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    useEffect(() => {
        // Scroll to or highlight the element based on the current step
        const elementToHighlight = document.getElementById(steps[currentStep].highlightId);
        if (elementToHighlight) {
            elementToHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [currentStep, steps]);

    const handlePrevious = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        if (currentStep === steps.length - 1) {
            onClose();
        } else {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
        }
    };

    if (!show) {
        return null;
    }

    const currentStepDetails = steps[currentStep];
    const modalPositionStyle = {
        position: 'fixed',
        top: currentStepDetails.position === 'top' ? '10%' : 'auto',
        left: currentStepDetails.position === 'left' ? '10%' : 'auto',
        right: currentStepDetails.position === 'right' ? '2%' : 'auto',
        bottom: currentStepDetails.position === 'bottom' ? '10%' : 'auto',
        transform: currentStep === 2 ? 'translateX(280px)' : 'none', // Move step 3 slightly to the right
    };
    const backgroundClass = currentStepDetails.removeBackground
        ? 'bg-gray-500 bg-opacity-5'
        : 'bg-gray-500 bg-opacity-60';

    return (
        <div className={`fixed inset-0 ${backgroundClass} flex justify-center items-center`}>
            <div
                ref={modalRef}
                className="bg-white rounded-lg p-8 max-w-md mx-auto relative"
                style={modalPositionStyle}
            >
                <h2 className="text-xl font-bold mb-4">{currentStepDetails.title}</h2>
                <p className="mb-4">{currentStepDetails.description}</p>
                <label className="flex items-center text-orange-400 mb-4">
                    <input type="checkbox" className="mr-2" />
                    Nghe giọng Miu @_@
                </label>
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentStep === 0}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Quay lại
                    </button>
                    <div className="flex flex-grow justify-center gap-4">
                        {steps.map((step, i) => (
                            <div
                                key={i}
                                className={`relative flex flex-col justify-center items-center w-7 ${
                                    i <= currentStep ? 'text-orange-400' : 'text-gray-400'
                                }`}
                            >
                                <div
                                    className={`w-10 h-10 flex justify-center items-center z-10 relative rounded-full font-semibold text-white ${
                                        i === currentStep ? 'bg-orange-500' : 'bg-slate-700'
                                    }`}
                                >
                                    {i + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={handleNext} className="bg-orange-500 text-white px-4 py-2 rounded">
                        {currentStep === steps.length - 1 ? 'Bye miu~~' : currentStep >= 1 ? 'Đi tiếp' : 'Theo Miu'}
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
