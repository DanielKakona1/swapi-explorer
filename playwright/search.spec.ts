import { expect, test } from '@playwright/test';

const peopleJa = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      name: 'Jabba Desilijic Tiure',
      height: '175',
      mass: '1,358',
      hair_color: 'n/a',
      skin_color: 'green-tan, brown',
      eye_color: 'orange',
      birth_year: '600BBY',
      gender: 'hermaphrodite',
    },
    {
      name: 'Jar Jar Binks',
      height: '196',
      mass: '66',
      hair_color: 'none',
      skin_color: 'orange',
      eye_color: 'orange',
      birth_year: '52BBY',
      gender: 'male',
    },
    {
      name: 'Jango Fett',
      height: '183',
      mass: '79',
      hair_color: 'black',
      skin_color: 'tan',
      eye_color: 'brown',
      birth_year: '66BBY',
      gender: 'male',
    },
  ],
};

test('searches and renders selected character details', async ({ page }) => {
  await page.route(/\/api\/people\/\?search=ja.*/, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(peopleJa),
    });
  });

  await page.goto('/');
  await expect(page.getByText('Start your Star Wars search')).toBeVisible();

  const input = page.getByTestId('search-input');

  await input.fill('j');
  await expect(page.getByText('Start your Star Wars search')).toBeVisible();

  await input.fill('ja');
  await expect(page.getByText('Start your Star Wars search')).toBeHidden();
  await expect(page.locator('[data-cy="result-card"]')).toHaveCount(0);

  await page.getByRole('button', { name: 'Jango Fett' }).click();
  await expect(page.getByRole('button', { name: 'Jango Fett' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Clear search' })).toBeVisible();

  const resultCard = page.locator('[data-cy="result-card"]');
  await expect(resultCard).toContainText('Character details');
  await expect(resultCard).toContainText('Jango Fett');
  await expect(resultCard).toContainText('183');
  await expect(resultCard).toContainText('79');
  await expect(resultCard).toContainText('black');
  await expect(resultCard).toContainText('tan');
  await expect(resultCard).toContainText('brown');
  await expect(resultCard).toContainText('66BBY');
  await expect(resultCard).toContainText('male');

  await page.getByRole('button', { name: 'Clear search' }).click();
  await expect(input).toHaveValue('');
  await expect(page.getByText('Start your Star Wars search')).toBeVisible();
  await expect(resultCard).toHaveCount(0);
});
