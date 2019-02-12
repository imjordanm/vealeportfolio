exports.shouldUpdateScroll = () => {
  if (window.__navigatingToLink === true) {
    return [0, 0];
  }
  return true;
};

exports.onRouteUpdate = () => {
  window.__navigatingToLink = false;
};
