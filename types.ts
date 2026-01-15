
export interface SourceImage {
  id: string;
  url: string;
  label: string;
}

export interface GeneratedPoster {
  url: string;
  prompt: string;
}

export interface AppState {
  loading: boolean;
  error: string | null;
  result: string | null;
}
