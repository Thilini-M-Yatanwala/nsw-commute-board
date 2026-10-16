import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      command: 'npm run dev --prefix server',
      url: 'http://localhost:4000/api/health',
      reuseExistingServer: true,
    },
    {
      command: 'npm run dev --prefix client',
      url: 'http://localhost:5173',
      reuseExistingServer: true,
    },
  ],
});