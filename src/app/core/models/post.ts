export interface Post {
  _id: string;
  title: string;
  cover_url?: string;
  sections?: {
    subheading?: string;
    cover_url?: string;
    content: string[];
  }[];
  tags?: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    username: string;
  };
  post_date: Date;
  last_modified: Date;
}
