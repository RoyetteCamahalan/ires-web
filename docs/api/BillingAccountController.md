# Billing Account Module � API Documentation

Base URL: `/api/billingaccount`

> **Auth:** All endpoints require a valid JWT Bearer token. `CompanyId` and `CreatedById` / `UpdatedById` are resolved server-side from the token � do not send them from the frontend.

---

## Table of Contents

- [Constants / Allowed Values](#constants--allowed-values)
- [Entity Schemas](#entity-schemas)
  - [BillingAccount](#billingaccount)
  - [BillingPayment](#billingpayment)
- [Endpoints � Billing Accounts](#endpoints--billing-accounts)
  - [GET /api/billingaccount/{id}](#get-apibillingaccountid)
  - [GET /api/billingaccount/getall](#get-apibillingaccountgetall)
  - [POST /api/billingaccount](#post-apibillingaccount)
  - [PUT /api/billingaccount](#put-apibillingaccount)
  - [PATCH /api/billingaccount/{id}/status](#patch-apibillingaccountidstatus)
- [Endpoints � Billing Payments](#endpoints--billing-payments)
  - [GET /api/billingaccount/{billingAccountId}/payments](#get-apibillingaccountbillingaccountidpayments)
  - [GET /api/billingaccount/payments/{id}](#get-apibillingaccountpaymentsid)
  - [POST /api/billingaccount/payments](#post-apibillingaccountpayments)
  - [PATCH /api/billingaccount/payments/{id}/void](#patch-apibillingaccountpaymentsidvoid)
- [Vue Service Example](#vue-service-example)

---

## Constants / Allowed Values

### `frequency` � `BillingFrequency`

| Value       | Description                                    |
| ----------- | ---------------------------------------------- |
| `"Weekly"`  | Recurs every week. Use `dueDayOfWeek` (0�6)    |
| `"Monthly"` | Recurs every month. Use `dueDayOfMonth` (1�31) |

### `status` � `BillingPaymentStatus`

| Value      | Description                          |
| ---------- | ------------------------------------ |
| `"Paid"`   | Payment has been posted successfully |
| `"Voided"` | Payment has been voided              |

### `dueDayOfWeek` reference

| Value | Day       |
| ----- | --------- |
| `0`   | Sunday    |
| `1`   | Monday    |
| `2`   | Tuesday   |
| `3`   | Wednesday |
| `4`   | Thursday  |
| `5`   | Friday    |
| `6`   | Saturday  |

---

## Entity Schemas

### BillingAccount

**Database table:** `billing_accounts`

| Field              | Type                   | Nullable | Description                                                                              |
| ------------------ | ---------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `id`               | `number`               | No       | Primary key                                                                              |
| `companyId`        | `number`               | No       | Company scope (server-resolved)                                                          |
| `accountName`      | `string`               | No       | Friendly label, e.g. `"Main Office - MERALCO"`                                           |
| `vendorId`         | `number`               | No       | FK ? `vendors`                                                                           |
| `officeId`         | `number`               | No       | FK ? `accounts` (Office). Expense will be posted here                                    |
| `expenseTypeId`    | `number`               | No       | FK ? `expensetypes`. Default expense category                                            |
| `hasFixedAmount`   | `boolean`              | No       | `true` = fixed recurring amount; `false` = variable (e.g. electricity)                   |
| `amount`           | `number`               | Yes      | Required only when `hasFixedAmount = true`, otherwise `null`                             |
| `frequency`        | `string`               | No       | `"Weekly"` or `"Monthly"`                                                                |
| `dueDayOfMonth`    | `number`               | Yes      | Day of month (1�31). Used when `frequency = "Monthly"`                                   |
| `dueDayOfWeek`     | `number`               | Yes      | Day of week (0�6). Used when `frequency = "Weekly"`                                      |
| `notifyDaysBefore` | `number`               | No       | How many days before the due date to send a notification                                 |
| `notifyOption`     | `string`               | No       | Who receives due-date notifications. One of `"None"`, `"OnlyMe"` (default), `"AllUsers"` |
| `isActive`         | `boolean`              | No       | Account status                                                                           |
| `memo`             | `string`               | No       | Optional notes                                                                           |
| `createdById`      | `number`               | No       | FK ? employee (server-resolved)                                                          |
| `dateCreated`      | `string (ISO 8601)`    | Yes      | Server-set timestamp                                                                     |
| `vendor`           | `VendorViewModel`      | Yes      | Populated on GET                                                                         |
| `office`           | `OfficeViewModel`      | Yes      | Populated on GET                                                                         |
| `expenseType`      | `ExpenseTypeViewModel` | Yes      | Populated on GET                                                                         |

---

### BillingPayment

**Database table:** `billing_payments`

| Field              | Type                      | Nullable | Description                                        |
| ------------------ | ------------------------- | -------- | -------------------------------------------------- |
| `id`               | `number`                  | No       | Primary key                                        |
| `companyId`        | `number`                  | No       | Company scope (server-resolved)                    |
| `billingAccountId` | `number`                  | No       | FK ? `billing_accounts`                            |
| `expenseId`        | `number`                  | Yes      | FK ? `expenses`. Auto-created on post              |
| `amount`           | `number`                  | No       | Actual amount paid                                 |
| `paymentDate`      | `string (ISO 8601)`       | Yes      | Date the payment was made                          |
| `periodFrom`       | `string (ISO 8601)`       | Yes      | Coverage period start                              |
| `periodTo`         | `string (ISO 8601)`       | Yes      | Coverage period end                                |
| `nextDueDate`      | `string (ISO 8601)`       | Yes      | Computed next due date for notification triggering |
| `refNo`            | `string`                  | No       | Reference number (receipt / check / bank ref)      |
| `paymentMode`      | `string`                  | No       | e.g. `"Cash"`, `"Check"`, `"Bank Transfer"`        |
| `status`           | `string`                  | No       | `"Paid"` or `"Voided"`                             |
| `remarks`          | `string`                  | No       | Optional notes                                     |
| `createdById`      | `number`                  | No       | FK ? employee (server-resolved)                    |
| `dateCreated`      | `string (ISO 8601)`       | Yes      | Server-set timestamp                               |
| `billingAccount`   | `BillingAccountViewModel` | Yes      | Populated on GET                                   |
| `expense`          | `ExpenseViewModel`        | Yes      | Populated on GET                                   |

---

## Endpoints � Billing Accounts

---

### GET `/api/billingaccount/{id}`

Retrieve a single billing account by its ID.

**URL Parameters**

| Param | Type     | Description        |
| ----- | -------- | ------------------ |
| `id`  | `number` | Billing account ID |

**Responses**

| Status | Description                       |
| ------ | --------------------------------- |
| `200`  | Returns `BillingAccountViewModel` |
| `404`  | Account not found                 |

**Response example**

```json
{
  "id": 1,
  "companyId": 3,
  "accountName": "Main Office - MERALCO",
  "vendorId": 5,
  "officeId": 2,
  "expenseTypeId": 4,
  "hasFixedAmount": false,
  "amount": null,
  "frequency": "Monthly",
  "dueDayOfMonth": 15,
  "dueDayOfWeek": null,
  "notifyDaysBefore": 3,
  "notifyOption": "OnlyMe",
  "isActive": true,
  "memo": "Electricity - Main Building",
  "createdById": 10,
  "dateCreated": "2025-04-01T08:00:00",
  "vendor": {
    "vendorid": 5,
    "vendorname": "MERALCO",
    "address": "...",
    "isactive": true
  },
  "office": { "accountid": 2, "accountname": "Main Office", "isactive": true },
  "expenseType": {
    "expensetypeid": 4,
    "expensetypedesc": "Utilities",
    "isactive": true
  }
}
```

---

### GET `/api/billingaccount/getall`

Retrieve all billing accounts for the authenticated company.

**Query Parameters**

| Param     | Type      | Default | Description                           |
| --------- | --------- | ------- | ------------------------------------- |
| `viewAll` | `boolean` | `false` | `true` = include inactive accounts    |
| `search`  | `string`  | `""`    | Filter by account name or vendor name |

**Responses**

| Status | Description                         |
| ------ | ----------------------------------- |
| `200`  | Returns `BillingAccountViewModel[]` |

**Response example**

```json
[
  {
    "id": 1,
    "accountName": "Main Office - MERALCO",
    "frequency": "Monthly",
    "isActive": true,
    ...
  },
  {
    "id": 2,
    "accountName": "Branch - PLDT",
    "frequency": "Monthly",
    "isActive": true,
    ...
  }
]
```

---

### POST `/api/billingaccount`

Create a new billing account. `companyId` and `createdById` are injected from the JWT token.

**Request Body** `application/json`

```json
{
  "accountName": "Main Office - MERALCO",
  "vendorId": 5,
  "officeId": 2,
  "expenseTypeId": 4,
  "hasFixedAmount": false,
  "amount": null,
  "frequency": "Monthly",
  "dueDayOfMonth": 15,
  "dueDayOfWeek": null,
  "notifyDaysBefore": 3,
  "notifyOption": "OnlyMe",
  "memo": "Electricity - Main Building"
}
```

> For a **fixed amount** account (e.g. internet subscription):
>
> ```json
> {
>   "accountName": "Branch - PLDT Fiber",
>   "vendorId": 6,
>   "officeId": 3,
>   "expenseTypeId": 4,
>   "hasFixedAmount": true,
>   "amount": 2500.0,
>   "frequency": "Monthly",
>   "dueDayOfMonth": 10,
>   "dueDayOfWeek": null,
>   "notifyDaysBefore": 5,
>   "notifyAllUsers": true,
>   "memo": ""
> }
> ```

> For a **weekly** account:
>
> ```json
> {
>   "frequency": "Weekly",
>   "dueDayOfWeek": 5,
>   "dueDayOfMonth": null,
>   ...
> }
> ```

**Responses**

| Status | Description                               |
| ------ | ----------------------------------------- |
| `200`  | Returns created `BillingAccountViewModel` |

---

### PUT `/api/billingaccount`

Update an existing billing account. `updatedById` is injected from the JWT token.

**Request Body** `application/json`

```json
{
  "id": 1,
  "accountName": "Main Office - MERALCO (Updated)",
  "vendorId": 5,
  "officeId": 2,
  "expenseTypeId": 4,
  "hasFixedAmount": false,
  "amount": null,
  "frequency": "Monthly",
  "dueDayOfMonth": 20,
  "dueDayOfWeek": null,
  "notifyDaysBefore": 2,
  "notifyOption": "OnlyMe",
  "memo": "Updated memo"
}
```

**Responses**

| Status | Description       |
| ------ | ----------------- |
| `200`  | Update successful |
| `404`  | Account not found |

---

### PATCH `/api/billingaccount/{id}/status`

Activate or deactivate a billing account.

**URL Parameters**

| Param | Type     | Description        |
| ----- | -------- | ------------------ |
| `id`  | `number` | Billing account ID |

**Query Parameters**

| Param      | Type      | Description                             |
| ---------- | --------- | --------------------------------------- |
| `isActive` | `boolean` | `true` = activate, `false` = deactivate |

**Responses**

| Status | Description       |
| ------ | ----------------- |
| `200`  | Status updated    |
| `404`  | Account not found |

---

## Endpoints � Billing Payments

---

### GET `/api/billingaccount/{billingAccountId}/payments`

Retrieve all payments for a specific billing account.

**URL Parameters**

| Param              | Type     | Description        |
| ------------------ | -------- | ------------------ |
| `billingAccountId` | `number` | Billing account ID |

**Responses**

| Status | Description                                                    |
| ------ | -------------------------------------------------------------- |
| `200`  | Returns `BillingPaymentViewModel[]` ordered by date descending |

**Response example**

```json
[
  {
    "id": 10,
    "companyId": 3,
    "billingAccountId": 1,
    "expenseId": 88,
    "amount": 4200.00,
    "paymentDate": "2025-04-05T00:00:00",
    "periodFrom": "2025-03-01T00:00:00",
    "periodTo": "2025-03-31T00:00:00",
    "nextDueDate": "2025-05-15T00:00:00",
    "refNo": "OR-20250405",
    "paymentMode": "Cash",
    "status": "Paid",
    "remarks": "",
    "createdById": 10,
    "dateCreated": "2025-04-05T09:30:00",
    "billingAccount": { ... },
    "expense": { ... }
  }
]
```

---

### GET `/api/billingaccount/payments/{id}`

Retrieve a single payment record by its ID.

**URL Parameters**

| Param | Type     | Description        |
| ----- | -------- | ------------------ |
| `id`  | `number` | Billing payment ID |

**Responses**

| Status | Description                       |
| ------ | --------------------------------- |
| `200`  | Returns `BillingPaymentViewModel` |
| `404`  | Payment not found                 |

---

### POST `/api/billingaccount/payments`

Post a payment against a billing account. This automatically creates a linked `Expense` record. `companyId` and `createdById` are injected from the JWT token.

**Request Body** `application/json`

```json
{
  "billingAccountId": 1,
  "amount": 4200.0,
  "paymentDate": "2025-04-05",
  "periodFrom": "2025-03-01",
  "periodTo": "2025-03-31",
  "nextDueDate": "2025-05-15",
  "refNo": "OR-20250405",
  "paymentMode": "Cash",
  "remarks": ""
}
```

> `nextDueDate` drives future notification. Compute it on the frontend based on `frequency` and `dueDayOfMonth` / `dueDayOfWeek` of the parent account.

**Responses**

| Status | Description                                                       |
| ------ | ----------------------------------------------------------------- |
| `200`  | Returns created `BillingPaymentViewModel` with the linked expense |

---

### PATCH `/api/billingaccount/payments/{id}/void`

Void a payment. Also voids the linked `Expense` record.

**URL Parameters**

| Param | Type     | Description        |
| ----- | -------- | ------------------ |
| `id`  | `number` | Billing payment ID |

**Responses**

| Status | Description                           |
| ------ | ------------------------------------- |
| `200`  | Payment and its linked expense voided |
| `404`  | Payment not found                     |

---

## Vue Service Example

A composable service file for consuming all endpoints.

```js
// src/services/billingAccountService.js
import axios from "axios";

const BASE = "/api/billingaccount";

export const billingAccountService = {
  // ?? Billing Accounts ??????????????????????????????????????????

  getById(id) {
    return axios.get(`${BASE}/${id}`);
  },

  getAll(viewAll = false, search = "") {
    return axios.get(`${BASE}/getall`, {
      params: { viewAll, search },
    });
  },

  create(payload) {
    return axios.post(BASE, payload);
  },

  update(payload) {
    return axios.put(BASE, payload);
  },

  setStatus(id, isActive) {
    return axios.patch(`${BASE}/${id}/status`, null, {
      params: { isActive },
    });
  },

  // ?? Billing Payments ??????????????????????????????????????????

  getPayments(billingAccountId) {
    return axios.get(`${BASE}/${billingAccountId}/payments`);
  },

  getPaymentById(id) {
    return axios.get(`${BASE}/payments/${id}`);
  },

  postPayment(payload) {
    return axios.post(`${BASE}/payments`, payload);
  },

  voidPayment(id) {
    return axios.patch(`${BASE}/payments/${id}/void`);
  },
};
```

**Usage examples in a Vue component**

```js
import { billingAccountService } from "@/services/billingAccountService";
import { BillingFrequency, BillingNotification } from "@/constants/billing";

// Fetch all active accounts
const { data: accounts } = await billingAccountService.getAll();

// Create account
await billingAccountService.create({
  accountName: "Main Office - MERALCO",
  vendorId: 5,
  officeId: 2,
  expenseTypeId: 4,
  hasFixedAmount: false,
  amount: null,
  frequency: "Monthly",
  dueDayOfMonth: 15,
  dueDayOfWeek: null,
  notifyDaysBefore: 3,
  notifyOption: "OnlyMe",
  memo: "",
});

// Post a payment
await billingAccountService.postPayment({
  billingAccountId: 1,
  amount: 4200.0,
  paymentDate: "2025-04-05",
  periodFrom: "2025-03-01",
  periodTo: "2025-03-31",
  nextDueDate: "2025-05-15",
  refNo: "OR-20250405",
  paymentMode: "Cash",
  remarks: "",
});

// Deactivate an account
await billingAccountService.setStatus(1, false);

// Void a payment
await billingAccountService.voidPayment(10);
```

**Suggested frontend constants** matching the backend string values:

```js
// src/constants/billing.js
export const BillingFrequency = {
  Weekly: "Weekly",
  Monthly: "Monthly",
};

export const BillingNotification = {
  None: "None",
  OnlyMe: "OnlyMe",
  AllUsers: "AllUsers",
};

export const BillingPaymentStatus = {
  Paid: "Paid",
  Voided: "Voided",
};

export const DayOfWeek = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};
```
