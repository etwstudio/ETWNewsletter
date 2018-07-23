(() => {
  let inputEl;
  let previewRawEl;
  let previewHtmlEl;
  let previewPlaceholder;
  let rawButton;
  let htmlButton;
  let previewButtonContainer;
  let converter;

  function init() {
    inputEl = document.getElementById('input');
    previewRawEl = document.getElementById('previewRaw');
    previewHtmlEl = document.getElementById('previewHtml');
    previewPlaceholder = document.getElementById('previewPlaceholder');
    
    rawButton = document.getElementById('buttonRaw');
    htmlButton = document.getElementById('buttonHtml');
    previewButtonContainer = document.getElementById('previewButtonContainer');

    converter = getConverter();
    initButtons();

    inputEl.setAttribute('placeholder', 
        "Markdown content here")

    updatePreviewForInput();

    inputEl.onmousedown = () => {
      inputEl.classList.toggle('empty', !inputEl.value);
    }

    inputEl.onkeydown = () => {
      inputEl.classList.toggle('empty', !inputEl.value);
    }

    inputEl.onkeyup = () => {
      inputEl.classList.toggle('empty', !inputEl.value);
      
      updatePreviewForInput();
      const html = convert();
      previewRawEl.textContent = html;
      previewHtmlEl.innerHTML = html;
    };
  }

  function updatePreviewForInput() {
    if (inputEl.value) {
      setVisible(previewPlaceholder, false);
      setVisible(previewButtonContainer, true);
    } else {
      setVisible(previewPlaceholder, true);
      setVisible(previewButtonContainer, false);
    }
  }

  function getConverter() {
    return new showdown.Converter({
      noHeaderId: true,
      encodeEmails: true,
      openLinksInNewWindow: true,
      emoji: true,
    });
  }

  function initButtons() {
    
    rawButton.onclick = () => {
      setVisible(previewHtmlEl, false);
      setVisible(previewRawEl, true);
      rawButton.classList.toggle('active', true);
      htmlButton.classList.toggle('active', false);
    }

    htmlButton.onclick = () => {
      setVisible(previewRawEl, false);
      setVisible(previewHtmlEl, true);
      htmlButton.classList.toggle('active', true);
      rawButton.classList.toggle('active', false);
    }
  }

  function convert() {
    const html = converter.makeHtml(inputEl.value);
    return html;
  }

  function setVisible(el, visible) {
    el.classList.toggle('hidden', !visible);
  }

  document.addEventListener('DOMContentLoaded', init);

})();