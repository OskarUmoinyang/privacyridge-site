const GUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @param {unknown} value
 */
function text(value) {
  return String(value ?? '').trim();
}

/**
 * @param {import('../config').SiteConfig['hubspot']} hubspot
 */
export function isHubSpotConfigured(hubspot) {
  return GUID_RE.test(text(hubspot?.formGuid)) && text(hubspot?.portalId).length > 0;
}

/**
 * True only for a genuine, readable 2xx response from the HubSpot submit API.
 * An opaque (no-cors) or failed response is never treated as delivered.
 * @param {{ ok?: boolean; status?: number; type?: string } | null | undefined} response
 */
export function isHubSpotSuccess(response) {
  if (!response || response.type === 'opaque' || response.type === 'error') return false;
  const status = Number(response.status);
  return response.ok === true && status >= 200 && status < 300;
}

/**
 * @param {{
 *   firstName?: string;
 *   lastName?: string;
 *   email?: string;
 *   company?: string;
 *   phone?: string;
 *   services?: string[];
 *   otherServices?: string;
 *   message?: string;
 *   consentContact?: boolean;
 *   consentNoRelationship?: boolean;
 *   marketing?: boolean;
 * }} input
 */
export function validateConsultation(input) {
  /** @type {Record<string, string>} */
  const errors = {};
  const value = {
    firstName: text(input.firstName),
    lastName: text(input.lastName),
    email: text(input.email),
    company: text(input.company),
    phone: text(input.phone),
    services: Array.isArray(input.services) ? input.services.map(text).filter(Boolean) : [],
    otherServices: text(input.otherServices),
    message: text(input.message),
    consentContact: Boolean(input.consentContact),
    consentNoRelationship: Boolean(input.consentNoRelationship),
    marketing: Boolean(input.marketing),
  };

  if (!value.firstName) errors.firstName = 'Enter your first name.';
  if (!value.lastName) errors.lastName = 'Enter your last name.';
  if (!value.email) errors.email = 'Enter your email address.';
  else if (!EMAIL_RE.test(value.email) || value.email.length > 200) {
    errors.email = 'Enter a valid email address.';
  }
  if (!value.company) errors.company = 'Enter your company name.';
  if (value.phone && value.phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'Enter a phone number we can use, or leave this blank.';
  }
  if (value.services.length === 0) errors.services = 'Select at least one service.';
  if (!value.message) errors.message = 'Tell us briefly what you want to discuss.';
  else if (value.message.length > 5000) errors.message = 'Please shorten this to 5,000 characters.';
  if (value.otherServices.length > 2000) {
    errors.otherServices = 'Please shorten this to 2,000 characters.';
  }
  if (!value.consentContact) errors.consentContact = 'This consent is required so we can reply.';
  if (!value.consentNoRelationship) {
    errors.consentNoRelationship = 'Please confirm you understand this does not create an engagement.';
  }

  return { ok: Object.keys(errors).length === 0, errors, value };
}

/**
 * @param {ReturnType<typeof validateConsultation>['value']} value
 * @param {import('../config').SiteConfig} config
 * @param {{ pageUri?: string; pageName?: string }} context
 */
export function buildHubSpotPayload(value, config, context) {
  const names = config.hubspot.fieldNames;
  /** @type {{ name: string; value: string }[]} */
  const fields = [
    { name: names.firstName, value: value.firstName },
    { name: names.lastName, value: value.lastName },
    { name: names.email, value: value.email },
    { name: names.company, value: value.company },
    { name: names.services, value: value.services.join(';') },
    { name: names.message, value: value.message },
    { name: names.consentContact, value: 'true' },
    { name: names.consentNoRelationship, value: 'true' },
    { name: names.marketing, value: value.marketing ? 'true' : 'false' },
  ];
  if (value.phone) fields.push({ name: names.phone, value: value.phone });
  if (value.otherServices) fields.push({ name: names.otherServices, value: value.otherServices });

  // Fixed hidden fields (e.g. privacy_ridge_lead=true) that tag every
  // submission with its business line. See `hubspot.hiddenFields` in config.
  /** @type {Record<string, string | boolean | number>} */
  const hiddenFields = /** @type {any} */ (config.hubspot).hiddenFields ?? {};
  for (const [name, fixed] of Object.entries(hiddenFields)) {
    if (name) fields.push({ name, value: String(fixed) });
  }

  return {
    fields,
    context: {
      pageUri: context.pageUri || config.url + '/contact',
      pageName: context.pageName || 'Book a consultation',
    },
  };
}

/**
 * @param {ReturnType<typeof validateConsultation>['value']} value
 * @param {import('../config').SiteConfig} config
 */
export function buildMailto(value, config) {
  const lines = [
    `First name: ${value.firstName}`,
    `Last name: ${value.lastName}`,
    `Email: ${value.email}`,
    `Company: ${value.company}`,
    `Phone: ${value.phone || '(not provided)'}`,
    `Services: ${value.services.join(', ')}`,
    `Other: ${value.otherServices || '(none)'}`,
    `Marketing updates: ${value.marketing ? 'yes' : 'no'}`,
    '',
    value.message,
  ];
  const subject = encodeURIComponent('Consultation request — Privacy Ridge');
  const body = encodeURIComponent(lines.join('\n'));
  return `mailto:${config.email}?subject=${subject}&body=${body}`;
}

/**
 * @param {ReturnType<typeof validateConsultation>['value']} value
 */
export function submissionSummary(value) {
  return [
    ['Name', `${value.firstName} ${value.lastName}`],
    ['Email', value.email],
    ['Company', value.company],
    ['Phone', value.phone || '—'],
    ['Services', value.services.join(', ')],
    ['Other', value.otherServices || '—'],
    ['Message', value.message],
    ['Marketing updates', value.marketing ? 'Yes' : 'No'],
  ];
}
