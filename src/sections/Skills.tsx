import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Cloud,
  Container,
  Server,
  GitBranch,
  Code2,
  Database,
  Settings,
  Terminal,
  Box,
  Workflow,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.skills-heading',
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

      // Grid 3D unfold animation
      gsap.fromTo(
        gridRef.current,
        { rotateX: 45, opacity: 0 },
        {
          rotateX: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );

      // Skill cards cascade
      gsap.fromTo(
        '.skill-card-item',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillCategories = [
    {
      name: 'Cloud',
      skills: [
        { name: 'AWS', icon: Cloud, level: 90 },
        { name: 'EC2', icon: Server, level: 85 },
        { name: 'S3', icon: Database, level: 88 },
        { name: 'Lambda', icon: Code2, level: 80 },
      ],
    },
    {
      name: 'DevOps',
      skills: [
        { name: 'Docker', icon: Container, level: 92 },
        { name: 'Kubernetes', icon: Box, level: 85 },
        { name: 'Jenkins', icon: Workflow, level: 88 },
        { name: 'CI/CD', icon: GitBranch, level: 90 },
      ],
    },
    {
      name: 'Web Dev',
      skills: [
        { name: 'React', icon: Code2, level: 85 },
        { name: 'Node.js', icon: Server, level: 82 },
        { name: 'Python', icon: Terminal, level: 88 },
        { name: 'TypeScript', icon: Code2, level: 80 },
      ],
    },
    {
      name: 'Tools',
      skills: [
        { name: 'Terraform', icon: Settings, level: 85 },
        { name: 'Git', icon: GitBranch, level: 90 },
        { name: 'Linux', icon: Terminal, level: 88 },
        { name: 'Nginx', icon: Server, level: 78 },
      ],
    },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="skills-heading text-purple font-medium mb-4">What I Do</p>
          <h2 className="skills-heading text-4xl lg:text-5xl font-poppins font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="skills-heading text-white/60 max-w-2xl mx-auto">
            Proficient in modern cloud technologies and DevOps practices, with hands-on experience
            in building scalable infrastructure and automated deployment pipelines.
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          {skillCategories.map((category, catIndex) => (
            <div key={catIndex} className="skill-card-item">
              <div className="glass rounded-2xl p-6 h-full">
                {/* Category Header */}
                <h3 className="text-xl font-poppins font-semibold text-white mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple rounded-full" />
                  {category.name}
                </h3>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="group relative"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-purple/10 transition-all duration-300 cursor-pointer">
                        {/* Icon */}
                        <div className="w-10 h-10 rounded-lg bg-purple/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          <skill.icon size={20} className="text-purple" />
                        </div>

                        {/* Skill Info */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-white">
                              {skill.name}
                            </span>
                            <span className="text-xs text-purple">
                              {skill.level}%
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple to-purple-light rounded-full transition-all duration-500"
                              style={{
                                width:
                                  hoveredSkill === skill.name
                                    ? `${skill.level}%`
                                    : `${skill.level * 0.7}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/60 mb-4">
            Always learning and exploring new technologies
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Cloud Native', 'Infrastructure as Code', 'Microservices', 'Serverless'].map(
              (tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-purple/10 border border-purple/30 rounded-full text-sm text-purple"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
