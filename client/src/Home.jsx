import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  RocketLaunchIcon, 
  UsersIcon, 
  ChartBarIcon, 
  ShieldCheckIcon,
  ArrowRightIcon,
  StarIcon,
  EnvelopeIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Particles from './Particles';
import './home.css';

function Home() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  const features = [
    {
      icon: <RocketLaunchIcon className="w-6 h-6 text-primary group-hover:text-white" />,
      title: 'Project Management',
      description: 'Plan, track, and deliver projects with intuitive task boards and timelines.',
      details: 'Assign tasks, set deadlines, and monitor progress in real-time.'
    },
    {
      icon: <UsersIcon className="w-6 h-6 text-primary group-hover:text-white" />,
      title: 'Team Collaboration',
      description: 'Seamless communication with integrated chat and file sharing.',
      details: 'Share files, comment on tasks, and stay connected across time zones.'
    },
    {
      icon: <ChartBarIcon className="w-6 h-6 text-primary group-hover:text-white" />,
      title: 'Analytics Dashboard',
      description: 'Gain insights with real-time data and customizable reports.',
      details: 'Track KPIs, visualize trends, and make data-driven decisions.'
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6 text-primary group-hover:text-white" />,
      title: 'Secure Platform',
      description: 'Protect your data with enterprise-grade security and compliance.',
      details: 'End-to-end encryption and role-based access control.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Project Manager',
      quote: 'Flowva transformed our workflow, saving us hours every week!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
    },
    {
      name: 'Michael Chen',
      role: 'Developer',
      quote: 'The analytics dashboard is a game-changer for our team.',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=crop&w=100&q=80'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Freelancer',
      quote: 'I manage multiple clients effortlessly with Flowva’s tools.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
    }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setNewsletterStatus('success');
      setEmail('');
      setTimeout(() => setNewsletterStatus(null), 3000);
    } else {
      setNewsletterStatus('error');
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Particles />
        <div className="hero-content">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-gray-800"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Flowva: Empower Your Team
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mt-6 max-w-3xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Collaborate, manage projects, and unlock insights with one powerful platform.
          </motion.p>
          <motion.div
            className="mt-10 flex gap-6 justify-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button
              onClick={() => navigate('/signup')}
              className="btn btn-primary text-lg px-8 py-4"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => navigate('/signin')}
              className="btn btn-secondary text-lg px-8 py-4"
            >
              Sign In
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="features-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-semibold text-center text-gray-800">
          Tools for Success
        </h2>
        <p className="text-lg text-gray-600 text-center mt-4 max-w-3xl mx-auto">
          Everything your team needs to work smarter, from startups to enterprises.
        </p>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card group"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon bg-gray-100 group-hover:bg-primary rounded-full p-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-600 mt-2 text-base">{feature.description}</p>
              <p className="text-gray-500 mt-2 text-sm">{feature.details}</p>
              <motion.button
                className="mt-4 text-primary hover:underline flex items-center gap-2 justify-center text-base"
                whileHover={{ x: 5 }}
              >
                Learn More <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="testimonials-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-semibold text-center text-gray-800">
          Trusted by Teams
        </h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <StarIcon className="w-6 h-6 text-yellow-400 mb-4" />
              <p className="text-gray-600 italic text-base">"{testimonial.quote}"</p>
              <div className="flex items-center mt-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-base">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        className="newsletter-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-semibold text-center text-gray-800">
          Stay in the Loop
        </h2>
        <p className="text-lg text-gray-600 text-center mt-4 max-w-2xl mx-auto">
          Get the latest Flowva updates and productivity tips delivered to your inbox.
        </p>
        <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
              <EnvelopeIcon className="w-5 h-5 ml-2" />
            </button>
          </div>
          {newsletterStatus === 'success' && (
            <p className="success-message mt-4">
              <CheckCircleIcon className="w-5 h-5 inline mr-2" />
              Subscribed successfully!
            </p>
          )}
          {newsletterStatus === 'error' && (
            <p className="error-message mt-4">
              Please enter a valid email.
            </p>
          )}
        </form>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="cta-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="cta-content">
          <h2 className="text-4xl font-semibold text-white">
            Transform Your Workflow Today
          </h2>
          <p className="text-lg text-gray-200 mt-4 max-w-2xl">
            Join thousands of teams thriving with Flowva.
          </p>
          <motion.button
            onClick={() => navigate('/signup')}
            className="btn btn-primary mt-8 text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <span className="ml-2 text-lg font-bold">Flowva</span>
          </div>
          <div className="footer-links">
            <a href="/features" className="text-gray-400 hover:text-primary text-base">Features</a>
            <a href="/pricing" className="text-gray-400 hover:text-primary text-base">Pricing</a>
            <a href="/about" className="text-gray-400 hover:text-primary text-base">About</a>
            <a href="/contact" className="text-gray-400 hover:text-primary text-base">Contact</a>
          </div>
          <div className="footer-social">
            <a href="https://twitter.com" className="text-gray-400 hover:text-primary">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-primary">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-6 text-sm">
          © 2025 Flowva. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;