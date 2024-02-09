"use client";

import { Button } from "@acme/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ErrorProps = {
  statusCode: number;
  title: string;
  message: string;
};

export const Error = ({ statusCode, title, message }: ErrorProps) => {
  const router = useRouter();
  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="container mx-auto min-h-screen px-6 py-12 lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <p className="text-primary-500 dark:text-primary-400 text-sm font-medium">
            {statusCode} error
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-gray-800 dark:text-white md:text-7xl">
            {title}
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">{message}</p>

          <div className="mt-6 flex items-center gap-x-3">
            <button
              onClick={() => router.back()}
              className="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800 sm:w-auto"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-5 w-5 rtl:rotate-180"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Go back</span>
            </button>

            <Button as={Link} href="/">
              Take me home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const NotFound = () => (
  <Error
    statusCode={404}
    title="Page not found"
    message="Sorry, the page you are looking for doesn't exist. Here are some helpful links:"
  />
);

export const Unauthorized = () => (
  <Error
    statusCode={401}
    title="Unauthorized"
    message="You are not authorized to view this page"
  />
);

export const NotInTeam = () => (
  <Error
    statusCode={403}
    title="Not in team"
    message="You are not a member of this team. Contact the team owner to get an invite to join."
  />
);

export default Error;
