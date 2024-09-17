import { useState } from "react";

import { CreateButton } from "~/components/entities/create-button";
import { Heading3 } from "~/components/shared/ui";
import Image from "next/image";
import { cn } from "~/components/shared/lib/utils/clsx";

import type { IGameInGameweeksWithTeamPlayersAndGoals } from "~/components/shared/lib/models/game";
import type { ITeamPlayer } from "~/components/shared/lib/models/player";
import { CardCreateForm } from "~/components/widgets/forms/cards/card-create-form";

type CardViewProps = {
  game: IGameInGameweeksWithTeamPlayersAndGoals;
  teamType: "home" | "away";
};

export const CardsView = ({ game, teamType }: CardViewProps) => {
  const headerClassname = cn("flex justify-between mb-4", {
    "flex-row": teamType === "home",
    "flex-row-reverse": teamType === "away",
  });

  const titleClassname = cn("flex items-center gap-4", {
    "flex-row": teamType === "home",
    "flex-row-reverse": teamType === "away",
  });
  const imageSrc =
    teamType === "home" ? game.home_team.image : game.away_team.image;
  const teamId = teamType === "home" ? game.home_team_id : game.away_team_id;
  const [createCardToggle, setCreateCardToggle] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col">
      <div className={headerClassname}>
        <CreateButton
          toggle={createCardToggle}
          setToggle={setCreateCardToggle}
        />
        <div className={titleClassname}>
          <Heading3>Cards</Heading3>

          <Image
            src={imageSrc ?? ""}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
            alt={`Image of ${game.home_team.name}`}
          />
        </div>

        {createCardToggle && (
          <CardCreateForm
            toggle={createCardToggle}
            setToggle={setCreateCardToggle}
            game={game}
            teamType={teamType}
          />
        )}
      </div>

      <PopulateCards cards={game.cards} teamType={teamType} teamId={teamId} />
    </div>
  );
};

const PopulateCards = ({
  cards,
  teamType,
  teamId,
}: {
  teamId: number;
  teamType: "home" | "away";
  cards: {
    id: number;
    user_id: string;
    game_id: number;
    player_id: number;
    team_id: number;
    is_yellow: boolean;
    player: ITeamPlayer;
  }[];
}) => {
  const cardClassName = cn("flex justify-end items-center gap-2", {
    "flex-row": teamType === "home",
    "flex-row-reverse": teamType === "away",
  });

  const playersClassname = cn("flex gap-1 text-[12px] md:text-normal", {
    "flex-row-reverse": teamType === "home",
    "flex-row": teamType === "away",
  });

  const teamCards = cards.filter((card) => card.team_id === teamId);
  console.log(teamCards);

  return (
    <div className="flex flex-col gap-1">
      {teamCards.map((card) => {
        return (
          <div key={card.id} className={cardClassName}>
            <div className={playersClassname}>
              <p>{card.player.fullname}</p>
              <p>{card.is_yellow ? "(Yellow)" : "(Red)"}</p>
            </div>

            <Image
              width={20}
              height={20}
              className="object-cover rounded-full"
              alt={card.player.fullname}
              src={card.player.image}
            />
          </div>
        );
      })}
    </div>
  );
};
