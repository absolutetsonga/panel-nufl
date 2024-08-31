import { PageContainer } from "~/components/shared/ui";

export const PlayerPage = ({ playerId }: { playerId: string }) => {
  return <PageContainer>{playerId}</PageContainer>;
};
