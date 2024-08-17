import { createReadStream } from 'node:fs';
import { Router } from 'express';
import fileUpload from 'express-fileupload';
import { mbToByte } from '../utils/converters.js';
import { dumpFieldsAndDeleteFile } from '../modules/pdftk-wrapper.js';
import { parseFieldsToMap } from '../modules/fields-to-json.js';
import { compareFields } from '../modules/compare-fields.js';
import * as Types from '../types/types.js';

const router = Router();

router.get('/', (_, res) => {
  return res.render('index');
});

router.get('/compare', (_, res) => {
  return res.render('compare');
});

router.get('/compare-group', (_, res) => {
  return res.render('compare-group');
});

router.post(
  '/api/compare',
  fileUpload({ limits: { fileSize: mbToByte(10) } }),
  async (req, res) => {
    if (!req.files) {
      return res.status(400).send(`<div>An error occurred.</div>`);
    }
    const hasFile1 = 'file1' in req.files;
    const hasFile2 = 'file2' in req.files;

    if (!hasFile1 || !hasFile2) {
      return res.status(400).send(`<div>An error occurred.</div>`);
    }

    /** @type {{file1: fileUpload.UploadedFile; file2: fileUpload.UploadedFile; }} */
    const { file1, file2 } = req.files;

    // Same file uploaded
    if (file1.md5 === file2.md5) {
      return res
        .status(200)
        .send(
          `<div>It seems you tried to upload the same file twice. Please check again.</div>`
        );
    }

    const file1Output = dumpFieldsAndDeleteFile(file1.data);
    const file2Output = dumpFieldsAndDeleteFile(file2.data);

    const file1Map = await parseFieldsToMap(createReadStream(file1Output));
    const file2Map = await parseFieldsToMap(createReadStream(file2Output));

    const file1Entries = Object.keys(file1Map);
    const numOfKeys = file1Entries.length;
    /** @type {Types.ComparisonObj[]} */
    const diff = [];
    for (let i = 0; i < numOfKeys; i++) {
      const fileKey = file1Entries[i];
      if (!(fileKey in file2Map)) {
        diff.push({ key: fileKey });
        continue;
      }
      const currObj = compareFields(file1Map[fileKey], file2Map[fileKey]);
      if (Object.keys(currObj).length > 0) {
        diff.push(currObj);
      }
    }

    const data = {
      diff,
    };

    // rmSync(file1Output, { force: true });
    // rmSync(file2Output, { force: true });

    return res.render('partials/uploaded-file', { data: JSON.stringify(data) });
  }
);

export default router;
