import { selector } from "recoil";
import { userData } from "./atoms";

export const userActivity = selector({
  key: "userActivity",
  get: ({ get }) => {
    const {
      activity: { contributions, creations },
    } = get(userData);

    if (creations === undefined) return creations;

    const _contributions = ["todo", contributions];

    const firstRepo = new Date(creations[0].createdAt);
    const today = new Date();
    let monthsSinceFirstRepo =
      today.getFullYear() * 12 +
      today.getMonth() -
      (firstRepo.getFullYear() * 12 + firstRepo.getMonth());
    monthsSinceFirstRepo = monthsSinceFirstRepo + 2; // TODO whats happening here? why is 'monthsSinceFirstRepo' not correct?
    const monthsList = Array.from(Array(monthsSinceFirstRepo).keys())
      .map((key) => {
        var curr = new Date().getTime();
        var prevDate = curr - Number(key) * 30 * 24 * 60 * 60 * 1000;
        var d = new Date();
        d.setTime(prevDate);
        const year = d.getFullYear();
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        return `${year}-${month}`;
      })
      .reverse();

    const dateGroups = creations.reduce((groups, repo) => {
      const month = repo.createdAt.split("-").slice(0, 2).join("-");
      if (!groups[month]) groups[month] = [];
      groups[month].push(repo.name);
      return groups;
    }, {});

    let count = 0;
    const repoTotals = monthsList.map((month) => {
      count += dateGroups[month] ? dateGroups[month].length : 0;
      return count;
    });

    return {
      _contributions,
      creations: { monthsList, repoTotals },
    };
  },
});