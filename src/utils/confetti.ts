export function createConfetti() {
  const colors = ['#64278A', '#A32986', '#9C2986', '#FFD700', '#FF69B4', '#00CED1'];
  const confettiCount = 50;
  const duration = 3000;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.cssText = `
      position: fixed;
      width: ${Math.random() * 10 + 5}px;
      height: ${Math.random() * 10 + 5}px;
      background-color: ${colors[Math.floor(Math.random() * colors.length)]};
      left: ${Math.random() * 100}vw;
      top: -10px;
      opacity: ${Math.random() * 0.7 + 0.3};
      transform: rotate(${Math.random() * 360}deg);
      animation: confetti-fall ${Math.random() * 2 + 2}s linear forwards;
      z-index: 9999;
      pointer-events: none;
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
    `;

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, duration);
  }
}

if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes confetti-fall {
      to {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}
