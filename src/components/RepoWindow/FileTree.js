import React from "react";

export default function FileTree({ files, onClick }) {
  const handleClick = (...args) => {
    onClick(args);
  };
  return (
    <ul>
      {files.map((row) => (
        <TreeBranch
          row={row}
          key={row.object.abbreviatedOid}
          name={row.name}
          path={row.name}
          onClick={handleClick}
        />
      ))}
    </ul>
  );
}

// TODO call api for next file in tree
function TreeBranch({ row, name, path, onClick }) {
  const [isOpen, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
    if (row.object.entries === undefined) onClick(name, path);
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
                name={subRow.name}
                path={`${name}/${subRow.name}`}
                onClick={onClick}
              />
            ))}
        </ul>
      )}
    </li>
  );
}
