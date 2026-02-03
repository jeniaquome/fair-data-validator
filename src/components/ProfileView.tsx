'use client'

interface Props {
  onBack: () => void
}

export default function ProfileView({ onBack }: Props) {
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

              <button className="w-full mt-6 btn-brand py-2.5 px-4 text-sm">
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
            <button className="btn-secondary py-2.5 px-4 text-sm">
              Change Password
            </button>
            <button className="btn-secondary py-2.5 px-4 text-sm">
              Download My Data
            </button>
            <button className="text-sm text-red-600 hover:text-red-700 font-semibold py-2.5 px-4 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
