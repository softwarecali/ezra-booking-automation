import { Page, expect } from '@playwright/test';

export class AppointmentsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/dashboard');
  }

  async expectAppointmentVisible() {
    // Only check stable info: scan name is shown somewhere
    await expect(this.page.locator('text="MRI Scan"')).toBeVisible();
  }

  async expectNoAppointments() {
    // No "Scheduled on ..." text at all
    await expect(this.page.locator('text=Scheduled on')).toHaveCount(0);
  }
}