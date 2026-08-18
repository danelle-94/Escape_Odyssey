import { createClient } from '@libsql/client';
import { Resend } from 'resend';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json',
};

let dbInitialized = false;

function getDbClient() {
  const url = process.env.TURSO_DATABASE_URL || 'file:server/database.sqlite';
  const authToken = process.env.TURSO_AUTH_TOKEN || undefined;
  return createClient({ url, authToken });
}

async function initDb(db) {
  if (dbInitialized) return;
  await db.execute(`
    CREATE TABLE IF NOT EXISTS visitors (
      visitor_id TEXT PRIMARY KEY,
      ip_address TEXT,
      user_agent TEXT,
      first_seen TEXT,
      last_seen TEXT,
      total_visits INTEGER DEFAULT 1
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      visitor_id TEXT,
      event_name TEXT,
      page_path TEXT,
      destination TEXT,
      visa_type TEXT,
      meta_json TEXT,
      timestamp TEXT,
      FOREIGN KEY(visitor_id) REFERENCES visitors(visitor_id)
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS visa_inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      visitor_id TEXT,
      full_name TEXT,
      phone TEXT,
      email TEXT,
      destination TEXT,
      visa_type TEXT,
      travel_date TEXT,
      notes TEXT,
      status TEXT DEFAULT 'New',
      created_at TEXT,
      FOREIGN KEY(visitor_id) REFERENCES visitors(visitor_id)
    );
  `);
  dbInitialized = true;
}

async function upsertVisitor(db, visitorId, ipAddress, userAgent) {
  if (!visitorId) return;
  const now = new Date().toISOString();
  const res = await db.execute({
    sql: 'SELECT visitor_id, total_visits FROM visitors WHERE visitor_id = ?',
    args: [visitorId],
  });

  if (res.rows[0]) {
    await db.execute({
      sql: `
        UPDATE visitors
        SET last_seen = ?, ip_address = ?, user_agent = ?, total_visits = total_visits + 1
        WHERE visitor_id = ?
      `,
      args: [now, ipAddress || '127.0.0.1', userAgent || '', visitorId],
    });
  } else {
    await db.execute({
      sql: `
        INSERT INTO visitors (visitor_id, ip_address, user_agent, first_seen, last_seen, total_visits)
        VALUES (?, ?, ?, ?, ?, 1)
      `,
      args: [visitorId, ipAddress || '127.0.0.1', userAgent || '', now, now],
    });
  }
}

export const handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const path = event.path.replace(/\/\.netlify\/functions\/api/, '').replace(/\/api/, '');
  const method = event.httpMethod;

  try {
    const db = getDbClient();
    await initDb(db);

    const clientIp = event.headers['x-forwarded-for']?.split(',')[0] || event.headers['client-ip'] || '127.0.0.1';
    const userAgent = event.headers['user-agent'] || '';

    // Route 1: POST /api/inquiries
    if (method === 'POST' && (path === '/inquiries' || path === '/inquiries/')) {
      const body = JSON.parse(event.body || '{}');
      const { visitorId, fullName, phone, email, destination, visaType, travelDate, notes } = body;

      if (!fullName || !phone) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ success: false, error: 'Full name and phone are required' }),
        };
      }

      const effectiveVisitorId = visitorId || 'anonymous';
      await upsertVisitor(db, effectiveVisitorId, clientIp, userAgent);

      const now = new Date().toISOString();
      const inqRes = await db.execute({
        sql: `
          INSERT INTO visa_inquiries (visitor_id, full_name, phone, email, destination, visa_type, travel_date, notes, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          effectiveVisitorId,
          fullName,
          phone,
          email || '',
          destination || '',
          visaType || '',
          travelDate || '',
          notes || '',
          now,
        ],
      });

      const inquiryId = Number(inqRes.lastInsertRowid || 0);

      await db.execute({
        sql: `
          INSERT INTO analytics_events (visitor_id, event_name, page_path, destination, visa_type, meta_json, timestamp)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        args: [
          effectiveVisitorId,
          'visa_enquiry_submitted',
          '/modal-inquiry',
          destination || null,
          visaType || null,
          JSON.stringify({ inquiryId, fullName, phone }),
          now,
        ],
      });

      // Send email notification to owner
      try {
        const resendApiKey = process.env.RESEND_API_KEY;
        const notifyEmail = process.env.NOTIFICATION_EMAIL || 'visaescapeodyssey@gmail.com';
        if (resendApiKey) {
          const resend = new Resend(resendApiKey);
          const emailResult = await resend.emails.send({
            from: 'Escape Odyssey Leads <onboarding@resend.dev>',
            to: notifyEmail,
            subject: `🚀 New Visa Lead: ${fullName} → ${destination || 'Not Specified'}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
                <div style="background: #015da5; padding: 24px; text-align: center;">
                  <h1 style="color: white; margin: 0; font-size: 22px;">🌍 New Visa Inquiry Received!</h1>
                  <p style="color: #bfdbfe; margin: 4px 0 0;">Escape Odyssey Travel & Tours</p>
                </div>
                <div style="padding: 24px;">
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 140px;">👤 Full Name</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e293b;">${fullName}</td></tr>
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">📞 Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e293b;">${phone}</td></tr>
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">📧 Email</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${email || 'Not provided'}</td></tr>
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">🌍 Destination</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${destination || 'Not specified'}</td></tr>
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">📄 Visa Type</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${visaType || 'Not specified'}</td></tr>
                    <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">✈️ Travel Date</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${travelDate || 'Not specified'}</td></tr>
                    <tr><td style="padding: 10px 0; color: #64748b;">📝 Notes</td><td style="padding: 10px 0; color: #1e293b;">${notes || 'None'}</td></tr>
                  </table>
                  <div style="margin-top: 24px; padding: 16px; background: #eff6ff; border-radius: 8px; border-left: 4px solid #015da5;">
                    <p style="margin: 0; color: #015da5; font-weight: bold;">⏰ Received: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
                    <p style="margin: 4px 0 0; color: #64748b; font-size: 13px;">Lead ID: #${inquiryId}</p>
                  </div>
                </div>
                <div style="background: #f1f5f9; padding: 16px; text-align: center;">
                  <p style="margin: 0; color: #94a3b8; font-size: 12px;">Escape Odyssey Travel & Tours Admin Notification</p>
                </div>
              </div>
            `,
          });
          if (emailResult?.error) {
            console.error('[Resend Error Detail]:', JSON.stringify(emailResult.error));
          } else {
            console.log(`[Email Sent Successfully]:`, JSON.stringify(emailResult?.data));
          }
        } else {
          console.log('[Email Notice]: RESEND_API_KEY is not set on Netlify');
        }
      } catch (emailError) {
        console.warn('[Email Exception]:', emailError.message);
      }

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({ success: true, inquiryId, message: 'Inquiry saved to Turso DB' }),
      };
    }

    // Route 2: POST /api/analytics/event
    if (method === 'POST' && (path === '/analytics/event' || path === '/analytics/event/')) {
      const body = JSON.parse(event.body || '{}');
      const { visitorId, eventName, pagePath, destination, visaType, meta } = body;

      const effectiveVisitorId = visitorId || 'anonymous';
      await upsertVisitor(db, effectiveVisitorId, clientIp, userAgent);

      if (eventName) {
        const now = new Date().toISOString();
        await db.execute({
          sql: `
            INSERT INTO analytics_events (visitor_id, event_name, page_path, destination, visa_type, meta_json, timestamp)
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `,
          args: [
            effectiveVisitorId,
            eventName,
            pagePath || '/',
            destination || null,
            visaType || null,
            meta ? JSON.stringify(meta) : null,
            now,
          ],
        });
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'Event logged' }),
      };
    }

    // Route 3: GET /api/admin/stats
    if (method === 'GET' && (path === '/admin/stats' || path === '/admin/stats/')) {
      const vRes = await db.execute('SELECT COUNT(*) as count FROM visitors');
      const eRes = await db.execute('SELECT COUNT(*) as count FROM analytics_events');
      const iRes = await db.execute('SELECT COUNT(*) as count FROM visa_inquiries');

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          stats: {
            totalVisitors: Number(vRes.rows[0]?.count || 0),
            totalEvents: Number(eRes.rows[0]?.count || 0),
            totalInquiries: Number(iRes.rows[0]?.count || 0),
          },
        }),
      };
    }

    // Route 4: GET /api/admin/visitors
    if (method === 'GET' && (path === '/admin/visitors' || path === '/admin/visitors/')) {
      const res = await db.execute('SELECT * FROM visitors ORDER BY last_seen DESC LIMIT 100');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, visitors: res.rows }),
      };
    }

    // Route 5: GET /api/admin/events
    if (method === 'GET' && (path === '/admin/events' || path === '/admin/events/')) {
      const res = await db.execute('SELECT * FROM analytics_events ORDER BY id DESC LIMIT 200');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, events: res.rows }),
      };
    }

    // Route 6: GET /api/admin/inquiries
    if (method === 'GET' && (path === '/admin/inquiries' || path === '/admin/inquiries/')) {
      const res = await db.execute('SELECT * FROM visa_inquiries ORDER BY id DESC LIMIT 100');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, inquiries: res.rows }),
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ success: false, error: 'Endpoint not found' }),
    };
  } catch (error) {
    console.error('[Netlify Function API Error]:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
