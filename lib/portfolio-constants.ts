export const SERVICOS_DISPONIVEIS = [
  "Arquitetura",
  "Design de Interiores",
  "Marcenaria",
  "Gestão de Obra",
  "Consultoria Técnica",
  "Consultoria de Materiais",
] as const;

export type ServicoTag = (typeof SERVICOS_DISPONIVEIS)[number];

export const CATEGORIAS = [
  { value: "engenharia", label: "Engenharia" },
  { value: "marcenaria", label: "Marcenaria" },
] as const;

export const MIDIA_TYPES = [
  {
    value: "photo",
    label: "Foto estática",
    description: "Uma imagem mostrando o projeto pronto",
  },
  {
    value: "before_after",
    label: "Antes e Depois",
    description: "Duas imagens para comparação com slider",
  },
  {
    value: "video",
    label: "Vídeo",
    description: "Upload de MP4 ou URL do YouTube/Vimeo",
  },
] as const;

export const MAX_IMAGE_SIZE_MB = 10;
export const MAX_VIDEO_SIZE_MB = 100;
