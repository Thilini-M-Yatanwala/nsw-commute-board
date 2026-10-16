import { test, expect } from '@playwright/test';

test('commuter can find a station and report an issue', async ({ page }) => {
  const description = `Escalator stopped near the exit ${Date.now()}`;

  // 1. Search for the station
  await page.goto('/');
  await page.getByLabel('Search station').fill('parra');
  await page.getByRole('link', { name: 'Parramatta' }).click();

  // 2. Station page shows departures
  await expect(page.getByRole('heading', { name: 'Parramatta' })).toBeVisible();
  await expect(page.getByText('City via Strathfield')).toBeVisible();

  // 3. Open the report form and fill it in
  await page.getByRole('link', { name: /report an issue/i }).click();
  await page.getByLabel('Category').selectOption('lift');
  await page.getByLabel(/what's the problem/i).fill(description);
  await page.getByRole('button', { name: 'Submit report' }).click();

  // 4. Success screen with a reference number
  await expect(page.getByText('Thanks, your report has been sent')).toBeVisible();
  await expect(page.getByText(/Reference R-\d+/)).toBeVisible();

  // 5. Back on the station page, the new report is listed as Open
  await page.getByRole('link', { name: 'Back to Parramatta' }).click();
  await expect(page.getByText(description)).toBeVisible();
});

test('report form shows validation errors from the server', async ({ page }) => {
  await page.goto('/station/parramatta/report');

  await page.getByRole('button', { name: 'Submit report' }).click();

  await expect(page.getByText('Choose a valid category')).toBeVisible();
  await expect(page.getByText('Description must be at least 10 characters')).toBeVisible();
  await expect(page).toHaveURL(/\/station\/parramatta\/report$/);
});