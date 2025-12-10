import { Page, expect } from '@playwright/test';

export class ConfirmationPage {
  constructor(private page: Page) {}

  async verifyLoaded() {
    await expect(this.page.locator('h4', { hasText: 'MRI Scan Appointment' })).toBeVisible();
  }

  async expectMedicalButtonPresent() {
    await expect(this.page.locator('button', { hasText: 'Begin Medical Questionnaire' })).toBeVisible();
  }

  async goToDashboard() {
    await this.page.locator('a', { hasText: 'Go to Dashboard' }).click();
  }
}