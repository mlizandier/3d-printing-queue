import { Elysia } from "elysia";
import { PrintRequestController } from "modules/print/print.controller";

const app = new Elysia()
  .get("/", async () => {
    return "Hello Elysia"
  })
  .use(PrintRequestController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
