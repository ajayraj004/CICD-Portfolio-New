import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, Star, GitFork } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  stars: number;
  forks: number;
}

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      title: 'Cloud Infrastructure Automation',
      description:
        'A comprehensive Terraform-based infrastructure-as-code solution for deploying scalable multi-tier applications on AWS. Features auto-scaling groups, load balancers, RDS databases, and VPC networking with security best practices.',
      image: '/project-cloud-infra.jpg',
      tags: ['Terraform', 'AWS', 'VPC', 'EC2', 'RDS', 'Auto Scaling'],
      githubUrl: 'https://github.com/ajayraj/cloud-infra-automation',
      liveUrl: '#',
      stars: 45,
      forks: 12,
    },
    {
      title: 'CI/CD Pipeline Framework',
      description:
        'End-to-end Jenkins pipeline framework with Docker containerization and Kubernetes deployment. Includes automated testing, security scanning, and blue-green deployment strategies for zero-downtime releases.',
      image: '/project-cicd.jpg',
      tags: ['Jenkins', 'Docker', 'Kubernetes', 'GitOps', 'Helm'],
      githubUrl: 'https://github.com/ajayraj/cicd-pipeline',
      stars: 38,
      forks: 8,
    },
    {
      title: 'Kubernetes Microservices Platform',
      description:
        'Production-ready microservices architecture deployed on EKS with service mesh, monitoring stack (Prometheus/Grafana), and centralized logging. Implements circuit breakers, rate limiting, and distributed tracing.',
      image: '/project-k8s.jpg',
      tags: ['Kubernetes', 'EKS', 'Istio', 'Prometheus', 'Grafana', 'Microservices'],
      githubUrl: 'https://github.com/ajayraj/k8s-microservices',
      liveUrl: '#',
      stars: 52,
      forks: 15,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.projects-heading',
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

      // Project cards stagger
      gsap.fromTo(
        '.project-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="projects-heading text-purple font-medium mb-4">Portfolio</p>
          <h2 className="projects-heading text-4xl lg:text-5xl font-poppins font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="projects-heading text-white/60 max-w-2xl mx-auto">
            Showcasing real-world cloud infrastructure and DevOps implementations with production-ready code.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={cardsRef} className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative glass rounded-2xl overflow-hidden hover:shadow-glow-lg transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* GitHub Stats */}
                <div className="absolute top-4 right-4 flex gap-3">
                  <div className="flex items-center gap-1 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-sm">
                    <Star size={14} className="text-yellow-400" />
                    <span className="text-white">{project.stars}</span>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-sm">
                    <GitFork size={14} className="text-purple" />
                    <span className="text-white">{project.forks}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-poppins font-bold text-white mb-3 group-hover:text-purple transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-purple/10 border border-purple/30 rounded-full text-xs text-purple"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-purple/20 border border-white/10 hover:border-purple/50 rounded-lg text-sm font-medium transition-all duration-300"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-purple hover:bg-purple-dark rounded-lg text-sm font-medium transition-all duration-300"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-purple/10 via-transparent to-purple/10" />
              </div>
            </div>
          ))}
        </div>

        {/* View More CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/ajayraj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-purple/20 border border-white/20 hover:border-purple rounded-full text-white font-medium transition-all duration-300 group"
          >
            <Github size={20} className="group-hover:text-purple transition-colors" />
            View More on GitHub
            <ExternalLink size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
