/**
 * Site settings that should be edited in one place.
 *
 * HubSpot: the contact page embeds HubSpot legacy form `hubspot.formId` from
 * portal 248037670 (na2). Field names and the hidden privacy_ridge_lead flag
 * are managed in HubSpot. If the embed cannot load, the page points visitors
 * to info@privacyridge.com.
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
  linkedinUrl: 'https://www.linkedin.com/company/privacyridge/',
  /**
   * The consultation form is HubSpot's own embedded form (legacy editor),
   * rendered by HubSpot's hosted embed script. Custom API submissions were
   * accepted (HTTP 200) but never recorded, so the site no longer posts
   * to the Forms API itself. The hidden `privacy_ridge_lead` field defaults
   * to true inside the HubSpot form, which keeps Privacy Ridge leads separate
   * from The Goof Bar in the shared portal.
   */
  hubspot: {
    portalId: '248037670',
    formId: '592680f9-9fff-4bd5-b116-30d0da013e4a',
    region: 'na2',
    embedScript: 'https://js-na2.hsforms.net/forms/embed/v2.js',
    target: '#hs-form',
  },
} as const;

export type SiteConfig = typeof site;
