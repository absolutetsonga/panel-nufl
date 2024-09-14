import { useState } from "react";
import { useDeleteGame } from "~/components/shared/lib/hooks/games";
import { useRouter } from "next/navigation";

import { GameUpdateForm } from "~/components/widgets/forms/games/game-update-form";
import { DeleteAlert } from "~/components/entities/delete-alert/ui";
import { Heading3 } from "~/components/shared/ui";
import { PencilIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import type { IGameInGameweeks } from "~/components/shared/lib/models/games";

type GameHeaderProps = {
  game: IGameInGameweeks;
};

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year}, ${hours}:${minutes}`;
}

export const GameHeader = ({ game }: GameHeaderProps) => {
  const router = useRouter();
  const [editToggle, setEditToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const { mutate: server_deleteGame } = useDeleteGame();

  const onDelete = async (id: number) => {
    server_deleteGame(id);
    router.push("/games");
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 text-black rounded-xl shadow-md p-4 font-bold bg-slate-200">
      <div className="relative flex w-full flex-row items-center justify-center gap-4">
        <div className="flex flex-row items-center justify-center gap-4 text-right">
          <p className="text-[14px]">{game.home_team.name}</p>
          <Image
            src={game.home_team.image ?? ""}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
            alt={`Image of ${game.home_team.name}`}
          />
        </div>
        <Heading3>
          {game.home_team_score === -1 ? 0 : game.home_team_score} :{" "}
          {game.away_team_score === -1 ? 0 : game.away_team_score}
        </Heading3>
        <div className="flex flex-row items-center justify-center gap-4 text-left">
          <Image
            src={game.away_team.image ?? ""}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
            alt={`Image of ${game.away_team.name}`}
          />
          <p className="text-[14px]">{game.away_team.name}</p>
        </div>

        <div className="absolute right-2 top-2 flex flex-row items-center gap-4 cursor-pointer">
          <PencilIcon onClick={() => setEditToggle(true)} />
          <TrashIcon onClick={() => setDeleteToggle(true)} />
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="text-[12px]">Venue: {game.venue}</div>
        <div className="text-[12px]">Time: {formatDate(game.date)}</div>
        <div className="text-[12px]">Result: {game.result}</div>
      </div>

      <GameUpdateForm
        toggle={editToggle}
        setToggle={setEditToggle}
        game={game}
      />

      {deleteToggle && (
        <DeleteAlert
          trigger="Delete?"
          title={`Delete Gameweek`}
          description="Are you sure? This action cannot be undone. This will permanently delete this team and remove all games, scores, players, their goals, assists, clean sheets data with this team from our servers. In special cases we recommend to contact with developer to delete the team."
          onConfirm={() => {
            onDelete(game.id);
          }}
          onCancel={() => setDeleteToggle(false)}
        />
      )}
    </div>
  );
};

// features:
// change information
// delete information
