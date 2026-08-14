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

/**
 * Tracks a visitor activity event enriched with FingerprintJS visitorId.
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

  // Log event internally for debugging
  console.log(`[Analytics Tracked: ${eventName}]`, payload);

  // Save to local session log for admin/journey review
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const existing: AnalyticsEventPayload[] = existingRaw ? JSON.parse(existingRaw) : [];
    existing.push(payload);
    // Keep last 100 events
    if (existing.length > 100) existing.shift();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.warn('[Analytics] Failed to save event to localStorage:', err);
  }

  return payload;
}

/**
 * Helper to fetch recorded visitor events for admin inspection.
 */
export function getStoredVisitorEvents(): AnalyticsEventPayload[] {
  try {
    const existingRaw = localStorage.getItem(STORAGE_KEY);
    return existingRaw ? JSON.parse(existingRaw) : [];
  } catch {
    return [];
  }
}
