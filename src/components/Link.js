import React from "react";
import { Link as BaseLink } from "gatsby";

if (typeof window !== "undefined") {
  window.__navigatingToLink = false;
}

const Link = ({ children, ...props }) => (
  <BaseLink
    onClick={() => {
      window.__navigatingToLink = true;
    }}
    {...props}
  >
    {children}
  </BaseLink>
);

export default Link;
