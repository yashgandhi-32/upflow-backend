import { Express } from "express";
import { fileRouter } from "../api/v1/file";

export const setupRoutesV1 = (app: Express): void => {

    app.use(
        "/v1/file",
        fileRouter
    )
};
