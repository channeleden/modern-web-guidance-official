// Optional teaching layer. No network, persistence, field values or user IDs.
// Kept separate from app.js so an inspector failure cannot break the worksheet.
const sections = [...document.querySelectorAll('[data-section]')];
const controls = document.querySelector('#inspector-controls');
const boxToggle = document.querySelector('#inspection-toggle');
const pauseToggle = document.querySelector('#telemetry-pause');
const stateText = document.querySelector('#telemetry-state');
const viewportText = document.querySelector('#viewport-section');
const focusText = document.querySelector('#focused-section');
const motionText = document.querySelector('#motion-preference');
const eventList = document.querySelector('#event-list');
const motionQuery = typeof matchMedia === 'function'
  ? matchMedia('(prefers-reduced-motion: reduce)') : null;
const samples = new Map(sections.map((section) => [section, {
  inside: null, ratio: null, width: null, height: null
}]));
const events = [];
const startedAt = performance.now();
let paused = Boolean(motionQuery?.matches);
let observer;
let focusedSection = null;
let focusSampled = false;
const observerAvailable = typeof IntersectionObserver === 'function';

function running() {
  return !paused && document.visibilityState !== 'hidden';
}

function addEvent(message) {
  events.unshift({ seconds: (performance.now() - startedAt) / 1000, message });
  events.splice(16);
  const items = events.map((event) => {
    const item = document.createElement('li');
    item.textContent = `${event.seconds.toFixed(1)}s · ${event.message}`;
    return item;
  });
  // This passive list is intentionally not a live region.
  eventList.replaceChildren(...items);
}

function renderSection(section) {
  const sample = samples.get(section);
  const intersection = sample.ratio === null ? (observerAvailable
    ? 'Viewport awaiting sample' : 'Viewport API unavailable')
    : `Viewport ${Math.round(sample.ratio * 100)}%`;
  const bounds = sample.width === null ? ''
    : ` · ${sample.width} × ${sample.height} CSS px`;
  const focus = focusedSection === section ? ' · DOM focus inside' : '';
  section.querySelector('[data-section-status]').textContent = intersection + bounds + focus;
  section.dataset.inViewport = String(sample.inside === true);
  section.dataset.domFocus = String(focusedSection === section);
}

function sampleFocus() {
  if (!running()) return;
  const active = document.activeElement;
  const next = active instanceof Element ? active.closest('[data-section]') : null;
  if (!focusSampled || next !== focusedSection) {
    const previous = focusedSection;
    if (focusSampled && previous) addEvent(`DOM focus left ${previous.dataset.section}`);
    if (next) addEvent(`DOM focus ${focusSampled ? 'entered' : 'observed in'} ${next.dataset.section}`);
    focusedSection = next;
    focusSampled = true;
    focusText.textContent = next ? next.dataset.section : 'Outside showcase sections';
    if (previous) renderSection(previous);
    if (next) renderSection(next);
  }
}

function renderViewport() {
  const visible = [...samples.entries()].filter(([, sample]) => sample.inside && sample.ratio > 0);
  visible.sort((a, b) => b[1].ratio - a[1].ratio);
  const largest = visible[0];
  viewportText.textContent = largest
    ? `${largest[0].dataset.section} · ${Math.round(largest[1].ratio * 100)}%`
    : 'No sampled section in viewport';
}

function startObservation() {
  observer?.disconnect();
  if (!observerAvailable) {
    viewportText.textContent = 'Intersection Observer unavailable';
    sections.forEach(renderSection);
    return;
  }
  for (const sample of samples.values()) {
    sample.inside = null;
    sample.ratio = null;
    sample.width = null;
    sample.height = null;
  }
  sections.forEach(renderSection);
  viewportText.textContent = 'Awaiting fresh viewport sample';
  observer = new IntersectionObserver((entries) => {
    if (!running()) return;
    for (const entry of entries) {
      const section = entry.target;
      const sample = samples.get(section);
      const inside = entry.isIntersecting && entry.intersectionRatio > 0;
      if (sample.inside === null && inside) addEvent(`Viewport observed ${section.dataset.section}`);
      else if (sample.inside !== null && inside !== sample.inside) {
        addEvent(`Viewport ${inside ? 'entered' : 'left'} ${section.dataset.section}`);
      }
      sample.inside = inside;
      sample.ratio = entry.intersectionRatio;
      sample.width = Math.round(entry.boundingClientRect.width);
      sample.height = Math.round(entry.boundingClientRect.height);
      renderSection(section);
    }
    renderViewport();
  }, { threshold: [0, .01, .05, .1, .25, .5, .75, 1] });
  sections.forEach((section) => observer.observe(section));
}

function refreshActivity() {
  observer?.disconnect();
  pauseToggle.setAttribute('aria-pressed', String(paused));
  if (!running()) {
    stateText.textContent = paused
      ? 'Telemetry paused. Displayed values are frozen snapshots; no section events are being collected.'
      : 'This tab is hidden. Observation is suspended; displayed values are previous snapshots.';
    return;
  }
  stateText.textContent = 'Local telemetry running. Viewport values are threshold samples, not continuous measurements. No data leaves this tab.';
  focusSampled = false;
  sampleFocus();
  startObservation();
}

boxToggle.addEventListener('click', () => {
  const on = boxToggle.getAttribute('aria-pressed') !== 'true';
  boxToggle.setAttribute('aria-pressed', String(on));
  document.body.dataset.inspect = String(on);
});
pauseToggle.addEventListener('click', () => {
  paused = !paused;
  refreshActivity();
});
document.querySelector('#clear-events').addEventListener('click', () => {
  events.length = 0;
  const empty = document.createElement('li');
  empty.textContent = 'History cleared. No events recorded since clear.';
  eventList.replaceChildren(empty);
});
document.addEventListener('focusin', sampleFocus);
document.addEventListener('focusout', () => queueMicrotask(sampleFocus));
document.addEventListener('visibilitychange', refreshActivity);

function renderMotionPreference() {
  motionText.textContent = motionQuery
    ? (motionQuery.matches ? 'Reduced motion requested' : 'No reduced-motion preference')
    : 'Preference API unavailable; CSS still applies';
}
renderMotionPreference();
if (typeof motionQuery?.addEventListener === 'function') {
  motionQuery.addEventListener('change', () => {
    renderMotionPreference();
    // Turning reduced motion on also pauses the passive stream. Turning it off
    // never silently overrides the person's paused state.
    if (motionQuery.matches) {
      paused = true;
      refreshActivity();
    }
  });
}

const scale = document.querySelector('#type-scale');
scale.addEventListener('input', () => {
  const value = Math.min(1.6, Math.max(1, Number(scale.value) || 1));
  document.querySelector('#type-specimen').style.setProperty('--type-scale', value);
  document.querySelector('#type-scale-value').textContent = `${value.toFixed(1)}×`;
});
document.querySelector('#type-controls').hidden = false;
const motionToggle = document.querySelector('#motion-toggle');
motionToggle.addEventListener('click', () => {
  const shifted = motionToggle.getAttribute('aria-pressed') !== 'true';
  motionToggle.setAttribute('aria-pressed', String(shifted));
  document.querySelector('#motion-composition').classList.toggle('is-shifted', shifted);
});
motionToggle.hidden = false;
controls.hidden = false;
refreshActivity();
