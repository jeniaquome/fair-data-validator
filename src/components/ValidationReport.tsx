'use client'

import { ValidationResult, ValidationIssue } from '@/lib/validator'

interface Props {
  result: ValidationResult | null
  isValidating: boolean
}

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-gray-700">{label}</span>
        <span className={`font-semibold ${score >= 70 ? 'text-green-600' : score >= 40 ? 'text-yellow-600' : 'text-red-600'}`}>
          {score}%
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

function IssueItem({ issue }: { issue: ValidationIssue }) {
  const severityStyles = {
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }

  const severityIcons = {
    error: (
      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  }

  const fairLabels = {
    F: 'Findable',
    A: 'Accessible',
    I: 'Interoperable',
    R: 'Reusable',
  }

  return (
    <div className={`p-3 rounded-md border ${severityStyles[issue.severity]} mb-2`}>
      <div className="flex items-start gap-2">
        {severityIcons[issue.severity]}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{issue.field}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
              {fairLabels[issue.fairPrinciple]}
            </span>
          </div>
          <p className="text-sm">{issue.message}</p>
          {issue.suggestion && (
            <p className="text-xs mt-1 opacity-75">
              Suggestion: {issue.suggestion}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ValidationReport({ result, isValidating }: Props) {
  if (isValidating) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Validation Report</h2>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Validation Report</h2>
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Enter experimental data and click &quot;Validate&quot; to see the compliance report</p>
        </div>
      </div>
    )
  }

  const overallPercentage = Math.round((result.score / result.maxScore) * 100)
  const errors = result.issues.filter(i => i.severity === 'error')
  const warnings = result.issues.filter(i => i.severity === 'warning')
  const infos = result.issues.filter(i => i.severity === 'info')

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Validation Report</h2>

      {/* Overall Status */}
      <div className={`p-4 rounded-lg mb-6 ${result.isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <div className="flex items-center gap-3">
          {result.isValid ? (
            <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          <div>
            <h3 className={`font-semibold ${result.isValid ? 'text-green-800' : 'text-red-800'}`}>
              {result.isValid ? 'FAIR Compliant' : 'Not FAIR Compliant'}
            </h3>
            <p className={`text-sm ${result.isValid ? 'text-green-700' : 'text-red-700'}`}>
              Overall Score: {result.score}/{result.maxScore} ({overallPercentage}%)
            </p>
          </div>
        </div>
      </div>

      {/* FAIR Scores */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">FAIR Principle Scores</h3>
        <ScoreBar label="Findable" score={result.fairScores.findable} color="bg-purple-500" />
        <ScoreBar label="Accessible" score={result.fairScores.accessible} color="bg-blue-500" />
        <ScoreBar label="Interoperable" score={result.fairScores.interoperable} color="bg-green-500" />
        <ScoreBar label="Reusable" score={result.fairScores.reusable} color="bg-orange-500" />
      </div>

      {/* Issue Summary */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 text-center p-3 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{errors.length}</div>
          <div className="text-xs text-red-700">Errors</div>
        </div>
        <div className="flex-1 text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{warnings.length}</div>
          <div className="text-xs text-yellow-700">Warnings</div>
        </div>
        <div className="flex-1 text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{infos.length}</div>
          <div className="text-xs text-blue-700">Suggestions</div>
        </div>
      </div>

      {/* Issues List */}
      {result.issues.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">Issues & Recommendations</h3>
          <div className="max-h-64 overflow-y-auto">
            {errors.map((issue, idx) => (
              <IssueItem key={`error-${idx}`} issue={issue} />
            ))}
            {warnings.map((issue, idx) => (
              <IssueItem key={`warning-${idx}`} issue={issue} />
            ))}
            {infos.map((issue, idx) => (
              <IssueItem key={`info-${idx}`} issue={issue} />
            ))}
          </div>
        </div>
      )}

      {result.isValid && result.issues.length === 0 && (
        <div className="text-center py-4 text-green-600">
          <p className="font-medium">Excellent! Your data entry meets all FAIR compliance requirements.</p>
        </div>
      )}
    </div>
  )
}
