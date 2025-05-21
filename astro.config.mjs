import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [
    tailwind({
      // Configuración de Tailwind
      applyBaseStyles: false, // Desactivamos los estilos base de Tailwind ya que los tenemos en global.css
    })
  ]
});