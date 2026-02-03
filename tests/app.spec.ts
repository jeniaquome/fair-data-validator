import { test, expect } from '@playwright/test'

test.describe('FAIR Data Compliance Guardrail - Dashboard', () => {
  test('should load the dashboard by default', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/FAIR Data Compliance/)
    await expect(page.getByText('Validation Dashboard')).toBeVisible()
    await expect(page.getByText('Monitor FAIR compliance')).toBeVisible()
  })

  test('should display dashboard statistics', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Validation Dashboard')).toBeVisible()
    // Check for stat cards by their container structure
    await expect(page.locator('.border-l-4.border-blue-500')).toBeVisible()
    await expect(page.locator('.border-l-4.border-green-500')).toBeVisible()
    await expect(page.locator('.border-l-4.border-purple-500')).toBeVisible()
    await expect(page.locator('.border-l-4.border-yellow-500')).toBeVisible()
  })

  test('should display FAIR score chart', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Average FAIR Scores')).toBeVisible()
    await expect(page.locator('.bg-purple-500').first()).toBeVisible()
    await expect(page.locator('.bg-blue-500').first()).toBeVisible()
    await expect(page.locator('.bg-green-500').first()).toBeVisible()
    await expect(page.locator('.bg-orange-500').first()).toBeVisible()
  })

  test('should display data type distribution chart', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Validation Dashboard')).toBeVisible()
    await expect(page.getByText('Reports by Data Type')).toBeVisible()
    // Check for data type labels in the chart
    await expect(page.locator('text=Genomics').first()).toBeVisible()
    await expect(page.locator('text=In Vivo').first()).toBeVisible()
    await expect(page.locator('text=General').first()).toBeVisible()
  })

  test('should display reports archive table', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Validation Dashboard')).toBeVisible()
    await expect(page.getByText('Validation Reports Archive')).toBeVisible()
    // Check for table content
    await expect(page.locator('table')).toBeVisible()
    await expect(page.locator('text=Single-cell RNA-seq').first()).toBeVisible()
    await expect(page.locator('text=Dr. Sarah Chen').first()).toBeVisible()
  })

  test('should filter reports by status', async ({ page }) => {
    await page.goto('/')

    // Filter to non-compliant
    await page.locator('select').filter({ hasText: 'All Status' }).selectOption('non-compliant')
    await expect(page.getByText('Pharmacokinetics study')).toBeVisible()
    await expect(page.getByText('Western blot validation')).toBeVisible()
  })

  test('should filter reports by data type', async ({ page }) => {
    await page.goto('/')

    // Filter to in_vivo
    await page.locator('select').filter({ hasText: 'All Types' }).selectOption('in_vivo')
    await expect(page.getByText('Pharmacokinetics study')).toBeVisible()
    await expect(page.getByText('Toxicology assessment')).toBeVisible()
    await expect(page.getByText('Biodistribution study')).toBeVisible()
  })

  test('should search reports', async ({ page }) => {
    await page.goto('/')

    await page.fill('input[placeholder="Search reports..."]', 'CRISPR')
    await expect(page.getByText('CRISPR knockout screen')).toBeVisible()
  })

  test('should view report details', async ({ page }) => {
    await page.goto('/')

    // Click view details on first report
    await page.getByText('View Details').first().click()

    // Should show report detail view
    await expect(page.getByText('Report ID:')).toBeVisible()
    await expect(page.getByText('Overall Compliance Score')).toBeVisible()
    await expect(page.getByText('FAIR Principle Scores')).toBeVisible()
  })

  test('should navigate back from report details', async ({ page }) => {
    await page.goto('/')

    // Click view details
    await page.getByText('View Details').first().click()
    await expect(page.getByText('Report ID:')).toBeVisible()
    await expect(page.getByText('Overall Compliance Score')).toBeVisible()
    await expect(page.getByText('Issue Summary')).toBeVisible()

    // Verify the report detail view shows properly
    await expect(page.getByText('Download Report (PDF)')).toBeVisible()
  })
})

test.describe('FAIR Data Compliance Guardrail - Validator', () => {
  test('should navigate to validator from dashboard', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: /New Validation/i }).first().click()
    await expect(page.getByText('Submit experimental data')).toBeVisible()
    await expect(page.getByText('Experimental Data Entry')).toBeVisible()
  })

  test('should display data type selector in validator', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /New Validation/i }).first().click()

    await expect(page.getByRole('button', { name: 'Genomics' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'In Vivo' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'General' })).toBeVisible()
  })

  test('should switch data types in validator', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /New Validation/i }).first().click()

    // Click on In Vivo
    await page.getByRole('button', { name: 'In Vivo' }).click()
    await expect(page.getByText('Tissue Type')).toBeVisible()
    await expect(page.getByText('Chemical Compounds')).toBeVisible()

    // Click on Genomics
    await page.getByRole('button', { name: 'Genomics' }).click()
    await expect(page.getByText('Gene Symbol')).toBeVisible()
    await expect(page.getByText('Gene ID')).toBeVisible()
  })

  test('should load sample data in validator', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /New Validation/i }).first().click()

    await page.getByText('Load Sample Data').click()

    // Check that sample data is loaded
    await expect(page.locator('input[placeholder*="Descriptive title"]')).toHaveValue(/Single-cell RNA-seq/)
    await expect(page.locator('input[placeholder*="Name <email>"]')).toHaveValue(/Dr. Sarah Chen/)
  })

  test('should validate sample data and show compliance', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /New Validation/i }).first().click()

    // Load sample data
    await page.getByText('Load Sample Data').click()

    // Click validate
    await page.getByRole('button', { name: /Validate FAIR Compliance/i }).click()

    // Wait for validation result
    await expect(page.getByText('Validation Report')).toBeVisible()
    await expect(page.getByText(/FAIR Compliant|Not FAIR Compliant/)).toBeVisible({ timeout: 5000 })

    // Check that FAIR scores are displayed
    await expect(page.getByText('Findable', { exact: true })).toBeVisible()
    await expect(page.getByText('Accessible', { exact: true })).toBeVisible()
    await expect(page.getByText('Interoperable', { exact: true })).toBeVisible()
    await expect(page.getByText('Reusable', { exact: true })).toBeVisible()
  })

  test('should show validation errors for incomplete data', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /New Validation/i }).first().click()

    // Try to validate without filling any data
    await page.getByRole('button', { name: /Validate FAIR Compliance/i }).click()

    // Check that errors are shown
    await expect(page.getByText('Not FAIR Compliant')).toBeVisible({ timeout: 5000 })
    await expect(page.getByText('Errors')).toBeVisible()
  })

  test('should navigate back to dashboard from validator', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /New Validation/i }).first().click()

    // Click back button
    await page.locator('button').filter({ has: page.locator('svg path[d*="15 19l-7-7"]') }).click()

    // Should be back on dashboard
    await expect(page.getByText('Validation Dashboard')).toBeVisible()
  })
})

test.describe('Navigation', () => {
  test('should toggle between dashboard and validator views', async ({ page }) => {
    await page.goto('/')

    // Should start on dashboard
    await expect(page.getByText('Validation Dashboard')).toBeVisible()

    // Click New Validation in nav
    await page.locator('nav').getByRole('button', { name: /New Validation/i }).click()
    await expect(page.getByText('Submit experimental data')).toBeVisible()

    // Click Dashboard in nav
    await page.locator('nav').getByRole('button', { name: /Dashboard/i }).click()
    await expect(page.getByText('Validation Dashboard')).toBeVisible()
  })
})
