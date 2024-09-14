"use server";
import { db } from "~/server/db";
import { games, cards } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
import { AuthenticationService } from "~/server/utils";

import type { ICreateCard } from "~/components/shared/lib/models/card";

class CardService extends AuthenticationService {
  constructor() {
    super();
  }

  async getCards(gameId: number) {
    return await db.query.assists.findMany({
      where: and(eq(cards.user_id, this.user.userId), eq(games.id, gameId)),
    });
  }

  async createCard(card: ICreateCard) {
    const [newAssist] = await db
      .insert(cards)
      .values({
        ...card,
        user_id: this.user.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    return newAssist;
  }

  async deleteCard(id: number) {
    const [deletedCard] = await db
      .delete(cards)
      .where(and(eq(cards.id, id), eq(cards.user_id, this.user.userId)))
      .returning();

    return deletedCard;
  }
}

const cardService = new CardService();

export const getCards = async (gameId: number) => cardService.getCards(gameId);
export const createCard = async (card: ICreateCard) =>
  cardService.createCard(card);
export const deleteCard = async (id: number) => cardService.deleteCard(id);
