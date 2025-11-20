// Efecto Typewriter simple
const textElement = document.getElementById('typewriter');
const phrases = ['Defender', 'Analyst', 'Hunter', 'Researcher'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    if (!textElement) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pausa al final
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Sistema de Cristales Hextech (Hextech Shards)
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let crystals = [];
const crystalCount = 40;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Crystal {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 5;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = `rgba(0, 240, 255, ${this.opacity})`;

        this.sides = Math.floor(Math.random() * 3) + 3;
        this.vertices = [];
        for (let i = 0; i < this.sides; i++) {
            const angle = (i / this.sides) * Math.PI * 2;
            const r = this.size * (0.5 + Math.random() * 0.5);
            this.vertices.push({
                x: Math.cos(angle) * r,
                y: Math.sin(angle) * r
            });
        }
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.x < -50 || this.x > canvas.width + 50 ||
            this.y < -50 || this.y > canvas.height + 50) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);

        ctx.beginPath();
        ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
        for (let i = 1; i < this.vertices.length; i++) {
            ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
        }
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00f0ff';

        ctx.restore();
    }
}

function initCrystals() {
    resizeCanvas();
    crystals = [];
    for (let i = 0; i < crystalCount; i++) {
        crystals.push(new Crystal());
    }
}

function animateCrystals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    crystals.forEach(c => {
        c.update();
        c.draw();
    });

    requestAnimationFrame(animateCrystals);
}

// NAVIGATION LOGIC (SPA)
function showDetail(sectionId) {
    const dashboardView = document.getElementById('dashboard-view');
    const detailView = document.getElementById('detail-view');
    const allDetails = document.querySelectorAll('.detail-section');
    const navItems = document.querySelectorAll('.nav-item');

    // Hide Dashboard
    dashboardView.classList.add('hidden');

    // Show Detail Container
    detailView.classList.remove('hidden');

    // Hide all specific details first
    allDetails.forEach(el => el.classList.add('hidden'));

    // Show the requested detail
    const targetDetail = document.getElementById(`detail-${sectionId}`);
    if (targetDetail) {
        targetDetail.classList.remove('hidden');
    }

    // Update Nav Active State
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.target === sectionId) {
            item.classList.add('active');
        }
    });
}

function showDashboard() {
    const dashboardView = document.getElementById('dashboard-view');
    const detailView = document.getElementById('detail-view');
    const navItems = document.querySelectorAll('.nav-item');

    // Hide Detail Container
    detailView.classList.add('hidden');

    // Show Dashboard
    dashboardView.classList.remove('hidden');

    // Update Nav Active State
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.target === 'dashboard') {
            item.classList.add('active');
        }
    });
}

// Tab Switching Logic
function switchTab(platform) {
    // Buttons
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    // Content
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.add('hidden'));

    const targetContent = document.getElementById(`tab-${platform}`);
    if (targetContent) {
        targetContent.classList.remove('hidden');
    }
}

// Event Listeners for Nav Items
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.dataset.target;
            if (target === 'dashboard') {
                showDashboard();
            } else {
                showDetail(target);
            }
        });
    });

    type();
    initCrystals();
    animateCrystals();
});

window.addEventListener('resize', resizeCanvas);

// Expose functions to global scope for HTML onclick attributes
window.showDetail = showDetail;
window.showDashboard = showDashboard;
window.switchTab = switchTab;
