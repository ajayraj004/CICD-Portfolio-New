import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MapPin, Phone, Linkedin, Github, Twitter, CheckCircle, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        '.contact-heading',
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

      // Form animation
      gsap.fromTo(
        '.contact-form',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
          },
        }
      );

      // Info cards animation
      gsap.fromTo(
        '.contact-info-card',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setFormState('success');

    // Reset after showing success
    setTimeout(() => {
      setFormState('idle');
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'ajayraj@gmail.com',
      href: 'mailto:ajayraj@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 7535804268',
      href: 'tel:+75358042680',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'India',
      href: '#',
    },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/ajayraj004', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/ajayraj004/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/AjayRaj17793923', label: 'Twitter' },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-black overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="contact-heading text-purple font-medium mb-4">Get In Touch</p>
          <h2 className="contact-heading text-4xl lg:text-5xl font-poppins font-bold mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="contact-heading text-white/60 max-w-2xl mx-auto">
            Have a project in mind or want to discuss cloud infrastructure? I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left side - Contact Info */}
          <div className="contact-info">
            <h3 className="text-2xl font-poppins font-bold text-white mb-6">
              Contact Information
            </h3>
            <p className="text-white/60 mb-8">
              Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="contact-info-card flex items-center gap-4 p-4 glass rounded-xl hover:bg-purple/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-purple/20 flex items-center justify-center group-hover:bg-purple/30 transition-colors">
                    <info.icon size={20} className="text-purple" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">{info.label}</p>
                    <p className="text-white font-medium">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-white/50 mb-4">Follow me on</p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass rounded-lg flex items-center justify-center hover:bg-purple/20 hover:border-purple/50 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon size={20} className="text-white/70 group-hover:text-purple transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="contact-form">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-xl font-poppins font-bold text-white mb-6">
                Send a Message
              </h3>

              <div className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all duration-300 peer"
                    placeholder="Name"
                    id="name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-4 text-white/50 text-sm transition-all duration-300 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-purple peer-focus:bg-black peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-black peer-[:not(:placeholder-shown)]:px-1"
                  >
                    Your Name
                  </label>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all duration-300 peer"
                    placeholder="Email"
                    id="email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 top-4 text-white/50 text-sm transition-all duration-300 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-purple peer-focus:bg-black peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-black peer-[:not(:placeholder-shown)]:px-1"
                  >
                    Your Email
                  </label>
                </div>

                {/* Message Field */}
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/20 transition-all duration-300 peer resize-none"
                    placeholder="Message"
                    id="message"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-4 top-4 text-white/50 text-sm transition-all duration-300 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-xs peer-focus:text-purple peer-focus:bg-black peer-focus:px-1 peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-black peer-[:not(:placeholder-shown)]:px-1"
                  >
                    Your Message
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formState !== 'idle'}
                  className={`w-full py-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                    formState === 'success'
                      ? 'bg-green-500 text-white'
                      : 'bg-purple hover:bg-purple-dark text-white hover:shadow-glow'
                  }`}
                >
                  {formState === 'idle' && (
                    <>
                      Send Message
                      <Send size={18} />
                    </>
                  )}
                  {formState === 'loading' && (
                    <>
                      Sending...
                      <Loader2 size={18} className="animate-spin" />
                    </>
                  )}
                  {formState === 'success' && (
                    <>
                      Message Sent!
                      <CheckCircle size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
