"use client";

import { apiClient } from "@shared/lib";
import { ApiOutput } from "api";
import { TeamMemberRole } from "database";
import { useParams, useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

type User = ApiOutput["auth"]["user"];

type UserContext = {
  user: User;
  reloadUser: () => Promise<User | undefined>;
  getRole: (slug?: string) => TeamMemberRole | undefined;
  logout: () => Promise<void>;
  loaded: boolean;
};

const authBroadcastChannel = new BroadcastChannel("auth");
type AuthEvent = {
  type: "loaded" | "logout";
  user: User | null;
};

export const userContext = createContext<UserContext>({
  user: null,
  reloadUser: () => Promise.resolve(undefined),
  logout: () => Promise.resolve(),
  loaded: false,
  getRole: (slug?: string) => undefined,
});

export function UserContextProvider({
  children,
  initialUser,
  teamRole,
}: PropsWithChildren<{
  initialUser: User;
  teamRole?: TeamMemberRole;
}>) {
  const router = useRouter();
  const params = useParams();
  const [loaded, setLoaded] = useState(!!initialUser);
  const [user, setUser] = useState<User>(initialUser);
  const userQuery = apiClient.auth.user.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !initialUser,
  });
  const logoutMutation = apiClient.auth.logout.useMutation();

  const reloadUser = async () => {
    const result = await userQuery.refetch();
    return result.data;
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
    userQuery.remove();
    setUser(null);
    authBroadcastChannel.postMessage({
      type: "logout",
      user: null,
    } satisfies AuthEvent);
    router.replace("/auth/login");
  };

  useEffect(() => {
    if (userQuery.data) setUser(userQuery.data);
  }, [userQuery.data]);

  useEffect(() => {
    if (userQuery.isSuccess) setLoaded(true);
  }, [userQuery.isSuccess]);

  useEffect(() => {
    if (user && loaded)
      authBroadcastChannel.postMessage({
        type: "loaded",
        user: user,
      });
  }, [user, loaded]);

  useEffect(() => {
    const handleAuthEvent = async (event: MessageEvent<AuthEvent>) => {
      if (JSON.stringify(event.data.user) !== JSON.stringify(user)) {
        if (event.data.type === "logout") {
          userQuery.remove();
          setUser(null);
          router.replace("/");
        } else {
          setUser(event.data.user);
        }
      }
    };

    authBroadcastChannel.addEventListener("message", handleAuthEvent);

    return () =>
      authBroadcastChannel.removeEventListener("message", handleAuthEvent);
  }, [user]);

  const getRole = (slug?: string) => {
    const teamSlug = slug ?? params.teamSlug;
    if (!user || !teamSlug) return undefined;
    if (user.teamMemberships) {
      const membership = user.teamMemberships.find(
        (membership) => membership.team.slug === teamSlug,
      );
      return membership?.role ? membership?.role : undefined;
    }
  };

  return (
    <userContext.Provider value={{ user, reloadUser, logout, loaded, getRole }}>
      {children}
    </userContext.Provider>
  );
}
