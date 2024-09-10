import { auth } from "@clerk/nextjs/server";

export class AuthenticationService {
  user: { userId: string };

  constructor() {
    const authUser = auth();
    if (!authUser?.userId) {
      throw new Error("Unauthorized");
    }

    this.user = {
      userId: authUser.userId,
    };
  }

  protected isOwner(resourceUserId: string) {
    if (this.user.userId !== resourceUserId) {
      throw new Error("Unauthorized");
    }
  }
}
