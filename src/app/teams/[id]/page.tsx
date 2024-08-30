import TeamPage from "~/components/pages/team";

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = ['1', '2', '3', '4', '5', '6'];
  return slugs.map((slug) => ({ id: slug }));
}

export default function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <div className="card">
    <TeamPage teamId={id} />
  </div>;
}