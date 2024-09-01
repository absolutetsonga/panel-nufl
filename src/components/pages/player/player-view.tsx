import Image from "next/image";
import { ITeamPlayer } from "~/components/shared/lib/models/team";

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
    assists,
    clean_sheets,
    yellow_cards,
    red_cards,
  } = player;

  return (
    <div className="mx-auto max-w-md rounded-xl p-6 pt-10 shadow-md">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={image}
          alt={`Image of ${fullname}`}
          width={96}
          height={96}
          className="rounded-full border-4 border-indigo-500 object-cover shadow-md"
        />
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{fullname}</h1>
          <p className="text-lg text-gray-600">{position}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <h2 className="text-xl font-semibold text-indigo-600">Details</h2>

        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">
            Level of Study:
          </strong>{" "}
          {level_of_study}
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">Course Year:</strong>{" "}
          {year}
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">School:</strong>{" "}
          {school}
        </p>

        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">Age:</strong>{" "}
          {age.toLocaleString()}
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">
            Played Matches:
          </strong>{" "}
          {played_matches}
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">Goals:</strong>{" "}
          {goals}
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">Assists:</strong>{" "}
          {assists}
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">Clean Sheets:</strong>{" "}
          {clean_sheets}
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">Yellow Cards:</strong>{" "}
          {yellow_cards}
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">Red Cards:</strong>{" "}
          {red_cards}
        </p>
      </div>
    </div>
  );
};
