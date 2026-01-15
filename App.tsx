
import React, { useState, useEffect } from 'react';
import { PosterCreator } from './components/PosterCreator';
import { GeneratedPoster, AppState } from './types';
import { generateMixedPoster } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    loading: false,
    error: null,
    result: null
  });

  const [prompt, setPrompt] = useState('Misturar todos os elementos: o pod dourado, o estilo El Patrón e o astronauta no espaço.');
  const [images, setImages] = useState<string[]>([
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png', // Placeholder
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png', // Placeholder
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png' // Placeholder
  ]);

  const handleGenerate = async (currentImages: string[], userPrompt: string) => {
    setState({ ...state, loading: true, error: null });
    try {
      const resultUrl = await generateMixedPoster(currentImages, userPrompt);
      setState({ loading: false, error: null, result: resultUrl });
    } catch (err: any) {
      console.error(err);
      setState({ loading: false, error: err.message || 'Failed to generate poster', result: null });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-600 mb-2 tracking-tighter uppercase italic">
          El Patrón
        </h1>
        <p className="text-zinc-400 text-lg">Criador de Cartazes Premium para WhatsApp</p>
      </header>

      <main>
        <PosterCreator 
          onGenerate={handleGenerate} 
          loading={state.loading}
          result={state.result}
          error={state.error}
        />
      </main>

      <footer className="mt-20 text-center text-zinc-600 text-sm border-t border-zinc-900 pt-8">
        &copy; {new Date().getFullYear()} El Patrón Pods - Since 2023. Powered by Gemini AI.
      </footer>
    </div>
  );
};

export default App;
