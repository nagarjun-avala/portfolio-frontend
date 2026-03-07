import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CommandPalette } from '@/components/CommandPalette';


// Mock the Next.js hooks
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('next-themes', () => ({
  useTheme: () => ({
    setTheme: vi.fn(),
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('CommandPalette Component', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
  });

  it('should not initially render until toggled', () => {
    render(<CommandPalette />);
    expect(screen.queryByPlaceholderText(/Type a command or search/i)).not.toBeInTheDocument();
  });

  it('should open when Cmd+K or Ctrl+K is pressed', () => {
    render(<CommandPalette />);
    
    fireEvent.keyDown(document, { key: 'k', metaKey: true });
    
    expect(screen.getByPlaceholderText(/Type a command or search/i)).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });
});
