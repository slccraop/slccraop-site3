import { defineConfig } from 'vitest/config'
import { loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env vars (from .env files and process.env) for this mode
  const env = loadEnv(mode, process.cwd(), '')
  const basePath = env.VITE_BASE_PATH || '/'

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