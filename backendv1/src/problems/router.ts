import { Hono } from "hono";
import QuestionService from "./service";

const questionRouter = new Hono();


questionRouter.post("/", async (c) => {
  const body = await c.req.json();
  const {
    topics,
    title,
    exampleTestCase,
    description,
    difficulty,
    defaultCode,
  } = body;
  const question = await QuestionService.createQuestion(
    topics,
    title,
    exampleTestCase,
    description,
    difficulty,
    defaultCode
  );
  if (question) {
    return c.json(
      {
        status: "succes",
        question,
      },
      200
    );
  }
  return c.json({
    status: "failed",
    message: "failed to create new questoin",
  });
});





export default questionRouter;