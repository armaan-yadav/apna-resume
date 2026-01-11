export type TemplateType = "classic" | "modern" | "minimal";

export interface TemplateInfo {
  id: TemplateType;
  name: string;
  description: string;
  thumbnail: string;
}

export const templates: TemplateInfo[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Traditional professional layout with top border accent",
    thumbnail: "/img/templates/classic.png",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Two-column layout with sidebar for skills and contact",
    thumbnail: "/img/templates/modern.png",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design with elegant typography",
    thumbnail: "/img/templates/minimal.png",
  },
];

export const getTemplateById = (id: string): TemplateInfo => {
  return templates.find((t) => t.id === id) || templates[0];
};
