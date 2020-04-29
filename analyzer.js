const volumeText = document.getElementById('volume-text');
const volumeMeter = document.getElementById('volume-meter');
const videosBlocks = document.querySelectorAll('.video');

let source;

//audio analyzer
const audioCtx = new (window.AudioContext ||
    window.webkitAudioContext)();

// создаем ChannelMerger, который позволяет "слить" несколько аудио-потоков в один
const merger = audioCtx.createChannelMerger(2);
merger.connect(audioCtx.destination);

videosBlocks.forEach(v => {
    source = audioCtx.createMediaElementSource(v);
    source.connect(merger);
    source.connect(audioCtx.destination);
})

// const source = audioCtx.createMediaElementSource(video);

const analyser = audioCtx.createAnalyser();
analyser.fftSize = 32;

merger.connect(analyser);

const streamData = new Uint8Array(analyser.frequencyBinCount);

function getVolume() {
    // записываем данные в streamData
    analyser.getByteFrequencyData(streamData);
    // усредняем
    let total = 0;
    for (let i = 0; i < streamData.length; i++) {
        total += streamData[i];
    }
    return (
        streamData.reduce((acc, val) => acc + val, 0) /
        255 /
        streamData.length
    );
}

function loopAnalyzer() {
    const volume = getVolume();
    volumeText.innerText = volume.toFixed(2);
    volumeMeter.style.transform = `scaleX(${volume})`;
    requestAnimationFrame(loopAnalyzer);
}

function disconnect () {
    merger = undefined;
    source = undefined;
    analyser = undefined;
    audioCtx = undefined;
}

function resume () {
    audioCtx.resume();
}