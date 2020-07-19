import React from "react";

import "./styles.scss";

export default function FileTree({
  files,
  titleRow = "",
  onRowClick,
  onFileClick,
}) {
  const handleClick = (path) => {
    onRowClick(path);
  };

  return (
    <div className="fileTree">
      <ul
        className={`list-reset fileTree__tree${
          titleRow !== "" ? " -withTitle" : ""
        }`}
      >
        {titleRow !== "" && <li className="fileTree__title">{titleRow}</li>}
        {files.map((row) => (
          <Branch
            row={row}
            key={row.name}
            path={row.name}
            defaultOpen={!!row.open}
            onRowClick={handleClick}
            onFileClick={onFileClick}
          />
        ))}
      </ul>
    </div>
  );
}

function Branch({ row, path, onRowClick, onFileClick, defaultOpen = false }) {
  const [isOpen, setOpen] = React.useState(defaultOpen);

  const handleRowClick = () => {
    setOpen(!isOpen);
    if (row.object.entries === undefined) onRowClick(path);
  };

  const handleFileClick = () => {
    onFileClick(path);
  };

  const cssClass = () => {
    if (row.type !== "tree") return "";
    let treeClass = " -isTree";
    if (isOpen) treeClass += " -isOpen";
    return treeClass;
  };

  return (
    <li className={`fileTree__branch${cssClass()}`}>
      {row.type === "tree" && (
        <button onClick={handleRowClick} className="fileTree__button">
          {row.name}
        </button>
      )}
      {row.type === "blob" && (
        <button className="fileTree__button" onClick={handleFileClick}>
          {row.name}
        </button>
      )}
      {isOpen && (
        <ul className="list-reset fileTree__tree -subTree">
          {row.object.entries &&
            row.object.entries.map((subRow) => (
              <Branch
                key={path + subRow.name}
                row={subRow}
                path={`${path}/${subRow.name}`}
                defaultOpen={!!subRow.open}
                onRowClick={onRowClick}
                onFileClick={onFileClick}
              />
            ))}
        </ul>
      )}
    </li>
  );
}
