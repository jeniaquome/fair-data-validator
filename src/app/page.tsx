'use client'

import { useState } from 'react'
import ValidatorForm from '@/components/ValidatorForm'
import ValidationReport from '@/components/ValidationReport'
import Dashboard from '@/components/Dashboard'
import AlertsPanel from '@/components/AlertsPanel'
import ProfilePanel from '@/components/ProfilePanel'
import ReportDetail from '@/components/ReportDetail'
import ProfileView from '@/components/ProfileView'
import MyReportsView from '@/components/MyReportsView'
import SettingsView from '@/components/SettingsView'
import Logo from '@/components/Logo'
import { ValidationResult } from '@/lib/validator'
import { mockReports, SavedReport } from '@/lib/mockReports'

type View = 'dashboard' | 'validator' | 'report' | 'profile' | 'my-reports' | 'settings'

export default function Home() {
  const [view, setView] = useState<View>('dashboard')
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [alertsOpen, setAlertsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<SavedReport | null>(null)

  const unreadAlertsCount = 3 // Mock count

  const handleViewReport = (reportId: string) => {
    const report = mockReports.find(r => r.id === reportId)
    if (report) {
      setSelectedReport(report)
      setView('report')
    }
  }

  const handleLogoClick = () => {
    setView('dashboard')
    setSelectedReport(null)
    setValidationResult(null)
  }

  const handleProfileNavigation = (destination: View) => {
    setView(destination)
    setProfileOpen(false)
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - clickable to go home */}
            <button
              onClick={handleLogoClick}
              className="flex items-center hover:opacity-70 transition-opacity"
            >
              <Logo size="md" />
            </button>

            {/* Right side - Alerts and Profile */}
            <div className="flex items-center gap-2">
              {/* Alerts Button */}
              <div className="relative">
                <button
                  data-testid="alerts-button"
                  onClick={() => {
                    setAlertsOpen(!alertsOpen)
                    setProfileOpen(false)
                  }}
                  className={`p-2 rounded-lg transition-colors relative ${
                    alertsOpen
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadAlertsCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadAlertsCount > 9 ? '9+' : unreadAlertsCount}
                    </span>
                  )}
                </button>

                <AlertsPanel
                  isOpen={alertsOpen}
                  onClose={() => setAlertsOpen(false)}
                  onViewReport={handleViewReport}
                />
              </div>

              {/* Profile Button */}
              <div className="relative">
                <button
                  data-testid="profile-button"
                  onClick={() => {
                    setProfileOpen(!profileOpen)
                    setAlertsOpen(false)
                  }}
                  className={`flex items-center gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-lg transition-colors ${
                    profileOpen
                      ? 'bg-slate-100'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    SC
                  </div>
                  <svg className="w-4 h-4 text-slate-500 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <ProfilePanel
                  isOpen={profileOpen}
                  onClose={() => setProfileOpen(false)}
                  onNavigate={handleProfileNavigation}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'profile' ? (
          <ProfileView onBack={() => setView('dashboard')} />
        ) : view === 'my-reports' ? (
          <MyReportsView
            reports={mockReports}
            onBack={() => setView('dashboard')}
            onViewReport={handleViewReport}
          />
        ) : view === 'settings' ? (
          <SettingsView onBack={() => setView('dashboard')} />
        ) : view === 'report' && selectedReport ? (
          <ReportDetail
            report={selectedReport}
            onBack={() => {
              setView('dashboard')
              setSelectedReport(null)
            }}
          />
        ) : view === 'validator' ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setView('dashboard')}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">New Validation</h2>
                <p className="text-slate-600">
                  Submit experimental data for FAIR compliance validation
                </p>
              </div>
            </div>

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
        ) : (
          <Dashboard
            reports={mockReports}
            onNewValidation={() => setView('validator')}
            onViewReport={handleViewReport}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-700">FAIR<span className="text-indigo-600">guard</span></span>
              <span className="text-slate-300">|</span>
              <p className="text-xs sm:text-sm text-slate-500">
                Research Data Compliance Platform
              </p>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Powered by <span className="font-medium text-slate-500">Quome AI</span>
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
