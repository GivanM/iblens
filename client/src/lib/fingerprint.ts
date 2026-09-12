/**
 * The device id every anonymous flow is tied to: the free preview, the purchase,
 * the unlock and the re-checks. It used to be generated in three places under two
 * different localStorage keys, so a guest who paid on one page could not be given
 * back the report they bought on another.
 */
const KEY = "iblens_anon_fp";
const LEGACY_KEY = "iblens_fp";

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
    return "no-storage";
  }
}
