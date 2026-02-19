import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, ExternalLink, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Certification {
  name: string;
  provider: string;
  image: string;
  date: string;
  credential: string;
  description: string;
}

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const certifications: Certification[] = [
    {
      name: 'AWS Solutions Architect',
      provider: 'Amazon Web Services',
      image: '/cert-solutions-architect.jpg',
      date: '2024',
      credential: 'SAA-C03',
      description:
        'Expertise in designing distributed systems on AWS, including multi-tier architectures, high availability, and cost optimization.',
    },
    {
      name: 'AWS Developer Associate',
      provider: 'Amazon Web Services',
      image: '/cert-developer.jpg',
      date: '2024',
      credential: 'DVA-C02',
      description:
        'Proficient in developing, deploying, and debugging cloud-based applications using AWS services and best practices.',
    },
    {
      name: 'AWS SysOps Administrator',
      provider: 'Amazon Web Services',
      image: '/cert-sysops.jpg',
      date: '2023',
      credential: 'SOA-C02',
      description:
        'Skilled in deploying, managing, and operating workloads on AWS with focus on security and compliance.',
    },
    {
      name: 'Terraform Associate',
      provider: 'HashiCorp',
      image: '/cert-terraform.jpg',
      date: '2024',
      credential: 'HCTA0-003',
      description:
        'Certified in Infrastructure as Code practices using Terraform for multi-cloud provisioning and management.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.cert-heading',
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

      // Carousel spin in
      gsap.fromTo(
        carouselRef.current,
        { rotateY: 180, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-rotation
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certifications.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, certifications.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % certifications.length);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + certifications.length) % certifications.length);
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="cert-heading flex items-center justify-center gap-2 mb-4">
            <Award className="text-purple" size={24} />
            <span className="text-purple font-medium">Credentials</span>
          </div>
          <h2 className="cert-heading text-4xl lg:text-5xl font-poppins font-bold mb-4">
            My <span className="gradient-text">Certifications</span>
          </h2>
          <p className="cert-heading text-white/60 max-w-2xl mx-auto">
            Industry-recognized certifications validating expertise in cloud computing and DevOps practices.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="relative"
          style={{ perspective: '1000px' }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Display */}
          <div className="relative max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Image Side */}
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
                <div className="relative w-full h-full rounded-2xl overflow-hidden glow-purple">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ${
                        index === currentIndex
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-95'
                      }`}
                    >
                      <img
                        src={cert.image}
                        alt={cert.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 bg-black/80 hover:bg-purple border border-white/20 hover:border-purple rounded-full flex items-center justify-center transition-all duration-300 z-10"
                  aria-label="Previous certification"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 bg-black/80 hover:bg-purple border border-white/20 hover:border-purple rounded-full flex items-center justify-center transition-all duration-300 z-10"
                  aria-label="Next certification"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Content Side */}
              <div className="text-center lg:text-left">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-500 ${
                      index === currentIndex
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4 absolute pointer-events-none'
                    }`}
                  >
                    <div className="mb-2">
                      <span className="text-purple font-medium">{cert.provider}</span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-poppins font-bold text-white mb-2">
                      {cert.name}
                    </h3>
                    <div className="flex items-center gap-4 mb-4 justify-center lg:justify-start">
                      <span className="text-sm text-white/60">{cert.date}</span>
                      <span className="px-3 py-1 bg-purple/20 rounded-full text-sm text-purple">
                        {cert.credential}
                      </span>
                    </div>
                    <p className="text-white/70 mb-6">{cert.description}</p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-purple/20 hover:bg-purple/30 border border-purple/50 rounded-full text-purple transition-all duration-300">
                      Verify Credential
                      <ExternalLink size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {certifications.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-purple w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to certification ${index + 1}`}
              />
            ))}
          </div>

          {/* Thumbnail Strip */}
          <div className="flex justify-center gap-4 mt-8">
            {certifications.map((cert, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentIndex
                    ? 'ring-2 ring-purple scale-110'
                    : 'opacity-50 hover:opacity-80'
                }`}
              >
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
