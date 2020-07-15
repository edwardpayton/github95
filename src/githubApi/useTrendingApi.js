import { useRecoilState } from "recoil";

import { trending } from "../store";
import { apiGetTrending } from "./api.unofficial";

export default function useTrendingApi() {
  const [trends, setTrending] = useRecoilState(trending);

  const getTrending = async (type, time = "daily") => {
    let results = await apiGetTrending(type, time);
    if (!results[0]) {
      results = ["No results"];
    }

    const newTrends = {
      ...trends[type],
      [time]: results,
    };
    setTrending({ ...trends, [type]: newTrends });
  };

  return {
    getTrending,
  };
}
