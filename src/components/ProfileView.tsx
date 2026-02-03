'use client'

import { useState } from 'react'

interface Props {
  onBack: () => void
}

export default function ProfileView({ onBack }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const user = {
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@genentech.com',
    role: 'Principal Scientist',
    department: 'Computational Biology',
    initials: 'SC',
    reportsSubmitted: 24,
    complianceRate: 92,
    joinDate: '2024-03-15',
    orcid: '0000-0002-1825-0097',
    phone: '+1 (650) 225-1000',
    location: 'South San Francisco, CA',
  }

  const handleEditProfile = () => {
    setIsEditing(true)
    // In a real app, this would open an edit modal or form
    alert('Edit Profile functionality - In a production app, this would open an edit form')
  }

  const handleChangePassword = () => {
    // In a real app, this would open a password change modal
    alert('Change Password - In a production app, this would open a secure password change form')
  }

  const handleDownloadData = () => {
    // Generate user data export
    const userData = {
      profile: user,
      exportDate: new Date().toISOString(),
      dataType: 'User Profile Export',
    }

    const dataStr = JSON.stringify(userData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `fairguard-profile-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the account
    alert('Account Deletion - In a production app, this would permanently delete your account after additional verification')
    setShowDeleteConfirm(false)
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
          <h2 className="text-2xl font-bold text-slate-900">Profile</h2>
          <p className="text-slate-600">Manage your account information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {user.initials}
              </div>
              <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
              <p className="text-slate-600 mt-1">{user.role}</p>
              <p className="text-sm text-slate-500">{user.department}</p>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-2xl font-bold text-slate-900">{user.reportsSubmitted}</p>
                    <p className="text-xs text-slate-500 mt-1">Reports</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">{user.complianceRate}%</p>
                    <p className="text-xs text-slate-500 mt-1">Compliance</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleEditProfile}
                className="w-full mt-6 btn-brand py-2.5 px-4 text-sm"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Full Name</label>
                  <p className="text-slate-900 font-medium">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Email Address</label>
                  <p className="text-slate-900 font-medium">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Phone Number</label>
                  <p className="text-slate-900 font-medium">{user.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">ORCID iD</label>
                  <p className="text-slate-900 font-medium">{user.orcid}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Department</label>
                  <p className="text-slate-900 font-medium">{user.department}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Location</label>
                  <p className="text-slate-900 font-medium">{user.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Account Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Member Since</label>
                  <p className="text-slate-900 font-medium">{new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Account Status</label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Active
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Two-Factor Auth</label>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Enabled
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-500 mb-1">Last Login</label>
                  <p className="text-slate-900 font-medium">Today at 9:45 AM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleChangePassword}
              className="btn-secondary py-2.5 px-4 text-sm"
            >
              Change Password
            </button>
            <button
              onClick={handleDownloadData}
              className="btn-secondary py-2.5 px-4 text-sm"
            >
              Download My Data
            </button>
            <button
              onClick={handleDeleteAccount}
              className="text-sm text-red-600 hover:text-red-700 font-semibold py-2.5 px-4 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowDeleteConfirm(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Account</h3>
              <p className="text-slate-600 mb-6">
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 btn-secondary py-2.5 px-4 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-600 text-white py-2.5 px-4 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
