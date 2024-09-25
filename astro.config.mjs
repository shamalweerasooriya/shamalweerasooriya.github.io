import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	site: 'https://shamalweerasooriya.github.io/',
  	base: 'shamalweerasooriya.github.io',
	integrations: [tailwind()],
});
