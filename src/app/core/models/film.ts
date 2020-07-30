export interface Film {
  _id: string;
  title: string;
  director: string[];
  release_date?: Date;
  poster_url?: string;
  rating?: number;
  youtube_trailer_id?: string;
  gallery_url?: string[];
  synopsis: string;
  casts: string[];
}
