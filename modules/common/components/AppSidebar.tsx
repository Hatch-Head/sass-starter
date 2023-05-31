'use client';

import Logo from '@common/components/Logo';
import UserMenu from '@common/components/UserMenu';
import { isSidebarExpanded } from '@common/state';
import { Button, Icon } from '@ui/components';
import WorkspacesSelect from '@workspaces/components/WorkspaceSelect';
import { useSetAtom } from 'jotai';
import { User } from 'next-auth';
import Link from 'next-intl/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { PropsWithChildren, useCallback } from 'react';

const menuItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    segment: null,
    icon: Icon.grid,
  },
  {
    label: 'Projects',
    href: '/dashboard/projects',
    segment: 'projects',
    icon: Icon.archive,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings/account',
    segment: 'settings',
    icon: Icon.settings,
  },
];

export default function AppSidebar({
  isExpanded,
  onClose,
  user,
  workspaces,
  selectedWorkspace,
}: PropsWithChildren<{
  isExpanded?: boolean;
  onClose?: () => void;
  user: User;
  workspaces: { id: string; name: string }[];
  selectedWorkspace: string;
}>) {
  const selectedSegment = useSelectedLayoutSegment();
  const positionClass = isExpanded ? 'left-0' : '-left-[280px] lg:left-0';
  const setSidebarExpanded = useSetAtom(isSidebarExpanded);

  const isActiveMenuItem = useCallback((segment: string | null) => selectedSegment === segment, [selectedSegment]);

  return (
    <nav
      className={`fixed top-0 ${positionClass} z-40 h-screen w-[280px] border-r border-zinc-100 bg-white transition-all duration-300 ease-in-out dark:border-zinc-800`}
    >
      <div className="flex justify-end px-6 py-2 lg:hidden">
        <Button intent="primary-outline" size="small" onClick={() => setSidebarExpanded(false)}>
          <span className="sr-only">Toggle sidebar</span>
          <Icon.close className="h-4 w-4" />
        </Button>
      </div>
      <div className="p-6">
        <Logo />
      </div>

      <div className="px-6">
        <WorkspacesSelect workspaces={workspaces} selectedWorkspace={selectedWorkspace} />
      </div>

      <ul className="mt-6 list-none px-6">
        {menuItems.map((menuItem) => (
          <li key={menuItem.href}>
            <Link
              href={menuItem.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 hover:text-black hover:no-underline focus:no-underline dark:hover:text-white ${
                isActiveMenuItem(menuItem.segment) ? 'bg-blue-500/10 font-bold text-black dark:text-white' : ''
              }`}
            >
              <menuItem.icon
                className={`h-6 w-6 transform ${
                  isActiveMenuItem(menuItem.segment) ? 'text-blue-500' : 'text-black/50 dark:text-white/50'
                }`}
              />
              <span>{menuItem.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-0 w-full p-6">
        <UserMenu user={user} />
      </div>
    </nav>
  );
}
