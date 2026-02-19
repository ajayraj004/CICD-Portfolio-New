import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Briefcase, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.about-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Body text word-by-word reveal
      gsap.fromTo(
        '.about-text span',
        { opacity: 0.1 },
        {
          opacity: 1,
          duration: 0.05,
          stagger: 0.02,
          scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // Image reveal with clip-path
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)' },
        {
          clipPath: 'circle(100% at 50% 50%)',
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 70%',
          },
        }
      );

      // Stats cards fly in
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, scale: 0.8, rotate: -10 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const aboutText =
    "I'm a B.Tech 3rd Year student passionate about cloud computing and DevOps. With 4 AWS certifications including Solutions Architect and Developer Associate, I bring solid expertise in designing and implementing scalable cloud infrastructure. My technical toolkit includes Docker, Kubernetes, Jenkins, and Terraform for building robust CI/CD pipelines. I love solving complex infrastructure challenges and automating deployment processes to help teams ship faster and more reliably.";

  const stats = [
    {
      icon: Award,
      value: '4+',
      label: 'AWS Certifications',
      color: 'from-purple to-purple-dark',
    },
    {
      icon: Briefcase,
      value: '3+',
      label: 'Years Experience',
      color: 'from-blue-500 to-blue-700',
    },
    {
      icon: Code,
      value: '15+',
      label: 'Projects Completed',
      color: 'from-green-500 to-green-700',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="about-heading text-purple font-medium mb-4">Who I Am</p>
          <h2 className="about-heading text-4xl lg:text-5xl font-poppins font-bold">
            About <span className="gradient-text">Me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/about-image.jpg"
                alt="Working on cloud infrastructure"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-purple/30 rounded-lg -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple/10 rounded-lg -z-10" />
          </div>

          {/* Right side - Content */}
          <div>
            {/* About text with word reveal */}
            <p className="about-text text-lg text-white/70 leading-relaxed mb-8">
              {aboutText.split(' ').map((word, index) => (
                <span key={index} className="inline-block mr-1">
                  {word}
                </span>
              ))}
            </p>

            {/* Stats */}
            <div className="stats-container grid sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-card glass rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300"
                >
                  <div
                    className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <div className="text-3xl font-poppins font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
