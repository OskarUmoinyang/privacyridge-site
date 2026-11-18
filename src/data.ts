export type Service = {
  slug: string;
  name: string;
  summary: string;
  body: string;
};

export const services: Service[] = [
  {
    slug: 'fractional-lead',
    name: 'Fractional privacy lead',
    summary: 'Ongoing senior ownership of the privacy program, on a cadence a smaller company can sustain.',
    body: 'A named person who owns the program: the calendar, the vendor questions, the policy updates, and the judgment calls that should not sit in a shared inbox. The scope is agreed up front and can grow or shrink with the year.',
  },
  {
    slug: 'us-state-privacy',
    name: 'U.S. state privacy compliance',
    summary: 'Which state laws apply to a company your size, and what to do about them first.',
    body: 'CCPA and CPRA are the start of the map, not the whole of it. We sort which comprehensive state laws reach the way you sell and operate, what they require at your scale, and which gaps are worth closing now.',
  },
  {
    slug: 'gdpr',
    name: 'GDPR and international programs',
    summary: 'A workable program when customers, staff, or vendors sit in the EU or the UK.',
    body: 'Roles, records, transfer terms, and notices for teams that move personal data across borders. The aim is a program that matches the data you actually send, not a policy written for a company you are not.',
  },
  {
    slug: 'ai-governance',
    name: 'AI governance',
    summary: 'Rules for the AI tools already in use, and a review path before the next one is switched on.',
    body: 'An inventory of where AI shows up in the product and the back office, acceptable-use rules staff can follow, and a light review before a new tool becomes the system of record. Where the EU AI Act or U.S. rules on automated decisions reach you, the work is scoped to that exposure.',
  },
  {
    slug: 'assessments',
    name: 'Privacy assessments',
    summary: 'DPIAs and shorter risk reviews before a launch, a new data use, or a sensitive vendor.',
    body: 'A data protection impact assessment when the law or the risk calls for one, and a shorter written review when a full assessment would be theater. You get a decision, the reasons, and the mitigations worth doing.',
  },
  {
    slug: 'data-mapping',
    name: 'Data mapping',
    summary: 'What you collect, why you have it, who receives it, and where it lives.',
    body: 'A record of processing an engineer and a founder can both use. It becomes the source for notices, vendor reviews, and answers when a customer or a regulator asks what you hold.',
  },
  {
    slug: 'notices',
    name: 'Notices, policies, and consent',
    summary: 'External notices and internal policies that describe the company you actually run.',
    body: 'Privacy notices, employee notices, and consent language drafted against your real data flows. Internal policies are short enough that the people who must follow them will read them.',
  },
  {
    slug: 'vendors',
    name: 'Vendor and contract review',
    summary: 'Data-processing terms and a diligence habit your team can repeat.',
    body: 'Review of data processing agreements, transfer clauses, and the odd vendor questionnaire. We also leave a short checklist so the next tool does not restart the process from zero.',
  },
  {
    slug: 'rights-requests',
    name: 'Individual rights requests',
    summary: 'A path for access, deletion, and correction that a small team can run on time.',
    body: 'Who receives a request, how identity is checked, where to look, and how the answer goes out. Built for the volume a growing company actually sees, with a way to escalate the unusual one.',
  },
  {
    slug: 'workforce',
    name: 'Workforce privacy and training',
    summary: 'Employee and applicant data, plus training people can use on Monday.',
    body: 'Notices and practices for staff and recruiting data, and short training aimed at the decisions your team actually makes: what to collect, what not to put in a tool, and when to ask for help.',
  },
  {
    slug: 'incidents',
    name: 'Incident readiness',
    summary: 'Who to call, what to preserve, and how to decide on notification — written before you need it.',
    body: 'A breach playbook sized for your team: roles, outside contacts, preservation, and the questions that determine whether individuals or regulators must be told. The point is to decide the shape of the response while everyone is calm.',
  },
  {
    slug: 'roadmap',
    name: 'Program roadmap',
    summary: 'A gap assessment and a sequenced plan for the next two quarters.',
    body: 'What the laws that apply to you expect, where you are short, and the order to close the gaps. You leave with a plan a leadership team can fund, not a catalog of everything a global bank would do.',
  },
];

export const steps = [
  {
    n: '01',
    title: 'Orient',
    text: 'A working session on the business: what you sell, whose data you hold, which tools touch it, and what prompted the call.',
  },
  {
    n: '02',
    title: 'Assess',
    text: 'We name the laws that actually apply and rank the gaps by the risk they create for this company, not by a generic checklist.',
  },
  {
    n: '03',
    title: 'Build',
    text: 'Notices, records, vendor terms, and workflows your staff will use. Fewer documents, written against how you operate.',
  },
  {
    n: '04',
    title: 'Stay',
    text: 'A fractional rhythm so the program does not stall after the first delivery — or a clean handoff, if that is the engagement you wanted.',
  },
];

export const audiences = [
  {
    title: 'Software and technology companies',
    text: 'Selling to customers who now ask for privacy answers, a DPA, or proof of a program you do not yet have on paper.',
  },
  {
    title: 'Consumer brands',
    text: 'Crossing state-law thresholds, running loyalty or advertising data, or collecting more than the original notice describes.',
  },
  {
    title: 'Professional and care-adjacent firms',
    text: 'Handling client, patient-adjacent, or employee data with a small staff and no one whose job is privacy.',
  },
  {
    title: 'Teams shipping AI',
    text: 'Features or internal tools already in use, and no owner for what data they see or what the acceptable use is.',
  },
];

export const reasons = [
  {
    title: 'Senior attention',
    text: 'The person on the call does the work. There is no junior bench between you and the judgment.',
  },
  {
    title: 'Sized for a growing company',
    text: 'Scope and cost meant for a business that needs a privacy lead and cannot justify a full-time executive.',
  },
  {
    title: 'Privacy and AI in one program',
    text: 'State laws, GDPR, and the AI tools in the stack are handled together, because that is how the risk actually shows up.',
  },
  {
    title: 'Artifacts people use',
    text: 'Records, notices, and playbooks written in plain language. The measure is whether your team can run them next quarter.',
  },
];

export const faqs = [
  {
    q: 'Do privacy laws apply to a smaller company?',
    a: 'Often, yes. Many U.S. state laws turn on revenue, how much data you hold, or the kind of data — not on whether you have a legal department. Selling to consumers, running a SaaS product, or employing people across states is usually enough to deserve a proper look rather than a guess.',
  },
  {
    q: 'What does fractional data protection mean?',
    a: 'You get a senior privacy lead for an agreed scope or cadence, instead of hiring a full-time data protection officer. We stay close enough to own the work, and light enough that a smaller company can keep it going.',
  },
  {
    q: 'Is a consultation legal advice?',
    a: 'No. Privacy Ridge provides privacy consulting and governance support. Using this site, or sending the consultation form, does not create an attorney-client relationship or a consulting engagement. That starts only when both sides sign an engagement letter.',
  },
  {
    q: 'Do you work only in Texas?',
    a: 'We are based in Texas and work with companies across the United States, including those with EU or UK exposure. If a question needs local counsel or a formal legal opinion, we say so and coordinate with the lawyers you already use.',
  },
  {
    q: 'What happens on the first call?',
    a: 'We ask what you collect, who you sell to, and what prompted the conversation. You should leave knowing whether the laws you are worried about apply, and what a sensible first month would cover. There is no slide deck to sit through.',
  },
  {
    q: 'Can you work alongside outside counsel?',
    a: 'Yes. We often handle the operational program — records, notices, vendors, assessments, training — and loop in counsel when something is a legal opinion rather than a design choice.',
  },
  {
    q: 'How do we start?',
    a: 'Book a consultation. Tell us the company, which services you want to discuss, and what is pressing. We reply by email to set a time.',
  },
];
