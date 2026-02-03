'use client'

import { useState } from 'react'

interface Props {
  onBack: () => void
}

export default function SettingsView({ onBack }: Props) {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [validationAlerts, setValidationAlerts] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(false)
  const [autoSave, setAutoSave] = useState(true)

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
          <h2 className="text-2xl font-bold text-slate-900">Settings</h2>
          <p className="text-slate-600">Manage your preferences and account settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200 p-2">
            <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-white bg-indigo-600 rounded-lg transition-colors">
              Notifications
            </button>
            <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
              Preferences
            </button>
            <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
              Security
            </button>
            <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
              API Keys
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notification Settings */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Email Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-200">
                <div>
                  <p className="font-medium text-slate-900">Email Notifications</p>
                  <p className="text-sm text-slate-500">Receive email updates about your account</p>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    emailNotifications ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-slate-200">
                <div>
                  <p className="font-medium text-slate-900">Validation Alerts</p>
                  <p className="text-sm text-slate-500">Get notified when validation completes</p>
                </div>
                <button
                  onClick={() => setValidationAlerts(!validationAlerts)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    validationAlerts ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      validationAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-slate-900">Weekly Summary</p>
                  <p className="text-sm text-slate-500">Receive weekly compliance reports</p>
                </div>
                <button
                  onClick={() => setWeeklyReport(!weeklyReport)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    weeklyReport ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      weeklyReport ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Validation Preferences */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Validation Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-200">
                <div>
                  <p className="font-medium text-slate-900">Auto-save Drafts</p>
                  <p className="text-sm text-slate-500">Automatically save validation forms</p>
                </div>
                <button
                  onClick={() => setAutoSave(!autoSave)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoSave ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoSave ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="py-3 border-b border-slate-200">
                <label className="block font-medium text-slate-900 mb-2">Default Data Type</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Genomics</option>
                  <option>In Vivo</option>
                  <option>General</option>
                </select>
              </div>

              <div className="py-3">
                <label className="block font-medium text-slate-900 mb-2">Validation Threshold</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Standard (60%)</option>
                  <option>Strict (70%)</option>
                  <option>Lenient (50%)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <button className="btn-brand py-2.5 px-6 text-sm">
              Save Changes
            </button>
            <button className="btn-secondary py-2.5 px-6 text-sm">
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
