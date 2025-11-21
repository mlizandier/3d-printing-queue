import { Elysia, t } from "elysia";
import { PrintService } from "./print.service";

const printService = new PrintService()

export const PrintRequestController = new Elysia({
    prefix: '/print'
})
    .get("/", () => printService.helloPrint())
    .post("/",
        ({ body }) => printService.createPrintJob(body),
        {
            body: t.Object({
                userId: t.String(),
                url: t.String(),
                description: t.Optional(t.String())
            })
        }
    )

