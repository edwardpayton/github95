import React from "react";

export default function FileTree({ files, onRowClick, onFileClick }) {
  const handleClick = (path) => {
    onRowClick(path);
  };

  return (
    <div className="fileTree">
      <ul className="list-reset fileTree__tree">
        {files.map((row) => (
          <TreeBranch
            row={row}
            key={row.object.abbreviatedOid}
            path={row.name}
            onRowClick={handleClick}
            onFileClick={onFileClick}
          />
        ))}
      </ul>
    </div>
  );
}

// TODO call api for next file in tree
function TreeBranch({ row, path, onRowClick, onFileClick }) {
  const [isOpen, setOpen] = React.useState(false);

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
        <button
          onClick={handleRowClick}
          onDoubleClick={handleRowClick}
          className="fileTree__button"
        >
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
              <TreeBranch
                key={subRow.object.abbreviatedOid}
                row={subRow}
                path={`${path}/${subRow.name}`}
                onRowClick={onRowClick}
                onFileClick={onFileClick}
              />
            ))}
        </ul>
      )}
    </li>
  );
}
