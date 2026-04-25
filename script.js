const startBtn = document.getElementById('startBtn');
const ui = document.querySelector('.ui');
const scene = document.getElementById('scene');
const titles = document.getElementById('titles');
const titleText = document.getElementById('titleText');
const nigmare = document.getElementById('nigmare');
const darkOne = document.getElementById('darkOne');
const flash = document.getElementById('flash');
const subtitles = document.getElementById('subtitles');
const explosion = document.getElementById('explosion');
const clashEffect = document.getElementById('clashEffect');

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
    void scene.offsetWidth; // trigger reflow
    const iter = Math.floor(durationMs / 50);
    scene.style.animation = `shake ${iter * 0.05}s infinite`;
    
    // Quick and dirty shake keyframes
    const styleId = 'shakeStyle';
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
        styleEl = document.createElement('style');
        styleEl.id = styleId;
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
    nigmare.style.left = '15%';
    darkOne.style.right = '15%';
    nigmare.style.bottom = '30%';
    darkOne.style.bottom = '30%';
    nigmare.classList.add('anim-idle');
    darkOne.classList.add('anim-idle');
    
    // Reset hands
    nigmare.querySelector('.hand.right').style.transform = '';
    darkOne.querySelector('.hand.left').style.transform = '';

    // Phase 1: Intro
    scene.style.transform = 'scale(1.2) translateY(5%)';
    scene.style.transition = 'transform 3s ease-in-out';
    await sleep(2000);

    // Dialogue 1
    await typeSubtitle("Nigmare: Sonun geldi Karanlık Olan...", "#ff5555", 2500);
    
    scene.style.transform = 'scale(1.2) translateX(-5%) translateY(5%)';
    await typeSubtitle("Dark One: Bunu göreceğiz minik top...", "#55ffff", 2500);

    scene.style.transform = 'scale(1) translateX(0) translateY(0)';
    await sleep(1000);

    // Phase 2: First Dash
    nigmare.classList.remove('anim-idle');
    darkOne.classList.remove('anim-idle');
    
    nigmare.style.transition = 'left 0.3s ease-in';
    darkOne.style.transition = 'right 0.3s ease-in';
    
    // Wind up punch
    nigmare.querySelector('.hand.right').style.transform = 'translate(-30px, -20px) scale(1.5)';
    darkOne.querySelector('.hand.left').style.transform = 'translate(-30px, -20px) scale(1.5)';
    await sleep(300);

    // Dash
    nigmare.style.left = '45%';
    darkOne.style.right = '45%';
    
    // Throw punch
    nigmare.querySelector('.hand.right').style.transform = 'translate(60px, 0) scale(1.5)';
    darkOne.querySelector('.hand.left').style.transform = 'translate(60px, 0) scale(1.5)';
    
    await sleep(200);

    // IMPACT!
    clashEffect.style.opacity = '1';
    clashEffect.style.transform = 'translate(-50%, -50%) scale(2)';
    clashEffect.style.transition = 'all 0.1s';
    
    shakeScreen(20, 500);
    flash.style.opacity = '1';
    await sleep(50);
    flash.style.opacity = '0';
    
    await sleep(100);
    clashEffect.style.opacity = '0';
    clashEffect.style.transform = 'translate(-50%, -50%) scale(0)';
    
    // Knockback
    nigmare.style.transition = 'left 0.5s ease-out';
    darkOne.style.transition = 'right 0.5s ease-out';
    nigmare.style.left = '25%';
    darkOne.style.right = '25%';
    
    nigmare.querySelector('.hand.right').style.transform = '';
    darkOne.querySelector('.hand.left').style.transform = '';
    
    await sleep(1000);

    // Phase 3: Rapid Clash
    await typeSubtitle("Nigmare: Çok yavaşsın!", "#ff5555", 1500);
    
    for(let i=0; i<5; i++) {
        nigmare.style.transition = 'left 0.1s linear, bottom 0.1s linear';
        darkOne.style.transition = 'right 0.1s linear, bottom 0.1s linear';
        
        let nLeft = 35 + Math.random()*10;
        let dRight = 35 + Math.random()*10;
        let nBot = 25 + Math.random()*20;
        let dBot = 25 + Math.random()*20;
        
        nigmare.style.left = nLeft + '%';
        nigmare.style.bottom = nBot + '%';
        darkOne.style.right = dRight + '%';
        darkOne.style.bottom = dBot + '%';
        
        shakeScreen(5, 100);
        clashEffect.style.left = '50%';
        clashEffect.style.top = (100 - (nBot+dBot)/2) + '%';
        clashEffect.style.opacity = '0.5';
        clashEffect.style.transform = 'translate(-50%, -50%) scale(' + (Math.random()*1.5) + ')';
        
        await sleep(150);
    }
    clashEffect.style.opacity = '0';
    
    // Jump back
    nigmare.style.transition = 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
    darkOne.style.transition = 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';
    nigmare.style.left = '10%';
    darkOne.style.right = '10%';
    nigmare.style.bottom = '30%';
    darkOne.style.bottom = '30%';
    
    await sleep(1000);

    // Phase 4: Power up
    await typeSubtitle("Dark One: Yeter... Gerçek gücümü tatma vaktin geldi!", "#55ffff", 3000);
    
    document.getElementById('darkOneAura').style.opacity = '1';
    shakeScreen(3, 2000);
    await sleep(1000);
    
    await typeSubtitle("Nigmare: HAAAHHHHH!!", "#ff5555", 2000);
    document.getElementById('nigmareAura').style.opacity = '1';
    shakeScreen(8, 2000);
    
    nigmare.querySelector('.hand.left').style.transform = 'translate(60px, -20px)';
    nigmare.querySelector('.hand.right').style.transform = 'translate(60px, 20px)';
    
    darkOne.querySelector('.hand.left').style.transform = 'translate(60px, -20px)';
    darkOne.querySelector('.hand.right').style.transform = 'translate(60px, 20px)';

    await sleep(1500);

    // Phase 5: Beam Clash
    const nBeam = document.getElementById('nigmareBeam');
    const dBeam = document.getElementById('darkOneBeam');
    
    nBeam.style.opacity = '1';
    dBeam.style.opacity = '1';
    
    // Beams shoot
    nBeam.style.width = '40vw';
    dBeam.style.width = '40vw';
    
    shakeScreen(15, 3000);
    
    await sleep(300); // Beams meet in middle
    
    clashEffect.style.opacity = '1';
    clashEffect.style.background = 'radial-gradient(circle, #fff, #ff00ff, transparent)';
    clashEffect.style.top = '40%';
    clashEffect.style.left = '50%';
    clashEffect.style.transform = 'translate(-50%, -50%) scale(3)';
    
    await sleep(1000);
    
    // Struggle
    nBeam.style.width = '50vw';
    dBeam.style.width = '30vw';
    clashEffect.style.left = '65%';
    await sleep(500);
    
    nBeam.style.width = '20vw';
    dBeam.style.width = '60vw';
    clashEffect.style.left = '35%';
    await sleep(500);
    
    await typeSubtitle("Nigmare: YOK OL!!!!!", "#ff0000", 1500);
    nBeam.style.width = '80vw';
    dBeam.style.width = '0vw';
    clashEffect.style.left = '80%';
    
    await sleep(300);

    // Phase 6: Explosion and K.O.
    flash.style.opacity = '1';
    
    explosion.style.opacity = '1';
    explosion.style.left = '85%'; // Explodes on Dark One
    explosion.style.transition = 'transform 0.5s ease-out, opacity 1s';
    explosion.style.transform = 'translate(-50%, -50%) scale(5)';
    
    shakeScreen(30, 1000);
    
    nBeam.style.opacity = '0';
    dBeam.style.opacity = '0';
    clashEffect.style.opacity = '0';
    document.getElementById('nigmareAura').style.opacity = '0';
    document.getElementById('darkOneAura').style.opacity = '0';
    
    // Dark One defeated
    darkOne.style.transition = 'all 1s ease-out';
    darkOne.style.right = '-20%'; // Blown away
    darkOne.style.bottom = '50%';
    darkOne.style.transform = 'scaleX(-1) rotate(180deg)';

    await sleep(500);
    flash.style.transition = 'opacity 2s';
    flash.style.opacity = '0';
    
    await sleep(1000);
    explosion.style.opacity = '0';
    
    // Nigmare cools down
    nigmare.querySelector('.hand.left').style.transform = '';
    nigmare.querySelector('.hand.right').style.transform = '';
    nigmare.classList.add('anim-idle');
    
    await sleep(2000);

    titleText.innerText = 'K.O.';
    titleText.style.color = '#ffaa00';
    titleText.style.textShadow = '0 0 20px #ff0000, 2px 2px 0px #fff';
    titles.style.opacity = '1';
    titles.style.transition = 'opacity 2s';

    await sleep(3000);
    ui.style.display = 'flex';
    startBtn.innerText = 'TEKRAR OYNAT';
    startBtn.onclick = () => location.reload();
});
