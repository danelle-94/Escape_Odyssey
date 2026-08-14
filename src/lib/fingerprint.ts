import FingerprintJS from '@fingerprintjs/fingerprintjs';

type Agent = Awaited<ReturnType<typeof FingerprintJS.load>>;

// Singleton promise for FingerprintJS agent initialization
let fpPromise: Promise<Agent> | null = null;

/**
 * Initializes and returns the FingerprintJS agent promise.
 * Disables optional telemetry usage statistics via `monitoring: false`.
 */
function getFingerprintAgent(): Promise<Agent> {
  if (!fpPromise) {
    fpPromise = FingerprintJS.load({
      monitoring: false,
    });
  }
  return fpPromise;
}

/**
 * Retrieves the anonymous visitor identifier for the current browser session.
 * Returns `null` if fingerprinting is blocked or fails, ensuring zero disruption to UX.
 */
export async function getVisitorId(): Promise<string | null> {
  try {
    const fp = await getFingerprintAgent();
    const result = await fp.get();
    return result.visitorId || null;
  } catch (error) {
    console.error('[FingerprintJS] Error obtaining visitorId:', error);
    return null;
  }
}
