import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // This ensures process.env.API_KEY in the code is replaced by the actual environment variable value
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY)
    }
  };
});
