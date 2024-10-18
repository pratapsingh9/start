import { Message } from "@prisma/client";
import prismaCLient from "../utiils/prismaClient";

class DiscussionService {
  async createDiscussion(
    content: string,
    authorId: number,
    communityId: number
  ): Promise<Message> {
    try {
      const message = prismaCLient.message.create({
        data: {
          content,
          author: { connect: { id: authorId } },
          community: { connect: { id: communityId } },
        },
      });

      return message;
    } catch (error) {
      console.error("Error creating discussion:", error);
      throw new Error("Unable to create discussion");
    }
  }
  async getDiscussionById(discussionId: number): Promise<Message | null> {
    try {
      const discussion = prismaCLient.message.findUnique({
        where: { id: discussionId },
      });
      return discussion;
    } catch (error) {
      console.error("Error fetching discussion:", error);
      throw new Error("Unable to fetch discussion");
    }
  }
  async disconnect() {
    await prismaCLient.$disconnect();
  }
}

export default DiscussionService;
