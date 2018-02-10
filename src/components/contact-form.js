import React from 'react';

const onSubmit = ev => {
  ev.preventDefault();
  const name = ev.target.elements.name.value;
  const email = ev.target.elements.email.value;
  const message = ev.target.elements.message.value;
  alert(`You submitted name=${name} email=${email} message=${message}`);
};

const ContactForm = () => (
  <form className="contactForm" onSubmit={onSubmit}>
    <p>
      <label htmlFor="name">Name</label>
      <input className="inputForm" name="name" type="text" id="name" placeholder="name goes here" />
    </p>
    <p>
      <label htmlFor="email">Email</label>
      <input
        className="inputForm"
        name="email"
        id="email"
        type="email"
        placeholder="email@example.com"
      />
    </p>
    <p>
      <label htmlFor="message">Message</label>
      <textarea
        className="inputForm"
        name="message"
        id="message"
        placeholder="enter your message here"
      />
    </p>
    <button type="submit" className="submitButton">
      Send message
    </button>
  </form>
);

export default ContactForm;
