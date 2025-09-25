import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { structureTool } from "sanity/structure";
import schemaTypes from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "Product Catalogue CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool(), visionTool()]
});


