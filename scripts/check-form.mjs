import assert from 'node:assert/strict';
import {
  buildHubSpotPayload,
  buildMailto,
  isHubSpotConfigured,
  validateConsultation,
} from '../src/lib/form.js';

const site = {
  url: 'https://privacyridge.com',
  email: 'info@privacyridge.com',
  hubspot: {
    portalId: '248037670',
    formGuid: '',
    fieldNames: {
      firstName: 'firstname',
      lastName: 'lastname',
      email: 'email',
      company: 'company',
      phone: 'phone',
      services: 'services',
      otherServices: 'other_services',
      message: 'message',
      consentContact: 'consent_to_contact',
      consentNoRelationship: 'consent_no_relationship',
      marketing: 'marketing_updates',
    },
  },
};

const valid = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.com',
  company: 'Analytical Engines',
  phone: '',
  services: ['Fractional privacy lead', 'AI governance'],
  otherServices: '',
  message: 'We need a privacy lead before our next enterprise deal.',
  consentContact: true,
  consentNoRelationship: true,
  marketing: false,
};

const good = validateConsultation(valid);
assert.equal(good.ok, true, 'valid submission should pass');

const missing = validateConsultation({ ...valid, email: 'not-an-email', services: [], consentContact: false });
assert.equal(missing.ok, false);
assert.ok(missing.errors.email);
assert.ok(missing.errors.services);
assert.ok(missing.errors.consentContact);

const shortPhone = validateConsultation({ ...valid, phone: '123' });
assert.ok(shortPhone.errors.phone);

assert.equal(isHubSpotConfigured(site.hubspot), false, 'empty GUID must use mailto');
assert.equal(isHubSpotConfigured({ ...site.hubspot, formGuid: 'not-a-guid' }), false);
assert.equal(
  isHubSpotConfigured({
    ...site.hubspot,
    formGuid: '11111111-2222-4333-8444-555555555555',
  }),
  true,
);

const payload = buildHubSpotPayload(good.value, site, {
  pageUri: 'https://privacyridge.com/contact',
  pageName: 'Contact',
});
const byName = Object.fromEntries(payload.fields.map((field) => [field.name, field.value]));
assert.equal(byName.firstname, 'Ada');
assert.equal(byName.email, 'ada@example.com');
assert.equal(byName.services, 'Fractional privacy lead;AI governance');
assert.equal(byName.consent_to_contact, 'true');
assert.equal(payload.fields.some((field) => field.name === 'phone'), false);

const mailto = buildMailto(good.value, site);
assert.ok(mailto.startsWith('mailto:info@privacyridge.com?'));
assert.ok(decodeURIComponent(mailto).includes('Analytical Engines'));
assert.ok(decodeURIComponent(mailto).includes('AI governance'));

console.log('form checks passed');
