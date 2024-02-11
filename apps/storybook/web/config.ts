
const pallet = {
  "25": "#fcfaff",
  "50": "#f9f5ff",
  "100": "#f4ebff",
  "200": "#e9d7fe",
  "300": "#d6bbfb",
  "400": "#b692f6",
  "500": "#9e77ed",
  "600": "#7f56d9",
  "700": "#6941c6",
  "800": "#53389e",
  "900": "#42307d"
}

export const appConfig = {
  i18n: {
    locales: ["en", "de", "es"],
    defaultLocale: "en",
    localeLabels: {
      en: "English",
      es: "Español",
      de: "Deutsch",
      fr: "asdf",
    },
    localeCurrencies: {
      /* This only works with Stripe for now. For LemonSqueezy, we need to set the currency in the LemonSqueezy dashboard and there can only be one. */
      en: "AUD",
      de: "USD",
      es: "USD",
    },
  },
  auth: {
    oAuthProviders: ["google", "github"],
  },
  marketing: {
    menu: [
      {
        translationKey: "pricing",
        href: "/pricing",
      },
      {
        translationKey: "blog",
        href: "/Blog",
      },
    ],
  },
  teams: {
    avatarColors: [pallet[600], pallet[200], pallet[500], pallet[50], pallet[600]],
  },
};
