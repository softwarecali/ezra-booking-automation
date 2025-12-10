import { Page, expect } from '@playwright/test';

export class ConfirmationPage {
  constructor(private page: Page) {}

  async verifyLoaded() {
    await expect(this.page.getByText('Booking Confirmed')).toBeVisible();
  }

  async expectMedicalButtonPresent() {
    await expect(
      this.page.locator('button[data-test="go-to-medical-btn"]')
    ).toBeVisible();
  }

  async goToDashboard() {
    await this.page.locator('button[data-test="go-to-dashboard-btn"]').click();
  }
}