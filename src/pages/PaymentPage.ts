import { Page, expect } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}

  private stripeFrame = 'iframe[name^="__privateStripeFrame"]';

  async fillCardInformation(card: string, exp: string, cvc: string, zip: string) {
    const frame = this.page.frameLocator(this.stripeFrame);

    await frame.locator('#Field-numberInput').fill(card);
    await frame.locator('#Field-expiryInput').fill(exp);
    await frame.locator('#Field-cvcInput').fill(cvc);
    await frame.locator('#Field-postalCodeInput').fill(zip);
  }

  async fillCardNumberPartial(partial: string) {
    const frame = this.page.frameLocator(this.stripeFrame);
    await frame.locator('#Field-numberInput').fill(partial);
  }

  async submit() {
    await this.page.locator('button[data-test="submit"], button:has-text("Continue")').click();
  }

  async expectDeclineError() {
    await expect(this.page.getByText(/card was declined/i)).toBeVisible();
  }

  async expectCardIncomplete() {
    await expect(this.page.getByText(/incomplete card/i)).toBeVisible();
  }
}