"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, MapPin } from 'lucide-react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope, 
  FaPhone,
  FaCheckCircle,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    { 
      icon: FaEnvelope, 
      text: 'contact@example.com', 
      href: 'mailto:contact@example.com',
      color: 'text-blue-600' 
    },
    { 
      icon: FaPhone, 
      text: '+1 (555) 123-4567', 
      href: 'tel:+15551234567',
      color: 'text-green-600'
    },
    { 
      icon: IoMdTime, 
      text: 'Available Mon-Fri, 9AM-6PM EST',
      color: 'text-purple-600'
    },
    { 
      icon: FaMapMarkerAlt, 
      text: 'New York, NY, United States',
      color: 'text-red-600'
    }
  ];

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-5xl font-bold  mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let&apos;s collaborate and create something amazing together.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          {/* Contact Info Column */}
          <motion.div 
            className="lg:col-span-2 space-y-6"
            variants={containerVariants}
          >
            {/* Contact Information Card */}
            <Card className=" backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-center gap-3 group"
                  >
                    <item.icon className={`h-5 w-5 ${item.color} group-hover:scale-110 transition-transform`} />
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-muted-foreground hover:text-blue-600 transition-colors"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">{item.text}</span>
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Social Links Card */}
            <Card className=" backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-around">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full hover:bg-gray-100 transition-all group"
                      whileHover={{ scale: 1.1 }}
                      variants={itemVariants}
                    >
                      <link.icon className="h-6 w-6 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div 
            className="lg:col-span-3"
            variants={containerVariants}
          >
            <Card className=" backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Input
                      placeholder="Your Name"
                      className="hover:border-blue-400 focus:border-blue-500 transition-all"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="hover:border-blue-400 focus:border-blue-500 transition-all"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <Textarea
                      placeholder="Your Message"
                      className="h-40 hover:border-blue-400 focus:border-blue-500 transition-all"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    />
                  </motion.div>
                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.div
                        key="submit"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <Button
                          type="submit"
                          className="w-full group"
                          disabled={isSubmitting}
                        >
                          <AnimatePresence mode="wait">
                            {isSubmitting ? (
                              <motion.div
                                key="submitting"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2"
                              >
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Sending...
                              </motion.div>
                            ) : (
                              <motion.div
                                key="default"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2"
                              >
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                Send Message
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-center gap-2 text-green-600 bg-green-50 p-3 rounded-md"
                      >
                        <FaCheckCircle className="w-5 h-5" />
                        Message sent successfully!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;