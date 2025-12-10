import { Page } from '@playwright/test';

export class ScheduleScanPage {
  constructor(private page: Page) {}

  async selectFirstLocation() {
    await this.page.locator('.location-card').first().click();
  }

  async selectFirstAvailableTime() {
    await this.page.locator('.appointments__individual-appointment label').first().click();
  }

  async continue() {
    await this.page.locator('.submit-wrapper button').click();
  }
}