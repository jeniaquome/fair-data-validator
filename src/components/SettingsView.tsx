'use client'

import { useState } from 'react'

interface Props {
  onBack: () => void
}

interface Settings {
  emailNotifications: boolean
  validationAlerts: boolean
  weeklyReport: boolean
  autoSave: boolean
  defaultDataType: string
  validationThreshold: string
}

const defaultSettings: Settings = {
  emailNotifications: true,
  validationAlerts: true,
  weeklyReport: false,
  autoSave: true,
  defaultDataType: 'genomics',
  validationThreshold: 'standard',
}

export default function SettingsView({ onBack }: Props) {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [showSaveConfirm, setShowSaveConfirm] = useState(false)

  const handleSave = () => {
    // In a real app, this would save to backend/localStorage
    setShowSaveConfirm(true)
    setTimeout(() => setShowSaveConfirm(false), 3000)
  }

  const handleReset = () => {
    setSettings(defaultSettings)
    alert('Settings reset to defaults')
  }

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

      {/* Save Confirmation */}
      {showSaveConfirm && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center gap-3">
          <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p className="text-sm font-medium text-emerald-800">Settings saved successfully!</p>
        </div>
      )}

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
                  onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.emailNotifications ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
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
                  onClick={() => setSettings({ ...settings, validationAlerts: !settings.validationAlerts })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.validationAlerts ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.validationAlerts ? 'translate-x-6' : 'translate-x-1'
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
                  onClick={() => setSettings({ ...settings, weeklyReport: !settings.weeklyReport })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.weeklyReport ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.weeklyReport ? 'translate-x-6' : 'translate-x-1'
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
                  onClick={() => setSettings({ ...settings, autoSave: !settings.autoSave })}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.autoSave ? 'bg-indigo-600' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.autoSave ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="py-3 border-b border-slate-200">
                <label className="block font-medium text-slate-900 mb-2">Default Data Type</label>
                <select
                  value={settings.defaultDataType}
                  onChange={(e) => setSettings({ ...settings, defaultDataType: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="genomics">Genomics</option>
                  <option value="in_vivo">In Vivo</option>
                  <option value="general">General</option>
                </select>
              </div>

              <div className="py-3">
                <label className="block font-medium text-slate-900 mb-2">Validation Threshold</label>
                <select
                  value={settings.validationThreshold}
                  onChange={(e) => setSettings({ ...settings, validationThreshold: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="standard">Standard (60%)</option>
                  <option value="strict">Strict (70%)</option>
                  <option value="lenient">Lenient (50%)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="btn-brand py-2.5 px-6 text-sm"
            >
              Save Changes
            </button>
            <button
              onClick={handleReset}
              className="btn-secondary py-2.5 px-6 text-sm"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
