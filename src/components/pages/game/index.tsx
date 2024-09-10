"use client";

import { PageContainer } from "~/components/shared/ui";
import { useGetGame } from "~/components/shared/lib/hooks/games";
export const GamePage = ({ id }: { id: string }) => {
  const { data: game, isLoading, isError } = useGetGame(Number(id));

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  if (!game) return <div>Game not found</div>
  
  console.log(game);
  return <PageContainer>{id}</PageContainer>;
};
