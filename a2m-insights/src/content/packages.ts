export type BillingModel = 'milestone_40_60' | 'single_payment' | 'monthly_retainer' | 'free' | 'mixed_bundle';
export type ServiceCategory = 'Web & App Development' | 'Data & AI' | 'Cloud & Security' | 'Student Projects' | 'Research Papers' | 'Marketing & Management' | 'Combo Deals';

export interface PackageTier {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  maxPrice?: number;
  description?: string;
}

export interface BundleItem {
  packageId: string;
  tierId: string;
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
  bundleConfig?: {
    items: BundleItem[];
    discountPercent: number;
  };
}

const basePackages: Package[] = [
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
      { id: 'basic', name: 'Landing Page / Starter', price: 15000, description: 'Core features, up to 5 main screens' },
      { id: 'standard', name: 'Professional', price: 45000, description: 'Advanced logic, admin dashboards' },
      { id: 'plus', name: 'Enterprise', price: 80000, description: 'Complex integrations, scalable architecture' }
    ]
  },
  {
    id: 'mobile_app_dev',
    category: 'Web & App Development',
    billingModel: 'milestone_40_60',
    title: 'Mobile App Development',
    subtitle: 'iOS & Android natively',
    description: 'Cross-platform mobile applications tailored for performance and user engagement using React Native.',
    iconName: 'PhoneCall',
    features: [
      'React Native (iOS & Android)',
      'Native app store deployment guidance',
      'Push notifications',
      'Offline capabilities',
      'Device hardware integration'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 35000, description: 'Basic UI/UX, cross-platform' },
      { id: 'standard', name: 'Professional', price: 60000, description: 'Advanced state, complex animations' },
      { id: 'plus', name: 'Enterprise', price: 90000, description: 'Native code bridging, high-performance' }
    ]
  },
  {
    id: 'ui_ux_design',
    category: 'Web & App Development',
    billingModel: 'milestone_40_60',
    title: 'UI/UX Design',
    subtitle: 'Figma to dev-ready',
    description: 'Wireframing, prototyping, and high-fidelity design systems for your digital products.',
    iconName: 'ImageIcon',
    features: [
      'Figma/Adobe XD prototypes',
      'User journey mapping',
      'Design system creation',
      'Responsive design guidelines',
      'Developer handoff ready'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 8000, description: 'Up to 10 screens' },
      { id: 'standard', name: 'Professional', price: 15000, description: 'Full app flow, interactive prototype' },
      { id: 'plus', name: 'Enterprise', price: 25000, description: 'Complete design system & branding' }
    ]
  },
  {
    id: 'chatbot_ai',
    category: 'Web & App Development',
    billingModel: 'milestone_40_60',
    title: 'Chatbot & AI Integration',
    subtitle: 'WhatsApp or Web Widget',
    description: 'Engage customers instantly with smart AI agents trained on your business data.',
    iconName: 'MessageSquareShare',
    features: [
      'AI chatbot intent training',
      'WhatsApp or Web widget integration',
      'Lead capture automation',
      'Handover to human agent',
      'Conversation analytics'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 12000 },
      { id: 'standard', name: 'Professional', price: 22000 },
      { id: 'plus', name: 'Premium', price: 35000 }
    ]
  },
  {
    id: 'business_dashboard',
    category: 'Web & App Development',
    billingModel: 'milestone_40_60',
    title: 'Business Dashboard',
    subtitle: 'Internal tools & ops',
    description: 'Custom internal tools like CRM-lite, inventory management, and operational tracking.',
    iconName: 'AlignLeft',
    features: [
      'Admin dashboard with role-based access',
      'Inventory / Ops tracking',
      'Custom data visualization',
      'Export to CSV / PDF',
      'Secure internal APIs'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 20000 },
      { id: 'standard', name: 'Professional', price: 40000 },
      { id: 'plus', name: 'Premium', price: 70000 }
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
    id: 'cloud_setup',
    category: 'Cloud & Security',
    billingModel: 'milestone_40_60',
    title: 'Cloud Setup & DevOps',
    subtitle: 'Hosting, CI/CD, Backups',
    description: 'Secure, scalable cloud deployment, pipeline automation, and server maintenance.',
    iconName: 'Server',
    features: [
      'Cloud hosting configuration',
      'CI/CD pipeline setup',
      'Automated backups',
      'Uptime monitoring',
      'SSL & DNS management'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 6000 },
      { id: 'standard', name: 'Professional', price: 12000 },
      { id: 'plus', name: 'Enterprise', price: 20000 }
    ]
  },
  {
    id: 'software_maintenance',
    category: 'Web & App Development',
    billingModel: 'monthly_retainer',
    title: 'Website Maintenance / AMC',
    subtitle: 'Ongoing technical support',
    description: 'Keep your software running smoothly with updates, bug fixes, and performance optimizations.',
    iconName: 'ShieldCheck',
    features: [
      'SLA-backed bug fixes',
      'Server health monitoring',
      'Library & dependency updates',
      'Database backups',
      'Monthly optimization report'
    ],
    tiers: [
      { id: 'basic', name: 'Starter', price: 1500 },
      { id: 'standard', name: 'Professional', price: 3000 },
      { id: 'plus', name: 'Enterprise', price: 5000 }
    ]
  },
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
      { id: 'basic', name: 'Starter', price: 6000 },
      { id: 'standard', name: 'Professional', price: 10000 },
      { id: 'plus', name: 'Premium', price: 18000 }
    ]
  },
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
  {
    id: 'marketing_social',
    category: 'Marketing & Management',
    billingModel: 'monthly_retainer',
    title: 'Social Media Management',
    subtitle: 'Grow your audience',
    description: 'Consistent, engaging content to grow your audience and brand presence.',
    iconName: 'Share2',
    tiers: [
      { id: 'standard', name: 'Standard', price: 4000 }
    ],
    features: [
      'Content calendar',
      'Post scheduling',
      'Monthly report'
    ]
  }
];

const comboDefinitions = [
  {
    id: 'combo_web_mobile',
    title: 'Website + Mobile App',
    subtitle: 'The full platform',
    description: 'Launch your business across all devices simultaneously.',
    iconName: 'LayoutTemplate',
    bundleConfig: {
      items: [
        { packageId: 'web_app_dev', tierId: 'basic' },
        { packageId: 'mobile_app_dev', tierId: 'standard' }
      ],
      discountPercent: 13.3 // Roughly hits 65k from 75k
    },
    features: ['Responsive Landing Page', 'React Native App', 'Unified Backend Database']
  },
  {
    id: 'combo_ecom_mobile',
    title: 'E-Commerce + Mobile App',
    subtitle: 'Scale your store',
    description: 'A complete end-to-end shopping experience on web and native mobile.',
    iconName: 'ShoppingCart',
    bundleConfig: {
      items: [
        { packageId: 'ecommerce', tierId: 'standard' },
        { packageId: 'mobile_app_dev', tierId: 'plus' }
      ],
      discountPercent: 11.5 // Targets ~115k from 120k (30k+90k=120k)
    },
    features: ['Full E-Commerce Webapp', 'Native Mobile App (Plus)', 'Shared Inventory Manager']
  },
  {
    id: 'combo_web_social',
    title: 'Website + Social Media',
    subtitle: 'Build & Grow',
    description: 'Get your site built and start growing your audience immediately.',
    iconName: 'Share2',
    bundleConfig: {
      items: [
        { packageId: 'web_app_dev', tierId: 'basic' },
        { packageId: 'marketing_social', tierId: 'standard' }
      ],
      discountPercent: 0 // We handle the mixed logic differently, just add them up.
    },
    features: ['Landing Page (Starter)', 'Social Media Management', 'Priority Support']
  },
  {
    id: 'combo_digital_launch',
    title: 'Full Digital Launch',
    subtitle: 'Everything you need',
    description: 'Website, Ad Creatives, and Social Media Management to launch with a bang.',
    iconName: 'Zap',
    bundleConfig: {
      items: [
        { packageId: 'web_app_dev', tierId: 'standard' },
        { packageId: 'marketing_social', tierId: 'standard' }
      ],
      discountPercent: 20
    },
    features: ['Professional Website', 'AI Ad Creatives', 'Social Media Management']
  },
  {
    id: 'combo_student_research',
    title: 'Student Project + Research Paper',
    subtitle: 'Graduate with honors',
    description: 'Complete project development plus IEEE paper writing guidance.',
    iconName: 'BookOpen',
    bundleConfig: {
      items: [
        { packageId: 'final_year_project', tierId: 'standard' },
        { packageId: 'research_submission', tierId: 'standard' }
      ],
      discountPercent: 10
    },
    features: ['Final Year Project (Standard)', 'IEEE Paper Writing', 'Plagiarism Report']
  }
];

// Helper to generate dynamic packages
function buildComboPackages(bases: Package[]): Package[] {
  return comboDefinitions.map(combo => {
    let originalTotal = 0;
    let hasRetainer = false;
    let hasMilestone = false;

    combo.bundleConfig.items.forEach(item => {
      const basePkg = bases.find(p => p.id === item.packageId);
      if (basePkg) {
        const tier = basePkg.tiers.find(t => t.id === item.tierId);
        if (tier) originalTotal += tier.price;
        if (basePkg.billingModel === 'monthly_retainer') hasRetainer = true;
        if (basePkg.billingModel === 'milestone_40_60') hasMilestone = true;
      }
    });

    const discountedTotal = Math.round(originalTotal * (1 - combo.bundleConfig.discountPercent / 100) / 100) * 100; // Round to nearest 100

    let billingModel: BillingModel = 'milestone_40_60';
    if (hasRetainer && hasMilestone) billingModel = 'mixed_bundle';
    else if (hasRetainer) billingModel = 'monthly_retainer';

    return {
      id: combo.id,
      category: 'Combo Deals',
      billingModel,
      title: combo.title,
      subtitle: combo.subtitle,
      description: combo.description,
      iconName: combo.iconName,
      features: combo.features,
      bundleConfig: combo.bundleConfig,
      tiers: [
        {
          id: 'bundle',
          name: 'Bundle Package',
          price: discountedTotal,
          originalPrice: originalTotal
        }
      ]
    };
  });
}

export const packages: Package[] = [...basePackages, ...buildComboPackages(basePackages)];

export const webAddOns = [
  { id: 'urgent_delivery', name: 'Urgent Delivery', price: 10000 },
  { id: 'extra_revisions', name: 'Extra Revisions', price: 5000 }
];

export const studentAddOns = [
  { id: 'extra_hardware', name: 'Extra Hardware Module', price: 3000 },
  { id: 'urgent_delivery', name: 'Urgent/Express Delivery', price: 5000 }
];
