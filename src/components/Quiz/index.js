import { useState, useEffect } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');
function Quiz({ isOpen, onRequestClose, lesson }) {
    const [selectedOption, setSelectedOption] = useState('');
    const [hasSelected, setHasSelected] = useState(false);

    useEffect(() => {
        if (lesson) {
            setSelectedOption('');
            setHasSelected(false);
        }
    }, [lesson]);

    // Handler for option change
    const handleOptionChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        setHasSelected(true);
    };

    const getOptionClass = (option) => {
        if (hasSelected) {
            if (option === lesson.answer) {
                return 'bg-blue-500 text-white';
            } else if (option === selectedOption) {
                return 'bg-red-500 text-white';
            }
        }
        return '';
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Quiz Modal"
            className="flex items-center justify-center p-4 w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg mt-32"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="w-full bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Quiz Time!</h2>
                {lesson ? (
                    <div>
                        <p className="text-lg mb-4">{lesson.question}</p>
                        <form>
                            <div className={`mb-2 p-2 rounded ${getOptionClass('a')}`}>
                                <input
                                    type="radio"
                                    id="option_a"
                                    name="answer"
                                    value="a"
                                    onChange={handleOptionChange}
                                    disabled={hasSelected}
                                />
                                <label htmlFor="option_a" className="ml-2">
                                    {lesson.option_a}
                                </label>
                            </div>
                            <div className={`mb-2 p-2 rounded ${getOptionClass('b')}`}>
                                <input
                                    type="radio"
                                    id="option_b"
                                    name="answer"
                                    value="b"
                                    onChange={handleOptionChange}
                                    disabled={hasSelected}
                                />
                                <label htmlFor="option_b" className="ml-2">
                                    {lesson.option_b}
                                </label>
                            </div>
                            <div className={`mb-2 p-2 rounded ${getOptionClass('c')}`}>
                                <input
                                    type="radio"
                                    id="option_c"
                                    name="answer"
                                    value="c"
                                    onChange={handleOptionChange}
                                    disabled={hasSelected}
                                />
                                <label htmlFor="option_c" className="ml-2">
                                    {lesson.option_c}
                                </label>
                            </div>
                            <div className={`mb-2 p-2 rounded ${getOptionClass('d')}`}>
                                <input
                                    type="radio"
                                    id="option_d"
                                    name="answer"
                                    value="d"
                                    onChange={handleOptionChange}
                                    disabled={hasSelected}
                                />
                                <label htmlFor="option_d" className="ml-2">
                                    {lesson.option_d}
                                </label>
                            </div>
                        </form>
                        {hasSelected && <p className="mt-4 text-sm text-gray-600">{lesson.explanation}</p>}
                    </div>
                ) : (
                    <p>No lesson content available.</p>
                )}
                <button onClick={onRequestClose} className="btn btn-primary mt-4">
                    Close
                </button>
            </div>
        </Modal>
    );
}

export default Quiz;
