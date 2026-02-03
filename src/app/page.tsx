'use client'

import { useState } from 'react'
import ValidatorForm from '@/components/ValidatorForm'
import ValidationReport from '@/components/ValidationReport'
import { ValidationResult } from '@/lib/validator'

export default function Home() {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)
  const [isValidating, setIsValidating] = useState(false)

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            FAIR Data Compliance Guardrail
          </h1>
          <p className="text-gray-600">
            Pre-submission validator for experimental data. Ensure your entries meet
            FAIR (Findable, Accessible, Interoperable, Reusable) standards before
            saving to your ELN or Research Master Data platform.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ValidatorForm
              onValidationStart={() => setIsValidating(true)}
              onValidationComplete={(result) => {
                setValidationResult(result)
                setIsValidating(false)
              }}
            />
          </div>
          <div>
            <ValidationReport
              result={validationResult}
              isValidating={isValidating}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
