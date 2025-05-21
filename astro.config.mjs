import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify({
    // Configuración específica para Netlify
    edgeMiddleware: true,
    functionPerRoute: false
  }),
  integrations: [
    tailwind({
      // Configuración de Tailwind
      applyBaseStyles: false, // Desactivamos los estilos base de Tailwind ya que los tenemos en global.css
    })
  ]
});