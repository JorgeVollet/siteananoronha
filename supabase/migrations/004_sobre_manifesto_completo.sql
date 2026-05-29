-- Atualiza o corpo da seção "sobre" com o manifesto completo (mini-parágrafo + texto longo)
update public.site_content
set value_text = E'Engenheira civil e projetista de interiores, com método integrado que une arquitetura, gestão de obra e marcenaria sob medida.\n\nReferências soltas. Decisões sem critério. Dúvidas que crescem conforme o projeto avança. Quando tudo é integrado desde o início — do layout aos acabamentos — o resultado reflete exatamente o que foi pensado. Aqui, cada etapa é orientada. Cada escolha faz sentido. Cada detalhe conversa com o outro. Porque engenharia e móveis sob medida não podem rodar no improviso.'
where section = 'sobre' and key = 'corpo';

-- Atualiza o eyebrow da seção para "Manifesto"
update public.site_content
set value_text = 'Manifesto'
where section = 'sobre' and key = 'titulo';
