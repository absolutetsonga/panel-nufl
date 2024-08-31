import { PlayerPage } from "~/components/pages/player";

export default function page({ params: { id } }: { params: { id: string } }) {
  return <PlayerPage playerId={id} />;
}
