'use client'

import { useState } from 'react'
import { SavedReport, getReportStats } from '@/lib/mockReports'

interface Props {
  reports: SavedReport[]
  onNewValidation: () => void
  onViewReport?: (reportId: string) => void
}

function StatCard({ title, value, subtitle, icon, gradient }: {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  gradient: string
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-4 sm:p-5 card-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wide">{title}</p>
          <p className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-slate-900">{value}</p>
          {subtitle && <p className="mt-1 text-xs sm:text-sm text-slate-500">{subtitle}</p>}
        </div>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${gradient} flex items-center justify-center shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

function FairScoreChart({ scores }: { scores: { findable: number; accessible: number; interoperable: number; reusable: number } }) {
  const items = [
    { label: 'F', full: 'Findable', score: scores.findable, color: 'bg-violet-500', textColor: 'text-violet-600', bgLight: 'bg-violet-100' },
    { label: 'A', full: 'Accessible', score: scores.accessible, color: 'bg-sky-500', textColor: 'text-sky-600', bgLight: 'bg-sky-100' },
    { label: 'I', full: 'Interoperable', score: scores.interoperable, color: 'bg-teal-500', textColor: 'text-teal-600', bgLight: 'bg-teal-100' },
    { label: 'R', full: 'Reusable', score: scores.reusable, color: 'bg-amber-500', textColor: 'text-amber-600', bgLight: 'bg-amber-100' },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 sm:p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-5">Average FAIR Scores</h3>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-slate-700 flex items-center gap-2">
                <span className={`inline-flex w-7 h-7 rounded-lg ${item.color} text-white text-center text-xs font-bold items-center justify-center shadow-sm`}>
                  {item.label}
                </span>
                {item.full}
              </span>
              <span className={`font-bold ${item.score >= 70 ? 'text-emerald-600' : item.score >= 50 ? 'text-amber-600' : 'text-rose-600'}`}>
                {item.score}%
              </span>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function DataTypeChart({ data }: { data: { genomics: number; in_vivo: number; general: number } }) {
  const total = data.genomics + data.in_vivo + data.general
  const items = [
    { label: 'Genomics', value: data.genomics, color: 'bg-indigo-500', bgLight: 'bg-indigo-50', textColor: 'text-indigo-700', percent: Math.round((data.genomics / total) * 100) },
    { label: 'In Vivo', value: data.in_vivo, color: 'bg-emerald-500', bgLight: 'bg-emerald-50', textColor: 'text-emerald-700', percent: Math.round((data.in_vivo / total) * 100) },
    { label: 'General', value: data.general, color: 'bg-amber-500', bgLight: 'bg-amber-50', textColor: 'text-amber-700', percent: Math.round((data.general / total) * 100) },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 p-5 sm:p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-5">Reports by Data Type</h3>
      <div className="flex h-3 rounded-full overflow-hidden mb-6 shadow-inner bg-slate-100">
        {items.map(item => (
          <div
            key={item.label}
            className={`${item.color} transition-all first:rounded-l-full last:rounded-r-full`}
            style={{ width: `${item.percent}%` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {items.map(item => (
          <div key={item.label} className={`${item.bgLight} rounded-xl p-3 text-center`}>
            <div className={`w-3 h-3 rounded-full ${item.color} mx-auto mb-2 shadow-sm`} />
            <p className={`text-xs font-medium ${item.textColor}`}>{item.label}</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: SavedReport['status'] }) {
  const styles = {
    'compliant': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    'non-compliant': 'bg-rose-50 text-rose-700 border border-rose-200',
    'pending-review': 'bg-amber-50 text-amber-700 border border-amber-200',
  }
  const labels = {
    'compliant': 'Compliant',
    'non-compliant': 'Non-Compliant',
    'pending-review': 'Pending Review',
  }

  return (
    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

function DataTypeBadge({ dataType }: { dataType: SavedReport['dataType'] }) {
  const styles = {
    'genomics': 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    'in_vivo': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    'general': 'bg-amber-50 text-amber-700 border border-amber-200',
  }
  const labels = {
    'genomics': 'Genomics',
    'in_vivo': 'In Vivo',
    'general': 'General',
  }

  return (
    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${styles[dataType]}`}>
      {labels[dataType]}
    </span>
  )
}

export default function Dashboard({ reports, onNewValidation, onViewReport }: Props) {
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterDataType, setFilterDataType] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const stats = getReportStats(reports)

  const filteredReports = reports.filter(report => {
    if (filterStatus !== 'all' && report.status !== filterStatus) return false
    if (filterDataType !== 'all' && report.dataType !== filterDataType) return false
    if (searchTerm && !report.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !report.researcher.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !report.sampleId.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  const handleViewReport = (reportId: string) => {
    if (onViewReport) {
      onViewReport(reportId)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Validation Dashboard</h2>
          <p className="text-sm sm:text-base text-slate-600">Monitor FAIR compliance across all experimental data submissions</p>
        </div>
        <button
          onClick={onNewValidation}
          className="btn-brand px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Validation
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Total Reports"
          value={stats.total}
          subtitle="All time submissions"
          gradient="bg-gradient-to-br from-indigo-500 to-violet-600 shadow-indigo-500/30"
          icon={<svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
        />
        <StatCard
          title="Compliance Rate"
          value={`${stats.complianceRate}%`}
          subtitle={`${stats.compliant} compliant reports`}
          gradient="bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30"
          icon={<svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard
          title="Avg. FAIR Score"
          value={`${stats.avgScore}%`}
          subtitle="Across all reports"
          gradient="bg-gradient-to-br from-violet-500 to-purple-600 shadow-violet-500/30"
          icon={<svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>}
        />
        <StatCard
          title="Pending Review"
          value={stats.pendingReview}
          subtitle="Awaiting approval"
          gradient="bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/30"
          icon={<svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FairScoreChart scores={stats.avgFairScores} />
        <DataTypeChart data={stats.byDataType} />
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-200">
          <div className="flex flex-col gap-4">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">Validation Reports Archive</h3>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Filters Row */}
              <div className="flex gap-2 w-full sm:w-auto">
                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="flex-1 sm:flex-none px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option value="all">All Status</option>
                  <option value="compliant">Compliant</option>
                  <option value="non-compliant">Non-Compliant</option>
                  <option value="pending-review">Pending Review</option>
                </select>

                {/* Data Type Filter */}
                <select
                  value={filterDataType}
                  onChange={(e) => setFilterDataType(e.target.value)}
                  className="flex-1 sm:flex-none px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                >
                  <option value="all">All Types</option>
                  <option value="genomics">Genomics</option>
                  <option value="in_vivo">In Vivo</option>
                  <option value="general">General</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="sm:hidden divide-y divide-slate-100">
          {filteredReports.map((report) => {
            const scorePercent = Math.round((report.validationResult.score / report.validationResult.maxScore) * 100)
            return (
              <div
                key={report.id}
                className="p-4 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => handleViewReport(report.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="font-medium text-slate-900 text-sm truncate">{report.title}</p>
                    <p className="text-xs text-slate-500">{report.sampleId}</p>
                  </div>
                  <StatusBadge status={report.status} />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
                  <div className="flex items-center gap-2">
                    <DataTypeBadge dataType={report.dataType} />
                    <span>{report.researcher.split(' ').slice(-1)[0]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${scorePercent >= 70 ? 'bg-emerald-500' : scorePercent >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                        style={{ width: `${scorePercent}%` }}
                      />
                    </div>
                    <span className="font-semibold text-slate-700">{scorePercent}%</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Report</th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Researcher</th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Score</th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-4 lg:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReports.map((report) => {
                const scorePercent = Math.round((report.validationResult.score / report.validationResult.maxScore) * 100)
                return (
                  <tr key={report.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 lg:px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{report.title}</p>
                        <p className="text-xs text-slate-500">{report.sampleId}</p>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <DataTypeBadge dataType={report.dataType} />
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-slate-600">{report.researcher}</td>
                    <td className="px-4 lg:px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${scorePercent >= 70 ? 'bg-emerald-500' : scorePercent >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                            style={{ width: `${scorePercent}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-slate-700">{scorePercent}%</span>
                      </div>
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="px-4 lg:px-6 py-4 text-sm text-slate-500">
                      {new Date(report.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 lg:px-6 py-4">
                      <button
                        onClick={() => handleViewReport(report.id)}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <svg className="w-12 h-12 mx-auto text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="font-medium">No reports found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filteredReports.length}</span> of <span className="font-semibold text-slate-900">{reports.length}</span> reports
          </p>
        </div>
      </div>
    </div>
  )
}
