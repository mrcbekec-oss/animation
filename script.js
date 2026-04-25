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
    ui.style.display = 'none';

    // Set initial positions
    wenda.style.left = '15%';
    gray.style.right = '15%';
    wenda.style.bottom = '25%';
    gray.style.bottom = '25%';
    wenda.classList.add('anim-idle');
    gray.classList.add('anim-idle');
    
    // Phase 1: Intro
    scene.style.transform = 'scale(1.1) translateY(5%)';
    scene.style.transition = 'transform 3s ease-in-out';
    await sleep(2000);

    await typeSubtitle("Wenda: Yetersizsin, Gray.", "#ffffff", 2000);
    
    scene.style.transform = 'scale(1.2) translateX(-5%) translateY(5%)';
    await typeSubtitle("Gray: ...", "#888888", 1500);

    scene.style.transform = 'scale(1) translateX(0) translateY(0)';
    await sleep(1000);

    // Phase 2: Brutal Realistic Beatdown by Wenda
    wenda.classList.remove('anim-idle');
    gray.classList.remove('anim-idle');
    
    wenda.style.transition = 'left 0.2s ease-in';
    gray.style.transition = 'right 0.2s ease-out, transform 0.1s';
    
    await typeSubtitle("Wenda: YOK OL!", "#ffffff", 1000);

    // Wenda walks/dashes close
    wenda.style.left = '40%';
    gray.style.right = '40%';
    await sleep(300);

    // Flurry of realistic punches
    for(let i=0; i<10; i++) {
        let isRightArm = i % 2 === 0;
        let armClass = isRightArm ? '.arm.right' : '.arm.left';
        let arm = wenda.querySelector(armClass);
        
        // Punch extension (rotate arm 90deg to point forward)
        arm.style.transform = `rotate(-90deg) scaleY(1.3)`;
        
        // Push Gray back a bit and make him stagger
        let gRight = parseInt(gray.style.right || '40');
        gray.style.right = (gRight - 2) + '%';
        gray.style.transform = `scaleX(-1) rotate(${10 + Math.random()*15}deg)`; // stagger backward
        
        shakeScreen(15, 100);
        
        // Clash effect at the impact point (Gray's chest/face area)
        clashEffect.style.left = '55%';
        clashEffect.style.top = '40%';
        clashEffect.style.opacity = '0.8';
        clashEffect.style.transform = `translate(-50%, -50%) scale(${1 + Math.random()})`;
        
        await sleep(120);
        
        // Pull arm back
        arm.style.transform = 'rotate(20deg)';
        clashEffect.style.opacity = '0';
        
        await sleep(80);
    }
    
    // Final heavy punch
    wenda.querySelector('.arm.right').style.transition = 'transform 0.2s ease-in';
    wenda.querySelector('.arm.right').style.transform = 'rotate(180deg)'; // wind up
    await sleep(200);
    wenda.querySelector('.arm.right').style.transform = 'rotate(-90deg) scaleY(1.5)'; // BAM
    
    shakeScreen(30, 500);
    flash.style.opacity = '1';
    await sleep(50);
    flash.style.opacity = '0';
    
    // Gray is knocked out
    gray.style.transition = 'all 0.8s cubic-bezier(0.1, 0.9, 0.2, 1)';
    gray.style.right = '-5%';
    gray.style.bottom = '5%'; 
    gray.style.transform = 'scaleX(-1) rotate(-90deg)'; // Falls flat
    
    wenda.style.transition = 'all 0.5s ease';
    wenda.querySelector('.arm.right').style.transform = '';
    wenda.querySelector('.arm.left').style.transform = '';
    wenda.classList.add('anim-idle');

    await sleep(2000);

    // Phase 3: Arrogance
    await typeSubtitle("Wenda: Fazla kolaydı...", "#ffffff", 2500);
    
    // Phase 4: The Scary Transformation
    await sleep(1000);
    darkness.style.opacity = '1'; 
    shakeScreen(2, 3000); 
    
    await typeSubtitle("Gray: ...", "#ff0000", 2000);
    
    // Instant snap to Scary Mode
    gray.style.transition = 'none'; 
    gray.style.transform = 'scaleX(-1) rotate(0deg)'; // Stands up instantly
    gray.style.right = '10%';
    gray.style.bottom = '25%';
    
    gray.classList.add('scary-mode');
    
    shakeScreen(20, 500);
    flash.style.opacity = '1';
    flash.style.background = '#ff0000';
    await sleep(50);
    flash.style.opacity = '0';
    flash.style.background = '#fff';

    await typeSubtitle("Gray: K  A  N . . .", "#880000", 2000);
    
    // Phase 5: The Kill
    wenda.classList.remove('anim-idle');
    await sleep(1000);
    
    // Gray lunges instantly
    gray.style.transition = 'right 0.1s linear';
    gray.style.right = '60%'; // Right in front of Wenda
    
    // Gray raises arms for a brutal downward smash
    gray.querySelector('.arm.left').style.transform = 'rotate(-180deg) scaleY(1.5)';
    gray.querySelector('.arm.right').style.transform = 'rotate(180deg) scaleY(1.5)';
    
    await sleep(100);
    
    // Smash down!
    gray.querySelector('.arm.left').style.transform = 'rotate(-30deg) scaleY(1.5)';
    gray.querySelector('.arm.right').style.transform = 'rotate(30deg) scaleY(1.5)';
    
    shakeScreen(50, 1000);
    bloodExplosion.style.opacity = '1';
    bloodExplosion.style.left = '25%';
    bloodExplosion.style.transform = 'translate(-50%, -50%) scale(3)';
    bloodExplosion.style.transition = 'transform 0.3s ease-out, opacity 1.5s';
    
    wenda.style.transition = 'all 0.5s ease-out';
    wenda.style.left = '-30%'; 
    wenda.style.bottom = '80%';
    wenda.style.transform = 'rotate(-180deg)';

    await sleep(1500);
    bloodExplosion.style.opacity = '0';
    darkness.style.opacity = '0';
    
    gray.querySelector('.arm.left').style.transform = '';
    gray.querySelector('.arm.right').style.transform = '';

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
