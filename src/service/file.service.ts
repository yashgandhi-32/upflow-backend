import request from "request"
import fs from "fs"
import {
    SUCCESSFUL_RESPONSE,
    FILE_DOWNLOAD_FAILURE,
    THUMBNAIL_GENERATE_ERROR,
    SAVE_TO_DB
}
    from "../util/response"

import pdf from "pdf-thumbnail"
import { File } from "../models/File"


/**
 * 
 * @param fileUrl 
 * 
 * Download file from server
 */

export const downloadFile = async (fileUrl: string): Promise<any> => {

    const fileName = `file-${Math.floor(Math.random() * 312313)}`;
    const path = `./public/file/${fileName}.pdf`;
    const emptyFile = await fs.createWriteStream(path);

    return new Promise(async (resolve, reject) => {
        let result = await request({
            uri: fileUrl,
            gzip: true
        });
        const file = await result.pipe(emptyFile);

        file.on("finish", () => {
            resolve({ ...SUCCESSFUL_RESPONSE, fileName });
        });

        file.on("error", (error: Error) => {
            reject(FILE_DOWNLOAD_FAILURE);
        });
    })
}

/**
 * 
 * @param fileName 
 * 
 * Generate thumbnail from pdf 
 * and save in static folder
 */
export const generateThumbnail = async (fileName: string): Promise<any> => {

    const path = `./public/file/${fileName}.pdf`;
    const pdfStream = await fs.createReadStream(path);

    return new Promise(async (resolve, reject) => {
        // creation of the thumbnail jpeg image
        try {
            const image = await pdf(pdfStream, {
                compress: {
                    type: "JPEG", //default
                    quality: 70 //default
                }
            });
            // The thumbnail is locally saved
            await image.pipe(
                fs.createWriteStream(`./public/thumbnail/thumbnail-${fileName}.jpg`)
            );
            resolve(SUCCESSFUL_RESPONSE)
        } catch (error) {
            reject(THUMBNAIL_GENERATE_ERROR)
        }
    })
}

/**
 * 
 * @param fileUrl 
 * @param fileName 
 * 
 * Save file to static folder
 */

export const saveFile = async (fileUrl: string, fileName: string) => {
    const newFile = new File({
        url: fileUrl,
        name: fileName,
    });
    // saving of the file document
    return new Promise(async (resolve, reject) => {
        try {
            await newFile.save();
            resolve(SUCCESSFUL_RESPONSE)
        } catch (err) {
            reject(SAVE_TO_DB)
        }
    })
}

/**
 * Return list of files and thumbnails
 */

export const getFiles = async (): Promise<object> => {
    return new Promise(async (resolve, reject) => {
        try {
            const files = await File.find()
            let resp = files.map((file: any) => {
                return {
                    fileurl: `${process.env.BASE_URL}/file/${file.name}.pdf`,
                    thumbnail: `${process.env.BASE_URL}/thumbnail/thumbnail-${file.name}.jpg`,
                }
            })
            resolve(resp)
        } catch (error) {
            reject()
        }
    })
}

/**
 * 
 * Retry webook 3 times max
 * in case of status!=200
 * from request server 
 */

export const sendWebhook = async (fileUrl: string, retries = 3) => {
    if (retries == 0) {
        return
    }
    try {
        await request({
            uri: process.env.WEBHOOK_URL,
            json: true,
        })
    } catch (error) {
        sendWebhook(fileUrl, retries - 1)
    }
}