import React from 'react';

export default class ContactForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
    };

    this.formValid = this.formValid.bind(this);
  }

  formValid(event) {
    if (grecaptcha.getResponse() === '') {
      event.preventDefault();
      if (this.state.isValid) {
        this.setState({ isValid: false });
      }
    } else if (this.state.isValid === false) {
      this.setState({ isValid: true });
    }
  }

  render() {
    return <Form isValid={this.state.isValid} formValid={this.formValid} />;
  }
}

const Form = props => (
  <form
    name="contact"
    className="contact-form"
    autoComplete="nope"
    method="POST"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    data-netlify-recaptcha="true"
    onSubmit={props.formValid}
  >
    <input type="hidden" name="form-name" value="contact" />

    <div className="small-input name">
      <label htmlFor="name">Name</label>
      <input
        className="input-form"
        name="name"
        type="text"
        id="name"
        placeholder="What's your name?"
        required
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
        required
      />
    </div>
    <div className="big-input">
      <label htmlFor="message">Message</label>
      <textarea
        className="input-form"
        name="message"
        id="message"
        placeholder="What can I help you with?"
        required
      />
    </div>

    {props.isValid === true ? (
      <div
        style={{ marginBottom: '1.5rem' }}
        id="recaptcha"
        className="g-recaptcha"
        data-sitekey="6Lei05AUAAAAANAbpu59UA0iWDZT69FYj7cjBOpS"
      />
    ) : (
      <div className="captcha-form">
        <div
          id="recaptcha"
          className="g-recaptcha"
          data-sitekey="6Lei05AUAAAAANAbpu59UA0iWDZT69FYj7cjBOpS"
        />
        <div className="captcha-text">
          <span>Please tick the reCAPTCHA before resubmitting the form.</span>
        </div>
      </div>
    )}
    <button type="submit" className="submitButton">
      Send message
    </button>
  </form>
);
