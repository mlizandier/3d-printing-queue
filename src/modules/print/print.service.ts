import { CreatePrintJobType, GetUserPendingJobType } from "./types"

export class PrintService {
    private async getUserPendingJob({ userId }: GetUserPendingJobType) {
        throw new Error("Not implemented yet")
    }

    async createPrintJob({ userId }: CreatePrintJobType) {
        const userHasPrintJob = this.getUserPendingJob({ userId })

        throw new Error("Not implemented yet")
    }

    helloPrint() {
        return "totototo"
    }
}