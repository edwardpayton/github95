import React from "react";

export default function FileTree({ files, onClick }) {
  const handleClick = (path) => {
    onClick(path);
  };
  return (
    <ul>
      {files.map((row) => (
        <TreeBranch
          row={row}
          key={row.object.abbreviatedOid}
          path={row.name}
          onClick={handleClick}
        />
      ))}
    </ul>
  );
}

// TODO call api for next file in tree
function TreeBranch({ row, path, onClick }) {
  const [isOpen, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
    if (row.object.entries === undefined) onClick(path);
  };

  return (
    <li>
      {row.type === "tree" ? (
        <button onClick={handleClick} onDoubleClick={handleClick}>
          {isOpen ? "-" : "+"}
          {row.name}
        </button>
      ) : (
        <p>{row.name}</p>
      )}
      {isOpen && (
        <ul>
          {row.object.entries &&
            row.object.entries.map((subRow) => (
              <TreeBranch
                key={subRow.object.abbreviatedOid}
                row={subRow}
                path={`${name}/${subRow.name}`}
                onClick={onClick}
              />
            ))}
        </ul>
      )}
    </li>
  );
}
