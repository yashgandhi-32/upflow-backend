import express from "express";
import { uploadFile, getFile } from "./controller";
import { check } from "express-validator"


const router = express.Router();

/**
 * validators
 * .fileUrl : required
 */

router.post(
    "/upload-file",
    check('fileUrl')
        .isURL(),
    uploadFile
);

router.get(
    "/get-files",
    getFile
);
export const fileRouter = router;
