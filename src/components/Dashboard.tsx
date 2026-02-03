'use client'

import { useState } from 'react'
import { SavedReport, getReportStats } from '@/lib/mockReports'

interface Props {
  reports: SavedReport[]
  onNewValidation: () => void
  onViewReport?: (reportId: string) => void
}

function StatCard({ title, value, subtitle, color }: { title: string; value: string | number; subtitle?: string; color: string }) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${color}`}>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
    </div>
  )
}

function FairScoreChart({ scores }: { scores: { findable: number; accessible: number; interoperable: number; reusable: number } }) {
  const items = [
    { label: 'F', full: 'Findable', score: scores.findable, color: 'bg-purple-500' },
    { label: 'A', full: 'Accessible', score: scores.accessible, color: 'bg-blue-500' },
    { label: 'I', full: 'Interoperable', score: scores.interoperable, color: 'bg-green-500' },
    { label: 'R', full: 'Reusable', score: scores.reusable, color: 'bg-orange-500' },
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Average FAIR Scores</h3>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">
                <span className={`inline-block w-6 h-6 rounded-full ${item.color} text-white text-center text-xs leading-6 mr-2`}>
                  {item.label}
                </span>
                {item.full}
              </span>
              <span className={`font-semibold ${item.score >= 70 ? 'text-green-600' : item.score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                {item.score}%
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
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
    { label: 'Genomics', value: data.genomics, color: 'bg-indigo-500', percent: Math.round((data.genomics / total) * 100) },
    { label: 'In Vivo', value: data.in_vivo, color: 'bg-emerald-500', percent: Math.round((data.in_vivo / total) * 100) },
    { label: 'General', value: data.general, color: 'bg-amber-500', percent: Math.round((data.general / total) * 100) },
  ]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Reports by Data Type</h3>
      <div className="flex h-4 rounded-full overflow-hidden mb-4">
        {items.map(item => (
          <div
            key={item.label}
            className={`${item.color} transition-all`}
            style={{ width: `${item.percent}%` }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {items.map(item => (
          <div key={item.label} className="text-center">
            <div className={`w-3 h-3 rounded-full ${item.color} mx-auto mb-1`} />
            <p className="text-xs text-gray-600">{item.label}</p>
            <p className="text-lg font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: SavedReport['status'] }) {
  const styles = {
    'compliant': 'bg-green-100 text-green-800',
    'non-compliant': 'bg-red-100 text-red-800',
    'pending-review': 'bg-yellow-100 text-yellow-800',
  }
  const labels = {
    'compliant': 'Compliant',
    'non-compliant': 'Non-Compliant',
    'pending-review': 'Pending Review',
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

function DataTypeBadge({ dataType }: { dataType: SavedReport['dataType'] }) {
  const styles = {
    'genomics': 'bg-indigo-100 text-indigo-800',
    'in_vivo': 'bg-emerald-100 text-emerald-800',
    'general': 'bg-amber-100 text-amber-800',
  }
  const labels = {
    'genomics': 'Genomics',
    'in_vivo': 'In Vivo',
    'general': 'General',
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[dataType]}`}>
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Validation Dashboard</h2>
          <p className="text-gray-600">Monitor FAIR compliance across all experimental data submissions</p>
        </div>
        <button
          onClick={onNewValidation}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Validation
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Reports"
          value={stats.total}
          subtitle="All time submissions"
          color="border-blue-500"
        />
        <StatCard
          title="Compliance Rate"
          value={`${stats.complianceRate}%`}
          subtitle={`${stats.compliant} compliant reports`}
          color="border-green-500"
        />
        <StatCard
          title="Avg. FAIR Score"
          value={`${stats.avgScore}%`}
          subtitle="Across all reports"
          color="border-purple-500"
        />
        <StatCard
          title="Pending Review"
          value={stats.pendingReview}
          subtitle="Awaiting approval"
          color="border-yellow-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FairScoreChart scores={stats.avgFairScores} />
        <DataTypeChart data={stats.byDataType} />
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-900">Validation Reports Archive</h3>
            <div className="flex flex-wrap gap-2">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="genomics">Genomics</option>
                <option value="in_vivo">In Vivo</option>
                <option value="general">General</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Researcher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReports.map((report) => {
                const scorePercent = Math.round((report.validationResult.score / report.validationResult.maxScore) * 100)
                return (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{report.title}</p>
                        <p className="text-xs text-gray-500">{report.sampleId}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <DataTypeBadge dataType={report.dataType} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{report.researcher}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${scorePercent >= 70 ? 'bg-green-500' : scorePercent >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                            style={{ width: `${scorePercent}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{scorePercent}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(report.submittedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewReport(report.id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
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
          <div className="text-center py-12 text-gray-500">
            <p>No reports found matching your filters.</p>
          </div>
        )}

        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            Showing {filteredReports.length} of {reports.length} reports
          </p>
        </div>
      </div>
    </div>
  )
}
