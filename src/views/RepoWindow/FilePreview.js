import React from "react";
import PropTypes from "prop-types";

export default function FilePreview({ file }) {
  const [content, setContent] = React.useState(file);

  React.useEffect(() => {
    if (!file.name) return;
    const name = file.name;
    let text = "";
    if (file) text = file.text;
    else text = "Cannot diplay this file";
    setContent({ ...content, name, text });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);
  // 'content' - causes infinate re-render

  return (
    <div className="filePreview">
      <h2>{content.name}</h2>
      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: content.text,
          }}
        />
      </pre>
    </div>
  );
}

FilePreview.propTypes = {
  file: PropTypes.shape({
    name: PropTypes.string,
    text: PropTypes.string,
  }),
};

FilePreview.defaultProps = {
  file: {},
};
