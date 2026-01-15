
import React, { useState, useRef } from 'react';

interface PosterCreatorProps {
  onGenerate: (images: string[], prompt: string) => void;
  loading: boolean;
  result: string | null;
  error: string | null;
}

export const PosterCreator: React.FC<PosterCreatorProps> = ({ 
  onGenerate, 
  loading, 
  result, 
  error 
}) => {
  const [images, setImages] = useState<(string | null)[]>([null, null, null]);
  const [prompt, setPrompt] = useState('Crie um cartaz épico misturando o pod dourado com o astronauta e o estilo El Patrón.');
  
  const fileInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result as string;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTriggerUpload = (index: number) => {
    fileInputRefs[index].current?.click();
  };

  const isReady = images.every(img => img !== null);

  const handleSubmit = () => {
    if (isReady) {
      onGenerate(images as string[], prompt);
    }
  };

  const downloadImage = () => {
    if (result) {
      const link = document.createElement('a');
      link.href = result;
      link.download = 'el-patron-poster.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800 backdrop-blur-sm">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <i className="fa-solid fa-images text-amber-500"></i>
          Passo 1: Carregue as Imagens de Referência
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {images.map((img, idx) => (
            <div 
              key={idx}
              onClick={() => handleTriggerUpload(idx)}
              className={`aspect-square rounded-2xl border-2 border-dashed cursor-pointer overflow-hidden flex flex-col items-center justify-center transition-all ${
                img ? 'border-amber-500 bg-black' : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900'
              }`}
            >
              {img ? (
                <img src={img} alt={`Ref ${idx}`} className="w-full h-full object-cover" />
              ) : (
                <>
                  <i className="fa-solid fa-cloud-arrow-up text-3xl mb-2 text-zinc-500"></i>
                  <span className="text-xs text-zinc-500 font-medium px-4 text-center">
                    {idx === 0 ? 'Imagem do Produto (ex: Pod)' : idx === 1 ? 'Logo / Branding' : 'Estilo / Cenário (ex: Espaço)'}
                  </span>
                </>
              )}
              <input 
                type="file" 
                ref={fileInputRefs[idx]}
                className="hidden" 
                accept="image/*"
                onChange={(e) => handleFileChange(idx, e)}
              />
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <i className="fa-solid fa-pen-nib text-amber-500"></i>
          Passo 2: Instruções Adicionais
        </h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Descreva como você quer que os elementos sejam misturados..."
          className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 min-h-[100px] resize-none"
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !isReady}
          className={`w-full mt-6 py-4 rounded-2xl font-bold text-lg uppercase tracking-wider transition-all flex items-center justify-center gap-3 ${
            loading || !isReady 
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:scale-[1.02] shadow-[0_0_30px_rgba(217,119,6,0.2)]'
          }`}
        >
          {loading ? (
            <>
              <i className="fa-solid fa-circle-notch animate-spin"></i>
              Criando sua Arte...
            </>
          ) : (
            <>
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              Gerar Cartaz WhatsApp
            </>
          )}
        </button>
        
        {!isReady && (
          <p className="text-center text-amber-500/80 text-xs mt-3 font-medium italic">
            * Por favor, carregue as 3 imagens para misturar os elementos.
          </p>
        )}
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-2xl text-red-400 flex items-center gap-3">
          <i className="fa-solid fa-triangle-exclamation"></i>
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black italic uppercase tracking-tight">Resultado Final</h2>
            <div className="flex gap-2">
              <button 
                onClick={downloadImage}
                className="bg-white text-black px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-zinc-200"
              >
                <i className="fa-solid fa-download"></i> Baixar
              </button>
              <button 
                 onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent("Confira meu novo cartaz El Patrón!")}`, '_blank')}
                 className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-emerald-500"
              >
                <i className="fa-brands fa-whatsapp"></i> Compartilhar
              </button>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-4 border border-zinc-800 shadow-2xl overflow-hidden group relative">
            <img 
              src={result} 
              alt="Generated Poster" 
              className="w-full h-auto rounded-2xl shadow-inner"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8 pointer-events-none">
              <p className="text-white font-bold text-lg italic">Pronto para o Status!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
