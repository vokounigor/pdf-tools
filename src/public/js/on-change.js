/**
 * @argument {'file1' | 'file2'} inputId
 * @returns {void}
 */
function onInputChange(inputId) {
  /** @type {HTMLInputElement} */
  const input = document.getElementById(inputId);
  input.onchange = () => {
    const file = input.files[0];
    /** @type {HTMLSpanElement} */
    const labelSpan = input.previousElementSibling;
    let labelText = file.name;
    if (labelText.length > 20) {
      labelText = `${file.name.slice(0, 10)}...${file.name.slice(file.name.length - 10)}`;
    }
    labelSpan.innerHTML = labelText;
    document.querySelector(`.${inputId}_size`).innerHTML =
      `${Math.round((file.size / 1024 / 1024) * 100) / 100}MB`;
  };
}
