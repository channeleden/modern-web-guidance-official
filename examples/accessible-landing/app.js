// No network, storage, analytics, or background submission. The unenhanced
// worksheet has no form owner, so it stays safe and printable without JavaScript.
const fields = document.querySelector('#brief-fields');
const actions = document.querySelector('#prepare-actions');
const baseline = document.querySelector('#worksheet-baseline');
const result = document.querySelector('#brief-result');
const output = document.querySelector('#brief-output');
const resultHeading = document.querySelector('#result-heading');
const status = document.querySelector('#brief-status');
const download = document.querySelector('#download-brief');
const copyButton = document.querySelector('#copy-brief');

const form = document.createElement('form');
form.id = 'project-brief';
form.setAttribute('aria-labelledby', 'brief-heading');
// There is deliberately no real destination. The handler below always prevents
// navigation; about:blank adds a non-network fallback if another script breaks it.
form.action = 'about:blank';
form.method = 'post';
form.noValidate = true;

const textControls = [...fields.querySelectorAll('input[type="text"], textarea')];
const edited = new WeakSet();
let downloadURL;
let briefIsCurrent = false;
let announcementTimer;

const announce = (message) => {
  clearTimeout(announcementTimer);
  status.textContent = '';
  announcementTimer = setTimeout(() => { status.textContent = message; }, 100);
};

function errorFor(control) {
  if (control.required && !control.value.trim()) {
    return control.id === 'project'
      ? 'Enter a project name.'
      : 'Describe what people should be able to do.';
  }
  if (control.maxLength > 0 && control.value.length > control.maxLength) {
    return `Use ${control.maxLength.toLocaleString()} characters or fewer.`;
  }
  return '';
}

function showError(control, message) {
  let error = document.querySelector(`#${control.id}-error`);
  if (!error && message) {
    error = document.createElement('p');
    error.id = `${control.id}-error`;
    error.className = 'field-error';
    control.after(error);
  }
  if (error) {
    error.textContent = message;
    error.hidden = !message;
  }
  control.setAttribute('aria-invalid', String(Boolean(message)));
  const descriptions = (control.getAttribute('aria-describedby') || '')
    .split(/\s+/).filter((id) => id && id !== `${control.id}-error`);
  if (message) descriptions.push(`${control.id}-error`);
  if (descriptions.length) control.setAttribute('aria-describedby', descriptions.join(' '));
  else control.removeAttribute('aria-describedby');
}

function invalidatePreparedBrief() {
  if (!briefIsCurrent) return;
  briefIsCurrent = false;
  result.hidden = true;
  document.body.removeAttribute('data-brief-ready');
  download.removeAttribute('href');
  if (downloadURL) URL.revokeObjectURL(downloadURL);
  downloadURL = undefined;
  announce('Your answers changed. Prepare your brief again to include the changes.');
}

for (const control of textControls) {
  control.setAttribute('aria-invalid', 'false');
  control.addEventListener('input', () => {
    edited.add(control);
    // Clear an existing error once fixed; never add a new error mid-keystroke.
    if (control.getAttribute('aria-invalid') === 'true' && !errorFor(control)) {
      showError(control, '');
      clearTimeout(announcementTimer);
      status.textContent = '';
    }
    invalidatePreparedBrief();
  });
  control.addEventListener('blur', () => {
    if (!edited.has(control)) return;
    const message = errorFor(control);
    const wasInvalid = control.getAttribute('aria-invalid') === 'true';
    showError(control, message);
    if (message && !wasInvalid) {
      announce(`${control.labels[0].textContent}: ${message}`);
    }
  });
}
fields.addEventListener('change', invalidatePreparedBrief);

function prepareBrief() {
  const errors = [];
  for (const control of textControls) {
    const message = errorFor(control);
    showError(control, message);
    if (message) errors.push({ field: control.name, message, control });
  }
  if (errors.length) {
    clearTimeout(announcementTimer);
    status.textContent = '';
    // The field receives its linked error as the accessible description.
    errors[0].control.focus();
    return { ok: false, errors: errors.map(({ field, message }) => ({ field, message })) };
  }

  const data = new FormData(form);
  const value = (name) => String(data.get(name) || '').trim();
  const text = [
    'PROJECT BRIEF',
    '',
    `Project: ${value('project')}`,
    `Starting point: ${value('startingPoint') || 'Not specified'}`,
    '',
    'WHO IT IS FOR',
    value('audience') || 'Not specified',
    '',
    'WHAT PEOPLE SHOULD BE ABLE TO DO',
    value('goal'),
    '',
    'ADDITIONAL CONTEXT',
    value('context') || 'Not specified',
    '',
    'Prepared locally with the Accessible web design worksheet.',
    'Nothing has been sent. Review before sharing.'
  ].join('\n');

  output.value = text;
  printText.textContent = text;
  if (downloadURL) URL.revokeObjectURL(downloadURL);
  if (typeof URL.createObjectURL === 'function') {
    downloadURL = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    download.href = downloadURL;
    download.hidden = false;
  } else {
    // Readonly selectable text and browser Print remain available.
    download.hidden = true;
  }
  briefIsCurrent = true;
  document.body.dataset.briefReady = 'true';
  status.textContent = '';
  clearTimeout(announcementTimer);
  result.hidden = false;
  resultHeading.focus();
  return { ok: true, prepared: true, sent: false, brief: text };
}

// Install the no-navigation handler BEFORE the form is inserted or enabled.
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const prepared = prepareBrief();
  // Same validation, visible result, and no-send behavior for humans and agents.
  // Unsupported browsers ignore the annotations and use this ordinary form.
  if (event.agentInvoked && typeof event.respondWith === 'function') {
    event.respondWith(Promise.resolve(prepared));
  }
});
fields.before(form);
form.append(fields, actions);

const printText = document.createElement('div');
printText.className = 'print-brief';
printText.setAttribute('aria-hidden', 'true');
result.append(printText);

copyButton.addEventListener('click', async () => {
  if (!briefIsCurrent) return;
  if (!navigator.clipboard?.writeText) {
    output.focus();
    output.select();
    announce('Automatic copying is unavailable. The brief text is selected; use your device’s Copy command.');
    return;
  }
  try {
    await navigator.clipboard.writeText(output.value);
    announce('Brief copied. Nothing has been sent.');
  } catch {
    output.focus();
    output.select();
    announce('Clipboard access was not available. The brief text is selected; use your device’s Copy command.');
  }
});
download.addEventListener('click', () => {
  if (briefIsCurrent) announce('Download requested. Your browser handles the file. Nothing has been sent.');
});
document.querySelector('#edit-brief').addEventListener('click', () => {
  document.querySelector('#project').focus();
});

// Explicit experimental opt-in is scoped by this example's .mwgrc.
// Declarative WebMCP needs no polyfill: unknown attributes are inert in browsers
// without the experiment. No toolautosubmit: the visible native form pauses for
// the user's review. No duplicate imperative tool registration.
form.setAttribute('toolname', 'prepare-project-brief');
form.setAttribute('tooldescription', 'Prepare a local website project brief for the user to review. Does not contact anyone, submit a request, or send or persist data.');
document.querySelector('#goal').setAttribute('toolparamdescription', 'The main task people should be able to complete on the website, such as finding information or making a booking.');

baseline.textContent = 'Prepare a brief to review, copy, or download. You can also use your browser’s Print command. Nothing is sent or saved by this page.';
actions.hidden = false;
