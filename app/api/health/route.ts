import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  // Verificação 1: variáveis de ambiente carregadas?
  const envCheck = {
    has_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    has_anon: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    has_service: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    url_preview: process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 30) ?? "MISSING",
  };

  try {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from("site_content")
      .select("*", { count: "exact", head: true });

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          stage: "query",
          error: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          env: envCheck,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      site_content_rows: count,
      env: envCheck,
      message: "Conexão Supabase funcionando",
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        stage: "catch",
        error: err?.message ?? String(err),
        name: err?.name,
        stack: err?.stack?.split("\n").slice(0, 5),
        env: envCheck,
      },
      { status: 500 }
    );
  }
}