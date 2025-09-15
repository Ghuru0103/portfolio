// Email Configuration
module.exports = {
  email: {
    user: 'guru.s.prashad@gmail.com',
    // You need to replace this with your actual Gmail app password
    // Instructions:
    // 1. Go to your Google Account settings
    // 2. Enable 2-factor authentication
    // 3. Generate an app password for "Mail"
    // 4. Replace the password below
    password: process.env.EMAIL_PASSWORD || 'your-gmail-app-password-here'
  },
  server: {
    port: process.env.PORT || 3000
  }
};
