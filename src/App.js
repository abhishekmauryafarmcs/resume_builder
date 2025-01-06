import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import FullPagePreview from './components/FullPagePreview';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import FeedbackModal from './components/FeedbackModal';
import emailjs from '@emailjs/browser';
import app from './firebase';
import Loader from './components/Loader';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [resumeData, setResumeData] = useState({
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
      endDate: ''
    }],
    experience: [],
    skills: [],
    professionalExperience: [],
    projects: [],
    awards: [],
    certifications: []
  });

  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showHindiText, setShowHindiText] = useState(false);

  useEffect(() => {
    emailjs.init("YOUR_PUBLIC_KEY");
    
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setShowHindiText(true);
      }, 100);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
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

  const generateWordDocument = async () => {
    const doc = new Document({
      sections: [{
        properties: {
          page: {
            size: {
              width: 11906,
              height: 16838,
            },
            margin: {
              top: 360,
              right: 360,
              bottom: 360,
              left: 360
            }
          },
        },
        children: [
          // Personal Info
          new Paragraph({
            text: resumeData.personalInfo.fullName,
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 200 },
            style: {
              font: resumeData.theme.font,
              size: 32,
              color: '#2c3e50'
            }
          }),
          new Paragraph({
            children: [
              new TextRun({ 
                text: resumeData.personalInfo.email && `📧 ${resumeData.personalInfo.email}`,
                size: 20,
                color: '#666666'
              }),
              resumeData.personalInfo.phone && new TextRun({ text: " | ", size: 20 }),
              new TextRun({ 
                text: resumeData.personalInfo.phone && `📱 ${resumeData.personalInfo.phone}`,
                size: 20,
                color: '#666666'
              }),
              resumeData.personalInfo.address && new TextRun({ text: " | ", size: 20 }),
              new TextRun({ 
                text: resumeData.personalInfo.address && `📍 ${resumeData.personalInfo.address}`,
                size: 20,
                color: '#666666'
              })
            ],
            spacing: { after: 400 },
            alignment: 'center'
          }),

          // Education
          new Paragraph({
            text: "Education",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
            style: {
              font: resumeData.theme.font,
              size: 28,
              color: '#34495e',
              bold: true
            },
            border: {
              bottom: { style: 'single', size: 1, color: '#3498db' }
            }
          }),
          ...resumeData.education.map(edu => [
            new Paragraph({
              children: [
                new TextRun({ 
                  text: edu.school,
                  bold: true,
                  size: 24,
                  color: '#2c3e50'
                }),
                new TextRun({ text: "\t" }), // Tab for alignment
                new TextRun({ 
                  text: `${edu.startDate ? new Date(edu.startDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  }) : ''} - ${edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  }) : 'Present'}`,
                  size: 20,
                  color: '#7f8c8d'
                })
              ],
              tabStops: [{ type: 'right', position: 11186 }] // Right align date
            }),
            new Paragraph({
              text: edu.degree,
              spacing: { before: 100, after: 200 },
              style: {
                size: 22,
                color: '#34495e'
              }
            })
          ]).flat(),

          // Skills
          new Paragraph({
            text: "Skills",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 400, after: 200 },
            style: {
              font: resumeData.theme.font,
              size: 28,
              color: '#34495e',
              bold: true
            },
            border: {
              bottom: { style: 'single', size: 1, color: '#3498db' }
            }
          }),
          new Paragraph({
            children: resumeData.skills.map((skill, index) => [
              new TextRun({
                text: skill,
                size: 20,
                color: '#0288d1'
              }),
              index < resumeData.skills.length - 1 ? new TextRun({ text: " • ", color: '#666666' }) : null
            ]).flat().filter(Boolean),
            spacing: { after: 200 }
          }),

          // Professional Experience
          ...(resumeData.professionalExperience.length > 0 ? [
            new Paragraph({
              text: "Professional Experience",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400, after: 200 },
              style: {
                font: resumeData.theme.font,
                size: 28,
                color: '#34495e',
                bold: true
              },
              border: {
                bottom: { style: 'single', size: 1, color: '#3498db' }
              }
            }),
            ...resumeData.professionalExperience.map(exp => [
              new Paragraph({
                children: [
                  new TextRun({ 
                    text: exp.position,
                    bold: true,
                    size: 24,
                    color: '#2c3e50'
                  }),
                  new TextRun({ text: "\t" }),
                  new TextRun({ 
                    text: `${exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    }) : ''} - ${exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    }) : 'Present'}`,
                    size: 20,
                    color: '#7f8c8d'
                  })
                ],
                tabStops: [{ type: 'right', position: 11186 }]
              }),
              new Paragraph({
                text: exp.company,
                spacing: { before: 100 },
                style: {
                  size: 22,
                  color: '#34495e',
                  bold: true
                }
              }),
              exp.location && new Paragraph({
                text: exp.location,
                style: {
                  size: 20,
                  color: '#7f8c8d'
                }
              }),
              new Paragraph({
                text: exp.description,
                spacing: { before: 100, after: 200 },
                style: {
                  size: 20,
                  color: '#666666'
                }
              })
            ]).flat()
          ] : []),

          // Projects
          ...(resumeData.projects.length > 0 ? [
            new Paragraph({
              text: "Projects",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400, after: 200 },
              style: {
                font: resumeData.theme.font,
                size: 28,
                color: '#34495e',
                bold: true
              },
              border: {
                bottom: { style: 'single', size: 1, color: '#3498db' }
              }
            }),
            ...resumeData.projects.map(project => [
              new Paragraph({
                children: [
                  new TextRun({ 
                    text: project.title,
                    bold: true,
                    size: 24,
                    color: '#2c3e50'
                  }),
                  new TextRun({ text: "\t" }),
                  new TextRun({ 
                    text: `${project.startDate ? new Date(project.startDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    }) : ''} - ${project.endDate ? new Date(project.endDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    }) : 'Present'}`,
                    size: 20,
                    color: '#7f8c8d'
                  })
                ],
                tabStops: [{ type: 'right', position: 11186 }]
              }),
              new Paragraph({
                text: project.description,
                spacing: { before: 100 },
                style: {
                  size: 20,
                  color: '#666666'
                }
              }),
              project.technologies && new Paragraph({
                children: project.technologies.split(',').map((tech, index, array) => [
                  new TextRun({
                    text: tech.trim(),
                    size: 20,
                    color: '#4a5568'
                  }),
                  index < array.length - 1 ? new TextRun({ text: " • ", color: '#666666' }) : null
                ]).flat().filter(Boolean),
                spacing: { before: 100, after: 200 }
              })
            ]).flat()
          ] : []),

          // Certifications
          ...(resumeData.certifications.length > 0 ? [
            new Paragraph({
              text: "Certifications",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400 }
            }),
            ...resumeData.certifications.map(cert => [
              new Paragraph({
                children: [
                  new TextRun({ text: cert.name, bold: true }),
                  new TextRun({ text: " - " + cert.issuer })
                ]
              })
            ]).flat()
          ] : []),

          // Awards
          ...(resumeData.awards.length > 0 ? [
            new Paragraph({
              text: "Awards & Achievements",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400 }
            }),
            ...resumeData.awards.map(award => [
              new Paragraph({
                children: [
                  new TextRun({ text: award.title, bold: true }),
                  new TextRun({ text: " - " + award.issuer })
                ]
              }),
              new Paragraph({ text: award.description })
            ]).flat()
          ] : [])
        ]
      }]
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${resumeData.personalInfo.fullName || 'Resume'}.docx`);
  };

  const handleFeedbackSubmit = (feedback) => {
    console.log('Feedback:', feedback);
    setShowFeedbackModal(false);
    generateWordDocument();
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
                    <h1>
                      Resume Building{" "}
                      {showHindiText && (
                        <span className="hindi-text">आसान है</span>
                      )}
                    </h1>
                    <ThemeToggle isDark={isDarkMode} onToggle={handleThemeToggle} />
                  </header>
                  <main className="app-main">
                    <ResumeForm data={resumeData} onUpdate={handleUpdateData} />
                    <ResumePreview data={resumeData} />
                  </main>
                  <footer className="app-footer">
                    <button 
                      className="export-button"
                      onClick={() => setShowFeedbackModal(true)}
                    >
                      Download Resume
                    </button>
                  </footer>
                  <div className="copyright-footer">
                    © 2025 Abhishek Maurya. All rights reserved.
                  </div>
                  {showFeedbackModal && (
                    <FeedbackModal
                      onSubmit={handleFeedbackSubmit}
                      onClose={() => setShowFeedbackModal(false)}
                    />
                  )}
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