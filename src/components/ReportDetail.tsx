'use client'

import { SavedReport } from '@/lib/mockReports'
import { ValidationIssue } from '@/lib/validator'

interface Props {
  report: SavedReport
  onBack: () => void
}

function ScoreBar({ label, letter, score, color }: { label: string; letter: string; score: number; color: string }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium text-slate-700 flex items-center gap-2">
          <span className={`inline-flex w-7 h-7 rounded-lg ${color} text-white text-center text-xs font-bold items-center justify-center shadow-sm`}>
            {letter}
          </span>
          {label}
        </span>
        <span className={`font-bold ${score >= 70 ? 'text-emerald-600' : score >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
          {score}%
        </span>
      </div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
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
    <div className={`p-4 rounded-xl border ${severityStyles[issue.severity]} mb-3`}>
      <div className="flex items-start gap-3">
        {severityIcons[issue.severity]}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold">{issue.field}</span>
            <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${fairBadgeStyles[issue.fairPrinciple]}`}>
              {fairLabels[issue.fairPrinciple]}
            </span>
          </div>
          <p className="text-sm">{issue.message}</p>
          {issue.suggestion && (
            <p className="text-xs mt-2 opacity-80 flex items-start gap-1">
              <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
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
    'compliant': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    'non-compliant': 'bg-rose-50 text-rose-700 border border-rose-200',
    'pending-review': 'bg-amber-50 text-amber-700 border border-amber-200',
  }

  const statusLabels = {
    'compliant': 'FAIR Compliant',
    'non-compliant': 'Not FAIR Compliant',
    'pending-review': 'Pending Review',
  }

  const dataTypeConfig = {
    'genomics': { label: 'Genomics', bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
    'in_vivo': { label: 'In Vivo', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    'general': { label: 'General', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  }

  const dtConfig = dataTypeConfig[report.dataType]

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-2xl font-bold text-slate-900 truncate">{report.title}</h2>
            <p className="text-sm text-slate-500">Report ID: {report.id}</p>
          </div>
        </div>
        <div className={`self-start sm:self-auto px-4 py-2 rounded-xl font-semibold text-sm sm:text-base ${statusStyles[report.status]}`}>
          {statusLabels[report.status]}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-slate-500 mb-1">Sample ID</p>
          <p className="font-bold text-slate-900 text-sm sm:text-base truncate">{report.sampleId}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-slate-500 mb-1">Researcher</p>
          <p className="font-bold text-slate-900 text-sm sm:text-base truncate">{report.researcher}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-slate-500 mb-1">Data Type</p>
          <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${dtConfig.bg} ${dtConfig.text} border ${dtConfig.border}`}>
            {dtConfig.label}
          </span>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-3 sm:p-4">
          <p className="text-xs sm:text-sm text-slate-500 mb-1">Submitted</p>
          <p className="font-bold text-slate-900 text-sm sm:text-base">
            {new Date(report.submittedAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Overall Score */}
        <div className="lg:col-span-1 space-y-6">
          {/* Overall Score Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Overall Compliance Score</h3>
            <div className="relative pt-1">
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="12"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke={overallPercentage >= 70 ? '#10b981' : overallPercentage >= 50 ? '#f59e0b' : '#f43f5e'}
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${overallPercentage * 3.52} 352`}
                      className="score-ring"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-slate-900">{overallPercentage}%</span>
                  </div>
                </div>
              </div>
              <p className="text-center text-slate-600">
                <span className="font-bold text-slate-900">{result.score}</span> / {result.maxScore} points
              </p>
            </div>
          </div>

          {/* Issue Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Issue Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-rose-50 rounded-xl border border-rose-100">
                <span className="text-rose-700 font-semibold">Errors</span>
                <span className="text-2xl font-bold text-rose-600">{errors.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-100">
                <span className="text-amber-700 font-semibold">Warnings</span>
                <span className="text-2xl font-bold text-amber-600">{warnings.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-sky-50 rounded-xl border border-sky-100">
                <span className="text-sky-700 font-semibold">Suggestions</span>
                <span className="text-2xl font-bold text-sky-600">{infos.length}</span>
              </div>
            </div>
          </div>

          {/* Experiment Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Experiment Details</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-slate-500 mb-1">Organism</dt>
                <dd className="font-semibold text-slate-900">{report.organism}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500 mb-1">Experiment Type</dt>
                <dd className="font-semibold text-slate-900">{report.experimentType}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Right Column - FAIR Scores & Issues */}
        <div className="lg:col-span-2 space-y-6">
          {/* FAIR Principle Scores */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">FAIR Principle Scores</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              <div>
                <ScoreBar label="Findable" letter="F" score={result.fairScores.findable} color="bg-violet-500" />
                <ScoreBar label="Accessible" letter="A" score={result.fairScores.accessible} color="bg-sky-500" />
              </div>
              <div>
                <ScoreBar label="Interoperable" letter="I" score={result.fairScores.interoperable} color="bg-teal-500" />
                <ScoreBar label="Reusable" letter="R" score={result.fairScores.reusable} color="bg-amber-500" />
              </div>
            </div>
          </div>

          {/* Issues List */}
          {result.issues.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Issues & Recommendations</h3>
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
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Excellent FAIR Compliance!</h3>
                <p className="text-slate-600">This submission meets all FAIR data standards with no issues detected.</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button className="flex-1 btn-brand py-3 px-4 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Report (PDF)
            </button>
            <button className="flex-1 bg-white border border-slate-200 text-slate-700 py-3 px-4 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Re-validate
            </button>
            {report.status === 'pending-review' && (
              <button className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Approve
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
