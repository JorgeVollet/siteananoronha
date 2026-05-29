import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/**
 * POST /api/contato
 * Recebe um lead do formulário de orçamento, valida e envia por email
 * usando Resend. Variáveis de ambiente:
 *   - RESEND_API_KEY          (obrigatória — pegar em https://resend.com)
 *   - CONTACT_EMAIL_TO        (destino — ex: contato@analauraarquitetura.com.br)
 *   - CONTACT_EMAIL_FROM      (remetente — precisa ser de domínio verificado no Resend)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nome, email, telefone, tipoProjeto, metragem, prazo, investimento, mensagem } = body ?? {};

    if (!nome || !email || !telefone || !tipoProjeto || !mensagem) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL_TO ?? 'contato@analauraarquitetura.com.br';
    const from = process.env.CONTACT_EMAIL_FROM ?? 'Site Ana Laura <orcamento@analauraarquitetura.com.br>';

    // Se Resend não estiver configurado, devolve OK para não bloquear UX em dev.
    if (!apiKey) {
      console.warn('[contato] RESEND_API_KEY não configurada — lead apenas logado.');
      console.info('[contato] Novo lead:', { nome, email, telefone, tipoProjeto, mensagem });
      return NextResponse.json({ ok: true, dev: true });
    }

    const resend = new Resend(apiKey);

    const html = renderEmail({ nome, email, telefone, tipoProjeto, metragem, prazo, investimento, mensagem });

    const { error } = await resend.emails.send({
      from,
      to,
      reply_to: email,
      subject: `Novo orçamento — ${nome} (${labelTipo(tipoProjeto)})`,
      html
    });

    if (error) {
      console.error('[contato] Resend error:', error);
      return NextResponse.json({ error: 'Falha no envio do email.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[contato] Erro inesperado:', e);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}

function labelTipo(t: string): string {
  return {
    arquitetonico: 'Projeto Arquitetônico',
    interiores: 'Design de Interiores',
    consultoria: 'Consultoria Técnica',
    'gestao-obra': 'Gestão de Obra',
    completo: 'Pacote Completo'
  }[t] ?? t;
}

function labelPrazo(p?: string): string {
  if (!p) return '—';
  return {
    urgente: 'Urgente (até 60 dias)',
    '3-meses': 'Até 3 meses',
    '6-meses': 'Até 6 meses',
    flexivel: 'Flexível'
  }[p] ?? p;
}

function labelInvestimento(i?: string): string {
  if (!i) return '—';
  return {
    'ate-30k': 'Até R$ 30 mil',
    '30-80k': 'R$ 30 – 80 mil',
    '80-150k': 'R$ 80 – 150 mil',
    '150-300k': 'R$ 150 – 300 mil',
    'acima-300k': 'Acima de R$ 300 mil',
    'a-definir': 'A definir'
  }[i] ?? i;
}

function renderEmail(d: {
  nome: string;
  email: string;
  telefone: string;
  tipoProjeto: string;
  metragem?: string;
  prazo?: string;
  investimento?: string;
  mensagem: string;
}) {
  return /* html */ `
  <!doctype html>
  <html lang="pt-BR">
    <body style="font-family: 'Segoe UI', system-ui, sans-serif; background:#F4EFE6; padding: 32px;">
      <table align="center" style="max-width: 620px; width: 100%; background:#fff; border-radius: 8px; overflow:hidden; box-shadow:0 6px 24px rgba(0,0,0,.08);">
        <tr>
          <td style="background:#0A0A0A; padding: 24px 32px;">
            <div style="font-family: Georgia, serif; color:#D3C39D; font-size: 22px; letter-spacing: 2px; font-weight: 700; text-transform: uppercase;">
              Novo Pedido de Orçamento
            </div>
            <div style="color:#fff; font-size:13px; margin-top:6px; opacity:.7;">via site analauraarquitetura.com.br</div>
          </td>
        </tr>
        <tr>
          <td style="padding: 32px;">
            <h2 style="font-family: Georgia, serif; color:#111; margin:0 0 8px;">Olá, Ana 👋</h2>
            <p style="color:#444; line-height:1.55; margin:0 0 24px;">
              Você recebeu uma nova solicitação de orçamento. Detalhes abaixo:
            </p>

            <table style="width:100%; border-collapse: collapse;">
              <tr>
                <td style="padding:10px 0; border-bottom:1px solid #eee;">
                  <strong style="color:#966A4B; text-transform:uppercase; font-size:11px; letter-spacing:1.5px;">Nome</strong><br>
                  <span style="color:#111; font-size:15px;">${escapeHtml(d.nome)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0; border-bottom:1px solid #eee;">
                  <strong style="color:#966A4B; text-transform:uppercase; font-size:11px; letter-spacing:1.5px;">E-mail</strong><br>
                  <a href="mailto:${escapeHtml(d.email)}" style="color:#111; font-size:15px; text-decoration:none;">${escapeHtml(d.email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0; border-bottom:1px solid #eee;">
                  <strong style="color:#966A4B; text-transform:uppercase; font-size:11px; letter-spacing:1.5px;">Telefone</strong><br>
                  <a href="https://wa.me/55${escapeHtml(d.telefone.replace(/\D/g, ''))}" style="color:#111; font-size:15px; text-decoration:none;">${escapeHtml(d.telefone)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0; border-bottom:1px solid #eee;">
                  <strong style="color:#966A4B; text-transform:uppercase; font-size:11px; letter-spacing:1.5px;">Tipo de projeto</strong><br>
                  <span style="color:#111; font-size:15px;">${labelTipo(d.tipoProjeto)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0; border-bottom:1px solid #eee;">
                  <strong style="color:#966A4B; text-transform:uppercase; font-size:11px; letter-spacing:1.5px;">Metragem</strong><br>
                  <span style="color:#111; font-size:15px;">${escapeHtml(d.metragem || '—')} ${d.metragem ? 'm²' : ''}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0; border-bottom:1px solid #eee;">
                  <strong style="color:#966A4B; text-transform:uppercase; font-size:11px; letter-spacing:1.5px;">Prazo desejado</strong><br>
                  <span style="color:#111; font-size:15px;">${labelPrazo(d.prazo)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0; border-bottom:1px solid #eee;">
                  <strong style="color:#966A4B; text-transform:uppercase; font-size:11px; letter-spacing:1.5px;">Faixa de investimento</strong><br>
                  <span style="color:#111; font-size:15px;">${labelInvestimento(d.investimento)}</span>
                </td>
              </tr>
            </table>

            <div style="margin-top:24px; padding:20px; background:#F4EFE6; border-left:4px solid #966A4B; border-radius:4px;">
              <strong style="color:#966A4B; text-transform:uppercase; font-size:11px; letter-spacing:1.5px;">Mensagem</strong>
              <p style="color:#111; font-size:15px; line-height:1.6; margin:10px 0 0; white-space: pre-wrap;">${escapeHtml(d.mensagem)}</p>
            </div>

            <div style="text-align:center; margin-top:30px;">
              <a href="https://wa.me/55${escapeHtml(d.telefone.replace(/\D/g, ''))}"
                 style="display:inline-block; background:#25D366; color:#fff; padding:14px 30px; border-radius:50px; text-decoration:none; font-family: Georgia, serif; font-weight:700; text-transform:uppercase; letter-spacing:1.5px; font-size:13px;">
                Responder pelo WhatsApp
              </a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#0A0A0A; padding: 16px 32px; text-align:center;">
            <span style="color:#D3C39D; font-family: Georgia, serif; font-size:12px; letter-spacing:2px; text-transform:uppercase;">
              Ana Laura Noronha · Engenharia e Interiores
            </span>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
