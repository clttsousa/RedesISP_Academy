import { render, screen, fireEvent } from '@testing-library/react';
import TrilhaPage from '@/app/trilha/page';
import LessonPage from '@/app/trilha/[moduleSlug]/aulas/[lessonSlug]/page';
import { LessonHeader } from '@/components/lesson/LessonHeader';
import { CommandBlock } from '@/components/lesson/CommandBlock';
import { CommandPalette } from '@/components/search/CommandPalette';

describe('pages', () => {
  it('renderiza /trilha', () => {
    render(<TrilhaPage />);
    expect(screen.getByText(/Trilha: Redes ISP/)).toBeInTheDocument();
  });

  it('renderiza página da aula BGP', async () => {
    const Page = await LessonPage({ params: Promise.resolve({ moduleSlug: 'bgp-em-isp', lessonSlug: 'ebgp-ibgp-politicas' }) });
    render(Page);
    expect(screen.getByText(/Aula 4/)).toBeInTheDocument();
  });

  it('clique em marcar concluída', () => {
    render(<LessonHeader lessonSlug="ebgp-ibgp-politicas" next="bgp-comunidades" prev="bgp-filtros" />);
    fireEvent.click(screen.getByText('Marcar como concluída'));
    expect(screen.getByText('Marcar como concluída')).toBeInTheDocument();
  });

  it('botão copiar comando', () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn() } });
    render(<CommandBlock commands={['show ip bgp summary']} />);
    fireEvent.click(screen.getByText('Copiar'));
    expect(screen.getByText('Copiar')).toBeInTheDocument();
  });

  it('abre command palette com ctrl+k', () => {
    render(<CommandPalette />);
    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
  });
});
