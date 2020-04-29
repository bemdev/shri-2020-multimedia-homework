window.onload = function() {
    //init all videos
    initVideo(
        document.getElementById('video-1'),
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8',
    );

    initVideo(
        document.getElementById('video-2'),
        'http://localhost:9191/live?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fstairs%2Fmaster.m3u8',
    );

    initVideo(
        document.getElementById('video-3'),
        'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8',
    );

    initVideo(
        document.getElementById('video-4'),
        'http://localhost:9191/live?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fstreet%2Fmaster.m3u8',
    );

    const videosBlocks = document.querySelectorAll('.video');

    const controls = document.querySelector('.controls');
    const btnAllCameras = document.querySelector(
        '.controls_videos button',
    );

    const fullScreen = (e, on) => {
        const video = e.currentTarget;

        if (on) {
            videosBlocks.forEach(v => {
                v.classList.remove('video__full');
                v.pause();
            });

            video.classList.add('video__full');
            controls.style.display = 'block';


            video.muted = 0;
            video.play();
            // loopDetect(video);
            loopAnalyzer();
            resume();
        } else {
            videosBlocks.forEach(v => {
                v.classList.remove('video__full');
                v.muted = 1;
                v.play();
            });
            controls.style.display = 'none';
        }
    };

    btnAllCameras.addEventListener('click', e => {
        fullScreen(e, false);
    });

    videosBlocks.forEach(video => {
        video.addEventListener('click', e => {
            fullScreen(e, true);
        });
    });
    
};