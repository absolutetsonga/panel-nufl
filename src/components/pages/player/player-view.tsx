import Image from "next/image";
import type { ITeamPlayer } from "~/components/shared/lib/models/player";

function getAge(birthday: Date) {
  const today = new Date();

  let age = today.getFullYear() - birthday.getFullYear();
  const monthDifference = today.getMonth() - birthday.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthday.getDate())
  ) {
    age--;
  }

  return age;
}

export const PlayerView = ({ player }: { player: ITeamPlayer }) => {
  const {
    fullname,
    image,
    position,
    school,
    level_of_study,
    age,
    year,
    played_matches,
    goals,
    own_goals,
    assists,
    clean_sheets,
    yellow_cards,
    red_cards,
  } = player;

  const player_age = getAge(player.age);

  return (
    <div className="mx-auto max-w-md rounded-xl p-6 pt-10 shadow-md">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={image}
          alt={`Image of ${fullname}`}
          width={96}
          height={96}
          className="rounded-full border-4 border-indigo-400 object-cover shadow-md"
        />
        <div>
          <h1 className="text-2xl font-semibold text-slate-50">{fullname}</h1>
          <p className="text-lg text-slate-50">{position}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <h2 className="text-xl font-semibold text-indigo-300">Details</h2>

        <p className="text-slate-50">
          <strong className="font-semibold text-slate-50">
            Level of Study:
          </strong>{" "}
          {level_of_study}
        </p>
        <p className="text-slate-50">
          <strong className="font-semibold text-slate-50">Course Year:</strong>{" "}
          {year}
        </p>
        <p className="text-slate-50">
          <strong className="font-semibold text-slate-50">School:</strong>{" "}
          {school}
        </p>

        <p className="text-slate-50">
          <strong className="font-semibold text-slate-50">Age:</strong>{" "}
          {player_age ? player_age : "null"}
        </p>

        <p className="text-slate-50">
          <strong className="font-semibold text-slate-50">
            Birthday Date:
          </strong>{" "}
          {player_age ? age.toLocaleDateString() : "null"}
        </p>

        <p className="text-slate-50">
          <strong className="font-semibold text-slate-50">
            Played Matches:
          </strong>{" "}
          {played_matches}
        </p>
        <p className="text-slate-50">
          <strong className="font-semibold text-slate-50">Goals:</strong>{" "}
          {goals}
        </p>
        <p className="text-slate-50">
          <strong className="font-semibold text-slate-50">Own Goals:</strong>{" "}
          {own_goals}
        </p>
        <p className="text-slate-50">
          <strong className="font-semibold text-slate-50">Assists:</strong>{" "}
          {assists}
        </p>
        <p className="text-slate-50">
          <strong className="font-semibold text-slate-50">Clean Sheets:</strong>{" "}
          {clean_sheets}
        </p>
        <p className="text-slate-50">
          <strong className="font-semibold text-slate-50">Yellow Cards:</strong>{" "}
          {yellow_cards}
        </p>
        <p className="text-slate-50">
          <strong className="font-semibold text-slate-50">Red Cards:</strong>{" "}
          {red_cards}
        </p>
      </div>
    </div>
  );
};
