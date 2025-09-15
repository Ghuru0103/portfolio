const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const config = require('./config');
const app = express();
const port = config.server.port;

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration with fallback
let transporter = null;
let emailEnabled = false;

try {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email.user,
      pass: config.email.password
    }
  });

  // Verify email configuration
  transporter.verify((error, success) => {
    if (error) {
      console.log('Email configuration error:', error.message);
      console.log('📧 Email service disabled - messages will be logged to console');
      emailEnabled = false;
    } else {
      console.log('✅ Email server is ready to send messages');
      emailEnabled = true;
    }
  });
} catch (error) {
  console.log('📧 Email service disabled - messages will be logged to console');
  emailEnabled = false;
}

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

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('📨 Contact form submission received:', req.body);
    
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      console.log('❌ Validation failed - missing fields');
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    // Always log the message for debugging
    console.log('\n📧 ===== NEW CONTACT FORM MESSAGE =====');
    console.log(`👤 Name: ${name}`);
    console.log(`📮 Email: ${email}`);
    console.log(`💬 Message: ${message}`);
    console.log(`⏰ Time: ${new Date().toLocaleString()}`);
    console.log('=====================================\n');

    let emailSent = false;

    // Try to send email if service is enabled
    if (emailEnabled && transporter) {
      try {
        const mailOptions = {
          from: config.email.user,
          to: config.email.user,
          subject: `Portfolio Contact Form - Message from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><em>Sent from your portfolio contact form</em></p>
          `
        };

        console.log('📤 Attempting to send email...');
        const result = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', result.messageId);
        emailSent = true;

      } catch (emailError) {
        console.log('❌ Email sending failed:', emailError.message);
        console.log('📝 Message logged to console instead');
      }
    } else {
      console.log('📝 Email service disabled - message logged to console');
    }

    // Always return success since we logged the message
    res.json({ 
      success: true, 
      message: emailSent ? 
        'Message sent successfully!' : 
        'Message received! (Email service temporarily disabled - message logged)'
    });

  } catch (error) {
    console.error('💥 Server error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again or contact directly at guru.s.prashad@gmail.com'
    });
  }
});

app.listen(port, () => {
  console.log(`Portfolio API server is running on http://localhost:${port}`);
});