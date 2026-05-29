import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ProjectForm } from "../_components/ProjectForm";

export default function NovoProjetoPage() {
  return (
    <div className="mx-auto max-w-[860px] px-4 py-8">
      <Link
        href="/admin/portfolio"
        className="mb-6 inline-flex items-center gap-1.5 text-[0.80rem] font-bold tracking-[0.04em] uppercase text-[#9a744d] transition-colors hover:text-[#171411]"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar à lista
      </Link>

      <ProjectForm mode="create" />
    </div>
  );
}
