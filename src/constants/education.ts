interface Education {
  degree: string;
  institution: string;
  period: string;
  description?: string;
  current?: boolean;
}

export const education: Education[] = [
  {
    degree: "Bachelor of Computer Engineering",
    institution: "IOE Purwanchal Campus, Dharan",
    period: "2023 - 2027",
    description: "Currently pursuing Computer Engineering with focus on software development and system design.",
    current: true,
  },
  {
    degree: "High School (+2)",
    institution: "Galaxy Secondary School, Dhangadhi",
    period: "2021 - 2023",
    description: "Completed higher secondary education with distinction in Science stream.",
    current: false,
  },
];