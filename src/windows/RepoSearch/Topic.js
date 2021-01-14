import React from "react";
import { useRecoilValue } from "recoil";

import { reposSearchTopic } from "../../store";

export default function Topic() {
  const topic = useRecoilValue(reposSearchTopic);

  return (
    <>
      {!!Object.keys(topic).length && topic["display_name"] && (
        <div className="flex topic">
          <img
            src={require(`../../assets/topic.png`).default}
            alt=""
            className="pixelated"
          />
          <div className="topic__copy">
            <h3>{topic["display_name"]}</h3>
            <p>{topic["short_description"]}</p>
          </div>
          {topic["released"] && (
            <div className="badge -grey">
              Released
              <br />
              {topic["released"]}
            </div>
          )}
        </div>
      )}
    </>
  );
}
