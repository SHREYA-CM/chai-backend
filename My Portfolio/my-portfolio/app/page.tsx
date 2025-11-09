"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
    Menu, X, Linkedin, Github, ArrowUp, Briefcase, Building, GraduationCap, 
    ArrowRight, Mail, Phone, MapPin, Send, Star, GitFork, 
    Code, Instagram, Loader2 // Facebook aur Twitter ko import se hata diya gaya
} from 'lucide-react';

// --- Data Arrays (No Change) ---
const skills = [
    { icon: '🐍', name: 'Python' },
    { icon: 'JS', name: 'JavaScript (ES6+)' },
    { icon: '⚛️', name: 'React.js' },
    { icon: 'N', name: 'Next.js' },
    { icon: 'E', name: 'Express.js' },
    { icon: '🍃', name: 'MongoDB' },
    { icon: 'M', name: 'MERN Stack' },
    { icon: '💨', name: 'Tailwind CSS' },
    { icon: 'F', name: 'Framer' },
    { icon: '🌐', name: 'HTML5 & CSS3' },
    { icon: '🔧', name: 'REST APIs' },
    { icon: '🐙', name: 'Git & GitHub' },
];

const projects = [
    {
        imgSrc: 'https://placehold.co/600x400/334155/e2e8f0?text=Doctor+App',
        alt: 'Doctor Appointment App',
        title: 'Doctor Appointment Booking',
        code: `<span class="text-[#f92672]">const</span> <span class="text-[#66d9ef]">project</span> <span class="text-[#f92672]">=</span> {
  <span class="text-[#66d9ef]">name</span>: <span class="text-[#a6e22e]">'Doctor Appointment'</span>,
  <span class="text-[#66d9ef]">tools</span>: [<span class="text-[#a6e22e]">'MERN'</span>, <span class="text-[#a6e22e]">'JWT'</span>, <span class="text-[#a6e22e]">'Tailwind'</span>],
  <span class="text-[#66d9ef]">myRole</span>: <span class="text-[#a6e22e]">'Full Stack Developer'</span>,
  <span class="text-[#66d9ef]">description</span>: <span class="text-[#a6e22e]">'Engineered a full-stack web app...'</span>
}`
    },
    {
        imgSrc: 'https://placehold.co/600x400/334155/e2e8f0?text=GitHub+Viewer',
        alt: 'GitHub Profile Viewer',
        title: 'GitHub Profile Viewer',
        code: `<span class="text-[#f92672]">const</span> <span class="text-[#66d9ef]">project</span> <span class="text-[#f92672]">=</span> {
  <span class="text-[#66d9ef]">name</span>: <span class="text-[#a6e22e]">'GitHub Profile Viewer'</span>,
  <span class="text-[#66d9ef]">tools</span>: [<span class="text-[#a6e22e]">'React.js'</span>, <span class="text-[#a6e22e]">'REST API'</span>],
  <span class="text-[#66d9ef]">myRole</span>: <span class="text-[#a6e22e]">'Frontend Developer'</span>,
  <span class="text-[#66d9ef]">description</span>: <span class="text-[#a6e22e]">'Developed a React app to fetch...'</span>
}`
    },
    {
        imgSrc: 'https://placehold.co/600x400/334155/e2e8f0?text=Weather+App',
        alt: 'Dynamic Weather App',
        title: 'Dynamic Weather App',
        code: `<span class="text-[#f92672]">const</span> <span class="text-[#66d9ef]">project</span> <span class="text-[#f92672]">=</span> {
  <span class="text-[#66d9ef]">name</span>: <span class="text-[#a6e22e]">'Dynamic Weather App'</span>,
  <span class="text-[#66d9ef]">tools</span>: [<span class="text-[#a6e22e]">'JavaScript'</span>, <span class="text-[#a6e22e]">'API'</span>],
  <span class="text-[#66d9ef]">myRole</span>: <span class="text-[#a6e22e]">'Developer'</span>,
  <span class="text-[#66d9ef]">description</span>: <span class="text-[#a6e22e]">'Built a real-time weather dashboard...'</span>
}`
    }
];

// --- Reusable Components (No Change) ---

const NavLink = ({ href, children, isActive, onClick }) => (
    <a 
        href={href} 
        onClick={onClick}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive 
                ? 'text-[#64ffda]' 
                : 'text-gray-300 hover:text-white'
        }`}
    >
        {children}
    </a>
);

const TimelineItem = ({ icon, date, title, subtitle, description, isLast }) => (
    <div className="relative pl-12 pb-10">
        {!isLast && (
            <div className="absolute left-[18px] top-5 w-0.5 h-full bg-[#3a3a5a] -translate-x-1/2"></div>
        )}
        <div className="absolute left-0 top-2 flex items-center justify-center w-10 h-10 rounded-full bg-[#9370db] text-white z-10">
            {icon}
        </div>
        <span className="text-sm text-gray-400">{date}</span>
        <h3 className="text-xl font-bold text-white mt-1">{title}</h3>
        <h4 className="text-md font-semibold text-fuchsia-400 mb-2">{subtitle}</h4>
        <p className="text-gray-300">{description}</p>
    </div>
);

const SkillCard = ({ icon, name }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-5 text-center hover:border-fuchsia-500 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
        <span className="text-4xl" role="img" aria-label={name}>{icon}</span>
        <h3 className="mt-3 font-semibold text-white">{name}</h3>
    </div>
);

const ProjectCard = ({ project }) => (
    <div className="bg-gray-800/70 rounded-lg overflow-hidden shadow-2xl border border-gray-700 flex flex-col">
        <img src={project.imgSrc} alt={project.alt} className="w-full h-48 object-cover" />
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
            <div className="font-mono text-xs bg-black/30 rounded p-3 mb-4 h-36 overflow-y-auto">
                <pre>
                    <code 
                        className="language-js"
                        dangerouslySetInnerHTML={{ __html: project.code }}
                    >
                    </code>
                </pre>
            </div>
            <div className="mt-auto flex space-x-4">
                <a href="https://github.com/SHREYA-CM" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#9370db] to-[#da70d6] hover:from-[#da70d6] hover:to-[#9370db] transition duration-500 text-white text-sm text-center font-semibold py-2 px-5 rounded-lg w-full">
                    View Code
                </a>
                <a href="#" className="border-2 border-[#da70d6] text-[#da70d6] hover:bg-[#da70d6]/10 transition duration-500 text-sm font-semibold py-2 px-5 rounded-lg w-full text-center">
                    Live Demo
                </a>
            </div>
        </div>
    </div>
);

// --- Page Sections (No Change, except Contact) ---

const Header = ({ isMenuOpen, setIsMenuOpen, activeSection, handleNavClick }) => (
    <header className="sticky top-0 z-50 w-full bg-[#0a192f]/80 backdrop-blur-md border-b border-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <a href="#home" onClick={handleNavClick} className="text-2xl font-bold text-white tracking-wider">
                    SHREYA PANDEY
                </a>
                
                <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                        <NavLink href="#about" isActive={activeSection === 'about'} onClick={handleNavClick}>ABOUT</NavLink>
                        <NavLink href="#experience" isActive={activeSection === 'experience'} onClick={handleNavClick}>EXPERIENCE</NavLink>
                        <NavLink href="#skills" isActive={activeSection === 'skills'} onClick={handleNavClick}>SKILLS</NavLink>
                        <NavLink href="#projects" isActive={activeSection === 'projects'} onClick={handleNavClick}>PROJECTS</NavLink>
                        <NavLink href="#education" isActive={activeSection === 'education'} onClick={handleNavClick}>EDUCATION</NavLink>
                        <NavLink href="#contact" isActive={activeSection === 'contact'} onClick={handleNavClick}>CONTACT</NavLink>
                    </div>
                </div>
                
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white focus:outline-none">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>
        </nav>
        
        {isMenuOpen && (
            <div className="md:hidden bg-[#0a192f] border-t border-gray-800">
                <a href="#about" onClick={handleNavClick} className={`block px-4 py-3 text-base font-medium ${activeSection === 'about' ? 'text-[#64ffda]' : 'text-gray-300 hover:text-white'}`}>ABOUT</a>
                <a href="#experience" onClick={handleNavClick} className={`block px-4 py-3 text-base font-medium ${activeSection === 'experience' ? 'text-[#64ffda]' : 'text-gray-300 hover:text-white'}`}>EXPERIENCE</a>
                <a href="#skills" onClick={handleNavClick} className={`block px-4 py-3 text-base font-medium ${activeSection === 'skills' ? 'text-[#64ffda]' : 'text-gray-300 hover:text-white'}`}>SKILLS</a>
                <a href="#projects" onClick={handleNavClick} className={`block px-4 py-3 text-base font-medium ${activeSection === 'projects' ? 'text-[#64ffda]' : 'text-gray-300 hover:text-white'}`}>PROJECTS</a>
                <a href="#education" onClick={handleNavClick} className={`block px-4 py-3 text-base font-medium ${activeSection === 'education' ? 'text-[#64ffda]' : 'text-gray-300 hover:text-white'}`}>EDUCATION</a>
                <a href="#contact" onClick={handleNavClick} className={`block px-4 py-3 text-base font-medium ${activeSection === 'contact' ? 'text-[#64ffda]' : 'text-gray-300 hover:text-white'}`}>CONTACT</a>
            </div>
        )}
    </header>
);

const HomeSection = React.forwardRef((props, ref) => ( // Renamed from Home to HomeSection
    <section id="home" ref={ref} className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left Side: Text and Buttons */}
            <div className="text-center md:text-left">
                <span className="text-lg text-gray-300">Hello, This is</span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-2">
                    Shreya Pandey,
                </h1>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-300 mt-2">
                    I'm a Professional
                </h2>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#9370db] to-[#da70d6] bg-clip-text text-transparent mt-2">
                    Software Developer.
                </h2>
                
                <div className="mt-8 flex justify-center md:justify-start space-x-6">
                    <a href="https://linkedin.com/in/shreya-pandey-a8459a276" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-fuchsia-400 transition-colors duration-300">
                        <Linkedin size={32} />
                    </a>
                    <a href="https://github.com/SHREYA-CM" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-fuchsia-400 transition-colors duration-300">
                        <Github size={32} />
                    </a>
                    <a href="https://leetcode.com/u/Shreyaaaa_pandey/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-fuchsia-400 transition-colors duration-300">
                        <Code size={32} />
                    </a>
                    <a href="https://www.instagram.com/s_hreya_p_andey/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-fuchsia-400 transition-colors duration-300">
                        <Instagram size={32} />
                    </a>
                    {/* Facebook aur Twitter hata diye gaye */}
                </div>
                
                <div className="mt-10 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                    <a href="#contact" className="bg-gradient-to-r from-[#9370db] to-[#da70d6] hover:from-[#da70d6] hover:to-[#9370db] transition duration-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg">
                        CONTACT ME
                    </a>
                    <a href="Shreya_Pandey_Resume.pdf" target="_blank" className="border-2 border-[#da70d6] text-[#da70d6] hover:bg-[#da70d6]/10 transition duration-500 font-semibold py-3 px-8 rounded-lg">
                        GET RESUME
                    </a>
                </div>
            </div>
            
            {/* Right Side: Code Snippet */}
            <div className="hidden md:block">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-2xl font-mono text-sm overflow-hidden">
                    <div className="flex space-x-1.5 mb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <pre><code className="language-js">
<span className="text-[#f92672]">const</span> <span className="text-[#66d9ef]">shreya</span> <span className="text-[#f92672]">=</span> {`{`}
  <span className="text-[#66d9ef]">name</span>: <span className="text-[#a6e22e]">'Shreya Pandey'</span>,
  <span className="text-[#66d9ef]">skills</span>: [
    <span className="text-[#a6e22e]">'React.js'</span>, <span className="text-[#a6e22e]">'Next.js'</span>, <span className="text-[#a6e22e]">'JavaScript'</span>,
    <span className="text-[#a6e22e]">'Node.js'</span>, <span className="text-[#a6e22e]">'Express'</span>, <span className="text-[#a6e22e]">'MongoDB'</span>,
    <span className="text-[#a6e22e]">'MERN Stack'</span>, <span className="text-[#a6e22e]">'Python'</span>, <span className="text-[#a6e22e]">'TailwindCSS'</span>
  ],
  <span className="text-[#66d9ef]">hardWorker</span>: <span className="text-[#f92672]">true</span>,
  <span className="text-[#66d9ef]">quickLearner</span>: <span className="text-[#f92672]">true</span>,
  <span className="text-[#66d9ef]">problemSolver</span>: <span className="text-[#f92672]">true</span>,
  <span className="text-[#66d9ef]">hireable</span>: <span className="text-[#e6db74]">function</span>() {`{`}
    <span className="text-[#f92672]">return</span> (
      <span className="text-[#f92672]">this</span>.hardWorker &&
      <span className="text-[#f92672]">this</span>.problemSolver &&
      <span className="text-[#f92672]">this</span>.skills.length {'>'}= <span className="text-[#a6e22e]">5</span>
    );
  {`}`}
{`}`};
                    </code></pre>
                </div>
            </div>
        </div>
    </section>
));

const About = React.forwardRef((props, ref) => (
    <section id="about" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#64ffda] text-center mb-16">
                WHO I AM?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                <div className="flex justify-center md:order-last">
                    {/* Replaced Image with Code Snippet */}
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-2xl font-mono text-sm overflow-hidden w-full max-w-md">
                        <div className="flex space-x-1.5 mb-4">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <pre><code className="language-js">
<span className="text-[#75715e]">/* My Professional Philosophy */</span>

<span className="text-[#f92672]">class</span> <span className="text-[#e6db74]">Developer</span> {'{'}
  <span className="text-[#66d9ef]">constructor</span>() {'{'}
    <span className="text-[#f92672]">this</span>.<span className="text-[#66d9ef]">name</span> <span className="text-[#f92672]">=</span> <span className="text-[#a6e22e]">'Shreya Pandey'</span>;
    <span className="text-[#f92672]">this</span>.<span className="text-[#66d9ef]">attitude</span> <span className="text-[#f92672]">=</span> <span className="text-[#a6e22e]">'Self-Learner'</span>;
    <span className="text-[#f92672]">this</span>.<span className="text-[#66d9ef]">passion</span> <span className="text-[#f92672]">=</span> [
      <span className="text-[#a6e22e]">'Problem-Solving'</span>,
      <span className="text-[#a6e22e]">'New Technologies'</span>,
      <span className="text-[#a6e22e]">'Open Web'</span>
    ];
  {'}'}

  <span className="text-[#e6db74]">work</span>() {'{'}
    <span className="text-[#66d9ef]">console</span>.<span className="text-[#e6db74]">log</span>(<span className="text-[#a6e22e]">'Building useful and'</span> +
      <span className="text-[#a6e22e]">' enthusiastic applications...'</span>);
  {'}'}

  <span className="text-[#e6db74]">getCoreSkill</span>() {'{'}
    <span className="text-[#f92672]">return</span> <span className="text-[#a6e22e]">'JavaScript'</span>;
  {'}'}
{'}'}
                        </code></pre>
                    </div>
                </div>
                <div className="text-lg text-gray-300 space-y-4 text-center md:text-left">
                    <p>My name is Shreya Pandey. I am a professional and enthusiastic programmer in my daily life. I am a quick learner with a self-learning attitude.</p>
                    <p>I love to learn and explore new technologies and am passionate about problem-solving. I love to almost all the stacks of web application development and love to make the web more open to the world.</p>
                    <p>My core skill is based on JavaScript, and I am available for any kind of job opportunity that suits my skills and interests.</p>
                </div>
            </div>
        </div>
    </section>
));

const Experience = React.forwardRef((props, ref) => (
    <section id="experience" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#64ffda] text-center mb-16">
                Experiences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
                <div className="hidden md:flex justify-center items-center">
                    <img src="https://placehold.co/600x400/0a192f/64ffda?text=Experience+Graphic" alt="Work" className="rounded-lg w-full max-w-md" />
                </div>
                <div className="relative mt-4">
                    <TimelineItem
                        icon={<Briefcase size={20} />}
                        date="Recent"
                        title="Frontend Developer Intern"
                        subtitle="RD Group of Industries (Remote)"
                        description="Developed responsive UI components using HTML, CSS, JavaScript, and React.js. Collaborated with designers and backend developers to build functional, optimized pages. Improved user experience through clean layouts and interactive features."
                    />
                    <TimelineItem
                        icon={<Building size={20} />}
                        date="Summer 2024 (Assumed)"
                        title="Summer Intern"
                        subtitle="Banaras Locomotive Works (BLW), Indian Railways (Varanasi, UP)"
                        description="Analyzed maintenance protocols for mission-critical electrical systems. Improved understanding of large-scale industrial operations and quality control."
                        isLast={true}
                    />
                </div>
            </div>
        </div>
    </section>
));

const Skills = React.forwardRef((props, ref) => (
    <section id="skills" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#64ffda] text-center mb-16">
                Skills
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {skills.map((skill) => (
                    <SkillCard key={skill.name} icon={skill.icon} name={skill.name} />
                ))}
            </div>
        </div>
    </section>
));

const Projects = React.forwardRef((props, ref) => (
    <section id="projects" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#64ffda] text-center mb-16">
                Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </div>
        </div>
    </section>
));

const Education = React.forwardRef((props, ref) => (
    <section id="education" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#64ffda] text-center mb-16">
                Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
                <div className="hidden md:flex justify-center items-center">
                    <img src="https://placehold.co/600x400/0a192f/64ffda?text=Education+Graphic" alt="Education" className="rounded-lg w-full max-w-md" />
                </div>
                <div className="relative mt-4">
                    <TimelineItem
                        icon={<GraduationCap size={20} />}
                        date="2022 - 2026"
                        title="Bachelor of Technology, Electrical Engineering"
                        subtitle="Rajkiya Engineering College, Sonbadra"
                        description="SGPA: 7.0"
                        // isLast={true} // No longer the last item
                    />
                    <TimelineItem
                        icon={<GraduationCap size={20} />}
                        date="2020 - 2022" // Assumed date based on B.Tech
                        title="Class 12th (Higher Secondary)"
                        subtitle="Jay Jyoti Inter College, Sonbhadra"
                        description="Percentage: 76.4%"
                    />
                    <TimelineItem
                        icon={<GraduationCap size={20} />}
                        date="2018 - 2020" // Assumed date
                        title="Class 10th (Secondary)"
                        subtitle="Jay Jyoti Inter College, Sonbhadra"
                        description="Percentage: 82.5%"
                        isLast={true} // This is now the last item
                    />
                </div>
            </div>
        </div>
    </section>
));

const Blogs = React.forwardRef((props, ref) => (
    <section id="blogs" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#64ffda] text-center mb-8">
                Blogs
            </h2>
            <p className="text-lg text-gray-300 mb-8">
                I occasionally write about technology, web development, and things I'm learning.
            </p>
            <a href="https://github.com/SHREYA-CM" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-gradient-to-r from-[#9370db] to-[#da70d6] hover:from-[#da70d6] hover:to-[#9370db] transition duration-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg text-lg">
                VIEW MORE <ArrowRight size={20} className="ml-2" />
            </a>
        </div>
    </section>
));

// --- UPDATED Contact Component ---
const Contact = React.forwardRef(({ handleSubmit, isSending, notificationMessage, isError }, ref) => (
    <section id="contact" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#64ffda] text-center mb-6">
                CONTACT WITH ME
            </h2>
            <p className="text-lg text-gray-300 text-center mb-12 max-w-2xl mx-auto">
                If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name:</label>
                        <input type="text" id="name" name="name" required className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Your Email:</label>
                        <input type="email" id="email" name="email" required className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500" />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Your Message:</label>
                        <textarea id="message" name="message" rows="5" required className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"></textarea>
                    </div>
                    
                    {/* Note: Real reCAPTCHA setup is more complex, this is a visual placeholder */}
                    <div className="flex items-center">
                        <input id="robot-check" type="checkbox" required className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-fuchsia-600 focus:ring-fuchsia-500" />
                        <label htmlFor="robot-check" className="ml-2 block text-sm text-gray-300">I'm not a robot (Required)</label>
                    </div>
                    
                    <button 
                        type="submit" 
                        disabled={isSending}
                        className="w-full flex items-center justify-center bg-gradient-to-r from-[#9370db] to-[#da70d6] hover:from-[#da70d6] hover:to-[#9370db] transition duration-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSending ? (
                            <>
                                <Loader2 size={18} className="ml-2 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                SEND MESSAGE <Send size={18} className="ml-2" />
                            </>
                        )}
                    </button>
                </form>
                
                <div className="space-y-6 text-lg">
                    <div className="flex items-center space-x-4">
                        <Mail size={24} className="text-fuchsia-400" />
                        <a href="mailto:shreyap6307@gmail.com" className="text-gray-300 hover:text-white">shreyap6307@gmail.com</a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Phone size={24} className="text-fuchsia-400" />
                        <span className="text-gray-300">+91 70077 58523</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <MapPin size={24} className="text-fuchsia-400" />
                        <span className="text-gray-300">Varanasi, UP (from BLW Intern)</span>
                    </div>
                    
                    <div className="flex space-x-6 pt-6">
                        <a href="https://linkedin.com/in/shreya-pandey-a8459a276" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-fuchsia-400 transition-colors duration-300">
                            <Linkedin size={32} />
                        </a>
                        <a href="https://github.com/SHREYA-CM" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-fuchsia-400 transition-colors duration-300">
                            <Github size={32} />
                        </a>
                        <a href="https://leetcode.com/u/Shreyaaaa_pandey/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-fuchsia-400 transition-colors duration-300">
                            <Code size={32} />
                        </a>
                        <a href="https://www.instagram.com/s_hreya_p_andey/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-fuchsia-400 transition-colors duration-300">
                            <Instagram size={32} />
                        </a>
                        {/* Facebook aur Twitter hata diye gaye */}
                    </div>
                </div>
            </div>
        </div>
    </section>
));

const Footer = () => (
    <footer className="py-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
            <p className="mb-4">Developer Portfolio by Shreya Pandey</p>
            <div className="flex justify-center space-x-4">
                <a href="https://github.com/SHREYA-CM/Portfolio" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <Star size={16} />
                    <span>Star</span>
                </a>
                <a href="https://github.com/SHREYA-CM/Portfolio/fork" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <GitFork size={16} />
                    <span>Fork</span>
                </a>
            </div>
        </div>
    </footer>
);

// --- Floating Elements (No Change) ---

const FloatingNav = ({ showTopBtn, handleScrollToTop }) => (
    <>
        {/* Floating "CONTACT" Label */}
        <div className="hidden md:block fixed right-5 top-1/2 -translate-y-1/2 z-40">
            <a href="#contact" className="[writing-mode:vertical-rl] rotate-180 text-gray-400 hover:text-white font-semibold tracking-widest">
                CONTACT
            </a>
        </div>

        {/* Scroll to Top Button */}
        {showTopBtn && (
            <button 
                onClick={handleScrollToTop}
                className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#9370db] to-[#da70d6] hover:from-[#da70d6] hover:to-[#9370db] text-white p-3 rounded-full shadow-lg transition-opacity duration-300"
            >
                <ArrowUp size={20} />
            </button>
        )}
    </>
);

// --- NEW Notification Component ---
const Notification = ({ message, isError }) => {
    if (!message) return null;

    return (
        <div className={`fixed top-5 right-5 px-6 py-3 rounded-lg shadow-lg z-[1000] transition-all duration-300
            ${isError ? 'bg-red-500 text-white' : 'bg-[#64ffda] text-[#0a192f]'}
        `}>
            {message}
        </div>
    );
};


// --- Main App Component ---

export default function Page() { // Changed export name from Home to Page
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [showTopBtn, setShowTopBtn] = useState(false);
    
    // --- NEW States for Form ---
    const [isSending, setIsSending] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isError, setIsError] = useState(false);
    
    // Create refs for each section
    const homeRef = useRef(null);
    const aboutRef = useRef(null);
    const experienceRef = useRef(null);
    const skillsRef = useRef(null);
    const projectsRef = useRef(null);
    const educationRef = useRef(null);
    const blogsRef = useRef(null);
    const contactRef = useRef(null);
    
    // --- Event Handlers ---

    // Smooth scroll handler (No Change)
    const handleNavClick = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };
    
    // Scroll to top handler (No Change)
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- NEW Form submission handler ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        setNotificationMessage('');
        setIsError(false);

        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            message: e.target.message.value,
        };

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setNotificationMessage('Message sent successfully!');
                setIsError(false);
                e.target.reset();
            } else {
                setNotificationMessage(data.error || 'Failed to send message.');
                setIsError(true);
            }
        } catch (error) {
            console.error('Submission error:', error);
            setNotificationMessage('An error occurred. Please try again.');
            setIsError(true);
        } finally {
            setIsSending(false);
            // Notification ko 3 second baad gayab kar dein
            setTimeout(() => {
                setNotificationMessage('');
            }, 3000);
        }
    };
    
    // --- Side Effects (No Change) ---
    
    useEffect(() => {
        // Observer for active nav link
        const sections = [
            homeRef, aboutRef, experienceRef, skillsRef, 
            projectsRef, educationRef, blogsRef, contactRef
        ];
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { rootMargin: '-30% 0px -70% 0px' }); // Highlights when section is in middle of screen
        
        sections.forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });
        
        // Listener for scroll-to-top button
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        
        // Cleanup
        return () => {
            sections.forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array ensures this runs once on mount
    
    return (
        <div className="bg-[#0a192f] text-[#ccd6f6] font-sans overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
            <Header 
                isMenuOpen={isMenuOpen} 
                setIsMenuOpen={setIsMenuOpen} 
                activeSection={activeSection}
                handleNavClick={handleNavClick}
            />
            
            <main>
                <HomeSection ref={homeRef} /> {/* Updated component name */}
                <About ref={aboutRef} />
                <Experience ref={experienceRef} />
                <Skills ref={skillsRef} />
                <Projects ref={projectsRef} />
                <Education ref={educationRef} />
                <Blogs ref={blogsRef} />
                <Contact 
                    ref={contactRef} 
                    handleSubmit={handleSubmit}
                    isSending={isSending}
                    notificationMessage={notificationMessage}
                    isError={isError}
                />
            </main>
            
            <Footer />

            <FloatingNav 
                showTopBtn={showTopBtn}
                handleScrollToTop={handleScrollToTop}
            />
            
            <Notification 
                message={notificationMessage}
                isError={isError}
            />
        </div>
    );
}