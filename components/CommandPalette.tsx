"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import {
  FolderDot,
  Home,
  Laptop,
  Mail,
  Moon,
  PenTool,
  Search,
  Sun,
  GraduationCap,
  Award,
} from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => unknown) => {
    setOpen(false);
    command();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] sm:pt-[25vh]">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity" 
        onClick={() => setOpen(false)}
      />

      {/* Dialog */}
      <div className="relative z-50 w-full max-w-lg overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:w-[600px]">
        <Command
          className="flex h-full w-full flex-col bg-transparent"
          shouldFilter={true}
        >
          <div className="flex items-center border-b border-slate-200 px-3 dark:border-slate-800">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-50"
              placeholder="Type a command or search..."
              autoFocus
            />
          </div>
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm text-slate-500">
              No results found.
            </Command.Empty>
            
            <Command.Group heading="Navigation" className="text-xs font-medium text-slate-500 dark:text-slate-400 [&_[cmdk-item]]:mt-1">
              <Command.Item
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:text-slate-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                onSelect={() => runCommand(() => window.location.href = '/')}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Command.Item>
              <Command.Item
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:text-slate-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
                onSelect={() => runCommand(() => window.location.href = '/#projects')}
              >
                <FolderDot className="mr-2 h-4 w-4" />
                Projects
              </Command.Item>
              <Command.Item
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:text-slate-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
                onSelect={() => runCommand(() => window.location.href = '/#experience')}
              >
                <Laptop className="mr-2 h-4 w-4" />
                Experience
              </Command.Item>
              <Command.Item
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:text-slate-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
                onSelect={() => runCommand(() => window.location.href = '/#education')}
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                Education
              </Command.Item>
              <Command.Item
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:text-slate-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
                onSelect={() => runCommand(() => window.location.href = '/#certifications')}
              >
                <Award className="mr-2 h-4 w-4" />
                Certifications
              </Command.Item>
              <Command.Item
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:text-slate-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
                onSelect={() => runCommand(() => window.location.href = '/#blogs')}
              >
                <PenTool className="mr-2 h-4 w-4" />
                Blog
              </Command.Item>
              <Command.Item
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:text-slate-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
                onSelect={() => runCommand(() => window.location.href = '/#contact')}
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </Command.Item>
            </Command.Group>

            <Command.Separator className="my-2 h-px bg-slate-200 dark:bg-slate-800" />

            <Command.Group heading="Theme" className="text-xs font-medium text-slate-500 dark:text-slate-400 [&_[cmdk-item]]:mt-1">
              <Command.Item
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:text-slate-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
                onSelect={() => runCommand(() => setTheme("light"))}
              >
                <Sun className="mr-2 h-4 w-4" />
                Light
              </Command.Item>
              <Command.Item
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:text-slate-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
                onSelect={() => runCommand(() => setTheme("dark"))}
              >
                <Moon className="mr-2 h-4 w-4" />
                Dark
              </Command.Item>
              <Command.Item
                className="relative flex cursor-default select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:text-slate-50 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50"
                onSelect={() => runCommand(() => setTheme("system"))}
              >
                <Laptop className="mr-2 h-4 w-4" />
                System
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
