"use client";

import { cva } from "class-variance-authority";
import { usePathname } from "next-intl/client";
import Link from "next-intl/link";
import React from "react";

export function SettingsMenu({
  menuItems,
}: {
  menuItems: Array<{
    title: string;
    avatar: React.ReactNode;
    items: Array<{
      title: string;
      href: string;
    }>;
  }>;
}) {
  const pathname = usePathname();

  const isActiveMenuItem = (href: string) => pathname.includes(href);

  const linkStyle = cva("block py-1.5", {
    variants: {
      active: {
        true: "text-gray-900 font-bold",
        false: "text-gray-500",
      },
    },
  });

  return (
    <div className="space-y-8">
      {menuItems.map((item, i) => (
        <div key={i}>
          <div className="flex items-center justify-start gap-4">
            {item.avatar}
            <h2 className="">{item.title}</h2>
          </div>

          <ul className="mt-1 list-none">
            {item.items.map((subitem, k) => (
              <li key={k}>
                <Link
                  href={subitem.href}
                  className={linkStyle({
                    active: isActiveMenuItem(subitem.href),
                  })}
                >
                  {subitem.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
