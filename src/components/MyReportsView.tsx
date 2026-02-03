'use client'

import { SavedReport } from '@/lib/mockReports'

interface Props {
  reports: SavedReport[]
  onBack: () => void
  onViewReport: (reportId: string) => void
}

export default function MyReportsView({ reports, onBack, onViewReport }: Props) {
  // Filter to show only Sarah Chen's reports
  const myReports = reports.filter(r => r.researcher.includes('Sarah Chen'))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Reports</h2>
          <p className="text-slate-600">View all your submitted validation reports</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Reports</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{myReports.length}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Compliant</p>
              <p className="text-3xl font-bold text-emerald-600 mt-1">
                {myReports.filter(r => r.status === 'compliant').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Avg. Score</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                {Math.round(myReports.reduce((sum, r) => sum + (r.validationResult.score / r.validationResult.maxScore * 100), 0) / myReports.length)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">All Reports</h3>
        </div>

        <div className="divide-y divide-slate-200">
          {myReports.map((report) => {
            const scorePercent = Math.round((report.validationResult.score / report.validationResult.maxScore) * 100)
            const statusConfig = {
              'compliant': { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Compliant' },
              'non-compliant': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', label: 'Non-Compliant' },
              'pending-review': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', label: 'Pending Review' },
            }
            const status = statusConfig[report.status]

            return (
              <div
                key={report.id}
                className="px-6 py-4 hover:bg-slate-50 cursor-pointer transition-colors"
                onClick={() => onViewReport(report.id)}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 truncate">{report.title}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                      <span>{report.sampleId}</span>
                      <span>{new Date(report.submittedAt).toLocaleDateString()}</span>
                      <span>{report.experimentType}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-900">{scorePercent}%</p>
                      <p className="text-xs text-slate-500">Score</p>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${status.bg} ${status.text} border ${status.border}`}>
                      {status.label}
                    </span>
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {myReports.length === 0 && (
          <div className="px-6 py-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-slate-600 font-medium">No reports yet</p>
            <p className="text-sm text-slate-500 mt-1">Submit your first validation to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}
