import React from 'react';
import Link from 'gatsby-link';

import IconMail from '../resources/icons/mail.svg';
import IconLinkedIn from '../resources/icons/linkedin.svg';
import IconTwitter from '../resources/icons/twitter.svg';
import IconYoutube from '../resources/icons/youtube.svg';
import IconBandcamp from '../resources/icons/bandcamp.svg';

const ListLink = props => (
  <li>
    <Link to={props.to}>{props.children}</Link>
  </li>
);

const SocialLinks = props => {
  const mail = 'mailto:novingle@gmail.com';
  const linkedin = 'https://nz.linkedin.com/in/nick-veale-644975107';
  const twitter = 'https://twitter.com/gordog47';
  const youtube = 'https://youtube.com/channel/UCvyxfDoWG8N0oC2_QVckQSQ';
  const bandcamp = 'https://nickveale.bandcamp.com';

  return (
    <ul className="social-links">
      <ListLink to="/">youtube</ListLink>
      <ListLink to="/">twitter</ListLink>
      <ListLink to="/">linkedin</ListLink>
      <ListLink to="/">mail</ListLink>
    </ul>
  );
};

export default SocialLinks;
