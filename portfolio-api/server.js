const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running!' });
});

// Portfolio data endpoints
app.get('/api/profile', (req, res) => {
  res.json({
    name: 'GuruPrashad',
    title: 'Full Stack Developer',
    email: 'guru.s.prashad@gmail.com',
    location: 'Madurai, India',
    bio: 'Passionate developer with expertise in modern web technologies.',
    skills: ['Angular', 'Node.js', 'TypeScript', 'Express', 'MySQL'],
    social: {
      github: 'https://github.com/yourusername',
      linkedin: 'https://linkedin.com/in/yourusername',
      twitter: 'https://twitter.com/yourusername'
    }
  });
});

app.get('/api/projects', (req, res) => {
  res.json([
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'A modern portfolio website built with Angular and Express',
      technologies: ['Angular', 'Express', 'TypeScript'],
      image: 'https://via.placeholder.com/400x300',
      liveUrl: 'https://yourportfolio.com',
      githubUrl: 'https://github.com/yourusername/portfolio'
    },
    {
      id: 2,
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://via.placeholder.com/400x300',
      liveUrl: 'https://yourecommerce.com',
      githubUrl: 'https://github.com/yourusername/ecommerce'
    }
  ]);
});

app.get('/api/experience', (req, res) => {
  res.json([
    {
      id: 1,
      company: 'Tech Company',
      position: 'Senior Developer',
      duration: '2022 - Present',
      description: 'Led development of multiple web applications and mentored junior developers.',
      technologies: ['Angular', 'Node.js', 'AWS', 'Docker']
    },
    {
      id: 2,
      company: 'Startup Inc',
      position: 'Full Stack Developer',
      duration: '2020 - 2022',
      description: 'Built and maintained web applications from scratch using modern technologies.',
      technologies: ['React', 'Express', 'PostgreSQL', 'Redis']
    }
  ]);
});

app.listen(port, () => {
  console.log(`Portfolio API server is running on http://localhost:${port}`);
});