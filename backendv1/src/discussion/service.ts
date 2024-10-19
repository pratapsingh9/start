import { Message } from "@prisma/client";
import AWS from "aws-sdk";
import prismaClient from "../utiils/prismaClient";

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

class DiscussionService {
  // Create a new discussion
  async createDiscussion(
    content: string,
    authorId: number,
    communityId: number
  ): Promise<Message> {
    try {
      // Create the discussion message in the database
      const message = await prismaClient.message.create({
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

  // Get a discussion by its ID
  async getDiscussionById(discussionId: number): Promise<Message | null> {
    try {
      const discussion = await prismaClient.message.findUnique({
        where: { id: discussionId },
      });

      if (!discussion) {
        throw new Error(`Discussion with ID ${discussionId} not found`);
      }

      return discussion;
    } catch (error) {
      console.error("Error fetching discussion:", error);
      throw new Error("Unable to fetch discussion");
    }
  }

  // Upload a file to S3
  static async uploadFileToS3(
    discussionId: number,
    discussionName: string,
    file: Buffer, // Use Buffer for file uploads in Node.js
    contentType: string // Ensure you also pass the content type
  ) {
    try {
      // Upload the file to S3
      const uploadResult = await s3
        .upload({
          Bucket: process.env.AWS_S3_BUCKET_NAME as string,
          Key: `${discussionId}/${discussionName}`,
          Body: file,
          ContentType: contentType, // Set the file's content type
        })
        .promise();

      return uploadResult.Location; // Return the S3 file URL
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw new Error("Unable to upload file to S3");
    }
  }

  // Disconnect from Prisma client (useful for graceful shutdown)
  async disconnect() {
    try {
      await prismaClient.$disconnect();
    } catch (error) {
      console.error("Error disconnecting from Prisma client:", error);
    }
  }
}

export default DiscussionService;
