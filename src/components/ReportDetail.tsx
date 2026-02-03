'use client'

import { SavedReport } from '@/lib/mockReports'
import { ValidationIssue } from '@/lib/validator'

interface Props {
  report: SavedReport
  onBack: () => void
}

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-gray-700">{label}</span>
        <span className={`font-semibold ${score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
          {score}%
        </span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
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
    <div className={`p-4 rounded-lg border ${severityStyles[issue.severity]} mb-3`}>
      <div className="flex items-start gap-3">
        {severityIcons[issue.severity]}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">{issue.field}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/50">
              {fairLabels[issue.fairPrinciple]}
            </span>
          </div>
          <p className="text-sm">{issue.message}</p>
          {issue.suggestion && (
            <p className="text-xs mt-2 opacity-80">
              <span className="font-medium">Suggestion:</span> {issue.suggestion}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ReportDetail({ report, onBack }: Props) {
  const result = report.validationResult
  const overallPercentage = Math.round((result.score / result.maxScore) * 100)
  const errors = result.issues.filter(i => i.severity === 'error')
  const warnings = result.issues.filter(i => i.severity === 'warning')
  const infos = result.issues.filter(i => i.severity === 'info')

  const statusStyles = {
    'compliant': 'bg-green-100 text-green-800 border-green-200',
    'non-compliant': 'bg-red-100 text-red-800 border-red-200',
    'pending-review': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  }

  const statusLabels = {
    'compliant': 'FAIR Compliant',
    'non-compliant': 'Not FAIR Compliant',
    'pending-review': 'Pending Review',
  }

  const dataTypeLabels = {
    'genomics': 'Genomics',
    'in_vivo': 'In Vivo',
    'general': 'General',
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{report.title}</h2>
            <p className="text-sm text-gray-600">Report ID: {report.id}</p>
          </div>
        </div>
        <div className={`self-start sm:self-auto px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border text-sm sm:text-base ${statusStyles[report.status]}`}>
          <span className="font-medium">{statusLabels[report.status]}</span>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg shadow p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-500">Sample ID</p>
          <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{report.sampleId}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-500">Researcher</p>
          <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{report.researcher}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-500">Data Type</p>
          <p className="font-semibold text-gray-900 text-sm sm:text-base">{dataTypeLabels[report.dataType]}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-gray-500">Submitted</p>
          <p className="font-semibold text-gray-900 text-sm sm:text-base">
            {new Date(report.submittedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Overall Score */}
        <div className="lg:col-span-1 space-y-6">
          {/* Overall Score Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Compliance Score</h3>
            <div className="relative pt-1">
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke={overallPercentage >= 70 ? '#22c55e' : overallPercentage >= 50 ? '#eab308' : '#ef4444'}
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${overallPercentage * 3.52} 352`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">{overallPercentage}%</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-600">
                {result.score} / {result.maxScore} points
              </p>
            </div>
          </div>

          {/* Issue Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Issue Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-red-700 font-medium">Errors</span>
                <span className="text-2xl font-bold text-red-600">{errors.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-yellow-700 font-medium">Warnings</span>
                <span className="text-2xl font-bold text-yellow-600">{warnings.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700 font-medium">Suggestions</span>
                <span className="text-2xl font-bold text-blue-600">{infos.length}</span>
              </div>
            </div>
          </div>

          {/* Experiment Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Experiment Details</h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-gray-500">Organism</dt>
                <dd className="font-medium text-gray-900">{report.organism}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Experiment Type</dt>
                <dd className="font-medium text-gray-900">{report.experimentType}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right Column - FAIR Scores & Issues */}
        <div className="lg:col-span-2 space-y-6">
          {/* FAIR Principle Scores */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">FAIR Principle Scores</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ScoreBar label="Findable" score={result.fairScores.findable} color="bg-purple-500" />
                <ScoreBar label="Accessible" score={result.fairScores.accessible} color="bg-blue-500" />
              </div>
              <div>
                <ScoreBar label="Interoperable" score={result.fairScores.interoperable} color="bg-green-500" />
                <ScoreBar label="Reusable" score={result.fairScores.reusable} color="bg-orange-500" />
              </div>
            </div>
          </div>

          {/* Issues List */}
          {result.issues.length > 0 ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Issues & Recommendations</h3>
              <div className="max-h-96 overflow-y-auto pr-2">
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
          ) : (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center py-8">
                <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Excellent FAIR Compliance!</h3>
                <p className="text-gray-600">This submission meets all FAIR data standards with no issues detected.</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="flex-1 bg-blue-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base">
              Download Report (PDF)
            </button>
            <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 sm:py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base">
              Re-validate
            </button>
            {report.status === 'pending-review' && (
              <button className="flex-1 bg-green-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm sm:text-base">
                Approve
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
