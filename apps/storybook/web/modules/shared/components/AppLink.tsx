"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface AppLinkProps extends LinkProps {
  rootPath?: string;
  children?: React.ReactNode;
}

const AppLink: React.FC<AppLinkProps> = ({ rootPath, href, ...props }) => {
  const pathname = usePathname();
  const root = rootPath || pathname.split("/").slice(0, 2).join("/");

  return <Link {...props} href={`${root}${href}`} />;
};

export default AppLink;
