
import { SourceImage } from './types';

export const INITIAL_IMAGES: SourceImage[] = [
  {
    id: 'vape',
    url: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?q=80&w=800&auto=format&fit=crop', // Fallback if user doesn't upload
    label: 'Golden Vape'
  },
  {
    id: 'logo',
    url: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop', // Fallback
    label: 'El Patrón Branding'
  },
  {
    id: 'space',
    url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop', // Fallback
    label: 'Cosmic Theme'
  }
];

export const MODEL_NAME = 'gemini-2.5-flash-image';
