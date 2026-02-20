import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for entrance animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Background fade in
      tl.fromTo('.hero-bg-element', { opacity: 0 }, { opacity: 1, duration: 2 });

      // Name animation - character stagger
      tl.fromTo(
        '.hero-name span',
        { y: 100, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.05 },
        '-=1.5'
      );

      // Role animation
      tl.fromTo(
        '.hero-role',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      );

      // Description animation
      tl.fromTo(
        '.hero-desc',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // Image animation
      tl.fromTo(
        '.hero-image',
        { scale: 0.8, opacity: 0, filter: 'blur(20px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.5 },
        '-=1.2'
      );

      // CTA buttons
      tl.fromTo(
        '.hero-cta',
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.8'
      );

      // Social links
      tl.fromTo(
        '.hero-social',
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        '-=0.4'
      );

      // Floating animation for image
      gsap.to('.hero-image', {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Mouse parallax effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;

        gsap.to(imageRef.current, {
          rotateY: moveX,
          rotateX: -moveY,
          duration: 0.5,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nameChars = 'Ajay Raj'.split('');

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="hero-bg-element absolute inset-0 hero-bg" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />

      {/* Animated particles/circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-purple/20"
            style={{
              width: `${300 + i * 200}px`,
              height: `${300 + i * 200}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animation: `rotate-slow ${20 + i * 5}s linear infinite`,
              opacity: 0.1 + i * 0.05,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div ref={textRef} className="text-center lg:text-left order-2 lg:order-1">
            {/* Greeting */}
            <p className="hero-role text-lg text-purple font-medium mb-4">
              Hello, I'm
            </p>

            {/* Name */}
            <h1 className="hero-name text-5xl sm:text-6xl lg:text-7xl font-poppins font-bold mb-6 perspective-1000">
              {nameChars.map((char, index) => (
                <span
                  key={index}
                  className="inline-block"
                  style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>

            {/* Role */}
            <h2 className="hero-role text-2xl sm:text-3xl lg:text-4xl font-poppins font-semibold text-white/90 mb-6">
              Cloud Engineer &{' '}
              <span className="gradient-text">DevOps Specialist</span>
            </h2>

            {/* Description */}
            <p className="hero-desc text-lg text-white/60 max-w-xl mx-auto lg:mx-0 mb-8">
              B.Tech 3rd Year Student passionate about building scalable cloud infrastructure 
              and automating deployment pipelines. AWS Certified with expertise in modern DevOps practices.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={scrollToProjects}
                className="hero-cta px-8 py-3 bg-purple hover:bg-purple-dark text-white font-medium rounded-full transition-all duration-300 hover:shadow-glow-lg flex items-center gap-2"
              >
                Explore My Work
                <ArrowDown size={18} />
              </button>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hero-cta px-8 py-3 border border-white/20 hover:border-purple text-white font-medium rounded-full transition-all duration-300 hover:bg-purple/10"
              >
                Get In Touch
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/ajayraj004"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social p-3 bg-white/5 hover:bg-purple/20 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={20} className="text-white/70 hover:text-purple" />
              </a>
              <a
                href="https://www.linkedin.com/in/ajayraj004/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social p-3 bg-white/5 hover:bg-purple/20 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="text-white/70 hover:text-purple" />
              </a>
              <a
                href="mailto:ajayrajospf@gmail.com"
                className="hero-social p-3 bg-white/5 hover:bg-purple/20 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail size={20} className="text-white/70 hover:text-purple" />
              </a>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="order-1 lg:order-2 flex justify-center" style={{ perspective: '1000px' }}>
            <div
              ref={imageRef}
              className="hero-image relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-purple/30 rounded-full blur-3xl scale-110" />
              
              {/* Profile image */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-purple/30 glow-purple">
                <img
                  src="/hero-profile.png"
                  alt="Ajay Raj"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-purple/20 backdrop-blur-sm rounded-full border border-purple/30 animate-float">
                <span className="text-sm font-medium text-purple">AWS Certified</span>
              </div>
              
              <div
                className="absolute -bottom-4 -left-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 animate-float"
                style={{ animationDelay: '1s' }}
              >
                <span className="text-sm font-medium text-white">4+ Certs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown size={24} className="text-white/40" />
      </div>
    </section>
  );
};

export default Hero;
