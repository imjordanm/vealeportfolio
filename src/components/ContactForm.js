import React from 'react';

const ContactForm = () => (
  <form
    name="Contact Form"
    className="contact-form"
    method="post"
    data-netlify="true"
    netlify-honeypot="bot-field"
  >
    <div className="small-input name">
      <label htmlFor="name">Name</label>
      <input
        className="input-form"
        name="name"
        type="text"
        id="name"
        placeholder="What's your name?"
      />
    </div>
    <div className="small-input email">
      <label htmlFor="email">Email</label>
      <input
        className="input-form"
        name="email"
        id="email"
        type="email"
        placeholder="What's your email?"
      />
    </div>
    <div className="big-input">
      <label htmlFor="message">Message</label>
      <textarea
        className="input-form"
        name="message"
        id="message"
        placeholder="What can I help you with?"
      />
    </div>
    <button type="submit" className="submitButton">
      Send message
    </button>
  </form>
);

export default ContactForm;
