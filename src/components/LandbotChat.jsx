import React, { useEffect } from 'react';

const LandbotChat = () => {
    useEffect(() => {
        const initLandbot = () => {
            if (!window.myLandbot) {
                const script = document.createElement('script');
                script.type = 'module';
                script.async = true;
                script.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs';

                script.addEventListener('load', () => {
                    window.myLandbot = new window.Landbot.Popup({
                        configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-2840538-D1T3KO41D0YUD4DJ/index.json',
                    });
                });

                document.body.appendChild(script);
            }
        };

        window.addEventListener('mouseover', initLandbot, { once: true });
        window.addEventListener('touchstart', initLandbot, { once: true });

        return () => {
            window.removeEventListener('mouseover', initLandbot);
            window.removeEventListener('touchstart', initLandbot);
        };
    }, []);

    return null; // This component doesn't render anything visually
};

export default LandbotChat;
