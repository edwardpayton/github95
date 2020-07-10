import React from "react";

import marked from "marked";
import DOMPurify from "dompurify";

const options = {
  breaks: true,
};

export default function Readme({ children }) {
  const [html, setHtml] = React.useState("");

  React.useEffect(() => {
    if (children) {
      let readmeContent = marked(children, options);
      readmeContent = DOMPurify.sanitize(readmeContent);
      setHtml(readmeContent);
    }
  }, [children]);

  return (
    <div className="readme">
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className="readme__body"
      />
    </div>
  );
}
