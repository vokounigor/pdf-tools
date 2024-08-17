import { writeFileSync, rmSync } from 'node:fs';
import { execSync } from 'node:child_process';
import dayjs from 'dayjs';
import { DATE_FORMAT_MILLISECONDS } from '../constants/date.js';

/**
 * @param {string} file - pdf file to be dumped
 * @param {string} output - where to save output (file)
 * @returns {void}
 */
function dumpDataFields(file, output) {
  execSync(`pdftk ${file} dump_data_fields output ${output}`);
}

/**
 * @param {Buffer} fileBuffer
 * @returns {string} file name of the dumped data
 */
export function dumpFieldsAndDeleteFile(fileBuffer) {
  const timestamp = dayjs().format(DATE_FORMAT_MILLISECONDS);
  const fileTempName = `file_${timestamp}.pdf`;
  const fileOutput = `file_${timestamp}.txt`;

  writeFileSync(fileTempName, fileBuffer);
  dumpDataFields(fileTempName, fileOutput);
  rmSync(fileTempName, { force: true });

  return fileOutput;
}
