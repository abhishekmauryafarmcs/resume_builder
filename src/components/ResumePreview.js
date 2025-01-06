import React from 'react';
import './ResumePreview.css';

const ResumePreview = ({ data }) => {
  const previewStyle = {
    fontFamily: data.theme?.font || 'Arial',
    fontSize: data.theme?.fontSize || '14px'
  };

  return (
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
  );
};

export default ResumePreview; 