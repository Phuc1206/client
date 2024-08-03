import React, { useEffect, useRef, useState } from 'react';
import soundURL from '../../assets/sound/alarm.mp3';
import Button from '../../components/Button';
import * as adminService from '../../services/adminService';
const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const knnClassifier = require('@tensorflow-models/knn-classifier');
const { Howl } = require('howler');

const NOT_CLOSE_LABEL = 'not_close';
const CLOSE_LABEL = 'close';
const AWAY_LABEL = 'away';
const TRAINNING_TIMES = 100;
var sound = new Howl({
    src: [soundURL],
});

function Train() {
    const video = useRef();
    const classifier = useRef();
    const mobilenetModule = useRef();
    const canPlaySound = useRef(false);
    const [message, setMessage] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);

    const init = async () => {
        setMessage('Initializing...');
        await setupCamera();
        setMessage('Camera setup successfully');
        classifier.current = knnClassifier.create();
        mobilenetModule.current = await mobilenet.load();
        setMessage('Setup done. Press Train 1 to start.');
        setIsInitialized(true);
    };

    const setupCamera = () => {
        return new Promise((resolve, reject) => {
            navigator.getUserMedia =
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;

            if (navigator.getUserMedia) {
                navigator.getUserMedia(
                    { video: true },
                    (stream) => {
                        video.current.srcObject = stream;
                        video.current.addEventListener('loadeddata', resolve);
                    },
                    (error) => reject(error),
                );
            } else {
                reject();
            }
        });
    };

    const train = async (label) => {
        setMessage(`Starting training for ${label}...`);
        for (let i = 0; i < TRAINNING_TIMES; i++) {
            setMessage(`Training progress: ${parseInt(((i + 1) / TRAINNING_TIMES) * 100)}%`);
            await training(label);
        }
        setMessage(`${label} training completed.`);
    };

    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const training = (label) => {
        return new Promise(async (resolve) => {
            const embedding = mobilenetModule.current.infer(video.current, true);
            classifier.current.addExample(embedding, label);
            await sleep(100);
            resolve();
        });
    };

    const run = async () => {
        const embedding = mobilenetModule.current.infer(video.current, true);
        const result = await classifier.current.predictClass(embedding);
        if (result.label === CLOSE_LABEL && result.confidences[result.label] > 0.8) {
            setMessage('Touch detected');
            sound.play();
        } else if (result.label === AWAY_LABEL && result.confidences[result.label] > 0.8) {
            setMessage('User is away');
            sound.play();
        } else {
            setMessage('No touch detected');
        }
        await sleep(200);
        run();
    };

    const saveModel = async () => {
        const dataset = classifier.current.getClassifierDataset();
        const datasetObj = Object.keys(dataset).map((key) => ({
            label: key,
            data: Array.from(dataset[key].dataSync()),
            shape: dataset[key].shape,
        }));
        const jsonStr = JSON.stringify(datasetObj);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const formData = new FormData();
        formData.append('model', blob, 'model.json');
        await adminService.saveModel(formData);
        setMessage('Model saved successfully');
    };

    const loadModel = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = async (e) => {
            const jsonStr = e.target.result;
            const datasetObj = JSON.parse(jsonStr);
            const dataset = datasetObj.reduce((acc, { label, data, shape }) => {
                acc[label] = tf.tensor(data, shape);
                return acc;
            }, {});
            classifier.current.setClassifierDataset(dataset);
            setMessage('Model loaded successfully');
        };
        reader.readAsText(file);
    };

    useEffect(() => {
        init();
        sound.on('end', function () {
            canPlaySound.current = true;
        });
        return () => {};
    }, []);

    return (
        <div className="flex flex-col justify-center items-center">
            <video ref={video} className="w-3/6 h-2/5" autoPlay></video>
            <div className="mt-5">
                <Button primary className="mr-2" onClick={() => train(NOT_CLOSE_LABEL)} disabled={!isInitialized}>
                    Train 1
                </Button>
                <Button primary className="mr-2" onClick={() => train(CLOSE_LABEL)} disabled={!isInitialized}>
                    Train 2
                </Button>
                <Button primary className="mr-2" onClick={() => train(AWAY_LABEL)} disabled={!isInitialized}>
                    Train 3
                </Button>
                <Button primary className="mr-2" onClick={() => run()} disabled={!isInitialized}>
                    Run
                </Button>
                <Button primary className="mr-2" onClick={() => saveModel()} disabled={!isInitialized}>
                    Save Model
                </Button>
                <input type="file" onChange={loadModel} />
            </div>
            {message && <div className="mt-4 p-2 border rounded bg-gray-100">{message}</div>}
        </div>
    );
}

export default Train;
