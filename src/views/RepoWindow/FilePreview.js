import React from "react";

export default function FilePreview({ children }) {
  const [content, setContent] = React.useState(children);

  React.useEffect(() => {
    if (!children.name) return;
    const name = children.name;
    let text = "";
    if (children) text = children.text;
    else text = "Cannot diplay this file";
    setContent({ ...content, name, text });
  }, [children]);

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
