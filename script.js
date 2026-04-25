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
const finalExplosion = document.getElementById('finalExplosion');
const darkness = document.getElementById('darkness');
const superDarkness = document.getElementById('superDarkness');

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

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
    setTimeout(() => { scene.style.animation = 'none'; }, durationMs);
}

startBtn.addEventListener('click', async () => {
    ui.style.display = 'none';

    // Phase 1: Intro
    wenda.style.left = '15%'; gray.style.right = '15%'; wenda.style.bottom = '25%'; gray.style.bottom = '25%';
    wenda.classList.add('anim-idle'); gray.classList.add('anim-idle');
    
    scene.style.transform = 'scale(1.1) translateY(5%)';
    scene.style.transition = 'transform 3s ease-in-out';
    await sleep(2000);
    await typeSubtitle("Wenda: Yetersizsin, Gray.", "#ffffff", 2000);
    scene.style.transform = 'scale(1.2) translateX(-5%) translateY(5%)';
    await typeSubtitle("Gray: ...", "#888888", 1500);
    scene.style.transform = 'scale(1) translateX(0) translateY(0)';
    await sleep(1000);

    // Phase 2: Brutal Beatdown by Wenda
    wenda.classList.remove('anim-idle'); gray.classList.remove('anim-idle');
    wenda.style.transition = 'left 0.2s ease-in'; gray.style.transition = 'right 0.2s ease-out, transform 0.1s';
    
    await typeSubtitle("Wenda: YOK OL!", "#ffffff", 1000);
    wenda.style.left = '40%'; gray.style.right = '40%';
    await sleep(300);

    for(let i=0; i<10; i++) {
        let isRightArm = i % 2 === 0;
        let arm = wenda.querySelector(isRightArm ? '.arm.right' : '.arm.left');
        arm.style.transform = `rotate(-90deg) scaleY(1.3)`;
        
        let gRight = parseInt(gray.style.right || '40');
        gray.style.right = (gRight - 2) + '%';
        gray.style.transform = `scaleX(-1) rotate(${10 + Math.random()*15}deg)`;
        
        shakeScreen(15, 100);
        clashEffect.style.left = '55%'; clashEffect.style.top = '40%'; clashEffect.style.opacity = '0.8';
        clashEffect.style.transform = `translate(-50%, -50%) scale(${1 + Math.random()})`;
        
        await sleep(120);
        arm.style.transform = 'rotate(20deg)'; clashEffect.style.opacity = '0';
        await sleep(80);
    }
    
    wenda.querySelector('.arm.right').style.transition = 'transform 0.2s ease-in';
    wenda.querySelector('.arm.right').style.transform = 'rotate(180deg)'; 
    await sleep(200);
    wenda.querySelector('.arm.right').style.transform = 'rotate(-90deg) scaleY(1.5)';
    
    shakeScreen(30, 500); flash.style.opacity = '1'; await sleep(50); flash.style.opacity = '0';
    
    gray.style.transition = 'all 0.8s cubic-bezier(0.1, 0.9, 0.2, 1)';
    gray.style.right = '-5%'; gray.style.bottom = '5%'; gray.style.transform = 'scaleX(-1) rotate(-90deg)'; 
    
    wenda.style.transition = 'all 0.5s ease'; wenda.querySelector('.arm.right').style.transform = ''; wenda.querySelector('.arm.left').style.transform = ''; wenda.classList.add('anim-idle');

    await sleep(2000);
    await typeSubtitle("Wenda: Fazla kolaydı...", "#ffffff", 2500);
    
    // Phase 4: Gray Scary Transformation
    await sleep(1000); darkness.style.opacity = '1'; shakeScreen(2, 3000); 
    await typeSubtitle("Gray: ...", "#ff0000", 2000);
    
    gray.style.transition = 'none'; gray.style.transform = 'scaleX(-1) rotate(0deg)'; gray.style.right = '10%'; gray.style.bottom = '25%';
    gray.classList.add('scary-mode');
    
    shakeScreen(20, 500); flash.style.opacity = '1'; flash.style.background = '#ff0000'; await sleep(50); flash.style.opacity = '0'; flash.style.background = '#fff';
    await typeSubtitle("Gray: K  A  N . . .", "#880000", 2000);
    
    // Phase 5: Gray Strikes Wenda
    wenda.classList.remove('anim-idle'); await sleep(1000);
    gray.style.transition = 'right 0.1s linear'; gray.style.right = '60%'; 
    
    gray.querySelector('.arm.left').style.transform = 'rotate(-180deg) scaleY(1.5)';
    gray.querySelector('.arm.right').style.transform = 'rotate(180deg) scaleY(1.5)';
    await sleep(100);
    gray.querySelector('.arm.left').style.transform = 'rotate(-30deg) scaleY(1.5)';
    gray.querySelector('.arm.right').style.transform = 'rotate(30deg) scaleY(1.5)';
    
    shakeScreen(50, 1000); bloodExplosion.style.opacity = '1'; bloodExplosion.style.left = '25%'; bloodExplosion.style.transform = 'translate(-50%, -50%) scale(3)'; bloodExplosion.style.transition = 'transform 0.3s ease-out, opacity 1.5s';
    
    wenda.style.transition = 'all 0.5s ease-out'; wenda.style.left = '-20%'; wenda.style.bottom = '10%'; wenda.style.transform = 'rotate(-90deg)'; // Falls instead of flying away completely

    await sleep(1500); bloodExplosion.style.opacity = '0'; gray.querySelector('.arm.left').style.transform = ''; gray.querySelector('.arm.right').style.transform = '';
    await sleep(2000);

    // Phase 6: WENDA SCARY TRANSFORMATION
    superDarkness.style.opacity = '1'; // Pitch black vignette
    shakeScreen(5, 3000);
    
    await typeSubtitle("Wenda: Ö L Ü M ! ! !", "#fff", 2500);

    wenda.style.transition = 'none';
    wenda.style.transform = 'rotate(0deg)'; // Stands up instantly
    wenda.classList.add('scary-mode');
    
    shakeScreen(30, 500);
    flash.style.opacity = '1'; flash.style.background = '#fff'; await sleep(50); flash.style.opacity = '0';
    
    // Both raise weapons/arms
    await sleep(1000);
    wenda.querySelector('.arm.left').style.transform = 'rotate(-120deg) scale(1.5)';
    wenda.querySelector('.arm.right').style.transform = 'rotate(120deg) scale(1.5)';
    gray.querySelector('.arm.left').style.transform = 'rotate(-120deg) scale(1.5)';
    gray.querySelector('.arm.right').style.transform = 'rotate(120deg) scale(1.5)';
    
    await sleep(1000);
    
    // Final Dash!
    wenda.style.transition = 'left 0.1s linear'; wenda.style.left = '45%';
    gray.style.transition = 'right 0.1s linear'; gray.style.right = '45%';
    
    wenda.querySelector('.arm.left').style.transform = 'rotate(-30deg) scale(1.5)';
    wenda.querySelector('.arm.right').style.transform = 'rotate(30deg) scale(1.5)';
    gray.querySelector('.arm.left').style.transform = 'rotate(-30deg) scale(1.5)';
    gray.querySelector('.arm.right').style.transform = 'rotate(30deg) scale(1.5)';
    
    await sleep(100);

    // Phase 7: Final Explosion
    shakeScreen(100, 2000);
    finalExplosion.style.opacity = '1';
    finalExplosion.style.transform = 'translate(-50%, -50%) scale(2)';
    
    await sleep(2000);
    
    // K.O.
    titleText.innerText = 'DOUBLE K.O.';
    titleText.style.color = '#fff';
    titleText.style.textShadow = '0 0 30px #f00, 2px 2px 0px #000';
    titles.style.opacity = '1';
    titles.style.transition = 'opacity 2s';

    await sleep(4000);
    ui.style.display = 'flex';
    startBtn.innerText = 'TEKRAR OYNAT';
    startBtn.onclick = () => location.reload();
});
