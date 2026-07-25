/**
 * COMMISSION PRICING CONFIG
 * Edit pricing, turnaround times, and tier descriptions here
 * No code changes needed when updating prices
 */

export const commissionTiers = [
  {
    id: "sketch",
    name: "Sketch",
    description: "Rough sketch with character linework",
    basePrice: "TBD",
    turnaround: "3-5 days",
    includes: [
      "Character sketch",
      "Rough composition",
      "1 revision"
    ]
  },
  {
    id: "flat-color",
    name: "Flat Color",
    description: "Sketch + flat colors, no shading",
    basePrice: "TBD",
    turnaround: "5-7 days",
    includes: [
      "Character sketch",
      "Flat colors",
      "1 revision"
    ]
  },
  {
    id: "full-illustration",
    name: "Full Illustration",
    description: "Complete artwork with shading and effects",
    basePrice: "TBD",
    turnaround: "7-14 days",
    includes: [
      "Character sketch",
      "Detailed colors",
      "Shading & lighting",
      "Effects & background",
      "2 revisions"
    ]
  }
];

export const commissionInfo = {
  openSlots: 5,
  currentOpenCommissions: 3,
  acceptingCommissions: true,
  
  processSteps: [
    {
      step: 1,
      title: "Inquiry",
      description: "Send me a message with your idea, character description, and preferred tier."
    },
    {
      step: 2,
      title: "Quote & Timeline",
      description: "I'll provide a quote and confirm the turnaround time."
    },
    {
      step: 3,
      title: "Deposit",
      description: "50% deposit due to lock in your slot."
    },
    {
      step: 4,
      title: "Sketch Review",
      description: "Initial sketch shared for feedback and revisions."
    },
    {
      step: 5,
      title: "Final Work",
      description: "Final artwork delivered upon full payment."
    }
  ],
  
  paymentMethods: [
    "PayPal",
    "Stripe",
    "Ko-fi"
  ],
  
  additionalInfo: {
    revisionsIncluded: "Included in tier pricing",
    rushFee: "+30% for expedited turnaround",
    backgroundOptions: "Solid color, simple, or detailed (prices may vary)"
  }
};

export default { commissionTiers, commissionInfo };
