import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.page.locator('input[type="email"]').fill(email);
    await this.page.locator('input[type="password"]').fill(password);
    await this.page.locator('button:has-text("Log in")').click();

    // Wait until dashboard / appointments page is loaded
    await this.page.waitForURL('**/dashboard');
    await expect(this.page.locator('text=Appointments')).toBeVisible();
  }
}