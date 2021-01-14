import { useCallback } from "react";
import { useRecoilState } from "recoil";

import { windowObj } from "../store";
import { DEFAULT_WINDOW } from "../constants";

export default function useNewWindow() {
  const [currentWindows, setWindows] = useRecoilState(windowObj);

  const openWindow = (newWindow) =>
    window.setTimeout(() => {
      setWindows(newWindow);
    }, 300);

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
      return openWindow({ ...currentWindows, ...window });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentWindows, setWindows]
    // 'openWindow' - not needed
  );
}
