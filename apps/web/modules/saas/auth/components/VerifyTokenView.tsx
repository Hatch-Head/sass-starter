"use client";

import { apiClient } from "@shared/lib";
import { Icon } from "@ui/components";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Error } from "../../../shared/components/Error";
import { useUser } from "../hooks";

export function VerifyTokenView() {
  const t = useTranslations();
  const [loading, setLoading] = useState(true);
  const [tokenVerified, setTokenVerified] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { reloadUser } = useUser();

  const token = searchParams.get("token") || "";

  const verifyTokenMutation = apiClient.auth.verifyToken.useMutation();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        await verifyTokenMutation.mutateAsync({ token });
        setTokenVerified(true);
        await reloadUser();
      } catch (e) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center py-8">
        <Icon.spinner className="h-8 w-8 animate-spin" />
      </div>
    );

  // TODO: Add texts for invalid token
  if (!tokenVerified) {
    return (
      <Error title="Invalid token" message="The token is invalid" code={400} />
    );
  } else {
    router.push("/");
  }

  return null;
}
