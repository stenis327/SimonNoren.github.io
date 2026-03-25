const canvas = document.getElementById('fog');
const ctx = canvas.getContext('2d');

const devicePixelRatio = window.devicePixelRatio || 1;
const fogParticles = [];
const particleCount = 40;
const colors = [
  'rgba(155,60,255,0.06)',
  'rgba(255,104,212,0.06)',
  'rgba(255,181,247,0.06)'
];

function resizeCanvas() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  canvas.width = Math.round(width * devicePixelRatio);
  canvas.height = Math.round(height * devicePixelRatio);

  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class FogParticle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.size = 50 + Math.random() * 150;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < -this.size) this.x = window.innerWidth + this.size;
    if (this.x > window.innerWidth + this.size) this.x = -this.size;
    if (this.y < -this.size) this.y = window.innerHeight + this.size;
    if (this.y > window.innerHeight + this.size) this.y = -this.size;
  }

  draw() {
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    grad.addColorStop(0, this.color);
    grad.addColorStop(1, 'transparent');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < particleCount; i++) {
  fogParticles.push(new FogParticle());
}

function animateFog() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  fogParticles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateFog);
}

animateFog();



