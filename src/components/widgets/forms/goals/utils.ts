import { IGameInGameweeksWithTeamPlayersAndGoals } from "~/components/shared/lib/models/game";

export function findTeamId(
  isOwnGoal: boolean,
  teamType: "home" | "away",
  game: IGameInGameweeksWithTeamPlayersAndGoals,
): number {
  if (isOwnGoal && teamType === "home") return game.away_team_id;
  else if (!isOwnGoal && teamType === "home") return game.home_team_id;
  else if (isOwnGoal && teamType === "away") return game.home_team_id;
  else if (!isOwnGoal && teamType === "away") return game.away_team_id;
  else return 0;
}

type FormValues = {
  player_id: number;
  is_own_goal: boolean;
  assist_player_id?: number | undefined;
};

export function findSelectItemValues(
  teamType: "home" | "away",
  game: IGameInGameweeksWithTeamPlayersAndGoals,
) {
  if (teamType === "home") {
    return game.home_team.players.map((pl) => ({
      value: String(pl.id),
      name: pl.fullname,
      isHidden: false,
    }));
  } else {
    return game.away_team.players.map((pl) => ({
      value: String(pl.id),
      name: pl.fullname,
      isHidden: false,
    }));
  }
}

export function updateScore() {
  return null;
}

export function findOwnGoalScorePlayer(
  values: FormValues,
  game: IGameInGameweeksWithTeamPlayersAndGoals,
) {
  if (values.player_id && values.is_own_goal) {
    const [ownScoredPlayer] = game.home_team.players.filter(
      (pl) => pl.id === values.player_id,
    );

    if (ownScoredPlayer) {
      const updateOwnScoredPlayer = {
        player: {
          id: ownScoredPlayer.id,
          own_goals: ownScoredPlayer.own_goals + 1,
        },
      };
      return updateOwnScoredPlayer;
    }

    return null;
  }
  return null;
}

export function findGoalScorePlayer(
  values: FormValues,
  game: IGameInGameweeksWithTeamPlayersAndGoals,
) {
  if (values.player_id && !values.is_own_goal) {
    const [scoredPlayer] = game.home_team.players.filter(
      (pl) => pl.id === values.player_id,
    );

    if (scoredPlayer) {
      const updateScoredPlayer = {
        player: {
          id: scoredPlayer.id,
          goals: scoredPlayer.goals + 1,
        },
      };

      return updateScoredPlayer;
    }
    return null;
  }
  return null;
}

export function findAssistedPlayer(
  values: FormValues,
  game: IGameInGameweeksWithTeamPlayersAndGoals,
) {
  if (values.assist_player_id && values.player_id) {
    const [assistPlayer] = game.home_team.players.filter(
      (pl) => pl.id === values.assist_player_id,
    );

    if (assistPlayer) {
      const updateAssistPlayer = {
        player: {
          id: assistPlayer.id,
          assists: assistPlayer.assists + 1,
        },
      };

      return updateAssistPlayer;
    }
    return null;
  }
  return null;
}

export function updateGameScore(
  values: FormValues,
  game: IGameInGameweeksWithTeamPlayersAndGoals,
  teamType: "home" | "away",
) {
  const scoringTeam = values.is_own_goal
    ? teamType === "home"
      ? "away"
      : "home"
    : teamType;

  return {
    game_id: game.id,
    home_team_score:
      scoringTeam === "home" ? game.home_team_score + 1 : game.home_team_score,
    away_team_score:
      scoringTeam === "away" ? game.away_team_score + 1 : game.away_team_score,
  };
}
