-- Popula / atualiza o corpo do manifesto na seção "sobre"
insert into public.site_content (section, key, value_text)
values (
  'sobre',
  'corpo',
  'Engenheira civil e projetista de interiores e marcenaria sob medida com atuação em obras residenciais e comerciais no Rio de Janeiro.

Referências soltas. Decisões sem critério. Dúvidas que crescem conforme o projeto avança.

Quando tudo é integrado desde o início — do layout aos acabamentos — o resultado reflete exatamente o que foi pensado.

Aqui, cada etapa é orientada. Cada escolha faz sentido. Cada detalhe conversa com o outro.

Porque engenharia e móveis sob medida não podem rodar no improviso.'
)
on conflict (section, key) do update
  set value_text = excluded.value_text;
