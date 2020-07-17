import { apiGetLimit } from "./api";
import { useSetRecoilState } from "recoil";

import { apiLimit } from "../store";

export default function useGeneralApi() {
  const setApiLimit = useSetRecoilState(apiLimit);
  const getApiLimit = async () => {
    let results = await apiGetLimit();

    setApiLimit(results);
  };

  return { getApiLimit };
}
