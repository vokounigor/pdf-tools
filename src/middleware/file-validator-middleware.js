export function fileValidator(req, res, next) {
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

  return next();
}
