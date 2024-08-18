import { createReadStream, rmSync } from 'node:fs';
import { Router } from 'express';
import fileUpload from 'express-fileupload';
import { mbToByte } from '../utils/converters.js';
import { dumpFieldsAndDeleteFile } from '../modules/pdftk-wrapper.js';
import { parseFieldsToMap } from '../modules/fields-to-json.js';
import { fileValidator } from '../middleware/file-validator-middleware.js';
import { fileComplement } from '../modules/compare-maps.js';

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

    return res.render('partials/diff-tables', {
      file1: file1.name,
      file2: file2.name,
      diff1,
      diff2,
    });
  }
);

export default router;
