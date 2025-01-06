import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import './FeedbackModal.css';

const FeedbackModal = ({ onSubmit, onClose }) => {
  const [feedback, setFeedback] = useState({
    rating: '',
    usability: '',
    features: '',
    improvements: '',
    email: '',
    nextTool: ''
  });

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      // Replace these with your EmailJS credentials
      const templateParams = {
        to_email: 't30935058@gmail.com',
        from_email: feedback.email || 'Anonymous User',
        rating: feedback.rating,
        usability: feedback.usability,
        features: feedback.features,
        improvements: feedback.improvements || 'No suggestions provided',
        nextTool: feedback.nextTool,
        date: new Date().toLocaleString()
      };

      await emailjs.send(
        'service_fq6ywvd', // Replace with your EmailJS service ID
        'template_90vjnaq', // Replace with your EmailJS template ID
        templateParams,
        'KZ8OgZa7EaQvcMphq' // Replace with your EmailJS public key
      );

      console.log('Feedback sent successfully!');
      onSubmit(feedback);
    } catch (error) {
      console.error('Failed to send feedback:', error);
      // Still allow download even if email fails
      onSubmit(feedback);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Help Us Improve!</h2>
        <p>Please take a moment to share your feedback before downloading your resume.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>How would you rate your experience? *</label>
            <select 
              required
              value={feedback.rating}
              onChange={(e) => setFeedback({...feedback, rating: e.target.value})}
            >
              <option value="">Select rating</option>
              <option value="5">Excellent</option>
              <option value="4">Very Good</option>
              <option value="3">Good</option>
              <option value="2">Fair</option>
              <option value="1">Poor</option>
            </select>
          </div>

          <div className="form-group">
            <label>How easy was it to use the resume builder? *</label>
            <select 
              required
              value={feedback.usability}
              onChange={(e) => setFeedback({...feedback, usability: e.target.value})}
            >
              <option value="">Select option</option>
              <option value="very-easy">Very Easy</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="difficult">Difficult</option>
              <option value="very-difficult">Very Difficult</option>
            </select>
          </div>

          <div className="form-group">
            <label>Which features did you find most useful? *</label>
            <select 
              required
              value={feedback.features}
              onChange={(e) => setFeedback({...feedback, features: e.target.value})}
            >
              <option value="">Select feature</option>
              <option value="real-time">Real-time Preview</option>
              <option value="sections">Section Management</option>
              <option value="export">Export Options</option>
              <option value="customization">Customization Options</option>
            </select>
          </div>

          <div className="form-group">
            <label>Any suggestions for improvement?</label>
            <textarea
              value={feedback.improvements}
              onChange={(e) => setFeedback({...feedback, improvements: e.target.value})}
              placeholder="Your suggestions help us improve"
            />
          </div>

          <div className="form-group">
            <label>Email (optional)</label>
            <input
              type="email"
              value={feedback.email}
              onChange={(e) => setFeedback({...feedback, email: e.target.value})}
              placeholder="For updates on new features"
            />
          </div>

          <div className="form-group">
            <label>What tool would you like to see next? *</label>
            <input
              type="text"
              required
              value={feedback.nextTool}
              onChange={(e) => setFeedback({...feedback, nextTool: e.target.value})}
              placeholder="e.g., Cover Letter Builder, Portfolio Builder, etc."
            />
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              className="cancel-button" 
              onClick={onClose}
              disabled={sending}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={sending}
            >
              {sending ? 'Sending...' : 'Submit & Download'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal; 