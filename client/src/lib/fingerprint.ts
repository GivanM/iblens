/**
 * The device id every anonymous flow is tied to: the free preview, the purchase,
 * the unlock and the re-checks. It used to be generated in three places under two
 * different localStorage keys, so a guest who paid on one page could not be given
 * back the report they bought on another.
 */
const KEY = "iblens_anon_fp";
const LEGACY_KEY = "iblens_fp";

/** Per-tab fallback when localStorage throws. Never shared between visitors. */
let sessionOnlyId: string | null = null;

export function getAnonFingerprint(): string {
  try {
    let v = localStorage.getItem(KEY);
    if (!v) {
      // Keep the id people already carry, so their used free preview stays used.
      v = localStorage.getItem(LEGACY_KEY) || crypto.randomUUID();
      localStorage.setItem(KEY, v);
    }
    return v;
  } catch {
    // No storage available (private mode, blocked cookies). A shared constant here
    // would put every such visitor on one id and let them read each other's
    // reports, so give this tab its own id instead. It will not survive a reload,
    // which is the honest consequence of storage being off.
    if (!sessionOnlyId) sessionOnlyId = crypto.randomUUID();
    return sessionOnlyId;
  }
}

/**
 * Start a new device identity. Called on sign-out: the id is what unlocks paid
 * reports on this browser, so leaving it in place handed the next person to sign
 * in everything the previous one had bought.
 */
export function rotateAnonFingerprint(): void {
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(LEGACY_KEY);
    localStorage.removeItem("iblens_anon_used");
  } catch {
    /* nothing to rotate */
  }
  sessionOnlyId = null;
}
