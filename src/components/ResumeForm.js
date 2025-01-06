import React, { useState } from 'react';
import './ResumeForm.css';
import ThemeCustomizer from './ThemeCustomizer';

const ResumeForm = ({ data, onUpdate }) => {
  const [spellErrors, setSpellErrors] = useState({});
  const [skillInput, setSkillInput] = useState(data.skills.join(', '));

  const handleSpellCheck = (e) => {
    const element = e.target;
    const misspelledWords = Array.from(element.querySelectorAll('span[data-spelling-error]')).length;
    setSpellErrors({
      ...spellErrors,
      [element.name]: misspelledWords > 0
    });
  };

  const commonInputProps = {
    spellCheck: "true",
    lang: "en-US",
    autoCapitalize: "words",
    onInput: handleSpellCheck
  };

  const handleChange = (section, value) => {
    onUpdate({
      ...data,
      [section]: value
    });
  };

  const handleThemeChange = (newTheme) => {
    onUpdate({
      ...data,
      theme: newTheme
    });
  };

  const handleContextMenu = (e) => {
    const element = e.target;
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      const selection = window.getSelection().toString();
      if (selection && element.spellcheck) {
        // The browser will handle the context menu with spelling suggestions
        return;
      }
    }
  };

  const handleSkillsChange = (e) => {
    setSkillInput(e.target.value);
    const skillsArray = e.target.value.split(',').map(skill => skill.trim());
    handleChange('skills', skillsArray);
  };

  return (
    <div className="resume-form" onContextMenu={handleContextMenu}>
      <ThemeCustomizer 
        theme={data.theme} 
        onUpdate={handleThemeChange}
      />
      
      <div className="form-section">
        <h2 className="section-title">Personal Information</h2>
        <div className="input-wrapper">
          <input
            {...commonInputProps}
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={data.personalInfo.fullName}
            onChange={(e) => {
              handleChange('personalInfo', {
                ...data.personalInfo,
                fullName: e.target.value
              });
            }}
          />
          {spellErrors.fullName && (
            <div className="spell-error-indicator">
              ⚠️ Possible spelling error
            </div>
          )}
        </div>
        <input
          {...commonInputProps}
          type="email"
          placeholder="Email"
          value={data.personalInfo.email}
          onChange={(e) => handleChange('personalInfo', {
            ...data.personalInfo,
            email: e.target.value
          })}
        />
        <input
          {...commonInputProps}
          type="tel"
          placeholder="Phone"
          value={data.personalInfo.phone}
          onChange={(e) => handleChange('personalInfo', {
            ...data.personalInfo,
            phone: e.target.value
          })}
        />
        <textarea
          {...commonInputProps}
          placeholder="Address"
          value={data.personalInfo.address}
          onChange={(e) => handleChange('personalInfo', {
            ...data.personalInfo,
            address: e.target.value
          })}
        />
        <input
          {...commonInputProps}
          type="url"
          placeholder="LinkedIn URL"
          value={data.personalInfo.linkedin}
          onChange={(e) => handleChange('personalInfo', {
            ...data.personalInfo,
            linkedin: e.target.value
          })}
        />
      </div>

      <div className="form-section">
        <h2 className="section-title">Professional Summary</h2>
        <div className="input-wrapper">
          <textarea
            {...commonInputProps}
            name="summary"
            placeholder="Write a brief professional summary (2-4 sentences highlighting your key strengths and career objectives)"
            value={data.summary || ''}
            onChange={(e) => {
              handleChange('summary', e.target.value);
            }}
            rows="4"
          />
          {spellErrors.summary && (
            <div className="spell-error-indicator">
              ⚠️ Possible spelling error
            </div>
          )}
        </div>
      </div>

      <div className="form-section">
        <h2 className="section-title">Education</h2>
        <button 
          onClick={() => handleChange('education', [...data.education, {
            school: '',
            degree: '',
            year: '',
            gpa: ''
          }])}
        >
          Add Education
        </button>
        {data.education.map((edu, index) => (
          <div key={index} className="form-group">
            <input
              {...commonInputProps}
              type="text"
              placeholder="School"
              value={edu.school}
              onChange={(e) => {
                const newEducation = [...data.education];
                newEducation[index].school = e.target.value;
                handleChange('education', newEducation);
              }}
            />
            <input
              {...commonInputProps}
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => {
                const newEducation = [...data.education];
                newEducation[index].degree = e.target.value;
                handleChange('education', newEducation);
              }}
            />
            <div className="date-inputs">
              <input
                {...commonInputProps}
                type="date"
                placeholder="Start Date"
                value={edu.startDate}
                onChange={(e) => {
                  const newEducation = [...data.education];
                  newEducation[index].startDate = e.target.value;
                  handleChange('education', newEducation);
                }}
              />
              <input
                {...commonInputProps}
                type="date"
                placeholder="End Date"
                value={edu.endDate}
                onChange={(e) => {
                  const newEducation = [...data.education];
                  newEducation[index].endDate = e.target.value;
                  handleChange('education', newEducation);
                }}
              />
            </div>
            <button 
              className="remove-btn"
              onClick={() => {
                const newEducation = data.education.filter((_, i) => i !== index);
                handleChange('education', newEducation);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="form-section">
        <h2 className="section-title">Skills</h2>
        <div className="input-wrapper">
          <input
            {...commonInputProps}
            type="text"
            name="skills"
            placeholder="Enter skills (comma separated)"
            value={skillInput}
            onChange={handleSkillsChange}
          />
          {spellErrors.skills && (
            <div className="spell-error-indicator">
              ⚠️ Possible spelling error
            </div>
          )}
        </div>
      </div>

      <div className="form-section">
        <h2 className="section-title">Professional Experience</h2>
        <button 
          onClick={() => handleChange('professionalExperience', [...data.professionalExperience, {
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: '',
            location: ''
          }])}
        >
          Add Experience
        </button>
        {data.professionalExperience.map((exp, index) => (
          <div key={index} className="form-group">
            <input
              {...commonInputProps}
              type="text"
              placeholder="Company Name"
              value={exp.company}
              onChange={(e) => {
                const newExperience = [...data.professionalExperience];
                newExperience[index].company = e.target.value;
                handleChange('professionalExperience', newExperience);
              }}
            />
            <input
              {...commonInputProps}
              type="text"
              placeholder="Position"
              value={exp.position}
              onChange={(e) => {
                const newExperience = [...data.professionalExperience];
                newExperience[index].position = e.target.value;
                handleChange('professionalExperience', newExperience);
              }}
            />
            <div className="date-inputs">
              <input
                {...commonInputProps}
                type="date"
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) => {
                  const newExperience = [...data.professionalExperience];
                  newExperience[index].startDate = e.target.value;
                  handleChange('professionalExperience', newExperience);
                }}
              />
              <input
                {...commonInputProps}
                type="date"
                placeholder="End Date"
                value={exp.endDate}
                onChange={(e) => {
                  const newExperience = [...data.professionalExperience];
                  newExperience[index].endDate = e.target.value;
                  handleChange('professionalExperience', newExperience);
                }}
              />
            </div>
            <input
              {...commonInputProps}
              type="text"
              placeholder="Location"
              value={exp.location}
              onChange={(e) => {
                const newExperience = [...data.professionalExperience];
                newExperience[index].location = e.target.value;
                handleChange('professionalExperience', newExperience);
              }}
            />
            <textarea
              {...commonInputProps}
              placeholder="Job Description"
              value={exp.description}
              onChange={(e) => {
                const newExperience = [...data.professionalExperience];
                newExperience[index].description = e.target.value;
                handleChange('professionalExperience', newExperience);
              }}
            />
            <button 
              className="remove-btn"
              onClick={() => {
                const newExperience = data.professionalExperience.filter((_, i) => i !== index);
                handleChange('professionalExperience', newExperience);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="form-section">
        <h2 className="section-title">Projects</h2>
        <button 
          onClick={() => handleChange('projects', [...data.projects, {
            title: '',
            description: '',
            technologies: '',
            link: '',
            startDate: '',
            endDate: ''
          }])}
        >
          Add Project
        </button>
        {data.projects.map((project, index) => (
          <div key={index} className="form-group">
            <input
              {...commonInputProps}
              type="text"
              placeholder="Project Title"
              value={project.title}
              onChange={(e) => {
                const newProjects = [...data.projects];
                newProjects[index].title = e.target.value;
                handleChange('projects', newProjects);
              }}
            />
            <textarea
              {...commonInputProps}
              placeholder="Project Description"
              value={project.description}
              onChange={(e) => {
                const newProjects = [...data.projects];
                newProjects[index].description = e.target.value;
                handleChange('projects', newProjects);
              }}
            />
            <input
              {...commonInputProps}
              type="text"
              placeholder="Technologies Used (comma separated)"
              value={project.technologies}
              onChange={(e) => {
                const newProjects = [...data.projects];
                newProjects[index].technologies = e.target.value;
                handleChange('projects', newProjects);
              }}
            />
            <input
              {...commonInputProps}
              type="url"
              placeholder="Project Link (optional)"
              value={project.link}
              onChange={(e) => {
                const newProjects = [...data.projects];
                newProjects[index].link = e.target.value;
                handleChange('projects', newProjects);
              }}
            />
            <div className="date-inputs">
              <input
                {...commonInputProps}
                type="date"
                placeholder="Start Date"
                value={project.startDate}
                onChange={(e) => {
                  const newProjects = [...data.projects];
                  newProjects[index].startDate = e.target.value;
                  handleChange('projects', newProjects);
                }}
              />
              <input
                {...commonInputProps}
                type="date"
                placeholder="End Date"
                value={project.endDate}
                onChange={(e) => {
                  const newProjects = [...data.projects];
                  newProjects[index].endDate = e.target.value;
                  handleChange('projects', newProjects);
                }}
              />
            </div>
            <button 
              className="remove-btn"
              onClick={() => {
                const newProjects = data.projects.filter((_, i) => i !== index);
                handleChange('projects', newProjects);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="form-section">
        <h2 className="section-title">Certifications</h2>
        <button 
          onClick={() => handleChange('certifications', [...data.certifications, {
            name: '',
            issuer: '',
            date: '',
            expiryDate: '',
            credentialId: '',
            credentialURL: ''
          }])}
        >
          Add Certification
        </button>
        {data.certifications.map((cert, index) => (
          <div key={index} className="form-group">
            <input
              {...commonInputProps}
              type="text"
              placeholder="Certification Name"
              value={cert.name}
              onChange={(e) => {
                const newCertifications = [...data.certifications];
                newCertifications[index].name = e.target.value;
                handleChange('certifications', newCertifications);
              }}
            />
            <input
              {...commonInputProps}
              type="text"
              placeholder="Issuing Organization"
              value={cert.issuer}
              onChange={(e) => {
                const newCertifications = [...data.certifications];
                newCertifications[index].issuer = e.target.value;
                handleChange('certifications', newCertifications);
              }}
            />
            <div className="date-inputs">
              <input
                {...commonInputProps}
                type="date"
                placeholder="Issue Date"
                value={cert.date}
                onChange={(e) => {
                  const newCertifications = [...data.certifications];
                  newCertifications[index].date = e.target.value;
                  handleChange('certifications', newCertifications);
                }}
              />
              <input
                {...commonInputProps}
                type="date"
                placeholder="Expiry Date (if any)"
                value={cert.expiryDate}
                onChange={(e) => {
                  const newCertifications = [...data.certifications];
                  newCertifications[index].expiryDate = e.target.value;
                  handleChange('certifications', newCertifications);
                }}
              />
            </div>
            <input
              {...commonInputProps}
              type="text"
              placeholder="Credential ID (optional)"
              value={cert.credentialId}
              onChange={(e) => {
                const newCertifications = [...data.certifications];
                newCertifications[index].credentialId = e.target.value;
                handleChange('certifications', newCertifications);
              }}
            />
            <input
              {...commonInputProps}
              type="url"
              placeholder="Credential URL (optional)"
              value={cert.credentialURL}
              onChange={(e) => {
                const newCertifications = [...data.certifications];
                newCertifications[index].credentialURL = e.target.value;
                handleChange('certifications', newCertifications);
              }}
            />
            <button 
              className="remove-btn"
              onClick={() => {
                const newCertifications = data.certifications.filter((_, i) => i !== index);
                handleChange('certifications', newCertifications);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="form-section">
        <h2 className="section-title">Awards & Achievements</h2>
        <button 
          onClick={() => handleChange('awards', [...data.awards, {
            title: '',
            issuer: '',
            date: '',
            description: ''
          }])}
        >
          Add Award
        </button>
        {data.awards.map((award, index) => (
          <div key={index} className="form-group">
            <input
              {...commonInputProps}
              type="text"
              placeholder="Award Title"
              value={award.title}
              onChange={(e) => {
                const newAwards = [...data.awards];
                newAwards[index].title = e.target.value;
                handleChange('awards', newAwards);
              }}
            />
            <input
              {...commonInputProps}
              type="text"
              placeholder="Issuing Organization"
              value={award.issuer}
              onChange={(e) => {
                const newAwards = [...data.awards];
                newAwards[index].issuer = e.target.value;
                handleChange('awards', newAwards);
              }}
            />
            <input
              {...commonInputProps}
              type="date"
              placeholder="Date"
              value={award.date}
              onChange={(e) => {
                const newAwards = [...data.awards];
                newAwards[index].date = e.target.value;
                handleChange('awards', newAwards);
              }}
            />
            <textarea
              {...commonInputProps}
              placeholder="Description (optional)"
              value={award.description}
              onChange={(e) => {
                const newAwards = [...data.awards];
                newAwards[index].description = e.target.value;
                handleChange('awards', newAwards);
              }}
            />
            <button 
              className="remove-btn"
              onClick={() => {
                const newAwards = data.awards.filter((_, i) => i !== index);
                handleChange('awards', newAwards);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeForm; 