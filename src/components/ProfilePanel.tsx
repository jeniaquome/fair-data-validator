'use client'

interface UserProfile {
  name: string
  email: string
  role: string
  department: string
  avatar: string
  initials: string
  reportsSubmitted: number
  complianceRate: number
}

const currentUser: UserProfile = {
  name: 'Dr. Sarah Chen',
  email: 'sarah.chen@genentech.com',
  role: 'Principal Scientist',
  department: 'Computational Biology',
  avatar: '',
  initials: 'SC',
  reportsSubmitted: 24,
  complianceRate: 92,
}

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function ProfilePanel({ isOpen, onClose }: Props) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Panel */}
      <div className="fixed sm:absolute inset-x-2 sm:inset-x-auto sm:right-0 top-16 sm:top-full sm:mt-2 w-auto sm:w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden max-h-[80vh] sm:max-h-none overflow-y-auto">
        {/* Profile Header */}
        <div className="px-4 py-5 bg-gradient-to-br from-blue-600 to-purple-600">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-blue-600 text-xl font-bold shadow-lg">
              {currentUser.initials}
            </div>
            <div>
              <h3 className="font-semibold text-white">{currentUser.name}</h3>
              <p className="text-blue-100 text-sm">{currentUser.role}</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-600">{currentUser.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-gray-600">{currentUser.department}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="px-4 py-4 border-b border-gray-200">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Your Statistics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-gray-900">{currentUser.reportsSubmitted}</p>
              <p className="text-xs text-gray-500">Reports Submitted</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-green-600">{currentUser.complianceRate}%</p>
              <p className="text-xs text-gray-500">Compliance Rate</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            View Profile
          </button>
          <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            My Reports
          </button>
          <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </button>
          <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Help & Support
          </button>
        </div>

        {/* Sign Out */}
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <button className="w-full py-2 text-sm text-red-600 hover:text-red-700 font-medium flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </>
  )
}
