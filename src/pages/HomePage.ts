import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async clickBookScan() {
    // "Book a scan" button on the dashboard
    await this.page.locator('[data-testid="book-scan-btn"]').click();
  }
}