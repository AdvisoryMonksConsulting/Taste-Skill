// Re-export the template's dynamic OG image so the live demo route generates it at build.
export const dynamic = "force-static"; // required for output: 'export'
export { default, alt, size, contentType } from "../../../../templates/landing-page/opengraph-image";
