import express from 'express';
import cors from 'cors';
import {
  initDb,
  upsertVisitor,
  logAnalyticsEvent,
  saveVisaInquiry,
  getAdminStats,
  getAllVisitors,
  getAllEvents,
  getAllInquiries,
} from './db.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
initDb();

// Helper to extract IP address from request
function getClientIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket?.remoteAddress ||
    '127.0.0.1'
  );
}

// ----------------------------------------------------
// Public Silent Telemetry API Endpoints
// ----------------------------------------------------

/**
 * Silent event tracking endpoint.
 * Called by browser in the background whenever visitor navigates or performs actions.
 */
app.post('/api/analytics/event', (req, res) => {
  try {
    const { visitorId, eventName, pagePath, destination, visaType, meta } = req.body;
    const ipAddress = getClientIp(req);
    const userAgent = req.headers['user-agent'] || '';

    if (visitorId) {
      upsertVisitor(visitorId, ipAddress, userAgent);
    }

    if (eventName) {
      logAnalyticsEvent({
        visitorId,
        eventName,
        pagePath,
        destination,
        visaType,
        meta,
      });
    }

    return res.status(200).json({ success: true, message: 'Event logged to DB' });
  } catch (error) {
    console.error('[API Error] /api/analytics/event:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

/**
 * Public visa inquiry submission endpoint.
 * Saves lead info directly to SQLite DB alongside the visitor fingerprint ID.
 */
app.post('/api/inquiries', (req, res) => {
  try {
    const { visitorId, fullName, phone, email, destination, visaType, travelDate, notes } = req.body;
    const ipAddress = getClientIp(req);
    const userAgent = req.headers['user-agent'] || '';

    if (!fullName || !phone) {
      return res.status(400).json({ success: false, error: 'Full name and phone are required' });
    }

    if (visitorId) {
      upsertVisitor(visitorId, ipAddress, userAgent);
    }

    const inquiryId = saveVisaInquiry({
      visitorId,
      fullName,
      phone,
      email,
      destination,
      visaType,
      travelDate,
      notes,
    });

    logAnalyticsEvent({
      visitorId,
      eventName: 'visa_enquiry_submitted',
      pagePath: '/modal-inquiry',
      destination,
      visaType,
      meta: { inquiryId, fullName, phone },
    });

    console.log(`[DB Saved] New inquiry #${inquiryId} from ${fullName} (Fingerprint: ${visitorId})`);
    return res.status(201).json({ success: true, inquiryId, message: 'Inquiry saved to DB' });
  } catch (error) {
    console.error('[API Error] /api/inquiries:', error);
    return res.status(500).json({ success: false, error: 'Failed to save inquiry to DB' });
  }
});

// ----------------------------------------------------
// Private Owner Admin API Endpoints
// ----------------------------------------------------

app.get('/api/admin/stats', (_req, res) => {
  try {
    const stats = getAdminStats();
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/admin/visitors', (_req, res) => {
  try {
    const visitors = getAllVisitors();
    res.json({ success: true, visitors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/admin/events', (_req, res) => {
  try {
    const events = getAllEvents();
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/admin/inquiries', (_req, res) => {
  try {
    const inquiries = getAllInquiries();
    res.json({ success: true, inquiries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 [Escape Odyssey DB Backend] Server running on http://localhost:${PORT}`);
});
