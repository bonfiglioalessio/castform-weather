import { useEffect, useRef } from "react";

/**
 * High-performance ambient particle canvas engine.
 * Renders rain droplets, snow, sun embers, or misty clouds behind the glass cards.
 */
const WeatherParticles = ({ theme = "theme-clear", windSpeed = 10 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle pool setup based on active theme
    const isRain =
      theme.includes("rain") ||
      theme.includes("drizzle") ||
      theme.includes("thunderstorm");
    const isSnow = theme.includes("snow");
    const isClear = theme.includes("clear");
    const isNight = theme.includes("night");
    const isClouds =
      theme.includes("clouds") ||
      theme.includes("mist") ||
      theme.includes("fog");

    const particleCount = isRain ? 90 : isSnow ? 65 : isClear ? 35 : isNight ? 45 : 25;
    const particles = [];

    // Wind influence
    const windAngle = Math.max(-0.6, Math.min(0.6, (windSpeed - 10) / 40));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speedY: isRain
          ? 9 + Math.random() * 8
          : isSnow
          ? 0.8 + Math.random() * 1.6
          : isClear
          ? -(0.4 + Math.random() * 0.8)
          : isNight
          ? 0
          : 0.2 + Math.random() * 0.4,
        speedX: isRain
          ? windAngle * 10 + (Math.random() - 0.5)
          : isSnow
          ? (Math.random() - 0.5) * 1.2
          : (Math.random() - 0.5) * 0.5,
        size: isRain
          ? 12 + Math.random() * 16
          : isSnow
          ? 2 + Math.random() * 3.5
          : isClear
          ? 2 + Math.random() * 3.5
          : isNight
          ? 1 + Math.random() * 2
          : 25 + Math.random() * 40,
        opacity: Math.random() * 0.7 + 0.2,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        angle: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (isRain) {
          // Draw slanted translucent rain drop
          ctx.beginPath();
          ctx.strokeStyle = `rgba(186, 230, 253, ${p.opacity * 0.45})`;
          ctx.lineWidth = 1.2;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX * 1.5, p.y + p.size);
          ctx.stroke();

          p.y += p.speedY;
          p.x += p.speedX;

          if (p.y > height) {
            p.y = -20;
            p.x = Math.random() * width;
          }
        } else if (isSnow) {
          // Draw soft sinusoidal snowflake
          p.angle += 0.02;
          p.x += p.speedX + Math.sin(p.angle) * 0.6;
          p.y += p.speedY;

          ctx.beginPath();
          ctx.fillStyle = `rgba(241, 245, 249, ${p.opacity * 0.75})`;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          if (p.y > height) {
            p.y = -10;
            p.x = Math.random() * width;
          }
        } else if (isClear) {
          // Golden floating solar dust / embers
          p.y += p.speedY;
          p.x += p.speedX;
          p.angle += p.twinkleSpeed;
          const currentOpacity =
            (Math.sin(p.angle) * 0.3 + 0.5) * p.opacity;

          ctx.beginPath();
          ctx.fillStyle = `rgba(251, 191, 36, ${currentOpacity * 0.55})`;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
        } else if (isNight) {
          // Subtle twinkling night stars
          p.angle += p.twinkleSpeed;
          const currentOpacity = (Math.sin(p.angle) * 0.4 + 0.6) * p.opacity;

          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.7})`;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (isClouds) {
          // Soft misty fog puffs
          p.x += 0.35 + p.speedX * 0.2;
          ctx.beginPath();
          const grad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size
          );
          grad.addColorStop(0, `rgba(226, 232, 240, ${p.opacity * 0.06})`);
          grad.addColorStop(1, "rgba(226, 232, 240, 0)");
          ctx.fillStyle = grad;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          if (p.x - p.size > width) {
            p.x = -p.size;
            p.y = Math.random() * height;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme, windSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className="weather_particle_canvas"
      aria-hidden="true"
    />
  );
};

export default WeatherParticles;
