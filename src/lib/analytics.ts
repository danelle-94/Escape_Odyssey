import { getVisitorId } from './fingerprint';

export type EventName =
  | 'page_view'
  | 'visa_service_viewed'
  | 'destination_viewed'
  | 'visa_enquiry_started'
  | 'visa_enquiry_submitted'
  | 'whatsapp_clicked'
  | 'phone_clicked'
  | 'contact_form_submitted';

export interface AnalyticsEventPayload {
  visitorId: string | null;
  eventName: EventName;
  timestamp: string;
  pagePath: string;
  destination?: string;
  visaType?: string;
  meta?: Record<string, any>;
}

const STORAGE_KEY = 'escape_odyssey_visitor_events';
const API_BASE = (import.meta as any).env?.VITE_API_URL || '';

/**
 * Tracks a visitor activity event enriched with FingerprintJS visitorId.
 * Silently dispatches the event to the database via backend API.
 */
export async function trackVisitorEvent(
  eventName: EventName,
  details?: {
    destination?: string;
    visaType?: string;
    meta?: Record<string, any>;
  }
): Promise<AnalyticsEventPayload> {
  const visitorId = await getVisitorId();
  
  const payload: AnalyticsEventPayload = {
    visitorId,
    eventName,
    timestamp: new Date().toISOString(),
    pagePath: window.location.pathname + window.location.hash,
    destination: details?.destination,
    visaType: details?.visaType,
    meta: details?.meta,
  };

  // 1. Silent Background API Post to DB
  try {
    fetch(`${API_BASE}/api/analytics/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {
      // Silent error handler - zero disruption to user
    });
  } catch {
    // Ignore network failures for silent background telemetry
  }

  // 2. Backup to Local Storage for offline/resilience
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existing: AnalyticsEventPayload[] = existingRaw ? JSON.parse(existingRaw) : [];
    existing.push(payload);
    if (existing.length > 100) existing.shift();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    // Ignore storage quota errors silently
  }

  return payload;
}

/**
 * Submits a full Visa Inquiry form to the backend database.
 */
const INQUIRIES_STORAGE_KEY = 'escape_odyssey_visitor_inquiries';

/**
 * Submits a full Visa Inquiry form to the backend database with localStorage fallback.
 */
export async function submitInquiryToDb(inquiryData: {
  fullName: string;
  phone: string;
  email?: string;
  destination: string;
  visaType: string;
  travelDate?: string;
  notes?: string;
}) {
  const visitorId = await getVisitorId();

  const payload = {
    visitorId,
    ...inquiryData,
  };

  // 1. Local Storage Backup for resilience across page reloads
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    existing.unshift({
      id: 'local_' + Date.now(),
      full_name: inquiryData.fullName,
      phone: inquiryData.phone,
      email: inquiryData.email || '',
      destination: inquiryData.destination,
      visa_type: inquiryData.visaType,
      travel_date: inquiryData.travelDate || '',
      notes: inquiryData.notes || '',
      visitor_id: visitorId,
      created_at: new Date().toISOString(),
    });
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    // Ignore storage quota error
  }

  // 2. Dispatch to Backend API
  try {
    const response = await fetch(`${API_BASE}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await response.json();
  } catch (err) {
    console.warn('[DB Submit] Backend API offline/sleeping, inquiry saved to local backup.', err);
    return { success: true, localOnly: true, message: 'Inquiry saved locally' };
  }
}

/**
 * Helper for Admin Dashboard to fetch DB Visitor Records
 */
export async function fetchAdminVisitors() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/visitors`);
    const data = await res.json();
    return data.success ? data.visitors : [];
  } catch {
    return [];
  }
}

/**
 * Helper for Admin Dashboard to fetch DB Events
 */
export async function fetchAdminEvents() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/events`);
    const data = await res.json();
    return data.success ? data.events : [];
  } catch {
    return [];
  }
}

/**
 * Helper for Admin Dashboard to fetch DB Inquiries
 */
export async function fetchAdminInquiries() {
  let remoteInquiries: any[] = [];
  try {
    const res = await fetch(`${API_BASE}/api/admin/inquiries`);
    const data = await res.json();
    if (data.success && Array.isArray(data.inquiries)) {
      remoteInquiries = data.inquiries;
    }
  } catch {
    // Backend offline / 404
  }

  // Fetch local storage backup
  let localInquiries: any[] = [];
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (raw) localInquiries = JSON.parse(raw);
  } catch {}

  if (remoteInquiries.length > 0) {
    return remoteInquiries;
  }
  return localInquiries;
}

/**
 * Helper for Admin Dashboard to fetch Summary Stats
 */
export async function fetchAdminStats() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/stats`);
    const data = await res.json();
    if (data.success && data.stats) return data.stats;
  } catch {
    // Ignore network error
  }

  // Fallback stats from local storage
  let localInquiriesCount = 0;
  let localEventsCount = 0;
  try {
    const inq = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (inq) localInquiriesCount = JSON.parse(inq).length;
    const ev = localStorage.getItem(STORAGE_KEY);
    if (ev) localEventsCount = JSON.parse(ev).length;
  } catch {}

  return { totalVisitors: 1, totalEvents: localEventsCount, totalInquiries: localInquiriesCount };
}
