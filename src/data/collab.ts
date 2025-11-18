export type Collab = {
  id: string;
  title: string;
  description: string;
  images: string[]; // relative URLs under /public or /assets
};

export const collabs: Collab[] = [
  {
    id: "collab-alpha",
    title: "Collab Alpha",
    description:
      "Short description for Collab Alpha. Details about collaboration, designers and materials.",
    images: ["/collabs/alpha-1.jpg", "/collabs/alpha-2.jpg", "/collabs/alpha-3.jpg"],
  },
  {
    id: "collab-beta",
    title: "Collab Beta",
    description:
      "Short description for Collab Beta. Story, features and release notes.",
    images: ["/collabs/beta-1.jpg", "/collabs/beta-2.jpg", "/collabs/beta-3.jpg", "/collabs/beta-4.jpg"],
  },
  {
    id: "collab-gamma",
    title: "Collab Gamma",
    description:
      "Short description for Collab Gamma. Limited edition collection details.",
    images: ["/collabs/gamma-1.jpg", "/collabs/gamma-2.jpg", "/collabs/gamma-3.jpg"],
  },
];