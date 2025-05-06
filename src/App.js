import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import FullPagePreview from './components/FullPagePreview';
import Loader from './components/Loader';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const emptyResumeData = {
    theme: {
      font: 'Arial',
      fontSize: '14px',
    },
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: ''
    },
    summary: '',
    education: [{
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: ''
    }],
    skills: [],
    professionalExperience: [],
    projects: [],
    certifications: [],
    awards: []
  };

  const sampleResumeData = {
    theme: {
      font: 'Arial',
      fontSize: '14px',
    },
    personalInfo: {
      fullName: 'Abhishek Maurya',
      email: 'abhishek.maurya@example.com',
      phone: '+91 9876543210',
      address: 'Bhopal, Madhya Pradesh',
      linkedin: 'linkedin.com/in/abhishek-maurya'
    },
    summary: 'Dedicated and enthusiastic 3rd-year B.Tech student specializing in Internet of Things (IoT) at LNCT College. Maintaining a strong academic record with 7.5 CGPA. Passionate about emerging technologies and their practical applications in solving real-world problems.',
    education: [{
      school: 'Lakshmi Narain College of Technology (LNCT)',
      degree: 'B.Tech in Internet of Things (IoT)',
      startDate: '2022',
      endDate: '2026',
      description: 'Current CGPA: 7.5'
    }],
    skills: [
      'IoT Development',
      'Embedded Systems',
      'C++',
      'Python',
      'Arduino',
      'Raspberry Pi',
      'Sensor Integration',
      'Network Protocols',
      'Data Analytics',
      'Problem Solving'
    ],
    professionalExperience: [{
      position: 'IoT Project Intern',
      company: 'Tech Solutions Ltd.',
      location: 'Bhopal',
      startDate: '2023-06',
      endDate: '2023-08',
      description: 'Worked on developing smart home automation solutions using IoT devices and sensors. Implemented real-time monitoring systems and developed user interfaces for device control.'
    }],
    projects: [{
      title: 'Smart Agriculture Monitoring System',
      startDate: '2023-01',
      endDate: '2023-05',
      description: 'Developed an IoT-based system for monitoring soil moisture, temperature, and humidity in agricultural fields. Implemented automated irrigation control based on sensor data.',
      technologies: 'Arduino, Sensors, Python, ThingSpeak'
    },
    {
      title: 'Healthcare Monitoring Device',
      startDate: '2023-09',
      endDate: '2023-12',
      description: 'Created a wearable device for monitoring vital signs using IoT technology. Implemented real-time data transmission and alert system for emergency situations.',
      technologies: 'Raspberry Pi, Health Sensors, MQTT, Node.js'
    }],
    certifications: [{
      name: 'IoT Fundamentals',
      issuer: 'Cisco Networking Academy',
      date: '2023'
    },
    {
      name: 'Python for IoT',
      issuer: 'Coursera',
      date: '2023'
    }],
    awards: [{
      title: 'Best IoT Project',
      issuer: 'LNCT College Technical Fest',
      description: 'Won first prize for Smart Agriculture Monitoring System project'
    }]
  };

  const [resumeData, setResumeData] = useState(sampleResumeData);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.body.removeAttribute('data-theme');
    }
  }, [isDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleUpdateData = (newData) => {
    setResumeData(newData);
    localStorage.setItem('resumeData', JSON.stringify(newData));
  };

  const handleClearForm = () => {
    setResumeData(emptyResumeData);
    localStorage.removeItem('resumeData');
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="app">
                  <header className="app-header">
                    <a 
                      href="https://www.linkedin.com/in/abhishek-maurya-707106158/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="linkedin-link"
                    >
                      <img 
                        src="/linkedin-icon.svg" 
                        alt="LinkedIn" 
                        className="linkedin-icon" 
                      />
                      <span>Follow on LinkedIn</span>
                    </a>
                    <h1>Resume Building <span className="hindi-text">आसान है</span></h1>
                    <ThemeToggle isDark={isDarkMode} onToggle={handleThemeToggle} />
                  </header>
                  <main className="app-main">
                    <ResumeForm 
                      data={resumeData} 
                      onUpdate={handleUpdateData} 
                      onClear={handleClearForm}
                    />
                    <ResumePreview data={resumeData} />
                  </main>
                  <div className="copyright-footer">
                    © 2025 Abhishek Maurya. All rights reserved.
                  </div>
                </div>
              } 
            />
            <Route 
              path="/preview" 
              element={<FullPagePreview data={resumeData} />} 
            />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App; 