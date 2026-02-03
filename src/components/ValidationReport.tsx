'use client'

import { ValidationResult, ValidationIssue } from '@/lib/validator'

interface Props {
  result: ValidationResult | null
  isValidating: boolean
}

function ScoreBar({ label, letter, score, color, bgLight }: {
  label: string
  letter: string
  score: number
  color: string
  bgLight: string
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium text-slate-700 flex items-center gap-2">
          <span className={`inline-flex w-6 h-6 rounded-lg ${color} text-white text-center text-xs font-bold items-center justify-center`}>
            {letter}
          </span>
          {label}
        </span>
        <span className={`font-bold ${score >= 70 ? 'text-emerald-600' : score >= 40 ? 'text-amber-600' : 'text-rose-600'}`}>
          {score}%
        </span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

function IssueItem({ issue }: { issue: ValidationIssue }) {
  const severityStyles = {
    error: 'bg-rose-50 border-rose-200 text-rose-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-sky-50 border-sky-200 text-sky-800',
  }

  const severityIcons = {
    error: (
      <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      </div>
    ),
    warning: (
      <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </div>
    ),
    info: (
      <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </div>
    ),
  }

  const fairBadgeStyles = {
    F: 'fair-badge-f',
    A: 'fair-badge-a',
    I: 'fair-badge-i',
    R: 'fair-badge-r',
  }

  const fairLabels = {
    F: 'Findable',
    A: 'Accessible',
    I: 'Interoperable',
    R: 'Reusable',
  }

  return (
    <div className={`p-3 rounded-xl border ${severityStyles[issue.severity]} mb-2`}>
      <div className="flex items-start gap-3">
        {severityIcons[issue.severity]}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-sm">{issue.field}</span>
            <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${fairBadgeStyles[issue.fairPrinciple]}`}>
              {fairLabels[issue.fairPrinciple]}
            </span>
          </div>
          <p className="text-sm">{issue.message}</p>
          {issue.suggestion && (
            <p className="text-xs mt-1.5 opacity-75 flex items-start gap-1">
              <svg className="w-3 h-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {issue.suggestion}
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
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">Validation Report</h2>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin absolute inset-0"></div>
          </div>
          <p className="mt-4 text-slate-500 font-medium">Validating FAIR compliance...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">Validation Report</h2>
        <div className="text-center py-8 sm:py-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-slate-600 font-medium">Enter experimental data and click</p>
          <p className="text-slate-600">&quot;Validate FAIR Compliance&quot; to see the report</p>
        </div>
      </div>
    )
  }

  const overallPercentage = Math.round((result.score / result.maxScore) * 100)
  const errors = result.issues.filter(i => i.severity === 'error')
  const warnings = result.issues.filter(i => i.severity === 'warning')
  const infos = result.issues.filter(i => i.severity === 'info')

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-6">Validation Report</h2>

      {/* Overall Status */}
      <div className={`p-4 sm:p-5 rounded-2xl mb-5 ${result.isValid ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200' : 'bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200'}`}>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center ${result.isValid ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30' : 'bg-rose-500 shadow-lg shadow-rose-500/30'}`}>
            {result.isValid ? (
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div>
            <h3 className={`text-lg sm:text-xl font-bold ${result.isValid ? 'text-emerald-800' : 'text-rose-800'}`}>
              {result.isValid ? 'FAIR Compliant' : 'Not FAIR Compliant'}
            </h3>
            <p className={`text-sm sm:text-base ${result.isValid ? 'text-emerald-600' : 'text-rose-600'}`}>
              Overall Score: <span className="font-bold">{result.score}/{result.maxScore}</span> ({overallPercentage}%)
            </p>
          </div>
        </div>
      </div>

      {/* FAIR Scores */}
      <div className="mb-5">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4">FAIR Principle Scores</h3>
        <ScoreBar label="Findable" letter="F" score={result.fairScores.findable} color="bg-violet-500" bgLight="bg-violet-100" />
        <ScoreBar label="Accessible" letter="A" score={result.fairScores.accessible} color="bg-sky-500" bgLight="bg-sky-100" />
        <ScoreBar label="Interoperable" letter="I" score={result.fairScores.interoperable} color="bg-teal-500" bgLight="bg-teal-100" />
        <ScoreBar label="Reusable" letter="R" score={result.fairScores.reusable} color="bg-amber-500" bgLight="bg-amber-100" />
      </div>

      {/* Issue Summary */}
      <div className="flex gap-2 sm:gap-3 mb-5">
        <div className="flex-1 text-center p-3 bg-rose-50 rounded-xl border border-rose-100">
          <div className="text-xl sm:text-2xl font-bold text-rose-600">{errors.length}</div>
          <div className="text-xs font-medium text-rose-700">Errors</div>
        </div>
        <div className="flex-1 text-center p-3 bg-amber-50 rounded-xl border border-amber-100">
          <div className="text-xl sm:text-2xl font-bold text-amber-600">{warnings.length}</div>
          <div className="text-xs font-medium text-amber-700">Warnings</div>
        </div>
        <div className="flex-1 text-center p-3 bg-sky-50 rounded-xl border border-sky-100">
          <div className="text-xl sm:text-2xl font-bold text-sky-600">{infos.length}</div>
          <div className="text-xs font-medium text-sky-700">Suggestions</div>
        </div>
      </div>

      {/* Issues List */}
      {result.issues.length > 0 && (
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Issues & Recommendations</h3>
          <div className="max-h-64 overflow-y-auto pr-1">
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
        <div className="text-center py-6 bg-emerald-50 rounded-xl border border-emerald-100">
          <div className="w-12 h-12 mx-auto mb-3 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="font-semibold text-emerald-800">Excellent!</p>
          <p className="text-sm text-emerald-600">Your data meets all FAIR compliance requirements.</p>
        </div>
      )}
    </div>
  )
}
