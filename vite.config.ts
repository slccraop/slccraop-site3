import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Base path for the site.
// Set VITE_BASE_PATH env var to customize (e.g., '/slccraop-site3/' for GitHub Pages subpath).
// Defaults to '/' for Cloudflare Pages root deployment.
const basePath = import.meta.env.VITE_BASE_PATH || '/'

export default defineConfig(({ mode }) => {
  const sample = mode === 'sample'
  // Use the configured base path; override for sample preview to './'
  const base = sample ? './' : basePath

  return {
    plugins: [react()],
    base,
    build: {
      target: 'es2020',
      sourcemap: false,
      assetsInlineLimit: 0,
      outDir: sample ? 'preview' : 'dist',
      cssCodeSplit: !sample,
      ...(sample
        ? { rollupOptions: { output: { format: 'iife' as const, inlineDynamicImports: true } } }
        : {}),
    },
    test: { environment: 'node', include: ['src/**/*.test.{ts,txs}'] },
  }
})