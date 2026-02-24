import { Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Cloud Architecture', href: '#' },
        { name: 'DevOps Consulting', href: '#' },
        { name: 'CI/CD Pipelines', href: '#' },
        { name: 'Infrastructure as Code', href: '#' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { name: 'GitHub', href: 'https://github.com/ajayraj004' },
        { name: 'LinkedIn', href: 'https://www.linkedin.com/in/ajayraj004/' },
        { name: 'Twitter', href: 'https://x.com/AjayRaj17793923' },
        { name: 'Email', href: 'mailto:ajayraj@gmail.com' },
      ],
    },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#home" className="text-2xl font-poppins font-bold gradient-text mb-4 block">
              Ajay Raj
            </a>
            <p className="text-white/60 mb-6 max-w-sm">
              Cloud Engineer & DevOps Specialist passionate about building scalable infrastructure and automating deployment pipelines.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <span>Made with</span>
              <Heart size={14} className="text-red-500 fill-red-500" />
              <span>and lots of coffee</span>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="text-white font-poppins font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-purple transition-colors duration-300 text-sm"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={(e) => {
                        if (link.href.startsWith('#')) {
                          e.preventDefault();
                          document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center sm:text-left">
              {currentYear} Ajay Raj. All rights reserved.
            </p>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-white/50 hover:text-purple transition-colors duration-300 group"
              aria-label="Back to top"
            >
              <span className="text-sm">Back to top</span>
              <div className="w-8 h-8 rounded-full border border-white/20 group-hover:border-purple flex items-center justify-center transition-colors duration-300">
                <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
