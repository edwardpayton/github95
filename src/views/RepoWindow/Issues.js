import React from "react";

export default function Issues({ issues }) {
  React.useEffect(() => {
    console.log("RepoWindow/Issues >>>", issues);
  }, [issues]);

  return (
    <div className="issues">
      {issues && Object.keys(issues).length > 0 && (
        <>
          {issues.mostCommented7Days.edges.length > 0 && (
            <>
              <h3>Most commented in last seven days</h3>
              <IssuesList issues={issues.mostCommented7Days.edges} />
            </>
          )}
          {issues.latest.edges.length > 0 && (
            <>
              <h3>Latest</h3>
              <IssuesList issues={issues.latest.edges} />
            </>
          )}
        </>
      )}
    </div>
  );
}

function IssuesList({ issues }) {
  return issues.map(
    ({ node: { id, title, author, comments, updatedAt, url } }) => (
      <div key={id}>
        <p>{title}</p>
      </div>
    )
  );
}
