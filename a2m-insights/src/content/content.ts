import { config } from '../config';
import edutechImg from '../assets/edutech.png';
import retailImg from '../assets/retail.png';
import clinicImg from '../assets/clinic.png';

export const content = {
  hero: {
    eyebrow: `${config.BRAND_NAME} • High-Performance Web, Custom Solutions & Free Discovery`,
    h1_start: 'Engineering Modern Web Platforms ',
    h1_highlight: 'Tailored to Your Exact Budget',
    subtitle: `From high-conversion landing pages to full-scale e-commerce, custom booking portals and bespoke engineering. We operate on a transparent ${config.ADVANCE_PERCENT}% advance milestone with a 100% free discovery call.`,
  },
  trustStrip: [
    { title: `${config.ADVANCE_PERCENT}% Advance`, description: 'Milestone-based, risk-free' },
    { title: 'Direct UPI Node', description: 'GPay, PhonePe, Paytm, BHIM' },
    { title: '4–25 Days', description: 'Guaranteed agile delivery' },
    { title: '100% Code IP', description: 'Full repo transfer & deployment' }
  ],
  projects: [
    {
      title: 'EduTech LMS Platform',
      sector: 'Education',
      city: 'Chennai',
      deliveryTime: '21 Days',
      outcomes: ['300% increase in student engagement', 'Integrated video streaming', 'Automated certification'],
      image: edutechImg
    },
    {
      title: 'Boutique E-Commerce',
      sector: 'Retail',
      city: 'Bengaluru',
      deliveryTime: '14 Days',
      outcomes: ['Sub-second page loads', 'Custom cart checkout', 'Razorpay split payments'],
      image: retailImg
    },
    {
      title: 'Clinic Appointment System',
      sector: 'Healthcare',
      city: 'Coimbatore',
      deliveryTime: '10 Days',
      outcomes: ['Zero double-bookings', 'WhatsApp patient reminders', 'Doctors dashboard'],
      image: clinicImg
    }
  ],
  testimonials: [
    {
      quote: "The transparency and speed were unmatched. They delivered exactly what they promised within the exact budget we agreed upon.",
      name: "Karthik R.",
      business: "KR Retail",
      city: "Chennai"
    },
    {
      quote: "Finally, an agency that understands business goals, not just code. The WhatsApp integration doubled our lead conversion overnight.",
      name: "Priya S.",
      business: "Consulting Co.",
      city: "Bengaluru"
    },
    {
      quote: "The 40/60 milestone approach gave us huge peace of mind. We always knew exactly where the project stood.",
      name: "Arun M.",
      business: "Tech Startup",
      city: "Hyderabad"
    }
  ],
  faqs: [
    { question: `What does the ${config.ADVANCE_PERCENT}% advance cover?`, answer: `The ${config.ADVANCE_PERCENT}% advance secures your project slot in our calendar, covers initial resource allocation, server setup, and the discovery/design phase.` },
    { question: `What if I'm not satisfied with the progress?`, answer: `Our milestone model protects you. If you are dissatisfied during development, you are not obligated to pay the final ${config.BALANCE_PERCENT}% balance. The project is terminated, though no code IP is transferred.` },
    { question: `Do I own the code?`, answer: `Yes. Upon payment of the final balance, 100% of the Intellectual Property and source code is transferred to you.` },
    { question: `How long does delivery take?`, answer: `Most standard web projects take 4 to 25 days depending on scope. Final year student projects can be delivered in 3-10 days depending on the tier.` },
    { question: `Do you provide hosting?`, answer: `We deploy your project to cloud providers (like Vercel, AWS, or GCP) under your own accounts, so you retain full control. We do not lock you into proprietary hosting.` },
    { question: `Is GST included?`, answer: `All prices shown are exclusive of 18% GST, which will be added at checkout if applicable.` },
    { question: `Can I pay in more than two milestones?`, answer: `For standard projects, we strictly follow the ${config.ADVANCE_PERCENT}/${config.BALANCE_PERCENT} model. For enterprise custom projects above ₹1,00,000, we can discuss a multi-phase milestone plan.` },
    { question: `Who do I talk to during the project?`, answer: `You will have direct WhatsApp access to Ajay (the Founder) and a dedicated technical lead for daily updates.` },
    { question: `Is my final year project original and not resold?`, answer: `Absolutely. We build one project for one student/team. We strictly do not deliver the same project to multiple colleges.` },
    { question: `Do you help with viva/demo preparation?`, answer: `Yes, all our student project packages include a PPT, a project report, and guidance to help you confidently present your work during the viva.` },
    { question: `Will the research paper writing count as academic misconduct?`, answer: `No. We strictly assist in structuring, formatting, and polishing papers based on your own original research and data. We do not fabricate research findings, ghostwrite original research, or do contract cheating for graded individual assessments.` },
    { question: `How does monthly retainer billing work?`, answer: `Monthly retainers (like Social Media Management) require the first month's payment upfront. You will be automatically billed on the same date each month. You can cancel at any time via your confirmation email or WhatsApp with no cancellation fees.` }
  ],
  footer: {
    address: config.CITY_REGION,
    contact: `Phone: ${config.PHONE_WHATSAPP} | Email: ${config.EMAIL}`
  }
};
