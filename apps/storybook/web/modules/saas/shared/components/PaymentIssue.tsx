import AppLink from "@shared/components/AppLink";

export default function () {
  return (
    <div className="bg-error-600 py-2 text-center text-white lg:px-4">
      <AppLink href="/settings/team/billing">
        <div
          className="bg-error-800 text-error-100 flex items-center p-2 leading-none lg:inline-flex lg:rounded-full"
          role="alert"
        >
          <span className="bg-error-500 mr-3 flex rounded-full px-2 py-1 text-xs font-bold uppercase">
            Payment issue
          </span>
          <span className="mr-2 flex-auto text-left font-semibold">
            Please update your payment details.
          </span>
          <svg
            className="h-4 w-4 fill-current opacity-75"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
          </svg>
        </div>
      </AppLink>
    </div>
  );
}
