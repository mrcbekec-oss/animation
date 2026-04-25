const startBtn = document.getElementById('startBtn');
const ui = document.querySelector('.ui');
const scene = document.getElementById('scene');
const titles = document.getElementById('titles');
const titleText = document.getElementById('titleText');
const wenda = document.getElementById('wenda');
const gray = document.getElementById('gray');
const flash = document.getElementById('flash');
const subtitles = document.getElementById('subtitles');
const clashEffect = document.getElementById('clashEffect');
const bloodExplosion = document.getElementById('bloodExplosion');
const darkness = document.getElementById('darkness');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeSubtitle(text, color = '#fff', duration = 2000) {
    subtitles.style.color = color;
    subtitles.innerText = text;
    subtitles.style.opacity = '1';
    await sleep(duration);
    subtitles.style.opacity = '0';
    await sleep(500);
}

function shakeScreen(intensity = 10, durationMs = 500) {
    scene.style.animation = 'none';
    void scene.offsetWidth;
    const iter = Math.floor(durationMs / 50);
    scene.style.animation = `shake ${iter * 0.05}s infinite`;
    
    let styleEl = document.getElementById('shakeStyle');
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = 'shakeStyle';
        document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `
        @keyframes shake {
            0% { transform: translate(${intensity}px, ${intensity}px) rotate(0deg); }
            25% { transform: translate(-${intensity}px, -${intensity}px) rotate(-1deg); }
            50% { transform: translate(-${intensity}px, ${intensity}px) rotate(1deg); }
            75% { transform: translate(${intensity}px, -${intensity}px) rotate(-1deg); }
            100% { transform: translate(${intensity}px, ${intensity}px) rotate(0deg); }
        }
    `;
    
    setTimeout(() => {
        scene.style.animation = 'none';
    }, durationMs);
}

startBtn.addEventListener('click', async () => {
    // Hide UI
    ui.style.display = 'none';

    // Set initial positions & classes
    wenda.style.left = '15%';
    gray.style.right = '15%';
    wenda.style.bottom = '30%';
    gray.style.bottom = '30%';
    wenda.classList.add('anim-idle');
    gray.classList.add('anim-idle');
    
    // Phase 1: Intro
    scene.style.transform = 'scale(1.2) translateY(5%)';
    scene.style.transition = 'transform 3s ease-in-out';
    await sleep(2000);

    // Dialogue 1
    await typeSubtitle("Wenda: Yetersizsin, Gray.", "#ffffff", 2000);
    
    scene.style.transform = 'scale(1.2) translateX(-5%) translateY(5%)';
    await typeSubtitle("Gray: ...", "#888888", 1500);

    scene.style.transform = 'scale(1) translateX(0) translateY(0)';
    await sleep(1000);

    // Phase 2: Brutal Beatdown by Wenda
    wenda.classList.remove('anim-idle');
    gray.classList.remove('anim-idle');
    
    wenda.style.transition = 'left 0.1s ease-in';
    gray.style.transition = 'right 0.2s ease-out';
    
    await typeSubtitle("Wenda: YOK OL!", "#ffffff", 1000);

    // Flurry of punches
    for(let i=0; i<15; i++) {
        // Wenda teleports close to Gray
        let hitX = 30 + Math.random() * 20; // Wenda moves right
        wenda.style.left = hitX + '%';
        wenda.style.bottom = (25 + Math.random()*15) + '%';
        
        // Gray gets pushed back
        let gRight = parseInt(gray.style.right || '15');
        gray.style.right = (gRight - 2) + '%';
        gray.style.bottom = (25 + Math.random()*15) + '%';
        
        // Punch animations
        let hand = (i%2 === 0) ? '.hand.right' : '.hand.left';
        wenda.querySelector(hand).style.transform = `translate(80px, ${Math.random()*40 - 20}px) scale(1.5)`;
        
        shakeScreen(15, 100);
        clashEffect.style.left = '60%';
        clashEffect.style.top = (100 - parseInt(gray.style.bottom)) + '%';
        clashEffect.style.opacity = '0.8';
        clashEffect.style.transform = `translate(-50%, -50%) scale(${1 + Math.random()})`;
        
        await sleep(100);
        
        wenda.querySelector(hand).style.transform = '';
    }
    
    clashEffect.style.opacity = '0';
    
    // Final heavy blow by Wenda
    wenda.querySelector('.hand.right').style.transform = 'translate(100px, -50px) scale(3)';
    await sleep(200);
    
    shakeScreen(30, 500);
    flash.style.opacity = '1';
    await sleep(50);
    flash.style.opacity = '0';
    
    gray.style.transition = 'all 1s cubic-bezier(0.1, 0.9, 0.2, 1)';
    gray.style.right = '-10%';
    gray.style.bottom = '10%'; // Falls to ground
    gray.style.transform = 'scaleX(-1) rotate(-90deg)'; // Lying down
    
    wenda.style.transition = 'all 0.5s ease';
    wenda.style.left = '20%';
    wenda.style.bottom = '30%';
    wenda.classList.add('anim-idle');
    wenda.querySelector('.hand.right').style.transform = '';

    await sleep(2000);

    // Phase 3: Wenda's arrogance
    await typeSubtitle("Wenda: Fazla kolaydı...", "#ffffff", 2500);
    
    // Phase 4: The Scary Transformation
    await sleep(1000);
    darkness.style.opacity = '1'; // Red/black overlay fades in
    shakeScreen(2, 3000); // Low rumble
    
    await typeSubtitle("Gray: ...", "#ff0000", 2000);
    
    // Snap into scary mode
    gray.style.transition = 'none'; // Instant snap
    gray.style.transform = 'scaleX(-1) rotate(0deg)'; // Stands up instantly
    gray.style.right = '10%';
    gray.style.bottom = '30%';
    
    gray.classList.add('scary-mode');
    
    shakeScreen(20, 500);
    flash.style.opacity = '1';
    flash.style.background = '#ff0000';
    await sleep(50);
    flash.style.opacity = '0';
    flash.style.background = '#fff';

    await typeSubtitle("Gray: K  A  N . . .", "#880000", 2000);
    
    // Phase 5: The Scary Kill
    wenda.classList.remove('anim-idle');
    await sleep(1000);
    
    // Gray teleports/dashes instantly
    gray.style.transition = 'right 0.1s linear';
    gray.style.right = '60%'; // Right in front of Wenda
    
    gray.querySelector('.hand.left').style.transform = 'translate(-60px, -80px) scale(2)';
    gray.querySelector('.hand.right').style.transform = 'translate(-60px, -80px) scale(2)';
    
    await sleep(100);
    
    // Smash Wenda
    shakeScreen(40, 1000);
    bloodExplosion.style.opacity = '1';
    bloodExplosion.style.left = '25%';
    bloodExplosion.style.transform = 'translate(-50%, -50%) scale(5)';
    bloodExplosion.style.transition = 'transform 0.5s ease-out, opacity 1.5s';
    
    wenda.style.transition = 'all 0.5s ease-out';
    wenda.style.left = '-30%'; // Blown away completely
    wenda.style.bottom = '60%';
    wenda.style.transform = 'rotate(-180deg)';

    await sleep(1500);
    bloodExplosion.style.opacity = '0';
    darkness.style.opacity = '0';
    
    gray.querySelector('.hand.left').style.transform = '';
    gray.querySelector('.hand.right').style.transform = '';

    await sleep(2000);

    // Phase 6: K.O.
    titleText.innerText = 'K.O.';
    titleText.style.color = '#880000';
    titleText.style.textShadow = '0 0 20px #000, 2px 2px 0px #f00';
    titles.style.opacity = '1';
    titles.style.transition = 'opacity 2s';

    await sleep(3000);
    ui.style.display = 'flex';
    startBtn.innerText = 'TEKRAR OYNAT';
    startBtn.onclick = () => location.reload();
});
