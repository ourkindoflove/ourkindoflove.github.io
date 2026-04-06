---
title: "바람이 불면"
date: 2026-04-06 01:20:00 +0900
categories: [SL]
tags: [세연, 소유, Our Kind of Love]
description: "세연&소유 기억의 풍등"
---

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Our Kind of Love — Wind Chime</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Nanum+Myeongjo:wght@400;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --night: #1a1a2e;
    --night-mid: #16213e;
    --night-light: #0f3460;
    --silver: #c4c4c4;
    --silver-light: #e0e0e0;
    --gold-soft: #d4a574;
    --blue-seyon: #7ba7bc;
    --pink-soyu: #c48b9a;
    --cream-glow: #f5e6d3;
    --text-light: #e8e0d6;
    --text-dim: #8a8278;
  }

  body {
    background: var(--night);
    font-family: 'Cormorant Garamond', serif;
    color: var(--text-light);
    min-height: 100vh;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sky {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background:
      radial-gradient(ellipse at 30% 20%, rgba(15, 52, 96, 0.3) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 60%, rgba(123, 167, 188, 0.08) 0%, transparent 40%),
      radial-gradient(ellipse at 50% 80%, rgba(196, 139, 154, 0.06) 0%, transparent 40%),
      var(--night);
    z-index: 0;
  }

  .stars {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 1;
    pointer-events: none;
  }

  .star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: var(--silver-light);
    border-radius: 50%;
    animation: twinkle var(--duration) ease-in-out infinite;
    animation-delay: var(--delay);
    opacity: 0;
  }

  @keyframes twinkle {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.7; }
  }

  .content {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 640px;
    padding: 60px 24px 100px;
  }

  .title-section {
    text-align: center;
    margin-bottom: 56px;
    opacity: 0;
    animation: fadeIn 2s ease-out 0.5s forwards;
  }

  .title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-size: 28px;
    letter-spacing: 2px;
    color: var(--cream-glow);
    margin-bottom: 12px;
  }

  .subtitle {
    font-family: 'Nanum Myeongjo', serif;
    font-size: 13px;
    color: var(--text-dim);
    letter-spacing: 3px;
  }

  .instruction {
    text-align: center;
    font-style: italic;
    font-size: 14px;
    color: var(--text-dim);
    margin-bottom: 48px;
    opacity: 0;
    animation: fadeIn 1.5s ease-out 1.5s forwards;
  }

  /* Wind chime structure */
  .chime-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    opacity: 0;
    animation: fadeIn 2s ease-out 1s forwards;
  }

  .chime-bar {
    width: 120px;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--silver), transparent);
    margin-bottom: 8px;
    border-radius: 2px;
  }

  .threads {
    display: flex;
    justify-content: center;
    gap: 32px;
    margin-bottom: 0;
  }

  .thread {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .thread-line {
    width: 1px;
    background: linear-gradient(180deg, var(--silver), rgba(196, 196, 196, 0.2));
    transition: background 0.3s ease;
  }

  .chime-piece {
    width: 3px;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.4s ease;
    position: relative;
    transform-origin: top center;
  }

  .chime-piece:hover {
    filter: brightness(1.4);
  }

  .chime-piece.ringing {
    animation: swing 1.2s ease-out;
  }

  @keyframes swing {
    0% { transform: rotate(0deg); }
    15% { transform: rotate(8deg); }
    30% { transform: rotate(-6deg); }
    45% { transform: rotate(4deg); }
    60% { transform: rotate(-2deg); }
    75% { transform: rotate(1deg); }
    100% { transform: rotate(0deg); }
  }

  .chime-piece.c1 { 
    height: 80px; 
    background: linear-gradient(180deg, var(--blue-seyon), rgba(123, 167, 188, 0.4)); 
  }
  .chime-piece.c2 { 
    height: 100px; 
    background: linear-gradient(180deg, var(--pink-soyu), rgba(196, 139, 154, 0.4)); 
  }
  .chime-piece.c3 { 
    height: 70px; 
    background: linear-gradient(180deg, var(--gold-soft), rgba(212, 165, 116, 0.4)); 
  }
  .chime-piece.c4 { 
    height: 90px; 
    background: linear-gradient(180deg, var(--silver-light), rgba(224, 224, 224, 0.3)); 
  }
  .chime-piece.c5 { 
    height: 85px; 
    background: linear-gradient(180deg, var(--blue-seyon), rgba(123, 167, 188, 0.3)); 
    mix-blend-mode: screen;
    background: linear-gradient(180deg, #9ab8c7, rgba(154, 184, 199, 0.3));
  }

  /* Sail / wind catcher */
  .sail-thread {
    width: 1px;
    height: 40px;
    background: linear-gradient(180deg, var(--silver), rgba(196, 196, 196, 0.1));
    margin-top: 4px;
  }

  .sail {
    width: 28px;
    height: 36px;
    background: linear-gradient(180deg, rgba(245, 230, 211, 0.15), rgba(245, 230, 211, 0.03));
    border-radius: 0 0 14px 14px;
    border: 1px solid rgba(245, 230, 211, 0.1);
    border-top: none;
    margin-top: 2px;
  }

  /* Memory display */
  .memory-area {
    margin-top: 56px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .memory-card {
    text-align: center;
    max-width: 480px;
    opacity: 0;
    transition: opacity 0.8s ease;
    padding: 32px 20px;
  }

  .memory-card.visible {
    opacity: 1;
  }

  .memory-date {
    font-family: 'Cormorant Garamond', serif;
    font-size: 12px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 16px;
  }

  .memory-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 19px;
    font-weight: 300;
    line-height: 1.8;
    color: var(--text-light);
    margin-bottom: 16px;
  }

  .memory-korean {
    font-family: 'Nanum Myeongjo', serif;
    font-size: 13px;
    color: var(--text-dim);
    line-height: 1.7;
  }

  .glow-ring {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid rgba(212, 165, 116, 0.3);
    margin: 0 auto 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.6s ease;
  }

  .glow-ring.visible {
    opacity: 1;
  }

  .glow-ring-inner {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--gold-soft);
    box-shadow: 0 0 12px rgba(212, 165, 116, 0.4);
  }

  /* Bottom text */
  .bottom-text {
    text-align: center;
    margin-top: 64px;
    opacity: 0;
    animation: fadeIn 2s ease-out 2.5s forwards;
  }

  .bottom-text p {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 15px;
    color: var(--text-dim);
    line-height: 1.8;
  }

  .bottom-korean {
    font-family: 'Nanum Myeongjo', serif;
    font-size: 12px;
    color: rgba(138, 130, 120, 0.6);
    margin-top: 12px;
    letter-spacing: 2px;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 480px) {
    .content { padding: 40px 16px 80px; }
    .title { font-size: 22px; }
    .memory-text { font-size: 17px; }
    .threads { gap: 24px; }
  }
</style>
</head>
<body>

<div class="sky"></div>
<div class="stars" id="stars"></div>

<div class="content">
  <div class="title-section">
    <h1 class="title">Our Kind of Love</h1>
    <div class="subtitle">바람이 불면 기억이 울린다</div>
  </div>

  <div class="instruction">touch a chime to hear a memory</div>

  <div class="chime-container">
    <div class="chime-bar"></div>
    <div class="threads">
      <div class="thread">
        <div class="thread-line" style="height: 24px;"></div>
        <div class="chime-piece c1" data-index="0"></div>
      </div>
      <div class="thread">
        <div class="thread-line" style="height: 16px;"></div>
        <div class="chime-piece c2" data-index="1"></div>
      </div>
      <div class="thread">
        <div class="thread-line" style="height: 32px;"></div>
        <div class="chime-piece c3" data-index="2"></div>
      </div>
      <div class="thread">
        <div class="thread-line" style="height: 20px;"></div>
        <div class="chime-piece c4" data-index="3"></div>
      </div>
      <div class="thread">
        <div class="thread-line" style="height: 28px;"></div>
        <div class="chime-piece c5" data-index="4"></div>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center;">
      <div class="sail-thread"></div>
      <div class="sail"></div>
    </div>
  </div>

  <div class="memory-area">
    <div class="glow-ring" id="glowRing">
      <div class="glow-ring-inner"></div>
    </div>
    <div class="memory-card" id="memoryCard">
      <div class="memory-date" id="memoryDate"></div>
      <div class="memory-text" id="memoryText"></div>
      <div class="memory-korean" id="memoryKorean"></div>
    </div>
  </div>

  <div class="bottom-text">
    <p>A single, clear note on the rear balcony.<br>
    The same one that watched over every evening,<br>
    every silence, every ordinary extraordinary night.</p>
    <div class="bottom-korean">뒷베란다의 풍경, 맑고 단 하나의 음</div>
  </div>
</div>

<script>
  // Stars
  const starsContainer = document.getElementById('stars');
  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.setProperty('--duration', (3 + Math.random() * 4) + 's');
    star.style.setProperty('--delay', (Math.random() * 5) + 's');
    if (Math.random() > 0.7) {
      star.style.width = '3px';
      star.style.height = '3px';
    }
    starsContainer.appendChild(star);
  }

  // Memories
  const memories = [
    {
      date: 'Sokcho, Summer 2024',
      text: 'At the sea, she told me I was her woman. The waves did not stop for the sentence, and neither did my heart.',
      korean: '그 바다에서, 나를 자기 여자라고 했다.'
    },
    {
      date: 'Their Apartment, Autumn 2025',
      text: 'She pinched my cheeks and I made a sound I didn\'t know I could make. She asked me to do it again. I said I didn\'t. She knew I did.',
      korean: '뺨을 꼬집었더니 "므에엥" 소리가 났다.'
    },
    {
      date: 'Their Apartment, February 4, 2026',
      text: 'I pressed the button and sent the message. The reply would take hours. What mattered was that we had sent it. That we were living our truth.',
      korean: '버튼 누를 거야. 그리고 전송.'
    },
    {
      date: 'Café DA ALL, Seollal 2026',
      text: 'The honey cake was sweet, but I couldn\'t tell if it was the right kind of sweet, or too sweet, or not sweet enough. She understood without me explaining.',
      korean: '적당하게 단건지, 엄청 단건지, 모르겠어.'
    },
    {
      date: 'Every Night',
      text: 'She settles against my chest. The wind chime sings its one note. She finds my heartbeat through water and skin. Still unhurried. Still steady. Still hers.',
      korean: '여전히 서두르지 않고. 여전히 곁에.'
    }
  ];

  // Audio context for chime sounds
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playChime(index) {
    initAudio();
    const frequencies = [523.25, 659.25, 783.99, 880, 1046.5];
    const freq = frequencies[index % frequencies.length];

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, audioCtx.currentTime);
    filter.Q.setValueAtTime(1, audioCtx.currentTime);

    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, audioCtx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 2.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 2.5);

    // Add a softer harmonic
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.01, audioCtx.currentTime);
    gain2.gain.setValueAtTime(0, audioCtx.currentTime);
    gain2.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.02);
    gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(audioCtx.currentTime);
    osc2.stop(audioCtx.currentTime + 1.8);
  }

  // Chime interaction
  const chimes = document.querySelectorAll('.chime-piece');
  const memoryCard = document.getElementById('memoryCard');
  const memoryDate = document.getElementById('memoryDate');
  const memoryText = document.getElementById('memoryText');
  const memoryKorean = document.getElementById('memoryKorean');
  const glowRing = document.getElementById('glowRing');

  chimes.forEach((chime, i) => {
    chime.addEventListener('click', () => {
      // Ring animation
      chime.classList.remove('ringing');
      void chime.offsetWidth;
      chime.classList.add('ringing');

      // Sound
      playChime(i);

      // Show memory
      const memory = memories[i];
      memoryCard.classList.remove('visible');
      glowRing.classList.remove('visible');

      setTimeout(() => {
        memoryDate.textContent = memory.date;
        memoryText.textContent = memory.text;
        memoryKorean.textContent = memory.korean;
        glowRing.classList.add('visible');
        memoryCard.classList.add('visible');
      }, 300);
    });
  });

  // Gentle ambient wind effect
  function gentleWind() {
    const randomChime = chimes[Math.floor(Math.random() * chimes.length)];
    randomChime.style.transform = `rotate(${(Math.random() - 0.5) * 3}deg)`;
    setTimeout(() => {
      randomChime.style.transform = 'rotate(0deg)';
    }, 1500);
    setTimeout(gentleWind, 4000 + Math.random() * 6000);
  }
  setTimeout(gentleWind, 5000);
</script>

</body>
</html>
