import { test, expect } from '@playwright/test'

test.describe('FAIR Data Compliance Guardrail', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/FAIR Data Compliance/)
    await expect(page.getByText('FAIR Data Compliance Guardrail')).toBeVisible()
    await expect(page.getByText('Pre-submission validator')).toBeVisible()
  })

  test('should display data type selector', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: 'Genomics' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'In Vivo' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'General' })).toBeVisible()
  })

  test('should switch data types', async ({ page }) => {
    await page.goto('/')

    // Click on In Vivo
    await page.getByRole('button', { name: 'In Vivo' }).click()
    await expect(page.getByText('Tissue Type')).toBeVisible()
    await expect(page.getByText('Chemical Compounds')).toBeVisible()

    // Click on Genomics
    await page.getByRole('button', { name: 'Genomics' }).click()
    await expect(page.getByText('Gene Symbol')).toBeVisible()
    await expect(page.getByText('Gene ID')).toBeVisible()
  })

  test('should load sample data', async ({ page }) => {
    await page.goto('/')

    await page.getByText('Load Sample Data').click()

    // Check that sample data is loaded
    await expect(page.locator('input[placeholder*="Descriptive title"]')).toHaveValue(/Single-cell RNA-seq/)
    await expect(page.locator('input[placeholder*="Name <email>"]')).toHaveValue(/Dr. Sarah Chen/)
  })

  test('should validate sample data and show compliance', async ({ page }) => {
    await page.goto('/')

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

    // Try to validate without filling any data
    await page.getByRole('button', { name: /Validate FAIR Compliance/i }).click()

    // Check that errors are shown
    await expect(page.getByText('Not FAIR Compliant')).toBeVisible({ timeout: 5000 })
    await expect(page.getByText('Errors')).toBeVisible()
  })

  test('should show genomics-specific fields when genomics is selected', async ({ page }) => {
    await page.goto('/')

    // Genomics is selected by default
    await expect(page.getByRole('button', { name: 'Genomics' })).toHaveClass(/bg-blue-600/)
    await expect(page.getByText('Gene Symbol')).toBeVisible()
    await expect(page.getByText('Gene ID')).toBeVisible()
    await expect(page.getByText('Cell Line')).toBeVisible()
  })

  test('should show in vivo-specific fields when in vivo is selected', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'In Vivo' }).click()

    await expect(page.getByText('Tissue Type')).toBeVisible()
    await expect(page.getByText('Chemical Compounds')).toBeVisible()
    await expect(page.getByText('Dosage')).toBeVisible()
  })

  test('should display compliance score breakdown', async ({ page }) => {
    await page.goto('/')

    // Load sample data and validate
    await page.getByText('Load Sample Data').click()
    await page.getByRole('button', { name: /Validate FAIR Compliance/i }).click()

    // Wait for validation
    await expect(page.getByText('FAIR Principle Scores')).toBeVisible({ timeout: 5000 })

    // Check for score bars
    await expect(page.locator('.bg-purple-500')).toBeVisible() // Findable
    await expect(page.locator('.bg-blue-500')).toBeVisible() // Accessible
    await expect(page.locator('.bg-green-500')).toBeVisible() // Interoperable
    await expect(page.locator('.bg-orange-500')).toBeVisible() // Reusable
  })
})
