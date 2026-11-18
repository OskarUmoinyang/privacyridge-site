// Checks the HubSpot embedded consultation form wiring (no network calls).
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const { site } = await import('../src/config.ts');
const hs = site.hubspot;

const GUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

assert.equal(hs.portalId, '248037670', 'Privacy Ridge HubSpot portal');
assert.equal(hs.formId, '592680f9-9fff-4bd5-b116-30d0da013e4a', 'legacy consultation form');
assert.match(hs.formId, GUID_RE, 'formId must be a GUID');
assert.equal(hs.region, 'na2', 'portal lives in the na2 data center');
assert.equal(
  hs.embedScript,
  `https://js-${hs.region}.hsforms.net/forms/embed/v2.js`,
  'embed script host must match the region (HubSpot-hosted, not self-hosted)',
);
assert.match(hs.target, /^#[A-Za-z][\w-]*$/, 'target must be an id selector');
assert.ok(!('endpoint' in hs) && !('formGuid' in hs), 'custom Forms API submit is retired');
assert.ok(site.email.includes('@'), 'fallback email must be set');

const component = readFileSync(new URL('../src/components/ContactForm.astro', import.meta.url), 'utf8');
assert.ok(component.includes('src={embedScript}'), 'component loads the configured embed script');
assert.ok(component.includes('hbspt.forms.create'), 'component creates the HubSpot form');
for (const key of ['region', 'portalId', 'formId', 'target']) {
  assert.ok(new RegExp(`${key}: ${key}`).test(component), `create() passes ${key}`);
}
assert.ok(component.includes('<noscript>'), 'noscript note present');
assert.ok(component.includes('Prefer email?'), 'visible email fallback present');
assert.ok(!/fetch\(|hsforms\.com\/submissions/.test(component), 'no custom submit fetch');
assert.equal(component.match(/id=\{targetId\}/g)?.length, 1, 'exactly one embed target');

console.log('form checks passed');
