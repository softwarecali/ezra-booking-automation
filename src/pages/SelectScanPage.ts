import { Page } from '@playwright/test';

export class SelectScanPage {
  constructor(private page: Page) {}

  async fillDob(dob: string) {
    await this.page.locator('input[name="dob"]').fill(dob);
  }

  async selectSex(sex: string) {
    await this.page.getByRole('button', { name: sex }).click();
  }

  async selectScanByName(name: string) {
    await this.page.getByRole('button', { name }).click();
  }

  async continue() {
    await this.page.locator('button[data-test="select-plan-submit-btn"], button:has-text("Continue")').click();
  }
}