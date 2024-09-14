import { useState } from "react";

import { CreateButton } from "~/components/entities/create-button";
import { Heading3 } from "~/components/shared/ui";
import Image from "next/image";
import { cn } from "~/components/shared/lib/utils/clsx";

import type { IGameInGameweeksWithTeamPlayersAndGoals } from "~/components/shared/lib/models/game";

type CardViewProps = {
  game: IGameInGameweeksWithTeamPlayersAndGoals;
  teamType: string;
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

  const cardClassName = cn("flex justify-end items-center gap-2", {
    "flex-row": teamType === "home",
    "flex-row-reverse": teamType === "away",
  });

  const playersClassname = cn("flex gap-2 text-[12px] md:text-normal", {
    "flex-row-reverse": teamType === "home",
    "flex-row": teamType === "away",
  });

  const imageSrc =
    teamType === "home" ? game.home_team.image : game.away_team.image;
  const [createGoalToggle, setCreateGoalToggle] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col">
      <div className={headerClassname}>
        <CreateButton
          toggle={createGoalToggle}
          setToggle={setCreateGoalToggle}
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
      </div>

      {game.cards.map((card) => {
        return (
          <div key={card.id} className={cardClassName}>
            <div className={playersClassname}>
              <p>{card.player.fullname}</p>
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
