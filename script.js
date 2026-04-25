const startBtn = document.getElementById('startBtn');
const ui = document.querySelector('.ui');
const scene = document.getElementById('scene');
const titles = document.getElementById('titles');
const titleText = document.getElementById('titleText');
const nigmare = document.getElementById('nigmare');
const darkOne = document.getElementById('darkOne');
const flash = document.getElementById('flash');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

startBtn.addEventListener('click', async () => {
    // Hide UI
    ui.style.display = 'none';

    // Add idle animations
    nigmare.classList.add('anim-idle');
    darkOne.classList.add('anim-idle');

    // Sequence 1: Zoom in on Nigmare
    scene.style.transform = 'scale(1.5) translateX(15%) translateY(10%)';
    scene.style.transition = 'transform 3s ease-in-out';
    await sleep(3000);

    // Title flash: NIGMARE
    titleText.innerText = 'NIGMARE';
    titles.style.opacity = '1';
    titles.style.transition = 'opacity 0.2s';
    await sleep(800);
    titles.style.opacity = '0';
    await sleep(1000);

    // Sequence 2: Pan to Dark One
    scene.style.transform = 'scale(1.5) translateX(-15%) translateY(10%)';
    await sleep(3000);

    // Title flash: THE DARK ONE
    titleText.innerText = 'THE DARK ONE';
    titleText.style.color = '#555';
    titleText.style.textShadow = '0 0 20px #222, 2px 2px 0px #fff';
    titles.style.opacity = '1';
    await sleep(800);
    titles.style.opacity = '0';
    await sleep(1000);

    // Sequence 3: Zoom out for the clash
    scene.style.transform = 'scale(1) translateX(0) translateY(0)';
    await sleep(2000);

    // Sequence 4: Charge!
    nigmare.style.transition = 'left 0.5s cubic-bezier(0.5, 0, 0.5, 1)';
    darkOne.style.transition = 'right 0.5s cubic-bezier(0.5, 0, 0.5, 1)';
    
    // Stop idle anims, raise arms
    nigmare.classList.remove('anim-idle');
    darkOne.classList.remove('anim-idle');
    
    nigmare.querySelector('.arm.right').style.transform = 'rotate(120deg)';
    darkOne.querySelector('.arm.left').style.transform = 'rotate(-120deg)';

    nigmare.style.left = '45%';
    darkOne.style.right = '45%';

    await sleep(500);

    // Sequence 5: IMPACT
    flash.style.opacity = '1';
    flash.style.transition = 'opacity 0.1s';
    
    // Screen shake
    scene.style.animation = 'shake 0.5s infinite';
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes shake {
            0% { transform: translate(10px, 10px) rotate(0deg); }
            10% { transform: translate(-10px, -20px) rotate(-1deg); }
            20% { transform: translate(-30px, 0px) rotate(1deg); }
            30% { transform: translate(30px, 20px) rotate(0deg); }
            40% { transform: translate(10px, -10px) rotate(1deg); }
            50% { transform: translate(-10px, 20px) rotate(-1deg); }
            60% { transform: translate(-30px, 10px) rotate(0deg); }
            70% { transform: translate(30px, 10px) rotate(-1deg); }
            80% { transform: translate(-10px, -10px) rotate(1deg); }
            90% { transform: translate(10px, 20px) rotate(0deg); }
            100% { transform: translate(10px, -20px) rotate(-1deg); }
        }
    `;
    document.head.appendChild(style);

    await sleep(100);
    flash.style.opacity = '0';
    flash.style.transition = 'opacity 1s';

    await sleep(500);
    scene.style.animation = 'none';

    // Sequence 6: Aftermath
    nigmare.style.left = '40%';
    darkOne.style.right = '40%';
    darkOne.style.transform = 'scaleX(-1) rotate(-30deg) translateY(50px)';
    darkOne.style.transition = 'all 1s ease-out';

    // Final text
    await sleep(1500);
    titleText.innerText = 'K.O.';
    titleText.style.color = '#ffaa00';
    titleText.style.textShadow = '0 0 20px #ff0000, 2px 2px 0px #fff';
    titles.style.opacity = '1';
    titles.style.transition = 'opacity 2s';

    // Show button again to replay
    await sleep(3000);
    ui.style.display = 'flex';
    startBtn.innerText = 'TEKRAR OYNAT';
    startBtn.onclick = () => location.reload();
});
