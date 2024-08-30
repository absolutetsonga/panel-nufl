import TeamPage from "~/components/pages/team";

export default function page({ params: { id } }: { params: { id: string } }) {
  return <TeamPage teamId={id} />;
}
