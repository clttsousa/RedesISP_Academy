import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import TrilhaPage from '@/app/trilha/page';
import LessonPage from '@/app/trilha/[moduleSlug]/aulas/[lessonSlug]/page';
import { LessonHeader } from '@/components/lesson/LessonHeader';
import { CommandBlock } from '@/components/lesson/CommandBlock';
import { CommandPalette } from '@/components/search/CommandPalette';
import { lessons } from '@/data/lessons';
import { modules } from '@/data/modules';

const pushMock = vi.fn();

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: () => ({ push: pushMock }),
    usePathname: () => '/trilha',
  };
});

describe('pages', () => {
  it('renderiza /trilha', () => {
    render(<TrilhaPage />);
    expect(screen.getByText(/Trilha: Redes ISP/)).toBeInTheDocument();
  });

  it('renderiza página de uma aula válida', async () => {
    const Page = await LessonPage({ params: Promise.resolve({ moduleSlug: 'bgp', lessonSlug: 'bgp-ebgp-ibgp-politica' }) });
    render(Page);
    expect(screen.getByText(/Tempo estimado/)).toBeInTheDocument();
  });

  it('clique em marcar concluída', () => {
    render(<LessonHeader moduleSlug={modules[0].slug} lesson={lessons[0]} next={lessons[1].slug} />);
    fireEvent.click(screen.getByText('Marcar como concluída'));
    expect(screen.getByText('Marcar como concluída')).toBeInTheDocument();
  });

  it('botão copiar comando', () => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn() } });
    render(<CommandBlock commands={['show ip bgp summary']} />);
    fireEvent.click(screen.getByText('Copiar'));
    expect(screen.getByText('Copiar')).toBeInTheDocument();
  });

  it('abre command palette com ctrl+k', async () => {
    render(<CommandPalette />);
    await act(async () => {
      window.dispatchEvent(new CustomEvent('command-palette:toggle'));
    });
    expect(await screen.findByPlaceholderText('Buscar módulo, aula, termo, comando ou lab...')).toBeInTheDocument();
  });
});
