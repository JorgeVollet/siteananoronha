import { Resend } from 'resend';

const resendKey = process.env.RESEND_API_KEY;
const resend = resendKey ? new Resend(resendKey) : null;
const anaEmail =
  process.env.ANA_NOTIFICATION_EMAIL || 'contato@ananoronha.eng';
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ananoronha.eng';

export async function sendVisitorEmail(params: {
  name: string;
  email: string;
  coverUrl: string;
  slug: string;
}) {
  if (!resend) {
    console.warn('[mailer] Resend não configurado');
    return;
  }
  const { name, email, coverUrl, slug } = params;

  await resend.emails.send({
    from: 'AN Engenharia <onboarding@resend.dev>',
    to: email,
    subject: `${name}, seu moodboard editorial chegou`,
    html: `
      <div style="font-family: serif; max-width: 600px; margin: 0 auto; color: #171411;">
        <h1 style="font-weight: 400; letter-spacing: -0.03em;">Oi ${name.split(' ')[0]},</h1>
        <p>Aqui está o moodboard que geramos com suas referências.</p>
        <img src="${coverUrl}" alt="Seu moodboard" style="width: 100%; border-radius: 8px; margin: 24px 0;" />
        <p><a href="${coverUrl}" style="color: #9a744d; font-weight: 700;">→ Baixar em alta resolução</a></p>
        <p><a href="${siteUrl}/moodboard/${slug}" style="color: #9a744d;">Ver online e compartilhar</a></p>
        <hr style="border: none; border-top: 1px solid #d8c9b8; margin: 32px 0;" />
        <p style="font-style: italic; color: #3a332d;">Gostou? Que tal transformar essas ideias em projeto real?</p>
        <p><a href="https://wa.me/5555999942637?text=Ol%C3%A1%20Ana%2C%20acabei%20de%20criar%20um%20moodboard%20e%20gostaria%20de%20conversar%20sobre%20o%20meu%20projeto." style="background: #171614; color: #fff; padding: 14px 24px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 700;">Conversar com a Ana no WhatsApp</a></p>
        <p style="font-size: 12px; color: #756b60; margin-top: 32px;">Ana Laura Noronha · Engenharia e Interiores</p>
      </div>
    `,
  });
}

export async function sendAnaNotification(params: {
  leadName: string;
  leadEmail: string;
  whatsapp?: string | null;
  slug: string;
}) {
  if (!resend) return;
  const { leadName, leadEmail, whatsapp, slug } = params;

  await resend.emails.send({
    from: 'AN Site <onboarding@resend.dev>',
    to: anaEmail,
    subject: `Novo lead: ${leadName} criou um moodboard`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2>Novo lead qualificado</h2>
        <p><strong>${leadName}</strong> acabou de criar um moodboard no site.</p>
        <ul>
          <li>Email: <a href="mailto:${leadEmail}">${leadEmail}</a></li>
          ${whatsapp ? `<li>WhatsApp: <a href="https://wa.me/${whatsapp.replace(/\D/g, '')}">${whatsapp}</a></li>` : ''}
        </ul>
        <p><a href="${siteUrl}/moodboard/${slug}">Ver o moodboard criado</a></p>
      </div>
    `,
  });
}
