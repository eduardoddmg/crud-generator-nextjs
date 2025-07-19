'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    // If current theme is 'light', set to 'dark'. Otherwise, set to 'light'.
    // You could also add a 'system' option if you wanted, but for a simple toggle,
    // light/dark is more common.
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {/*
        The Sun icon is visible in light mode and hidden in dark mode.
        The Moon icon is hidden in light mode and visible in dark mode.
        This creates a smooth cross-fade effect.
      */}
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span> {/* For accessibility */}
    </Button>
  );
}
