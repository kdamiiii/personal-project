import { CourseType } from "@/components/courses";

export const COURSES: CourseType[] = [
  {
    name: "Bachelor of Science in Business Administration",
    category: "CHED",
    description:
      "This program equips students with essential business skills, including management, marketing, finance, and entrepreneurship.",
    picture: "/photos/BA.jpg",
    majors: [
      "Financial Management",
      "Operations Management",
      "Human Resource Development Management",
    ],
  },
  {
    name: "Bachelor of Science in Hotel and Restaurant Management",
    picture: "/photos/HRM.jpg",
    description:
      "This program provides students with hands-on training in hospitality management, including hotel operations, food service, and customer relations.",
    category: "CHED",
  },
  {
    name: "Bachelor of Technical Teacher Education",
    picture: "/photos/Educator.jpg",
    description:
      "This program prepares students to become skilled educators in technical and vocational fields.",
    majors: ["Food Service Management", "Automotive"],
    category: "CHED",
  },
  {
    name: "Consumer Electronics Servicing NC2",
    category: "TESDA",
    description:
      "Covers troubleshooting, repair, and maintenance of electronic appliances and devices.",
    picture: "/photos/ELEC.jpg",
  },
  {
    name: "Automotive Servicing NC2",
    category: "TESDA",
    description:
      "Provides training in vehicle maintenance, diagnostics, and repair for light vehicles.",
    picture: "/photos/BA.jpg",
  },
  {
    name: "Automotive Servicing NC1",
    category: "TESDA",
    description:
      "Introduces basic automotive servicing, including vehicle inspection and minor repairs.",
    picture: "/photos/BA.jpg",
  },
  {
    name: "Shielded Metal Arc Welding NC2",
    category: "TESDA",
    description:
      "Focuses on welding techniques, metal fabrication, and safety procedures in welding.",
    picture: "/photos/BA.jpg",
  },
  {
    name: "Health Care Services NC2 (Nursing Assistant)",
    category: "TESDA",
    description:
      "Prepares students for assisting in patient care, basic nursing procedures, and first aid.",
    picture: "/photos/BA.jpg",
  },
  {
    name: "Caregiving NC2",
    category: "TESDA",
    description:
      "Trains individuals in providing care for the elderly, children, and patients with special needs.",
    picture: "/photos/BA.jpg",
  },
  {
    name: "Housekeeping Services NC2",
    category: "TESDA",
    description:
      "Covers cleaning, sanitation, and maintenance procedures in hospitality and home settings.",
    picture: "/photos/BA.jpg",
  },
  {
    name: "Food and Beverage Services NC2",
    category: "TESDA",
    description:
      "Teaches skills in restaurant service, food handling, and customer relations in hospitality.",
    picture: "/photos/BA.jpg",
  },
  {
    name: "Bartending Services NC2",
    category: "TESDA",
    description:
      "Provides knowledge in mixing drinks, bar operations, and responsible alcohol service.",
    picture: "/photos/BA.jpg",
  },
  {
    name: "Cookery NC2",
    category: "TESDA",
    description:
      "Focuses on culinary skills, food preparation, and kitchen safety in professional settings.",
    picture: "/photos/BA.jpg",
  },
  {
    name: "Front Office Services",
    category: "TESDA",
    description:
      "Covers reception, customer service, and administrative tasks in hotel and office environments.",
    picture: "/photos/BA.jpg",
  },
  {
    name: "Secretarial Office Management",
    category: "TESDA",
    description:
      "Trains individuals in office administration, document management, and executive assistance.",
    picture: "/photos/BA.jpg",
  },
  {
    name: "Hotel and Restaurant Services",
    category: "TESDA",
    description:
      "Combines hospitality skills in hotel management, restaurant service, and guest relations.",
    picture: "/photos/BA.jpg",
  },
  {
    name: "Auto Troubleshooting w/ Driving",
    category: "MODULAR",
    description:
      "Teaches vehicle troubleshooting techniques along with hands-on driving skills.",
    picture: "/photos/Educator.jpg",
  },
  {
    name: "Automotive Electricity",
    category: "MODULAR",
    description:
      "Focuses on vehicle electrical systems, wiring, and troubleshooting electrical issues.",
    picture: "/photos/Educator.jpg",
  },
  {
    name: "Practical Driving",
    category: "MODULAR",
    description:
      "Provides hands-on driving instruction and road safety awareness.",
    picture: "/photos/Educator.jpg",
  },
  {
    name: "Baking & Pastry Production",
    category: "MODULAR",
    description:
      "Covers techniques in baking breads, pastries, and dessert preparation.",
    picture: "/photos/Educator.jpg",
  },
  {
    name: "International Cuisine",
    category: "MODULAR",
    description:
      "Explores global culinary techniques and international food preparation.",
    picture: "/photos/Educator.jpg",
  },
  {
    name: "Culinary Arts",
    category: "MODULAR",
    description:
      "Provides training in food preparation, cooking methods, and kitchen management.",
    picture: "/photos/Educator.jpg",
  },
  {
    name: "Food and Beverage Services",
    category: "MODULAR",
    description:
      "Teaches skills in restaurant service, food handling, and customer relations.",
    picture: "/photos/Educator.jpg",
  },
  {
    name: "Housekeeping Services",
    category: "MODULAR",
    description:
      "Covers cleaning, sanitation, and maintenance procedures in hospitality settings.",
    picture: "/photos/Educator.jpg",
  },
  {
    name: "Bartending Services",
    category: "MODULAR",
    description:
      "Provides knowledge in mixing drinks, bar operations, and responsible alcohol service.",
    picture: "/photos/Educator.jpg",
  },
  {
    name: "Computer Applications",
    category: "MODULAR",
    description:
      "Covers basic to advanced computer skills, including office applications and software use.",
    picture: "/photos/Educator.jpg",
  },
  {
    name: "Jetwriting (Modern Shorthand)",
    category: "MODULAR",
    description:
      "Teaches shorthand writing techniques for efficient note-taking and transcription.",
    picture: "/photos/Educator.jpg",
  },
  {
    name: "Practical Bookkeeping & Accounting",
    category: "MODULAR",
    description:
      "Covers basic accounting principles, bookkeeping procedures, and financial record-keeping.",
    picture: "/photos/Educator.jpg",
  },
  {
    name: "Hair Dressing & Beauty Care",
    category: "MODULAR",
    description:
      "Trains individuals in hairstyling, makeup application, and beauty care techniques.",
    picture: "/photos/Educator.jpg",
  },
  {
    name: "Auto CAD (new)",
    category: "MODULAR",
    description:
      "Introduces computer-aided design (CAD) software for technical drawing and drafting.",
    picture: "/photos/Educator.jpg",
  },
];

type CategoryColorType = {
  [key: string]: string;
};

export const CATEGORY_COLOR: CategoryColorType = {
  CHED: "bg-blue-950",
  TESDA: "bg-amber-400",
  MODULAR: "bg-green-600",
};
