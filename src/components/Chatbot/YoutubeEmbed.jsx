import React from "react";
import PropTypes from "prop-types";
import "./YoutubeEmbed.css";

const YoutubeEmbed = ({ embedUrl }) => {
  return (
    <div className="youtube-embed-container">
      <iframe
        width="100%"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

YoutubeEmbed.propTypes = {
  embedUrl: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
