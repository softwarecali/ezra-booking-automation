import { test, Page } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomePage';
import { SelectScanPage } from '../src/pages/SelectScanPage.ts';
import { ScheduleScanPage } from '../src/pages/ScheduleScanPage.ts';
import { PaymentPage } from '../src/pages/PaymentPage.ts';
import { ConfirmationPage } from '../src/pages/ConfirmationPage.ts';
import { AppointmentsPage } from '../src/pages/AppointmentsPage.ts';

// 🔐 hard-coded for now – change to your staging user
const USER_EMAIL = 'software.california@gmail.com';
const USER_PASSWORD = 'HelloEzra2025';

// 💳 Stripe test cards
const VALID_CARD = '4242424242424242';
const DECLINE_CARD = '4000000000000002';

const CARD_EXP = '12/34';
const CARD_CVC = '123';
const CARD_ZIP = '10001';

async function goToPayment(page: Page) {
  const login = new LoginPage(page);
  const home = new HomePage(page);
  const selectScan = new SelectScanPage(page);
  const schedule = new ScheduleScanPage(page);

  // 1. Login
  await login.goto();
  await login.login(USER_EMAIL, USER_PASSWORD);

  // 2. Go to booking flow
  await home.clickBookScan();

  // 3. Select scan
  await selectScan.fillDob('01/01/1990');
  await selectScan.selectSex('Female');
  await selectScan.selectScanByName('MRI Scan');
  await selectScan.continue();

  // 4. Schedule – pick first available location + time
  await schedule.selectFirstLocation();
  await schedule.selectFirstAvailableTime();
  await schedule.continue();
}

test.describe('Ezra Booking Flow', () => {
  test('TC01 — Successful booking with valid card', async ({ page }) => {
    await goToPayment(page);

    const payment = new PaymentPage(page);
    const confirmation = new ConfirmationPage(page);
    const appointments = new AppointmentsPage(page);

    await payment.fillCardInformation(VALID_CARD, CARD_EXP, CARD_CVC, CARD_ZIP);
    await payment.submit();

    // Confirmation page
    await confirmation.verifyLoaded();
    await confirmation.expectMedicalButtonPresent();
    await confirmation.goToDashboard();

    // Dashboard / appointments – only check stable info
    await appointments.expectAppointmentVisible();
  });

  test('TC02 — Declined card should not create booking', async ({ page }) => {
    await goToPayment(page);

    const payment = new PaymentPage(page);
    const appointments = new AppointmentsPage(page);

    await payment.fillCardInformation(DECLINE_CARD, CARD_EXP, CARD_CVC, CARD_ZIP);
    await payment.submit();

    await payment.expectDeclineError();

    // Double-check no appointments created
    await appointments.goto();
    await appointments.expectNoAppointments();
  });

  test('TC03 — Incomplete card number validation', async ({ page }) => {
    await goToPayment(page);

    const payment = new PaymentPage(page);

    await payment.fillCardNumberPartial('4242 4242 4242'); // too short
    await payment.submit();

    await payment.expectCardIncomplete();
  });
});
