'use client'

import { useState } from 'react'

interface Alert {
  id: string
  type: 'error' | 'warning' | 'success' | 'info'
  title: string
  message: string
  reportId?: string
  timestamp: string
  read: boolean
}

const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'error',
    title: 'Validation Failed',
    message: 'Western blot validation (EXP-20260110-004) failed FAIR compliance with 2 critical errors.',
    reportId: 'RPT-2026-007',
    timestamp: '2026-01-10T10:45:00Z',
    read: false,
  },
  {
    id: 'alert-2',
    type: 'warning',
    title: 'Pending Review',
    message: 'Toxicology assessment (INV-20260115-002) is awaiting your review and approval.',
    reportId: 'RPT-2026-005',
    timestamp: '2026-01-15T08:00:00Z',
    read: false,
  },
  {
    id: 'alert-3',
    type: 'success',
    title: 'Report Approved',
    message: 'ChIP-seq analysis (GNE-20260112-008) has been approved and archived.',
    reportId: 'RPT-2026-006',
    timestamp: '2026-01-12T14:30:00Z',
    read: true,
  },
  {
    id: 'alert-4',
    type: 'warning',
    title: 'Low Compliance Score',
    message: 'Pharmacokinetics study (INV-20260120-007) scored 53% - below the 60% threshold.',
    reportId: 'RPT-2026-003',
    timestamp: '2026-01-20T16:45:00Z',
    read: false,
  },
  {
    id: 'alert-5',
    type: 'info',
    title: 'New Submission',
    message: 'Dr. Sarah Chen submitted a new Single-cell RNA-seq validation request.',
    reportId: 'RPT-2026-001',
    timestamp: '2026-01-28T14:30:00Z',
    read: true,
  },
  {
    id: 'alert-6',
    type: 'success',
    title: 'Compliance Achieved',
    message: 'ATAC-seq profiling (GNE-20260102-005) passed with 93% FAIR compliance.',
    reportId: 'RPT-2026-010',
    timestamp: '2026-01-02T14:00:00Z',
    read: true,
  },
]

interface Props {
  isOpen: boolean
  onClose: () => void
  onViewReport: (reportId: string) => void
}

export default function AlertsPanel({ isOpen, onClose, onViewReport }: Props) {
  const [alerts, setAlerts] = useState(mockAlerts)

  const unreadCount = alerts.filter(a => !a.read).length

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a))
  }

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })))
  }

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return (
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
        )
      case 'warning':
        return (
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        )
      case 'success':
        return (
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        )
      case 'info':
        return (
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        )
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed sm:absolute inset-x-2 sm:inset-x-auto sm:right-0 top-16 sm:top-full sm:mt-2 w-auto sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden max-h-[80vh] sm:max-h-none flex flex-col">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <p className="text-xs text-gray-500">{unreadCount} unread</p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                !alert.read ? 'bg-blue-50/50' : ''
              }`}
              onClick={() => {
                markAsRead(alert.id)
                if (alert.reportId) {
                  onViewReport(alert.reportId)
                  onClose()
                }
              }}
            >
              <div className="flex gap-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm font-medium ${!alert.read ? 'text-gray-900' : 'text-gray-700'}`}>
                      {alert.title}
                    </p>
                    {!alert.read && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">{alert.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{formatTime(alert.timestamp)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all notifications
          </button>
        </div>
      </div>
    </>
  )
}

export function AlertsBadge({ count }: { count: number }) {
  if (count === 0) return null
  return (
    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
      {count > 9 ? '9+' : count}
    </span>
  )
}
