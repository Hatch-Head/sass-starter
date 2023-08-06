import { allPosts } from "contentlayer/generated";
import { useTranslations } from "next-intl";
import { getTranslator } from "next-intl/server";
import { PostListItem } from "./PostListItem";

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslator(locale, "blog");
  return {
    title: t("title"),
  };
}

export default function BlogListPage() {
  const t = useTranslations("blog");

  return (
    <div className="container max-w-5xl py-24">
      <div className="mb-12 pt-8 text-center">
        <h1 className="mb-2 text-5xl font-bold">{t("title")}</h1>
        <p className="text-lg opacity-50">{t("description")}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {allPosts.map((post) => (
          <PostListItem post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}