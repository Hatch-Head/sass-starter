import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {

  plop.setHelper("ufirst", (str) =>
    str.charAt(0).toUpperCase() + str.slice(1)
  );

  plop.setGenerator("init", {
    description: "Generate a new package for the Acme Monorepo",
    prompts: [
      {
        type: "input",
        name: "name",
        message:
          "What is the name of the component?",
      }
    ],
    actions: [
      (answers) => {
        if ("name" in answers && typeof answers.name === "string") {
          if (answers.name.startsWith("@acme/")) {
            answers.name = answers.name.replace("@acme/", "");
          }
        }
        return "Config sanitized";
      },
      {
        type: "add",
        path: "src/{{ name }}/{{ name }}.tsx",
        templateFile: "templates/component.hbs",

      },
      {
        type: "add",
        path: "src/{{ name }}/{{ name }}.stories.tsx",
        templateFile: "templates/story.hbs",
      }
    ],
  });
}
