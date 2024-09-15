import { TrophyIcon, ChartNoAxesColumnIcon } from "lucide-react";
import { FutbolIcon, TeamIcon } from "~/components/shared/ui/svg";

export const COMMANDS = [
  {
    id: "tournament",
    name: "Tournament",
    icon: (
      <TrophyIcon className="objetitems-center flex h-8 w-8 sm:h-6 sm:w-6" />
    ),
  },
  {
    id: "teams",
    name: "Teams",
    icon: (
      <div className="flex h-8 w-8 items-center sm:h-6 sm:w-6">
        <TeamIcon />
      </div>
    ),
  },
  {
    id: "games",
    name: "Games",
    icon: (
      <div className="flex h-8 w-8 items-center sm:h-6 sm:w-6">
        <FutbolIcon />
      </div>
    ),
  },
  {
    id: "statistics",
    name: "Statistics",
    icon: (
      <div className="flex h-8 w-8 items-center sm:h-6 sm:w-6">
        <ChartNoAxesColumnIcon />
      </div>
    ),
  },
];
