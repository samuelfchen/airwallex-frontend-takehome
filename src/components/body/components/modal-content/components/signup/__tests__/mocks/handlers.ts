import { rest } from "msw";

export const handlers = [
  // Handles a POST request
  rest.post("*", async (req, res, ctx) => {
    const body: { name: string; email: string } = await req.json();

    if (body.email === "bademail@airwallex.com") {
      // Error path
      return res(
        ctx.status(400),
        ctx.json({ errorMessage: "Error: Bad Email." })
      );
    }

    // Success
    return res(ctx.status(200));
  }),
];
