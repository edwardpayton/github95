import React from "react";

export default function Preview({ fileName, children }) {
  const [html, setHtml] = React.useState(children);

  React.useEffect(() => {
    if (!fileName) return;
    let preview = "";
    if (children) preview = children;
    else preview = "Cannot diplay this file";
    setHtml(preview);
  }, [children]);

  return (
    <pre>
      <code
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </pre>
  );
}
