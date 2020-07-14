import React from "react";

export default function Tree({ onClick }) {
  const handleClick = (branchName, name) => {
    onClick(branchName, name);
  };

  return (
    <ul className="list-reset fileTree__tree -withTitle">
      <li className="fileTree__title">Github</li>
      <Branch
        branchName="repos"
        label="Trending repos"
        defaultOpen={true}
        onClick={handleClick}
      />
      <Branch
        branchName="devs"
        label="Trending Developers"
        onClick={handleClick}
      />
    </ul>
  );
}

function Branch({ branchName, label, defaultOpen = false, onClick }) {
  const [isOpen, setOpen] = React.useState(defaultOpen);

  const handleRowClick = () => {
    setOpen(!isOpen);
  };

  const handleClick = ({ target }) => {
    onClick(branchName, target.name);
  };

  const cssClass = () => {
    let treeClass = " -isTree";
    if (isOpen) treeClass += " -isOpen";
    return treeClass;
  };

  return (
    <li className={`fileTree__branch${cssClass()}`}>
      <button onClick={handleRowClick} className="fileTree__button">
        {label}
      </button>
      {isOpen && (
        <ul className="list-reset fileTree__tree -subTree">
          <li className="fileTree__branch">
            <button
              className="fileTree__button"
              name="daily"
              onClick={handleClick}
            >
              Daily
            </button>
          </li>
          <li className="fileTree__branch">
            <button
              className="fileTree__button"
              name="weekly"
              onClick={handleClick}
            >
              Weekly
            </button>
          </li>
          <li className="fileTree__branch">
            <button
              className="fileTree__button"
              name="monthly"
              onClick={handleClick}
            >
              Monthly
            </button>
          </li>
        </ul>
      )}
    </li>
  );
}
