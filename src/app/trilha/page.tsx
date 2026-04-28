import { BookOpen, ClipboardList, FlaskConical, Network, Rocket, ScrollText } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { modules } from '@/data/modules';
import Link from 'next/link';
import { getModuleContinueLessonHref } from '@/lib/course-navigation';
import { ReactNode } from 'react';

export default function TrilhaPage() {
  const currentModule = modules[6] ?? modules[0];
  const continueHref = getModuleContinueLessonHref(currentModule.slug);

  return (
    <AppShell>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="space-y-4">
          <header className="rounded-2xl border bg-white p-5 sm:p-6">
            <h1 className="text-2xl font-bold text-slate-900 sm:text-4xl">Trilha: Redes ISP do Zero ao Backbone</h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-lg">Do suporte ao backbone, com foco em prática, clareza e aplicação real.</p>
          </header>

          <div className="rounded-2xl border bg-white p-4 sm:p-5">
            <div className="grid gap-4 md:grid-cols-[1.1fr_1fr] md:items-center">
              <div className="border-b pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-6">
                <p className="text-xs uppercase tracking-wide text-slate-500">Módulo 3 de 8</p>
                <h2 className="text-xl font-semibold text-slate-900">{currentModule.title}</h2>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Progresso da trilha</p>
                <div className="mt-2 h-2 rounded-full bg-slate-200">
                  <div className="h-2 w-[68%] rounded-full bg-primaryBlue" />
                </div>
                <p className="mt-2 text-2xl font-bold text-slate-900">68%</p>
              </div>
            </div>
          </div>

          <article className="rounded-2xl border bg-white">
            <div className="flex flex-col gap-4 border-b p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">Módulo atual: {currentModule.title}</h3>
                <p className="text-sm text-slate-600">Entenda o BGP na prática: eBGP, iBGP, políticas, trânsito e peering.</p>
              </div>
              <Link href={continueHref} className="inline-flex rounded-lg border border-primaryBlue px-4 py-2 text-sm font-semibold text-primaryBlue hover:bg-lightBlue">
                Continuar aula
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2 border-b px-4 py-3 text-sm font-medium text-slate-600 sm:grid-cols-5 sm:px-5">
              <span className="text-primaryBlue">Aula</span>
              <span>Cenário real</span>
              <span>Checklist</span>
              <span>Labs</span>
              <span>Fontes</span>
            </div>

            <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3 sm:p-5">
              <Card icon={<Network size={18} className="text-primaryBlue" />} title="Por que isso importa?" body="O BGP é o protocolo que conecta sua rede ao mundo. Ele define rotas, política e resiliência para garantir conectividade global." />
              <Card icon={<BookOpen size={18} className="text-emerald-600" />} title="Explicação didática" body="eBGP conecta AS diferentes e iBGP distribui rotas internamente. Políticas definem o que entra e o que sai." />
              <Card icon={<Rocket size={18} className="text-primaryBlue" />} title="Cenário real de ISP" body="Seu ISP anuncia rotas para IX.br e trânsito. Você precisa proteger prefixos e controlar preferência de caminho." />
            </div>

            <section className="mx-4 mb-4 rounded-2xl border p-4 sm:mx-5 sm:mb-5">
              <h4 className="mb-3 text-xl font-semibold">Diagrama de topologia</h4>
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700">
                {['Cliente', 'ONU', 'OLT', 'BNG', 'Core', 'Borda', 'Trânsito/IX.br'].map((node, index) => (
                  <div key={node} className="flex items-center gap-2">
                    <span className="rounded-lg bg-lightBlue px-3 py-2 font-medium text-slate-700">{node}</span>
                    {index < 6 && <span className="text-slate-400">→</span>}
                  </div>
                ))}
              </div>
            </section>

            <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2 sm:px-5 sm:pb-5">
              <section className="rounded-2xl border p-4">
                <h4 className="mb-2 flex items-center gap-2 text-xl font-semibold">
                  <ScrollText size={18} className="text-primaryBlue" /> Comandos úteis
                </h4>
                <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-emerald-300">
show bgp summary\nshow bgp ipv4 unicast\nshow bgp ipv4 unicast 200.200.200.1 advertised-routes
                </pre>
              </section>

              <section className="rounded-2xl border p-4">
                <h4 className="mb-2 flex items-center gap-2 text-xl font-semibold">
                  <ClipboardList size={18} className="text-primaryBlue" /> Missão prática
                </h4>
                <p className="mb-4 text-slate-700">Configure uma sessão BGP com seu provedor de trânsito e aplique filtro para aceitar apenas o necessário.</p>
                <button className="inline-flex items-center rounded-lg bg-lightBlue px-4 py-2 text-sm font-semibold text-primaryBlue hover:opacity-90">
                  <FlaskConical size={16} className="mr-2" /> Iniciar missão
                </button>
              </section>
            </div>
          </article>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border bg-white p-5">
            <h3 className="text-xl font-semibold">Resumo de bolso</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
              <li>Protocolo: BGP (TCP 179)</li>
              <li>Tipo: Vetor de caminho</li>
              <li>Escopo: Entre AS</li>
              <li>Usos: políticas, communities e AS-Path</li>
              <li>Essencial: escalabilidade e controle de rotas</li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <h3 className="text-xl font-semibold">Glossário rápido</h3>
            <ul className="mt-3 space-y-3 text-sm text-slate-700">
              <li><strong>AS:</strong> conjunto de redes sob uma administração.</li>
              <li><strong>ASN:</strong> identificador único de 32 bits para cada AS.</li>
              <li><strong>Prefixo:</strong> bloco de IP anunciado no roteamento.</li>
              <li><strong>AS-Path:</strong> atributo BGP com o caminho percorrido.</li>
            </ul>
            <Link href="/glossario" className="mt-4 inline-flex text-sm font-semibold text-primaryBlue hover:underline">
              Ver todos os termos →
            </Link>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}

function Card({ icon, title, body }: { icon: ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-2xl border p-4">
      <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold text-slate-900">
        {icon} {title}
      </h4>
      <p className="text-sm leading-6 text-slate-700">{body}</p>
    </div>
  );
}
