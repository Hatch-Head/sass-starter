'use client';

import { Menu, MenuContent, MenuOptionItem, MenuPositioner, MenuTrigger } from '@ark-ui/react';
import { Button, Icon } from '@ui/components';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useIsClient } from 'usehooks-ts';

export function ColorModeToggle() {
  const t = useTranslations('common.colorMode');
  const { resolvedTheme, setTheme, theme } = useTheme();
  const isClientSide = useIsClient();
  const [value, setValue] = useState<Record<string, string>>({
    colorScheme: theme ?? 'system',
  });

  const colorModeOptions = [
    {
      value: 'system',
      label: t('system'),
      icon: <Icon.system className="h-4 w-4" />,
    },
    {
      value: 'light',
      label: t('light'),
      icon: <Icon.lightMode className="h-4 w-4" />,
    },
    {
      value: 'dark',
      label: t('dark'),
      icon: <Icon.darkMode className="h-4 w-4" />,
    },
  ];

  return (
    <Menu
      value={value}
      onValueChange={({ value }) => {
        setTheme(value as string);
        setValue({ colorScheme: value as string });
      }}
      loop
    >
      <MenuTrigger asChild>
        <Button intent="primary-outline" size="small">
          {isClientSide && resolvedTheme === 'light' ? (
            <Icon.lightMode className="h-4 w-4" />
          ) : (
            <Icon.darkMode className="h-4 w-4" />
          )}
        </Button>
      </MenuTrigger>

      {isClientSide && (
        <MenuPositioner>
          <MenuContent className="rounded-lg border border-zinc-200 bg-white p-1 text-zinc-600 shadow-sm focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
            {colorModeOptions.map((option) => (
              <MenuOptionItem
                key={option.value}
                name="colorScheme"
                type="radio"
                value={option.value}
                className="flex cursor-pointer items-center justify-start gap-3 rounded-md px-4 py-1.5 not-italic data-[focus]:bg-zinc-100 data-[checked]:font-bold data-[checked]:text-zinc-900 dark:data-[focus]:bg-zinc-800 dark:data-[checked]:text-white"
              >
                {option.icon} {option.label}
              </MenuOptionItem>
            ))}
          </MenuContent>
        </MenuPositioner>
      )}
    </Menu>
  );
}