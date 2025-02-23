export type Link = {
  id: string;
  title: string;
  url: string;
  description?: string;
  category?: string;
  savedAt: string;
};

export type LinkFormData = {
  title: string;
  url: string;
  description?: string;
  category?: string;
};
