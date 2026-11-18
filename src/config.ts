/**
 * Site settings that should be edited in one place.
 *
 * HubSpot: create a form in portal 248037670, paste its GUID into
 * `hubspot.formGuid`, and align the internal field names below with that
 * form. Leave `formGuid` empty and the consultation form falls back to
 * mailto:info@privacyridge.com so a request is never dropped.
 *
 * LinkedIn: paste a full https URL when a real profile exists. An empty
 * string hides the footer link (no placeholder icons).
 */
export const site = {
  name: 'Privacy Ridge',
  tagline: 'Fractional data protection',
  description:
    'Fractional data protection for small and mid-size U.S. companies. Senior help with state privacy laws, GDPR, and AI governance.',
  url: 'https://privacyridge.com',
  locale: 'en_US',
  email: 'info@privacyridge.com',
  phoneDisplay: '+1 (214) 377-4862',
  phoneTel: '+12143774862',
  location: 'Texas, United States',
  linkedinUrl: '',
  hubspot: {
    portalId: '248037670',
    formGuid: '',
    endpoint: 'https://api.hsforms.com/submissions/v3/integration/submit',
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
} as const;

export type SiteConfig = typeof site;
