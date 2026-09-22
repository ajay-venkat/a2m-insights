export type BillingModel = 'milestone_40_60' | 'single_payment' | 'monthly_retainer' | 'free';
export type ServiceCategory = 'Web & App Development' | 'Data & AI' | 'Cloud & Security' | 'Student Projects' | 'Research Papers' | 'Marketing & Management';

export interface PackageTier {
  id: string;
  name: string;
  price: number;
  maxPrice?: number;
  description?: string;
}

export interface Package {
  id: string;
  category: ServiceCategory;
  billingModel: BillingModel;
  title: string;
  subtitle: string;
  description: string;
  iconName?: string;
  popular?: boolean;
  isCustom?: boolean;
  features: string[];
  tiers: PackageTier[];
}

export const packages: Package[] = [
  // --- WEB & APP DEVELOPMENT ---
  {
    id: 'web_app_dev',
    category: 'Web & App Development',
    billingModel: 'milestone_40_60',
    title: 'Web Application Development',
    subtitle: 'Responsive & scalable platforms',
    description: 'Custom-built web applications using modern stacks like React, Node.js, and databases for high performance.',
    iconName: 'LayoutTemplate',
    popular: true,
    features: [
      'Full-stack architecture',
      'Database modeling & API development',
      'High-performance & responsive UI',
      'Secure authentication',
      'SEO & analytics ready'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 25000, description: 'Core features, up to 5 main screens' },
      { id: 'standard', name: 'Professional', price: 45000, description: 'Advanced logic, admin dashboards' },
      { id: 'plus', name: 'Enterprise', price: 80000, description: 'Complex integrations, scalable architecture' }
    ]
  },
  {
    id: 'whatsapp_automation',
    category: 'Web & App Development',
    billingModel: 'milestone_40_60',
    title: 'WhatsApp Automation Site',
    subtitle: 'Direct-to-chat funnels',
    description: 'Engage customers instantly with pre-filled WhatsApp payloads and integrated CRM lead capture.',
    iconName: 'MessageSquareShare',
    features: [
      'Pre-filled WhatsApp payloads',
      'CRM lead capture integration',
      'Automated greeting templates',
      'Click-to-chat tracking'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 5000 },
      { id: 'standard', name: 'Professional', price: 9000 },
      { id: 'plus', name: 'Premium', price: 15000 }
    ]
  },
  {
    id: 'payment_portal',
    category: 'Web & App Development',
    billingModel: 'milestone_40_60',
    title: 'Payment Gateway Portal',
    subtitle: 'Collect fees seamlessly',
    description: 'Custom checkouts with integrated UPI, Cards, and automated tax invoices.',
    iconName: 'CreditCard',
    features: [
      'Razorpay/Cashfree/Stripe checkout',
      'UPI intent + dynamic QR',
      'Webhook listener with signature verification',
      'Automated tax invoice PDF'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 10000 },
      { id: 'standard', name: 'Professional', price: 18000 },
      { id: 'plus', name: 'Premium', price: 25000 }
    ]
  },
  {
    id: 'ecommerce',
    category: 'Web & App Development',
    billingModel: 'milestone_40_60',
    title: 'Full E-Commerce Webapp',
    subtitle: 'Scale your digital store',
    description: 'A complete end-to-end shopping experience with inventory management and cart logic.',
    iconName: 'ShoppingCart',
    features: [
      'Product catalog and search',
      'Shopping cart & wishlists',
      'Inventory management',
      'Order tracking & history'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 15000 },
      { id: 'standard', name: 'Professional', price: 30000 },
      { id: 'plus', name: 'Premium', price: 50000 }
    ]
  },
  {
    id: 'booking',
    category: 'Web & App Development',
    billingModel: 'milestone_40_60',
    title: 'Appointment & Slot Booking',
    subtitle: 'Automate your calendar',
    description: 'Perfect for consultants, clinics, and service providers who need reliable time-slot locking.',
    iconName: 'CalendarCheck',
    features: [
      'Time-slot locking with double-booking prevention',
      'Google Calendar sync',
      'Automated email/SMS reminders',
      'Advance payment collection'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 10000 },
      { id: 'standard', name: 'Professional', price: 18000 },
      { id: 'plus', name: 'Premium', price: 25000 }
    ]
  },
  {
    id: 'mobile_app_dev',
    category: 'Web & App Development',
    billingModel: 'milestone_40_60',
    title: 'Mobile App Development',
    subtitle: 'iOS & Android natively',
    description: 'Cross-platform or native mobile applications tailored for performance and user engagement.',
    iconName: 'PhoneCall',
    features: [
      'React Native / Flutter / Swift',
      'App Store & Play Store deployment',
      'Push notifications',
      'Offline capabilities',
      'Device hardware integration'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 35000, description: 'Basic UI/UX, cross-platform' },
      { id: 'standard', name: 'Professional', price: 65000, description: 'Advanced state, complex animations' },
      { id: 'plus', name: 'Enterprise', price: 120000, description: 'Native code, high-performance needs' }
    ]
  },
  {
    id: 'ui_ux_design',
    category: 'Web & App Development',
    billingModel: 'milestone_40_60',
    title: 'UI/UX Design',
    subtitle: 'Attractive & user-friendly',
    description: 'Wireframing, prototyping, and high-fidelity design systems for your digital products.',
    iconName: 'ImageIcon',
    features: [
      'Figma/Adobe XD prototypes',
      'User journey mapping',
      'Design system creation',
      'Responsive design guidelines',
      'Developer handoff'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 12000, description: 'Up to 10 screens' },
      { id: 'standard', name: 'Professional', price: 25000, description: 'Full app flow, interactive prototype' },
      { id: 'plus', name: 'Enterprise', price: 40000, description: 'Complete design system & branding' }
    ]
  },
  {
    id: 'software_testing',
    category: 'Web & App Development',
    billingModel: 'milestone_40_60',
    title: 'Software Testing & QA',
    subtitle: 'Performance & security checks',
    description: 'Comprehensive manual and automated testing to ensure your software is bug-free and reliable.',
    iconName: 'ShieldCheck',
    features: [
      'Automated E2E testing (Cypress/Selenium)',
      'API load testing',
      'Vulnerability scanning',
      'Cross-browser & device testing',
      'Detailed bug reports'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 8000, description: 'Manual QA + Basic checks' },
      { id: 'standard', name: 'Professional', price: 15000, description: 'Automated test suites' },
      { id: 'plus', name: 'Enterprise', price: 25000, description: 'Load testing & CI/CD integration' }
    ]
  },
  {
    id: 'software_maintenance',
    category: 'Web & App Development',
    billingModel: 'monthly_retainer',
    title: 'Software Maintenance & Support',
    subtitle: 'Ongoing technical support',
    description: 'Keep your software running smoothly with updates, bug fixes, and performance optimizations.',
    iconName: 'Server',
    features: [
      'SLA-backed bug fixes',
      'Server health monitoring',
      'Library & dependency updates',
      'Database backups',
      'Monthly optimization report'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 5000, description: 'Uptime monitoring & minor fixes' },
      { id: 'standard', name: 'Professional', price: 10000, description: 'Active feature updates & fast SLA' },
      { id: 'plus', name: 'Enterprise', price: 15000, description: '24/7 priority support' }
    ]
  },

  // --- DATA & AI ---
  {
    id: 'ai_ml_solutions',
    category: 'Data & AI',
    billingModel: 'milestone_40_60',
    title: 'AI & Machine Learning Solutions',
    subtitle: 'Intelligent automation & prediction',
    description: 'Leverage AI to automate workflows, build predictive models, and deploy intelligent agents.',
    iconName: 'Cpu',
    popular: true,
    features: [
      'Custom NLP & LLM integration',
      'Predictive analytics models',
      'Computer vision solutions',
      'Model training & fine-tuning',
      'API deployment for inference'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 45000, description: 'Pre-trained model API integrations' },
      { id: 'standard', name: 'Professional', price: 85000, description: 'Custom model training & deployment' },
      { id: 'plus', name: 'Enterprise', price: 150000, description: 'Large-scale architecture & MLOps' }
    ]
  },
  {
    id: 'data_analytics',
    category: 'Data & AI',
    billingModel: 'milestone_40_60',
    title: 'Data Analytics & Business Intelligence',
    subtitle: 'Insights & dashboards',
    description: 'Transform raw data into actionable business insights with custom reporting and dashboards.',
    iconName: 'AlignLeft',
    features: [
      'Interactive dashboards (PowerBI/Tableau/Custom)',
      'Data warehousing & ETL',
      'Real-time data streaming',
      'KPI tracking',
      'Automated reporting'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 25000, description: 'Basic data cleaning & 3 dashboards' },
      { id: 'standard', name: 'Professional', price: 45000, description: 'Automated ETL pipelines' },
      { id: 'plus', name: 'Enterprise', price: 80000, description: 'Real-time analytics architecture' }
    ]
  },
  {
    id: 'automation_solutions',
    category: 'Data & AI',
    billingModel: 'milestone_40_60',
    title: 'Automation Solutions',
    subtitle: 'Streamline repetitive tasks',
    description: 'Automate repetitive business processes to improve efficiency and reduce human error.',
    iconName: 'Zap',
    features: [
      'Zapier/Make/Custom integrations',
      'RPA (Robotic Process Automation)',
      'Data entry automation',
      'Email & CRM workflow automation',
      'Error monitoring'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 15000, description: 'Up to 5 automated workflows' },
      { id: 'standard', name: 'Professional', price: 30000, description: 'Complex conditional logic & custom scripts' },
      { id: 'plus', name: 'Enterprise', price: 50000, description: 'Full business process automation' }
    ]
  },

  // --- CLOUD & SECURITY ---
  {
    id: 'cloud_solutions',
    category: 'Cloud & Security',
    billingModel: 'milestone_40_60',
    title: 'Cloud Solutions',
    subtitle: 'Deployment & Migration',
    description: 'Secure, scalable cloud deployment, migration, storage, and application services (AWS/GCP/Azure).',
    iconName: 'Server',
    features: [
      'Serverless architecture setup',
      'Legacy to cloud migration',
      'Docker/Kubernetes containerization',
      'Load balancing & auto-scaling',
      'Cost optimization'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 25000, description: 'Basic VPS/Serverless setup' },
      { id: 'standard', name: 'Professional', price: 45000, description: 'Containerized architecture' },
      { id: 'plus', name: 'Enterprise', price: 70000, description: 'Multi-region HA deployments' }
    ]
  },
  {
    id: 'api_integration',
    category: 'Cloud & Security',
    billingModel: 'milestone_40_60',
    title: 'API & System Integration',
    subtitle: 'Connect your software',
    description: 'Securely connect different software, platforms, and third-party services.',
    iconName: 'Code',
    features: [
      'REST/GraphQL API development',
      'Legacy system bridging',
      'Third-party SDK integration',
      'Rate limiting & caching',
      'API documentation'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 15000, description: 'Simple third-party integrations' },
      { id: 'standard', name: 'Professional', price: 30000, description: 'Custom API development' },
      { id: 'plus', name: 'Enterprise', price: 50000, description: 'Microservices orchestration' }
    ]
  },
  {
    id: 'cybersecurity',
    category: 'Cloud & Security',
    billingModel: 'milestone_40_60',
    title: 'Cybersecurity Solutions',
    subtitle: 'Assess & protect',
    description: 'Application security, vulnerability assessment, and ongoing security monitoring.',
    iconName: 'ShieldCheck',
    features: [
      'Penetration testing',
      'OWASP Top 10 auditing',
      'Data encryption implementation',
      'WAF configuration',
      'Incident response planning'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 25000, description: 'Basic vulnerability scan' },
      { id: 'standard', name: 'Professional', price: 50000, description: 'Deep penetration testing & fixes' },
      { id: 'plus', name: 'Enterprise', price: 100000, description: 'Compliance auditing (HIPAA/PCI)' }
    ]
  },

  // --- STUDENT PROJECTS ---
  {
    id: 'final_year_project',
    category: 'Student Projects',
    billingModel: 'milestone_40_60',
    title: 'Final Year Project',
    subtitle: 'End-to-end guidance & dev',
    description: 'Comprehensive software or hardware project development for final year engineering students.',
    iconName: 'BookOpen',
    features: [
      'Original source code delivery',
      'Project report documentation',
      'Setup & deployment assistance',
      'Presentation/Viva preparation',
      'No plagiarism / non-resold code'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 6000, description: 'Basic CRUD / Management Systems' },
      { id: 'standard', name: 'Professional', price: 10000, description: 'Machine Learning / IoT Integrations' },
      { id: 'plus', name: 'Premium', price: 18000, description: 'Advanced AI/Blockchain/Cloud Projects' }
    ]
  },
  
  // --- RESEARCH PAPERS ---
  {
    id: 'research_submission',
    category: 'Research Papers',
    billingModel: 'single_payment',
    title: 'Journal/Conference Submission',
    subtitle: 'Navigate the portal',
    description: 'Guidance on selecting venues and successfully navigating submission portals.',
    iconName: 'Send',
    tiers: [
      { id: 'standard', name: 'Standard', price: 1000 }
    ],
    features: [
      'Submission portal guidance',
      'Cover letter drafting',
      'Venue selection advice'
    ]
  },
  
  // --- MARKETING & MANAGEMENT ---
  {
    id: 'marketing_social',
    category: 'Marketing & Management',
    billingModel: 'monthly_retainer',
    title: 'Social Media Management',
    subtitle: '1-2 platforms',
    description: 'Consistent, engaging content to grow your audience and brand presence.',
    iconName: 'Share2',
    tiers: [
      { id: 'standard', name: 'Standard', price: 2500 }
    ],
    features: [
      'Content calendar',
      'Post scheduling',
      'Monthly report'
    ]
  }
];

export const webAddOns = [
  { id: 'urgent_delivery', name: 'Urgent Delivery', price: 10000 },
  { id: 'extra_revisions', name: 'Extra Revisions', price: 5000 }
];

export const studentAddOns = [
  { id: 'extra_hardware', name: 'Extra Hardware Module', price: 3000 },
  { id: 'urgent_delivery', name: 'Urgent/Express Delivery', price: 5000 }
];
