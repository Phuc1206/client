import React, { useEffect } from 'react';

function Summary() {
    useEffect(() => {
        // Function to dynamically load a JavaScript file
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => resolve(script);
                script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
                document.body.appendChild(script);
            });
        };

        // Function to dynamically load a CSS file
        const loadStylesheet = (href) => {
            return new Promise((resolve, reject) => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                link.onload = () => resolve(link);
                link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`));
                document.head.appendChild(link);
            });
        };

        // Load CSS and JS files, then initialize the presentation
        Promise.all([
            loadStylesheet('/player/rlplayer.css'),
            loadScript('/player/rlplayer.js'),
            loadScript('/player/rlplayer.lang.en-US.js'),
        ])
            .then(() => {
                if (window.AtomiAP) {
                    window.AtomiAP.open('/rlprez.js', 'RD4l4hjR', {
                        playMode: 'Practice',
                        preloader: {
                            zIndex: 2,
                            diameter: 60,
                            density: 9,
                            range: 1000,
                            speed: 1,
                            color: '#2090E6',
                            shape: 'oval',
                        },
                    });
                } else {
                    console.error('AtomiAP is not defined.');
                }
            })
            .catch((error) => {
                console.error('Error loading scripts or styles:', error);
            });

        // Cleanup function to remove the dynamically added elements
        return () => {
            document.querySelectorAll('script[src="/player/rlplayer.js"]').forEach((script) => script.remove());
            document
                .querySelectorAll('script[src="/player/rlplayer.lang.en-US.js"]')
                .forEach((script) => script.remove());
            document.querySelectorAll('link[href="/player/rlplayer.css"]').forEach((link) => link.remove());
        };
    }, []);

    return (
        <div
            id="RD4l4hjR"
            className="ap-prez-container"
            lang="en-US"
            dir="ltr"
            style={{
                width: '100vw', // Full viewport width
                height: '100vh', // Full viewport height
                position: 'fixed', // Fixed position
                top: 0, // Align to top
                left: 0, // Align to left
                zIndex: 9999, // Ensure it is above other content
            }}
        >
            {/* ActivePresenter content will be loaded here */}
        </div>
    );
}

export default Summary;
