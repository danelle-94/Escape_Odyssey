import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.DB_PATH || path.join(__dirname, 'database.sqlite');
const db = new Database(dbPath);

// Enable WAL mode for better concurrency performance
db.pragma('journal_mode = WAL');

// Initialize DB tables
export function initDb() {
  // Visitors Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS visitors (
      visitor_id TEXT PRIMARY KEY,
      ip_address TEXT,
      user_agent TEXT,
      first_seen TEXT,
      last_seen TEXT,
      total_visits INTEGER DEFAULT 1
    );
  `);

  // Analytics Events Table
  db.exec(`
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

  // Visa Inquiries Table
  db.exec(`
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

  console.log('[SQLite DB] Tables initialized successfully at:', dbPath);
}

/**
 * Upserts a visitor record into the database
 */
export function upsertVisitor(visitorId, ipAddress, userAgent) {
  if (!visitorId) return;

  const now = new Date().toISOString();
  const existing = db.prepare('SELECT visitor_id, total_visits FROM visitors WHERE visitor_id = ?').get(visitorId);

  if (existing) {
    db.prepare(`
      UPDATE visitors
      SET last_seen = ?, ip_address = ?, user_agent = ?, total_visits = total_visits + 1
      WHERE visitor_id = ?
    `).run(now, ipAddress || '127.0.0.1', userAgent || '', visitorId);
  } else {
    db.prepare(`
      INSERT INTO visitors (visitor_id, ip_address, user_agent, first_seen, last_seen, total_visits)
      VALUES (?, ?, ?, ?, ?, 1)
    `).run(visitorId, ipAddress || '127.0.0.1', userAgent || '', now, now);
  }
}

/**
 * Logs an analytics event to SQLite
 */
export function logAnalyticsEvent({ visitorId, eventName, pagePath, destination, visaType, meta }) {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO analytics_events (visitor_id, event_name, page_path, destination, visa_type, meta_json, timestamp)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    visitorId || 'anonymous',
    eventName,
    pagePath || '/',
    destination || null,
    visaType || null,
    meta ? JSON.stringify(meta) : null,
    now
  );
}

/**
 * Saves a new visa inquiry to SQLite
 */
export function saveVisaInquiry({ visitorId, fullName, phone, email, destination, visaType, travelDate, notes }) {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO visa_inquiries (visitor_id, full_name, phone, email, destination, visa_type, travel_date, notes, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    visitorId || 'anonymous',
    fullName,
    phone,
    email || '',
    destination,
    visaType,
    travelDate || '',
    notes || '',
    now
  );
  return result.lastInsertRowid;
}

/**
 * Fetch stats summary for Admin
 */
export function getAdminStats() {
  const totalVisitors = db.prepare('SELECT COUNT(*) as count FROM visitors').get().count;
  const totalEvents = db.prepare('SELECT COUNT(*) as count FROM analytics_events').get().count;
  const totalInquiries = db.prepare('SELECT COUNT(*) as count FROM visa_inquiries').get().count;
  return { totalVisitors, totalEvents, totalInquiries };
}

/**
 * Fetch all visitors for Admin
 */
export function getAllVisitors(limit = 100) {
  return db.prepare('SELECT * FROM visitors ORDER BY last_seen DESC LIMIT ?').all(limit);
}

/**
 * Fetch all events for Admin
 */
export function getAllEvents(limit = 200) {
  return db.prepare('SELECT * FROM analytics_events ORDER BY id DESC LIMIT ?').all(limit);
}

/**
 * Fetch all inquiries for Admin
 */
export function getAllInquiries(limit = 100) {
  return db.prepare('SELECT * FROM visa_inquiries ORDER BY id DESC LIMIT ?').all(limit);
}

export default db;
