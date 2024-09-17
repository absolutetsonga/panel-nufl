"use server";
import { db } from "~/server/db";
import { games, cards, players } from "~/server/db/schema";
import { and, count, eq, sql } from "drizzle-orm";
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

  // When creating card update player value
  //    If yellow then yellows + 1
  //    If yellow then red + 1

  // If player has two yellow cards then convert it to red
  async createCard(card: ICreateCard) {
    const result = await db.transaction(async (trx) => {
      const [newCard] = await db
        .insert(cards)
        .values({
          ...card,
          user_id: this.user.userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      if (card.is_yellow) {
        await trx
          .update(players)
          .set({
            yellow_cards: sql`${players.yellow_cards} + 1`,
          })
          .where(
            and(
              eq(players.id, card.player_id),
              eq(players.user_id, this.user.userId),
            ),
          );
      } else {
        await trx
          .update(players)
          .set({
            red_cards: sql`${players.red_cards} + 1`,
          })
          .where(
            and(
              eq(players.id, card.player_id),
              eq(players.user_id, this.user.userId),
            ),
          );
      }

      const yellowCardsCount = await trx
        .select()
        .from(cards)
        .where(
          and(
            eq(cards.user_id, this.user.userId),
            eq(cards.player_id, card.player_id),
            eq(cards.game_id, card.game_id),
            eq(cards.is_yellow, true),
          ),
        );

      if (yellowCardsCount.length === 2) {
        await trx.insert(cards).values({
          user_id: this.user.userId,
          game_id: card.game_id,
          player_id: card.player_id,
          team_id: card.team_id,
          is_yellow: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        await trx
          .update(players)
          .set({ red_cards: sql`${players.red_cards} + 1` })
          .where(
            and(
              eq(players.id, card.player_id),
              eq(players.user_id, this.user.userId),
            ),
          );
      }
      return newCard;
    });

    return result;
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
