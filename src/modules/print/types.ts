export type GetUserPendingJobType = {
    userId: string;
}

export type CreatePrintJobType = {
    userId: string;
    url: string;
    description?: string;
}