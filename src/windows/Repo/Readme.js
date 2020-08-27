import React from "react";

import marked from "marked";
import DOMPurify from "dompurify";

import propTypeChildren from "../../utilities/propTypeChildren";

const renderer = new marked.Renderer();
renderer.link = (href, title, text) =>
  `<a href="${href}" ${
    title !== null && 'title="' + title + '"'
  } target="_blank" rel="noopener noreferrer">${text}</a>`;

marked.setOptions({
  renderer: renderer,
});

const options = {
  breaks: true,
  renderer,
};

export default function Readme({ children }) {
  const [html, setHtml] = React.useState("");

  React.useEffect(() => {
    if (children) {
      let readmeContent = marked(children, options);
      readmeContent = DOMPurify.sanitize(readmeContent, {
        ADD_ATTR: ["target"],
      });
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

Readme.propTypes = {
  children: propTypeChildren,
};
