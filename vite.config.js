import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Regista o Service Worker automaticamente e atualiza logo que haja nova versão
      registerType: "autoUpdate",

      // Ficheiros na pasta public que devem ser guardados em cache para uso offline
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],

      manifest: {
        name: "JS Quest: Do Zero ao Fullstack",
        short_name: "JSQuest",
        description: "Aprenda JavaScript explorando masmorras!",
        theme_color: "#282a36", // Cor da barra de status (Estilo Dracula)
        background_color: "#282a36", // Cor de fundo ao abrir a app
        display: "standalone", // Faz a app abrir sem a barra de endereço do browser
        orientation: "portrait", // Força o modo vertical no telemóvel

        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable", // Permite que o Android ajuste o ícone ao formato do sistema
          },
        ],
      },
    }),
  ],
});
