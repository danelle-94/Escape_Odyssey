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

  const response = await fetch(`${API_BASE}/api/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return await response.json();
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
  try {
    const res = await fetch(`${API_BASE}/api/admin/inquiries`);
    const data = await res.json();
    return data.success ? data.inquiries : [];
  } catch {
    return [];
  }
}

/**
 * Helper for Admin Dashboard to fetch Summary Stats
 */
export async function fetchAdminStats() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/stats`);
    const data = await res.json();
    return data.success ? data.stats : { totalVisitors: 0, totalEvents: 0, totalInquiries: 0 };
  } catch {
    return { totalVisitors: 0, totalEvents: 0, totalInquiries: 0 };
  }
}
