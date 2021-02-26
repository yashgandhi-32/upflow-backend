import { Response, Request } from "express";
import { SUCCESSFUL_RESPONSE } from "../../../util/response";
import { validationResult } from "express-validator"
import {
    downloadFile,
    generateThumbnail,
    getFiles,
    saveFile,
    sendWebhook
} from "../../../service/file.service";

export const index = (_req: Request, res: Response): void => {
    res.status(200).json(SUCCESSFUL_RESPONSE);
};

/**
 * 
 * @param _req {fileUrl : string}
 * @param res 
 */
export const uploadFile = async (_req: Request, res: Response) => {
    const errors = validationResult(_req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const { fileUrl } = _req.body
    try {
        const { fileName } = await downloadFile(fileUrl);

        await generateThumbnail(fileName)  // generate thumbnail
        await saveFile(fileUrl, fileName)  // save file to `/public/static` folder
        await sendWebhook(fileUrl)

        res.status(200).json(SUCCESSFUL_RESPONSE);
    } catch (error) {
        res.status(error.status).json(error);
    }
}

/**
 * 
 * @param _req 
 * @param res 
 */
export const getFile = async (_req: Request, res: Response) => {
    try {
        const resp = await getFiles()
        res.status(200).json({ ...SUCCESSFUL_RESPONSE, ...resp });
    } catch (error) {
        res.status(400).json(error);
    }
}