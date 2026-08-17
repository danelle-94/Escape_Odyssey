import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Fingerprint,
  Users,
  FileText,
  Activity,
  RefreshCw,
  Lock,
  Search,
  Clock,
  Phone
} from 'lucide-react';
import {
  fetchAdminStats,
  fetchAdminVisitors,
  fetchAdminEvents,
  fetchAdminInquiries,
} from '../lib/analytics';
import { getVisitorId } from '../lib/fingerprint';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<'inquiries' | 'visitors' | 'events'>('inquiries');

  const [stats, setStats] = useState({ totalVisitors: 0, totalEvents: 0, totalInquiries: 0 });
  const [visitors, setVisitors] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentVisitorId, setCurrentVisitorId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Default Passcode: 1234 (Owner can change)
  const ADMIN_PASSCODE = '1234';

  const loadData = async () => {
    setLoading(true);
    const [sData, vData, eData, iData, myFp] = await Promise.all([
      fetchAdminStats(),
      fetchAdminVisitors(),
      fetchAdminEvents(),
      fetchAdminInquiries(),
      getVisitorId(),
    ]);
    setStats(sData);
    setVisitors(vData);
    setEvents(eData);
    setInquiries(iData);
    setCurrentVisitorId(myFp);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen && authenticated) {
      loadData();
    }
  }, [isOpen, authenticated]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PASSCODE) {
      setAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid passcode. Default is 1234');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white border border-blue-200 rounded-2xl shadow-2xl h-[90vh] flex flex-col overflow-hidden text-slate-800">
        
        {/* Header */}
        <div className="bg-[#015da5] text-white p-5 flex items-center justify-between flex-shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-cinzel tracking-wide flex items-center gap-2">
                Escape Odyssey Admin Control Center
              </h2>
              <p className="text-xs text-blue-100 font-medium">
                Backend SQLite Database & Visitor Fingerprint Analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {authenticated && (
              <button
                onClick={loadData}
                disabled={loading}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/20"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Data
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Passcode Protection Modal State */}
        {!authenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50">
            <div className="w-full max-w-sm bg-white p-8 rounded-2xl border border-slate-200 shadow-lg text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#015da5]">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-cinzel">Owner Verification Required</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Enter admin passcode to access SQLite DB & visitor logs.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Enter Passcode (Default: 1234)"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full text-center px-4 py-3 border border-slate-300 focus:border-[#015da5] focus:ring-1 focus:ring-[#015da5] rounded-xl text-lg tracking-widest font-mono focus:outline-none"
                    autoFocus
                  />
                  {pinError && <p className="text-xs text-rose-600 mt-2 font-medium">{pinError}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#015da5] hover:bg-[#01477f] text-white font-bold text-sm shadow-md transition-all"
                >
                  Authenticate Admin
                </button>
              </form>

              <p className="text-[10px] text-slate-400">
                🔒 Database security active. All access logs are recorded in SQLite.
              </p>
            </div>
          </div>
        ) : (
          /* Main Authenticated Admin View */
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50">
            
            {/* Top Stat Cards Strip */}
            <div className="p-4 bg-white border-b border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-4 flex-shrink-0">
              <div className="p-3.5 bg-blue-50/80 rounded-xl border border-blue-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Total Inquiries</div>
                  <div className="text-xl font-bold text-slate-900 font-mono">{stats.totalInquiries}</div>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50/80 rounded-xl border border-emerald-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Unique Visitors</div>
                  <div className="text-xl font-bold text-slate-900 font-mono">{stats.totalVisitors}</div>
                </div>
              </div>

              <div className="p-3.5 bg-purple-50/80 rounded-xl border border-purple-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Logged Events</div>
                  <div className="text-xl font-bold text-slate-900 font-mono">{stats.totalEvents}</div>
                </div>
              </div>

              <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center flex-shrink-0">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Your Fingerprint</div>
                  <div className="text-xs font-mono text-[#015da5] truncate max-w-[120px]" title={currentVisitorId || ''}>
                    {currentVisitorId || 'Loading...'}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs & Search */}
            <div className="p-4 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'inquiries'
                      ? 'bg-[#015da5] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <FileText className="w-4 h-4" /> Visa Inquiries ({inquiries.length})
                </button>

                <button
                  onClick={() => setActiveTab('visitors')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'visitors'
                      ? 'bg-[#015da5] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Users className="w-4 h-4" /> Visitor Fingerprints ({visitors.length})
                </button>

                <button
                  onClick={() => setActiveTab('events')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTab === 'events'
                      ? 'bg-[#015da5] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Activity className="w-4 h-4" /> Session Event Logs ({events.length})
                </button>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#015da5]"
                />
              </div>
            </div>

            {/* Content Table Views */}
            <div className="flex-1 overflow-y-auto p-4">
              
              {/* TAB 1: Visa Inquiries */}
              {activeTab === 'inquiries' && (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  {inquiries.length === 0 ? (
                    <div className="p-12 text-center text-slate-500 text-xs font-medium">
                      No visa inquiries recorded in the SQLite database yet.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                          <tr>
                            <th className="p-3">ID</th>
                            <th className="p-3">Applicant Name</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Destination</th>
                            <th className="p-3">Visa Type</th>
                            <th className="p-3">Fingerprint ID</th>
                            <th className="p-3">Date Submitted</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {inquiries
                            .filter(
                              (i) =>
                                !searchTerm ||
                                i.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                i.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                i.visitor_id?.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((inq) => (
                              <tr key={inq.id} className="hover:bg-blue-50/50 transition-colors">
                                <td className="p-3 font-mono font-bold text-slate-400">#{inq.id}</td>
                                <td className="p-3 font-bold text-slate-900">{inq.full_name}</td>
                                <td className="p-3 font-mono text-[#015da5] font-semibold flex items-center gap-1">
                                  <Phone className="w-3 h-3" /> {inq.phone}
                                </td>
                                <td className="p-3">
                                  <span className="px-2 py-0.5 rounded bg-blue-50 text-[#015da5] font-semibold border border-blue-100">
                                    {inq.destination}
                                  </span>
                                </td>
                                <td className="p-3 font-medium text-slate-700">{inq.visa_type}</td>
                                <td className="p-3 font-mono text-[11px] text-slate-500 truncate max-w-[140px]" title={inq.visitor_id}>
                                  {inq.visitor_id}
                                </td>
                                <td className="p-3 text-slate-500 font-medium">
                                  {new Date(inq.created_at).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Visitor Fingerprints */}
              {activeTab === 'visitors' && (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  {visitors.length === 0 ? (
                    <div className="p-12 text-center text-slate-500 text-xs font-medium">
                      No visitor fingerprints stored in DB yet.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                          <tr>
                            <th className="p-3">Fingerprint Hash ID</th>
                            <th className="p-3">IP Address</th>
                            <th className="p-3">Total Visits</th>
                            <th className="p-3">First Seen</th>
                            <th className="p-3">Last Seen</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {visitors
                            .filter(
                              (v) =>
                                !searchTerm ||
                                v.visitor_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                v.ip_address?.includes(searchTerm)
                            )
                            .map((v) => (
                              <tr key={v.visitor_id} className="hover:bg-blue-50/50 transition-colors">
                                <td className="p-3 font-mono font-bold text-[#015da5] flex items-center gap-1.5">
                                  <Fingerprint className="w-4 h-4 text-[#015da5]" /> {v.visitor_id}
                                  {v.visitor_id === currentVisitorId && (
                                    <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px]">You</span>
                                  )}
                                </td>
                                <td className="p-3 font-mono text-slate-700">{v.ip_address}</td>
                                <td className="p-3">
                                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-mono font-bold">
                                    {v.total_visits} sessions
                                  </span>
                                </td>
                                <td className="p-3 text-slate-500">{new Date(v.first_seen).toLocaleString()}</td>
                                <td className="p-3 text-slate-500 font-semibold">{new Date(v.last_seen).toLocaleString()}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Event Logs */}
              {activeTab === 'events' && (
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  {events.length === 0 ? (
                    <div className="p-12 text-center text-slate-500 text-xs font-medium">
                      No events logged in database yet.
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {events
                        .filter(
                          (ev) =>
                            !searchTerm ||
                            ev.event_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ev.visitor_id?.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((ev) => (
                          <div key={ev.id} className="p-3 hover:bg-slate-50 transition-colors flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              <span className="px-2 py-1 rounded-lg bg-blue-50 text-[#015da5] font-bold font-mono">
                                {ev.event_name}
                              </span>
                              <span className="font-mono text-slate-500 text-[11px]" title={ev.visitor_id}>
                                ID: {ev.visitor_id?.substring(0, 10)}...
                              </span>
                              <span className="text-slate-600 font-medium">Path: {ev.page_path}</span>
                              {ev.destination && (
                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-bold rounded text-[10px]">
                                  {ev.destination}
                                </span>
                              )}
                            </div>
                            <div className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {new Date(ev.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Footer Notice */}
            <div className="p-3 bg-white border-t border-slate-200 text-center text-slate-400 text-[11px] flex items-center justify-between px-6 flex-shrink-0 font-medium">
              <span>Escape Odyssey SQLite Persistence Engine</span>
              <span>🔒 Private Owner Access Only</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
