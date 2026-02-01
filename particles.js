export class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles(x, y, count = 15) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.random() * Math.PI * 2);
            const velocity = 3 + Math.random() * 5;
            const size = 2 + Math.random() * 6;
            
            // Random color from a palette
            const colors = ['#ff94e8', '#ff6b9d', '#ff8fab', '#ffa7c4', '#ffb3d9', '#ffc0e8'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            this.particles.push({
                x,
                y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity - 2, // Slight upward bias
                size,
                color,
                opacity: 1,
                life: 1,
                decay: 0.015 + Math.random() * 0.01
            });
        }
    }
    
    animate = () => {
        // Clear canvas
        this.ctx.fillStyle = 'rgba(34, 40, 49, 0)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            
            // Apply gravity
            p.vy += 0.15;
            
            // Decay
            p.life -= p.decay;
            p.opacity = Math.max(0, p.life);
            
            // Draw particle
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.opacity;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Remove dead particles
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
        
        this.ctx.globalAlpha = 1;
        requestAnimationFrame(this.animate);
    };
}
