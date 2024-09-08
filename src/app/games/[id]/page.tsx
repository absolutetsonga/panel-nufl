import { GamePage } from "~/components/pages/game";

export default function page({ params }: { params: { id: string } }) {
  return <GamePage id={params.id} />;
}
