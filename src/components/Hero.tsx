
import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.8 + 0.2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${particle.alpha})`;
        ctx.fill();
        
        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        }
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />
      
      <div className="relative z-10 text-center px-6">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
          {/* Animated Name */}
<div className="text-center mb-8">
  <div className="text-6xl md:text-8xl font-extrabold tracking-wider">
    {'DHEERAJ'.split('').map((letter, index) => (
      <span
        key={index}
        className={`inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-float ${
          letter === ' ' ? 'w-4' : ''
        }`}
        style={{
          animationDelay: `${index * 0.1}s`,
          fontFamily: "'Playfair Display', serif"
        }}
      >
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ))}
  </div>

  <div className="text-6xl md:text-8xl font-extrabold tracking-wider mt-2">
    {'KANUKUNTLA'.split('').map((letter, index) => (
      <span
        key={index}
        className={`inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-float ${
          letter === ' ' ? 'w-4' : ''
        }`}
        style={{
          animationDelay: `${(index + 8) * 0.1}s`, // Stagger the animation to continue smoothly
          fontFamily: "'Playfair Display', serif"
        }}
      >
        {letter}
      </span>
    ))}
  </div>
</div>

        </h1>
        
        <p className="text-xl md:text-2xl text-gray-800 mb-8 animate-fade-in animation-delay-300">
          Full Stack Developer • AI/ML Enthusiast • Innovation Driver
        </p>
        
        <div className="flex justify-center animate-fade-in animation-delay-600">
          <button 
            onClick={scrollToProjects}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition-transform duration-300"
          >
            View My Work
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-white/50" />
      </div>
    </section>
  );
};
