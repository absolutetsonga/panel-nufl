import Image from "next/image";

const placeholder_image =
  "https://utfs.io/f/aeb9ab9b-7970-4eed-8fc1-92ac644c1165-clf4u5.jpg";

type ITeamPlayer = {
  id: number;
  fullname: string;
  image: string | null;
  position: string;
  major: string;
  age: number;
  played_matches: number;
  goals: number;
  assists: number;
  clean_sheets: number;
  yellow_cards: number;
  red_cards: number;
};

export const PlayerView = ({ player }: { player: ITeamPlayer }) => {
  console.log(player);
  const {
    fullname,
    image,
    position,
    major,
    age,
    played_matches,
    goals,
    assists,
    clean_sheets,
    yellow_cards,
    red_cards,
  } = player;

  return (
    <div className="mx-auto max-w-md rounded-xl p-6 pt-10 shadow-md">
      <div className="gap-2 flex flex-col items-center">
        <Image
          src={image ?? placeholder_image}
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
          <strong className="font-semibold text-gray-800">Major:</strong>{" "}
          {major}
        </p>
        <p className="text-gray-700">
          <strong className="font-semibold text-gray-800">Age:</strong> {age}
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
