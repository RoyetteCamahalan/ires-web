# Frontend Coding Style Rules

## Status

These rules are required for all new frontend code from this point forward.

These rules do not require renaming or restructuring legacy code unless the work is directly related to the new feature being implemented.

## Migration Policy

1. Apply these rules to all new files.
2. Apply these rules to new modules added inside existing features.
3. Do not rename old modules only for style compliance.
4. If a legacy file is edited for a new feature, keep the new additions compliant even if the rest of the file is still old-style.
5. If a legacy module is being substantially rewritten, migrate that module to the current rules as part of the rewrite.

## Rule 1: Reserve Domain Names Clearly

Use explicit domain names that match the business feature.

- Use `Billing` only for subscription, plan, invoice, and account subscription management.
- Use `BillingAccount` for recurring billing-account management and billing-account payments.
- Do not create new generic names that collide with existing subscription billing code.

### Required

- `BillingService` is reserved for subscription billing.
- `useBillingAccountStore` is required for the new recurring billing-account module.
- `BillingAccountPayment` is preferred over vague names like `BillingPayment` in frontend code when clarity matters.

### Do

- `useBillingAccountStore`
- `BillingAccountForm`
- `BillingAccountList`
- `BillingAccountPaymentHistory`

### Do Not

- `BillingForm` for billing accounts
- `BillingPage` for billing accounts
- `billingService.ts` for billing accounts
- `useBillingStore` for billing accounts

## Rule 2: Use Kebab-Case Plural Routes

All new route paths must use kebab-case plurals for top-level resource pages.

### Required

- Use plural resource names for collection pages.
- Use kebab-case for multi-word route segments.
- Keep route names aligned with the domain name used in code.

### Examples

- `/billing-accounts`
- `/billing-accounts/new`
- `/billing-accounts/[id]`
- `/billing-accounts/[id]/payments`

### Do Not

- `/billingaccounts`
- `/billingAccounts`
- `/billing-account` for the main collection page

## Rule 3: Match File and Folder Names to the Domain

New files and folders must make the domain obvious from the path alone.

### Required

- Page folders must follow route naming.
- Store files must use the exact domain name.
- Reusable UI components must use the exact feature prefix.
- New type files must group related billing-account models together.

### Recommended Structure

```text
docs/
  coding-style.md
components/
  ui/
    BillingAccount/
      Form.vue
      List.vue
      PaymentForm.vue
      PaymentHistory.vue
pages/
  billing-accounts/
    index.vue
    new.vue
    [id].vue
    [id]/payments.vue
types/
  billing-account.ts
store/
  billingAccount.ts
utils/
  billing-account.ts
```

## Rule 4: Keep API Requests Inside Feature Stores

Each feature store must map to one business domain and own the backend requests for that domain.

### Required

- One feature store per domain area when that store is responsible for backend calls.
- Store action names must describe the backend action clearly.
- Do not create new `components/api/*Service.ts` files for new frontend modules.
- Do not mix subscription billing APIs and billing-account APIs in the same store.

### Example

```ts
export const useBillingAccountStore = defineStore("billingAccount", () => {
  async function getBillingAccount(id: number): Promise<any> {}
  async function getBillingAccounts(params: object): Promise<any> {}
  async function createBillingAccount(params: object): Promise<any> {}
  async function updateBillingAccount(params: object): Promise<any> {}
  async function setBillingAccountStatus(
    id: number,
    isActive: boolean,
  ): Promise<any> {}
  async function getBillingAccountPayments(
    billingAccountId: number,
  ): Promise<any> {}
  async function createBillingAccountPayment(params: object): Promise<any> {}
  async function voidBillingAccountPayment(id: number): Promise<any> {}

  return {
    getBillingAccount,
    getBillingAccounts,
    createBillingAccount,
    updateBillingAccount,
    setBillingAccountStatus,
    getBillingAccountPayments,
    createBillingAccountPayment,
    voidBillingAccountPayment,
  };
});
```

### Do Not

- Put billing-account endpoints into `BillingService`
- Put unrelated expense endpoints into `billingAccount` store
- Create `api/BillingAccountService.ts` for new work

## Rule 5: Use Domain Types and Constants

New code must avoid raw string values when the backend already defines allowed values.

### Required

- Create named constants or typed unions for frequency and payment status.
- Keep backend string values unchanged.
- Centralize domain-specific date helpers and computed rules.

### Examples

```ts
export const BillingAccountFrequency = {
  Weekly: "Weekly",
  Monthly: "Monthly",
} as const;

export const BillingAccountPaymentStatus = {
  Paid: "Paid",
  Voided: "Voided",
} as const;
```

### Do Not

- Scatter `'Weekly'` and `'Monthly'` across forms and tables
- Reuse subscription billing constants for billing-account logic

## Rule 6: Use PrimeVue Components For New UI Work

PrimeVue is the default component library for all new Vue UI work from this point forward.

### Required

- Use PrimeVue components first when building new forms, filters, dialogs, tables, menus, and common interactive UI.
- Prefer PrimeVue inputs and overlays over creating new custom base components for standard UI behavior.
- Use custom wrapper components only when they enforce a reusable business-specific pattern or a repo-wide presentation rule.
- If a legacy screen already uses older custom components, new isolated features inside that screen may still use PrimeVue.

### Preferred Examples

- `InputText`
- `Textarea`
- `InputNumber`
- `DatePicker` or the repo-approved PrimeVue date input
- `Select`
- `Checkbox`
- `ToggleSwitch`
- `Dialog`
- `DataTable` when the screen fits PrimeVue table behavior
- `Button`
- `InputGroup`

### Allowed Exceptions

- Existing legacy components can remain in old screens when there is no active rewrite.
- Existing business-specific wrapper components may remain when they add domain behavior beyond raw UI rendering.
- A custom component is acceptable if PrimeVue does not cover the needed behavior cleanly.

### Do Not

- Build new generic form controls when a PrimeVue equivalent already exists.
- Introduce a second UI component pattern for the same kind of input in the same new feature.
- Default to legacy form components for new modules just because older screens use them.

## Rule 7: Use A Consistent Vue File Structure

All new Vue single-file components must follow a predictable structure so files stay readable as features grow.

### Required

- Use `script setup` first, then `template`.
- Use `lang="ts"` by default for new Vue files when practical.
- Keep each file focused on one primary responsibility.
- Prefer balanced page files: enough logic to coordinate the page, but not enough to become the entire feature implementation.

### Preferred Order

```vue
<script setup lang="ts">
// imports
// props and emits
// stores
// refs and computed
// functions
// lifecycle
</script>

<template>
  <!-- markup -->
</template>
```

### Do

- Put imports at the top
- Group related refs and computed values together
- Keep template-facing handlers clearly named
- Move large feature logic into feature components or composables

### Do Not

- Mix unrelated concerns in one `.vue` file
- Put large blocks of business logic directly into the template
- Make a page file the only place where the full feature exists

## Rule 8: Prefer Ref And Computed Over Large Generic Reactive State

New Vue files must not default to one large `state = reactive(...)` object.

### Required

- Use `ref` for individual mutable values.
- Use `computed` for derived values.
- Use `reactive` only for true grouped models such as form payloads or tightly related nested structures.
- Do not create a generic `state` object just to hold unrelated flags, lists, and form data together.

### Do

```ts
const isLoading = ref(false);
const selectedId = ref<number | null>(null);
const search = ref("");

const filteredItems = computed(() => {
  return items.value.filter((item) => item.name.includes(search.value));
});
```

```ts
const form = reactive({
  accountName: "",
  vendorId: null as number | null,
  officeId: null as number | null,
});
```

### Do Not

```ts
const state = reactive({
  isLoading: false,
  isSaving: false,
  items: [],
  modalOpen: false,
  search: "",
  filters: {},
  form: {},
  selectedRow: null,
});
```

## Rule 9: Keep Store Calls Intentional

Components may call stores directly, but the contract and responsibility must stay clear.

### Required

- Store calls are allowed in pages and feature components.
- Leaf components should avoid owning unrelated backend workflows.
- Keep the request boundary in the feature store.
- Do not duplicate store-owned server data locally unless there is a clear editing reason.

### Preferred Pattern

- Pages coordinate route context, filters, and page-level actions.
- Feature components handle focused UI flows.
- Stores own request logic and shared server-backed state.

## Rule 10: Require Explicit Props And Emits

New Vue components must have a clear input and output contract.

### Required

- Define props explicitly.
- Define emits explicitly.
- Use descriptive verb-based event names.
- Avoid hidden two-way behavior between parent and child components.

### Preferred Event Names

- `save`
- `cancel`
- `close`
- `status-change`
- `payment-created`

### Do Not

- Use vague events like `submitData`
- Emit several unrelated events from a component with unclear ownership
- Hide parent-updating behavior behind internal mutable props

## Rule 11: Keep Template Logic Minimal

Templates should describe structure, not carry the main business logic.

### Required

- Keep inline conditions and formatting light.
- Move non-trivial display logic into computed values or named functions.
- Use named click handlers for meaningful actions.

### Do

```vue
<Button label="Save" @click="saveBillingAccount" />
<Tag v-if="isInactive" severity="danger" value="Inactive" />
```

### Do Not

```vue
<button
  @click="
    selectedItem && selectedItem.id && !isLoading && canSave
      ? save(selectedItem.id)
      : null
  "
>
  Save
</button>
```

## Rule 12: Avoid Watchers Unless They Are Truly Necessary

Watchers are allowed only when computed state or explicit actions cannot express the behavior clearly.

### Required

- Prefer computed values for derivation.
- Prefer explicit action handlers for user-triggered workflows.
- Use watchers only for real side effects tied to reactive changes.

### Good Uses

- Syncing route query changes into a fetch action
- Reacting to a controlled prop change that requires side effects

### Do Not

- Use watchers for simple derived values
- Chain multiple watchers to simulate normal flow control
- Use watchers when a direct method call would be clearer

## Rule 13: Use Explicit Async State Per Action

Async UI state must stay easy to reason about.

### Required

- Use separate refs for separate async flows when they can run independently.
- Do not use one broad loading flag for unrelated operations.
- Keep submit, fetch, and delete states distinguishable.

### Do

```ts
const isLoadingList = ref(false);
const isSavingForm = ref(false);
const isVoidingPayment = ref(false);
```

### Do Not

```ts
const isLoading = ref(false);
```

Use a single loading flag only when the component truly has one async operation.

## Rule 14: Split Components By Flow, Not By File Size Alone

Component boundaries should follow feature responsibilities.

### Required

- Split forms when they represent different business flows.
- Split sections when a child component has a stable, reusable contract.
- Keep page files balanced: coordinate the page, but move heavy form and transaction logic into feature components.

### Recommended Split

- Page file for route-level coordination
- Feature form component for account create and edit
- Separate payment form for posting payments
- Separate history component for billing-account payment records

## Rule 15: Name Stores and Composables by Feature

Shared state and composables must identify the feature they belong to.

### Required

- Stores must use the feature name in full.
- If the store is the request layer, its actions must also use the full feature name when needed for clarity.
- Composables must use the feature name in full.
- Do not create generic stores for new domain-specific logic.

### Do

- `useBillingAccountStore`
- `getBillingAccounts`
- `createBillingAccountPayment`
- `useBillingAccountFilters`
- `useBillingAccountPaymentForm`

### Do Not

- `useBillingStore`
- `usePaymentStore` for billing-account-specific state
- `useFinanceStore` if the logic is only for billing accounts

## Rule 16: Separate Account Setup from Payment Posting

Billing-account setup and billing-account payment posting are related but different concerns.

### Required

- Keep account CRUD focused on account configuration.
- Keep payment posting focused on payment transaction flow.
- Use separate components when forms have different validation or lifecycle behavior.

### Recommended Split

- `BillingAccount/Form.vue` for create and edit account
- `BillingAccount/PaymentForm.vue` for posting a payment
- `BillingAccount/PaymentHistory.vue` for payment list and void actions

## Rule 17: New UI Must Follow Current Rules Even Inside Old Modules

When adding new functionality to a legacy area, the new code must still follow the current rules.

### Required

- New component names must follow the new naming rules.
- New route folders must follow the new route rules.
- New stores and types must follow the new domain rules.
- Legacy naming can remain only where it already exists and is not part of the new work.

## Rule 18: Prefer Clear Business Terms Over Shortcuts

Choose names that explain the business meaning without needing backend context.

### Prefer

- `billingAccountId`
- `nextDueDate`
- `notifyDaysBefore`
- `hasFixedAmount`
- `dueDayOfMonth`
- `dueDayOfWeek`

### Avoid

- `billId`
- `nextDate`
- `daysBefore`
- `fixed`
- `dueDay`

## Step-by-Step Checklist For New Features

1. Confirm the business domain name before creating any file.
2. Check whether the domain already has a reserved name in the repo.
3. Choose the route path using kebab-case plurals.
4. Name the store with the full domain name.
5. Name the component folder with the full domain name.
6. Use PrimeVue components for standard UI before creating custom ones.
7. Start new Vue files with `script setup lang="ts"`.
8. Use `ref` and `computed` by default, and reserve `reactive` for true grouped models.
9. Add domain constants instead of hardcoded strings.
10. Add domain types before building the form logic.
11. Keep account setup and payment posting in separate components.
12. Keep new code compliant even when added beside legacy code.
13. Before merging, verify that no new generic `Billing*` names were introduced for billing-account features.

## Vue Review Gate

Before shipping a new Vue file, confirm all of the following:

- Does the file use `script setup` first?
- Is `lang="ts"` used by default where practical?
- Is state split into clear refs and computed values rather than one generic `state` object?
- Are props and emits explicit?
- Is template logic light and readable?
- Are watchers avoided unless they are for a real side effect?
- Are loading states separated by async action when needed?
- Does the component boundary match the business flow?
- Are PrimeVue components used for standard UI elements?

## Quick Review Gate

Before shipping new code, confirm all of the following:

- Does the file name clearly identify the domain?
- Does the route follow kebab-case plural naming?
- Does the store own only one backend domain?
- Are backend enum-like values centralized?
- Does the code avoid reusing `Billing` for billing-account features?
- Are new files compliant even if surrounding legacy files are not?
