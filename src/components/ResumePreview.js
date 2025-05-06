import React from 'react';
import { asBlob } from 'html-docx-js-typescript';
import './ResumePreview.css';

const ResumePreview = ({ data }) => {
  const previewStyle = {
    fontFamily: data.theme?.font || 'Arial',
    fontSize: data.theme?.fontSize || '14px'
  };

  const handleDownload = async () => {
    // Create a clone of the resume content to modify for Word export
    const resumeElement = document.querySelector('.resume-preview').cloneNode(true);
    
    // Add Word-specific styling
    const styles = `
      <style>
        @page {
        size: A4;
        margin: 1in;
        mso-header-margin: 0;
        mso-footer-margin: 0;
        mso-paper-source: 0;
        }
        
        body { 
        font-family: ${previewStyle.fontFamily}; 
        font-size: ${previewStyle.fontSize};
        line-height: 1.6;
        margin: 0;
        padding: 0;
        color: #333;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        word-wrap: break-word;
        word-break: normal;
        mso-line-height-rule: exactly;
        }
      
      /* Personal Information Section */
      .preview-section:first-child {
        margin-bottom: 2em;
      }
      
      h2 {
        color: #2c3e50;
        font-size: 28px;
        margin: 0 0 15px 0;
        font-weight: bold;
        line-height: 1.2;
        border: none;
      }
      
      .contact-info {
        margin-bottom: 20px;
      }
      
      .contact-info p {
        margin: 4px 0;
        color: #666;
        font-size: 14px;
      }
      
      .contact-info a {
        color: #0077b5;
        text-decoration: none;
      }
      
      /* Section Styling */
        .preview-section { 
        margin-bottom: 24px;
        page-break-inside: avoid;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        mso-padding-alt: 0;
        mso-margin-top-alt: 0;
        }

        .preview-section > * {
        mso-line-height-rule: exactly;
        line-height: 1.6;
        margin-bottom: 1.0pt;
        mso-margin-bottom-alt: 0;
        }

        h2, h3, h4 {
        mso-style-priority: 1;
        mso-style-unhide: no;
        mso-style-qformat: yes;
        mso-style-link-source: yes;
        }
      
      h3 { 
        color: #34495e; 
        font-size: 20px; 
        border-bottom: 2px solid #3498db; 
        padding-bottom: 8px; 
        margin: 20px 0 15px 0;
        font-weight: bold;
        page-break-after: avoid;
      }
      
      h4 { 
        color: #2c3e50; 
        font-size: 16px; 
        margin: 0;
        font-weight: bold;
        page-break-after: avoid;
      }
      
      .summary-content { 
        color: #666; 
        line-height: 1.6; 
        margin-bottom: 20px;
        font-size: 14px;
        text-align: justify;
      }
      
      .education-item, .experience-item, .project-item, .certification-item, .award-item {
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
        page-break-inside: avoid;
      }
      
      .project-header, .certification-header, .award-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 10px;
      }
      
      .date-range { 
        color: #7f8c8d; 
        font-size: 14px;
        white-space: nowrap;
      }
      
      .description { 
        color: #666; 
        line-height: 1.6;
        font-size: 14px;
        text-align: justify;
        margin: 8px 0;
      }
      
        .skill-tag, .tech-tag {
        display: inline-block;
        background: #e1f5fe !important;
        color: #0288d1 !important;
        padding: 4px 10px !important;
        margin: 3px !important;
        border-radius: 12px !important;
        font-size: 13px !important;
        mso-style-priority: 99;
        mso-style-unhide: no;
        mso-style-qformat: yes;
        mso-border-radius: 12px;
        mso-padding-alt: 4px 10px;
        mso-border-alt: none;
        text-align: center;
        }

        .skills-container, .technologies {
        display: block;
        width: 100%;
        margin: 10px 0;
        padding: 0;
        mso-line-height-rule: exactly;
        mso-element: para-border-div;
        mso-element-wrap: no-wrap-beside;
        mso-element-left: center;
        mso-element-top: auto;
        mso-height-rule: exactly;
        }
        
        .company, .degree {
        color: #34495e;
        font-weight: 500;
        margin: 5px 0;
        font-size: 14px;
      }
      
      .location {
        color: #7f8c8d;
        font-size: 14px;
        margin: 4px 0;
      }
      
      .skills-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 10px;
      }
      
      .technologies {
        margin-top: 8px;
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      
      .project-link, .cert-link {
        color: #0077b5;
        text-decoration: none;
        display: inline-block;
        margin-top: 8px;
        font-size: 14px;
      }
      
      .cert-issuer, .cert-credential {
        color: #666;
        font-size: 14px;
        margin: 4px 0;
      }
      
      .award-issuer, .award-description {
        color: #666;
        font-size: 14px;
        margin: 4px 0;
      }
      </style>
    `;

    // Clean up emojis for Word export
    const cleanupEmojis = (element) => {
      // Clean up contact info emojis
      element.querySelectorAll('.contact-info p').forEach(p => {
      const text = p.innerHTML;
      p.innerHTML = text
        .replace('📧', '• ')
        .replace('📱', '• ')
        .replace('📍', '• ')
        .replace('💼', '• ');
      });

      // Ensure skill tags and tech tags maintain their styling
      element.querySelectorAll('.skill-tag, .tech-tag').forEach(tag => {
      tag.style.cssText = 'background-color: #e1f5fe !important; color: #0288d1 !important; padding: 4px 10px !important; margin: 3px !important; display: inline-block !important;';
      });

      return element;
    };

    // Clean up the clone
    cleanupEmojis(resumeElement);

    // Combine styles with content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          ${styles}
        </head>
        <body>
          ${resumeElement.innerHTML}
        </body>
      </html>
    `;

    // Convert to Word with specific options
    const docxBlob = await asBlob(htmlContent, {
      orientation: 'portrait',
      margins: { 
      top: 1440,    // 1 inch = 1440 twips
      right: 1440,
      bottom: 1440,
      left: 1440
      },
      title: data.personalInfo.fullName || 'Resume',
      fontSize: parseInt(previewStyle.fontSize),
      font: previewStyle.fontFamily,
      cssStyleSheet: styles,
      header: false,
      footer: false,
      pageNumbering: false,
      lineNumbers: false,
      compatibility: {
      useSingleQuotes: true,
      doNotExpandShiftReturn: true,
      suppressTopSpacing: false,
      suppressBottomSpacing: false,
      suppressSpacingAtTopOfPage: false,
      suppressTopSpacingWP: false,
      suppressSpBfAfterPgBrk: false,
      suppressSpacingAtTopOfPage: false,
      suppressTopSpacingWP: false,
      useFELayout: false
      }
    });
    
    const url = window.URL.createObjectURL(docxBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.personalInfo.fullName || 'Resume'}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="resume-preview-container">
      <div className="resume-preview" style={previewStyle}>
        <div className="preview-section">
          <h2>{data.personalInfo.fullName || 'Your Name'}</h2>
          <div className="contact-info">
            {data.personalInfo.email && <p>📧 {data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p>📱 {data.personalInfo.phone}</p>}
            {data.personalInfo.address && <p>📍 {data.personalInfo.address}</p>}
            {data.personalInfo.linkedin && (
              <p>
                💼 <a 
                  href={data.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin-preview-link"
                >
                  LinkedIn
                </a>
              </p>
            )}
          </div>
        </div>

        {data.summary && (
          <div className="preview-section">
            <h3>Professional Summary</h3>
            <div className="summary-content">
              {data.summary}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div className="preview-section">
            <h3>Education</h3>
            {data.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="project-header">
                  <div>
                    <h4>{edu.school}</h4>
                    <p className="degree">{edu.degree}</p>
                  </div>
                  <p className="date-range">
                    {edu.startDate && new Date(edu.startDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })} - 
                    {edu.endDate ? new Date(edu.endDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    }) : 'Present'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {data.skills && data.skills.length > 0 && (
          <div className="preview-section">
            <h3>Skills</h3>
            <div className="skills-container">
              {data.skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.professionalExperience.length > 0 && (
          <div className="preview-section">
            <h3>Professional Experience</h3>
            {data.professionalExperience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="project-header">
                  <div>
                    <h4>{exp.position}</h4>
                    <p className="company">{exp.company}</p>
                    {exp.location && <p className="location">{exp.location}</p>}
                  </div>
                  <p className="date-range">
                    {exp.startDate && new Date(exp.startDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })} - 
                    {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    }) : 'Present'}
                  </p>
                </div>
                <p className="description">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {data.projects.length > 0 && (
          <div className="preview-section">
            <h3>Projects</h3>
            {data.projects.map((project, index) => (
              <div key={index} className="project-item">
                <div className="project-header">
                  <h4>{project.title}</h4>
                  <p className="date-range">
                    {project.startDate && new Date(project.startDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })} - 
                    {project.endDate ? new Date(project.endDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    }) : 'Present'}
                  </p>
                </div>
                <p className="description">{project.description}</p>
                {project.technologies && (
                  <div className="technologies">
                    {project.technologies.split(',').map((tech, i) => (
                      <span key={i} className="tech-tag">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-link"
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {data.certifications.length > 0 && (
          <div className="preview-section">
            <h3>Certifications</h3>
            {data.certifications.map((cert, index) => (
              <div key={index} className="certification-item">
                <div className="certification-header">
                  <h4>{cert.name}</h4>
                  <p className="cert-date">
                    {cert.date && new Date(cert.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                    {cert.expiryDate && ` - Expires: ${new Date(cert.expiryDate).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}`}
                  </p>
                </div>
                <p className="cert-issuer">{cert.issuer}</p>
                {cert.credentialId && (
                  <p className="cert-credential">Credential ID: {cert.credentialId}</p>
                )}
                {cert.credentialURL && (
                  <a 
                    href={cert.credentialURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-link"
                  >
                    Verify Credential →
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {data.awards.length > 0 && (
          <div className="preview-section">
            <h3>Awards & Achievements</h3>
            {data.awards.map((award, index) => (
              <div key={index} className="award-item">
                <div className="award-header">
                  <h4>{award.title}</h4>
                  <p className="award-date">
                    {award.date && new Date(award.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
                <p className="award-issuer">{award.issuer}</p>
                {award.description && (
                  <p className="award-description">{award.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <button className="download-button" onClick={handleDownload}>
        Download Resume (DOCX)
      </button>
    </div>
  );
};

export default ResumePreview; 