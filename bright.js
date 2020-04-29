const brightnessInput = document.getElementById(
    'brightness-input',
);

const contrastInput = document.getElementById('contrast-input');
const contrastLabel = document.getElementById(
    'contrast-input-value',
);

const brightnessLabel = document.getElementById(
    'brightness-input-value',
);

const update = () => {
    const video = document.querySelector('.video.video__full');
    const brightness = brightnessInput.value;
    const contrast = contrastInput.value;

    video.style.filter = `brightness(${brightness}) contrast(${contrast})`;
    brightnessLabel.innerText = brightness;
    contrastLabel.innerText = contrast;
};

[brightnessInput, contrastInput].forEach(input => {
    input.addEventListener('input', update);
});