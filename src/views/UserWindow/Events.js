import React from "react";
import { Button } from "react95";

import processEvents from "../../utilities/processEvents";

export default function Events({ events }) {
  const [visible, setVisible] = React.useState([]);
  const refAllEvents = React.useRef([]);

  React.useEffect(() => {
    const orderedEvents = processEvents(events);
    setVisible([orderedEvents[0]]);
    refAllEvents.current = orderedEvents; // save the full list
  }, [events]);

  const handleClick = () => {
    const i = visible.length;
    if (i === refAllEvents.current.length) return;
    const nextGroup = refAllEvents.current[i];
    setVisible([...visible, nextGroup]);
  };

  return (
    <>
      <ul>
        {visible.map((group) => (
          <Group group={group} key={group.key} />
        ))}
      </ul>
      <div className="flex">
        <Button onClick={handleClick} disabled={visible.length === 30}>
          Show more
        </Button>
        <p>Showing {visible.length} of 30</p>
      </div>
    </>
  );
}

function Group({ group }) {
  return (
    <li>
      <p>{group.date}</p>
      <ul>
        {group.data.map(
          (event, i) => i < 5 && <Event event={event} key={event.id} />
        )}
        {group.data.length > 5 && <p>Plus {group.data.length - 5} more</p>}
      </ul>
    </li>
  );
}

const eventTitleMap = {
  CommitCommentEvent: "Commit comment event",
  CreateEvent: "Branch or tag created",
  DeleteEvent: "Branch or tag deleted",
  ForkEvent: "Forked",
  GollumEvent: "Wiki page created or updated",
  IssueCommentEvent: "Issue comment created or updated",
  IssuesEvent: "Issue created or updated",
  MemberEvent: "Collaborator event",
  PublicEvent: "Made the repository public",
  PullRequestEvent: "Pull request created or updated",
  PullRequestReviewCommentEvent: "Pull request comments created or updated",
  PushEvent: "Pushed one or more commits",
  ReleaseEvent: "Release created or updated",
  SponsorshipEvent: "Gained or updated sponsorship",
  WatchEvent: "Starred",
};

function Event({ event }) {
  const title =
    eventTitleMap[event.type] !== "" ? eventTitleMap[event.type] : event.type;
  return (
    <li>
      <p>
        {title}: {event.repo.name}
      </p>
    </li>
  );
}
