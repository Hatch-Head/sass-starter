import { Presence } from "@ark-ui/react";
import { useEffect, useState } from "react";
import { Button, Icon } from "ui";

const BANNER_HIDDEN_STORAGE_KEY = "banner-hidden";

export default function Banner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem(BANNER_HIDDEN_STORAGE_KEY)) {
      setShowBanner(true);
    }
  }, []);

  function hideBanner() {
    sessionStorage.setItem(BANNER_HIDDEN_STORAGE_KEY, "true");
    setShowBanner(false);
  }
  return (
    <Presence present={showBanner}>
      <div className="bg-primary-500/10 text-primary-950/75 dark:text-primary-100/75 inset-0 bottom-auto px-8 py-4 text-center text-sm data-[state='open']:block data-[state='closed']:hidden">
        <strong>New:</strong> In this banner you can show your awesome new
        feature
        <Button
          intent="primary-ghost"
          size="small"
          className="text-primary-500 absolute right-3 top-2.5 p-1"
          onClick={hideBanner}
        >
          <Icon.close />
        </Button>
      </div>
    </Presence>
  );
}