/* eslint-disable no-undef */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const enableSentry = !!env.SENTRY_AUTH_TOKEN && !!env.VITE_SENTRY_DSN;

  return {
    plugins: [
      react(),
    ]
  };
});
