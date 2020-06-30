import React from "react";
import { useRecoilValue } from "recoil";

import { reposSearchTopic } from "../../store";

export default function Topic() {
  const topic = useRecoilValue(reposSearchTopic);

  return topic.display_name ? (
    <div className="flex justify-between card topic">
      <img src="" alt="Topic icon" />
      <div>
        <h3>{topic.display_name}</h3>
        <p>{topic.short_description}</p>
      </div>
      {topic.released && <div className="badge">Released{topic.released}</div>}
    </div>
  ) : (
    <></>
  );
}
