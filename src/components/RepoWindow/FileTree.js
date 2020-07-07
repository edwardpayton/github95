import React from "react";

export default function FileTree({ files }) {
  return (
    <ul>
      {files.map((row) => (
        <TreeBranch row={row} key={row.object.abbreviatedOid} />
      ))}
    </ul>
  );
}

// TODO call api for next file in tree
function TreeBranch({ row }) {
  const [isOpen, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <div style={{ color: isOpen ? "red" : "blue" }}>
      <div>
        {row.type === "tree" ? (
          <button onClick={handleClick} onDoubleClick={handleClick}>
            {isOpen ? "-" : "+"}
            {row.name}
          </button>
        ) : (
          <p>{row.name}</p>
        )}
      </div>
      {isOpen && (
        <ul>
          {row.object.entries.map((subRow) => (
            <TreeBranch key={subRow.object.abbreviatedOid} row={subRow} />
          ))}
        </ul>
      )}
    </div>
  );
}
