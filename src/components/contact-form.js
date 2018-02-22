import React from 'react';

const onSubmit = ev => {
  ev.preventDefault();
  const name = ev.target.elements.name.value;
  const email = ev.target.elements.email.value;
  const message = ev.target.elements.message.value;
  alert(`You submitted name=${name} email=${email} message=${message}`);
};

const ContactForm = () => (
  <form className="contact-form" onSubmit={onSubmit}>
    <label htmlFor="name">Name</label>
    <input className="input-form" name="name" type="text" id="name" placeholder="your name" />
    {/* <p>
      <label htmlFor="email">Email</label>
      <input className="input-form" name="email" id="email" type="email" placeholder="your email" />
    </p>
    <p>
      <label htmlFor="message">Message</label>
      <textarea className="input-form" name="message" id="message" placeholder="your message" />
    </p> */}
    <button type="submit" className="submitButton">
      Send message
    </button>
  </form>
);

export default ContactForm;
