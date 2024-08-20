import { createReadStream, rmSync } from 'node:fs';
import { Router } from 'express';
import fileUpload from 'express-fileupload';
import { mbToByte } from '../utils/converters.js';
import { dumpFieldsAndDeleteFile } from '../modules/pdftk-wrapper.js';
import {
  parseFieldsToJsonArray,
  parseFieldsToMap,
} from '../modules/fields-to-json.js';
import { fileValidator } from '../middleware/file-validator-middleware.js';
import { fileComplement } from '../modules/compare-maps.js';

const router = Router();

router.get('/', (_, res) => {
  return res.render('index');
});

router.get('/file', (_, res) => {
  return res.render('single-file');
});

router.get('/compare', (_, res) => {
  return res.render('compare');
});

router.get('/compare-group', (_, res) => {
  return res.render('compare-group');
});

router.post(
  '/api/compare',
  fileUpload({ limits: { fileSize: mbToByte(10), files: 2 } }),
  fileValidator,
  async (req, res) => {
    /** @type {{file1: fileUpload.UploadedFile; file2: fileUpload.UploadedFile; }} */
    const { file1, file2 } = req.files;

    const file1Output = dumpFieldsAndDeleteFile(file1.data);
    const file2Output = dumpFieldsAndDeleteFile(file2.data);

    const file1Map = await parseFieldsToMap(createReadStream(file1Output));
    const file2Map = await parseFieldsToMap(createReadStream(file2Output));

    const diff1 = fileComplement(file1Map, file2Map);
    const diff2 = fileComplement(file2Map, file1Map);

    rmSync(file1Output, { force: true });
    rmSync(file2Output, { force: true });

    return res.render('partials/diff-overview', {
      file1: file1.name,
      file2: file2.name,
      diff1,
      diff2,
    });
  }
);

router.post(
  '/api/single-file',
  fileUpload({ limits: { fileSize: mbToByte(10), files: 1 } }),
  async (req, res) => {
    if (
      !('file' in req.files) ||
      req.files.file.mimetype !== 'application/pdf'
    ) {
      return res.status(400).send(`<div>An error occurred.</div>`);
    }
    /** @type {{file: fileUpload.UploadedFile }} */
    const { file } = req.files;

    const fileOutput = dumpFieldsAndDeleteFile(file.data);
    const fileKeysArr = await parseFieldsToJsonArray(
      createReadStream(fileOutput)
    );
    rmSync(fileOutput, { force: true });

    return res.render('partials/keys-overview', {
      fileName: file.name,
      data: fileKeysArr,
    });
  }
);

export default router;
