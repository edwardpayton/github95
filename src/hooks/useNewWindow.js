import { useCallback } from "react";
import { useRecoilState } from "recoil";

import { windowObj } from "../store";
import { DEFAULT_WINDOW } from "../constants";

export default function () {
  const [currentWindows, setWindows] = useRecoilState(windowObj);

  return useCallback(
    (name, owner) => {
      const windowName = `${owner}${name}`;
      const window = {
        [windowName]: {
          ...DEFAULT_WINDOW,
          label: `Repo: ${owner}/${name}`,
          header: `${owner} ${name}`,
          visibility: [true, true],
          details: {
            owner,
            name,
          },
        },
      };
      setWindows({ ...currentWindows, ...window });
    },
    [currentWindows, setWindows]
  );
}
