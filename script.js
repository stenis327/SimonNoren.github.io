const canvas = document.getElementById('fog');
const ctx = canvas.getContext('2d');

const fogParticles = [];
const particleCount = 25;

const colors = [
  'rgba(200, 190, 160, 0.08)',
  'rgba(220, 210, 180, 0.06)',
  'rgba(180, 170, 140, 0.05)'
];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
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
    this.size = 100 + Math.random() * 200;

    this.speedX = (Math.random() - 0.5) * 0.1;
    this.speedY = (Math.random() - 0.5) * 0.05;

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
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fogParticles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animateFog);
}

animateFog();

