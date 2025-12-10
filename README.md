

## ✔ Automated Test Cases
1. TC01 – Successful end-to-end booking with valid card  
2. TC02 – Declined card – no booking should be created  
3. TC03 – Incomplete card number validation  

These tests validate:
- Revenue-critical booking flow  
- Stripe payment handling  
- UI validation and error handling  
- Appointment creation or failure state  

---

## Setup Instructions

### 1. Install dependencies
```bash
npm install