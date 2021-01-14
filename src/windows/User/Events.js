import React from "react";
import PropTypes from "prop-types";
import { Button } from "react95";

import useNewWindow from "../../hooks/useNewWindow";

import processEvents from "../../utilities/processEvents";

export default function Events({ events }) {
  const open = useNewWindow();

  const [visible, setVisible] = React.useState([]);
  const refAllEvents = React.useRef([]);

  React.useEffect(() => {
    const orderedEvents = processEvents(events);
    setVisible([orderedEvents[0]]);
    refAllEvents.current = orderedEvents; // save the full list
  }, [events]);

  const handleClickOpen = (repo) => {
    const [owner, name] = repo.split("/");
    if (!owner || !name) return;
    open(name, owner);
  };

  const handleClickMore = () => {
    const i = visible.length;
    if (i === refAllEvents.current.length) return;
    const nextGroup = refAllEvents.current[i];
    setVisible([...visible, nextGroup]);
  };

  return (
    <div className="events">
      <ul className="events__list">
        {visible.map((group) => (
          <Group group={group} key={group.key} onClick={handleClickOpen} />
        ))}
      </ul>
      <div className="flex events__showMore">
        <Button
          onClick={handleClickMore}
          disabled={visible.length === refAllEvents.current.length}
        >
          Show previous month
        </Button>
      </div>
    </div>
  );
}

function Group({ group, onClick }) {
  return (
    <li className="events__month">
      <h3>{group.date}</h3>
      <ul className="events__eventList">
        {group.data.map(
          (event, i) =>
            i < 5 && <Event event={event} key={event.id} onClick={onClick} />
        )}
        {group.data.length > 5 && (
          <p className="events__plusMore">Plus {group.data.length - 5} more</p>
        )}
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

function Event({ event, onClick }) {
  const title =
    eventTitleMap[event.type] !== "" ? eventTitleMap[event.type] : event.type;

  const handleClick = (repo) => () => {
    onClick(repo);
  };

  return (
    <li className="events__event">
      <p>
        <span className="events__date">
          {new Date(event.created_at).toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
          })}
        </span>
        <span className="events__title">{title}</span>
        <button
          className="events__openRepo"
          onClick={handleClick(event.repo.name)}
        >
          {event.repo.name}
        </button>
      </p>
    </li>
  );
}

Events.propTypes = {
  events: PropTypes.object,
};

Events.defaultProps = {
  events: undefined,
};
