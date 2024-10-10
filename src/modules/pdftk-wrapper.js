import { writeFileSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import crypto from 'node:crypto';

/**
 * @param {string} file - pdf file to be dumped
 * @param {string} output - where to save output (file)
 * @returns {void}
 */
function dumpDataFields(file, output) {
  execSync(`pdftk ${file} dump_data_fields_utf8 output ${output}`);
}

/**
 * @param {Buffer} fileBuffer
 * @returns {string} file name of the dumped data
 */
export function dumpFieldsAndDeleteFile(fileBuffer) {
  const uuid = crypto.randomUUID();
  const fileTempName = `file_${uuid}.pdf`;
  const fileOutput = `file_${uuid}.txt`;

  writeFileSync(fileTempName, fileBuffer);
  dumpDataFields(fileTempName, fileOutput);
  rmSync(fileTempName, { force: true });

  return fileOutput;
}
