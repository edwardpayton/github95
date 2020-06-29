import React from "react";
import { useRecoilValue } from "recoil";

import { reposSearchTopic } from "../../store";

export default function Topic() {
  const topic = useRecoilValue(reposSearchTopic);

  return topic && <p>{topic.description}</p>;
}
