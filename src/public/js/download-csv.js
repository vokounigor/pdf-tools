/**
 * @param {string} data
 * @returns {void}
 */
function downloadCSVDiff(data) {
  const csv = generateCSVDiff(data);
  createDownload(csv);
}

/**
 * @param {string} data
 * @returns {void}
 */
function downloadCSVKeys(data) {
  const csv = generateCSVKeys(data);
  createDownload(csv);
}

/**
 * @param {string} csv
 * @returns {void}
 */
function createDownload(csv) {
  var a = document.createElement('a');
  a.href = 'data:application/octet-stream,' + encodeURIComponent(csv);
  a.download = 'diffKeys.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * @param {string} data
 * @returns {string}
 */
function generateCSVDiff(data) {
  const parsedData = JSON.parse(data);
  let csvData = 'Field Type,Field Key,Options in file 1,Options in file2\n';
  for (let i = 0; i < parsedData.length; i++) {
    const datum = parsedData[i];
    csvData += `${datum.type},${datum.key},"${datum.options?.inObj1?.join(', ') ?? '-'}","${datum.options?.inObj2?.join(', ') ?? '-'}"\n`;
  }
  return csvData;
}

/**
 * @param {string} data
 * @returns {string}
 */
function generateCSVKeys(data) {
  const parsedData = JSON.parse(data);
  let csvData = 'Field Type,Field Key,Options\n';
  for (let i = 0; i < parsedData.length; i++) {
    const datum = parsedData[i];
    csvData += `${datum.type},${datum.key},"${datum.options?.join(', ') ?? '-'}"\n`;
  }
  return csvData;
}
