import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { PRICE_LABELS, type ProductKey } from "@shared/pricing";
import { PurchaseModal } from "@/components/PurchaseModal";
import {
  FileText, GraduationCap, Loader2,
  Clock, ArrowRight, Gift, Package, ShoppingCart, Wallet, CreditCard
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { trackPurchase, sha256 } from "@/lib/analytics/track";
import type { ProductSlug, PaymentMethod as AnalyticsPaymentMethod } from "@/lib/analytics/config";

const SERIF = { fontFamily: "'Playfair Display', Georgia, serif" };

export default function Dashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSku, setModalSku] = useState<ProductKey>("ESSAY_SINGLE");

  const confettiFired = useRef(false);
  const [pendingPurchase, setPendingPurchase] = useState<
    { orderId: string; product: ProductSlug; method: AnalyticsPaymentMethod } | null
  >(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success" && !confettiFired.current) {
      confettiFired.current = true;

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });

      const sku = params.get("sku");
      const message = sku === "university_single" || sku === "university_strategy"
        ? "Payment confirmed! You can now build your University Strategy."
        : "Payment confirmed! Your credits are ready to use.";

      toast.success(message, { duration: 6000 });

      // Reported only once per order, and only for an order that exists on the
      // account. The amount comes from the order, not from the address bar:
      // reloading the page or typing ?payment=success used to book a purchase.
      const orderId = params.get("order") || "unknown";
      setPendingPurchase({
        orderId,
        product: (params.get("product") || "essay_single") as ProductSlug,
        method: (params.get("method") || "lemonsqueezy") as AnalyticsPaymentMethod,
      });

      window.history.replaceState({}, "", "/dashboard");

      creditsQuery.refetch();
      ordersQuery.refetch();
    } else if (params.get("payment") === "cancelled") {
      toast.info("Payment was cancelled.");
      window.history.replaceState({}, "", "/dashboard");
    }
  }, []);

  const creditsQuery = trpc.dashboard.credits.useQuery(undefined, { enabled: isAuthenticated });
  const historyQuery = trpc.dashboard.history.useQuery(undefined, { enabled: isAuthenticated });
  const paymentsQuery = trpc.dashboard.payments.useQuery(undefined, { enabled: isAuthenticated });
  const ordersQuery = trpc.dashboard.orders.useQuery(undefined, { enabled: isAuthenticated });

  const handleBuy = (productKey: ProductKey) => {
    setModalSku(productKey);
    setModalOpen(true);
  };

  const deleteAnalysis = trpc.dashboard.deleteAnalysis.useMutation({
    onSuccess: () => { toast.success("Report deleted."); historyQuery.refetch(); },
    onError: (e: any) => toast.error(e.message || "Could not delete that report"),
  });
  const credits = creditsQuery.data;

  // The purchase reaches analytics only once the order is confirmed on the
  // account, with the amount taken from the order. Typing ?payment=success or
  // reloading the page used to book a sale that never happened.
  useEffect(() => {
    if (!pendingPurchase) return;
    const known = (ordersQuery.data || []).find((o: any) => o.id === pendingPurchase.orderId && o.status === "paid");
    if (!known) return;
    const key = `iblens_purchase_reported_${pendingPurchase.orderId}`;
    try {
      if (localStorage.getItem(key) === "1") { setPendingPurchase(null); return; }
      localStorage.setItem(key, "1");
    } catch { /* no storage, report once per page load */ }
    const value = (known.amountUsd ?? 0) / 100;
    if (user?.email) {
      sha256(user.email).then((emailHashed) =>
        trackPurchase(pendingPurchase.orderId, pendingPurchase.product, value, pendingPurchase.method, user.openId || "", emailHashed));
    } else {
      trackPurchase(pendingPurchase.orderId, pendingPurchase.product, value, pendingPurchase.method, "", "");
    }
    setPendingPurchase(null);
  }, [pendingPurchase, ordersQuery.data, user]);

  if (authLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <h2 style={SERIF} className="text-xl font-bold mb-3">Sign in to access your dashboard</h2>
            <p className="text-muted-foreground mb-6 text-sm">View your credits, analysis history, and purchase more analyses.</p>
            <Button asChild><a href={getLoginUrl()}>Sign In</a></Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const history = historyQuery.data || [];
  const paymentsList = paymentsQuery.data || [];
  const orders = ordersQuery.data || [];

  return (
    <div className="container py-10 max-w-5xl">
      {/* Purchase Modal */}
      <PurchaseModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        sku={modalSku}
      />

      <div className="mb-10">
        <h1 style={SERIF} className="text-3xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Welcome back{user?.name ? `, ${user.name}` : ""}.</p>
      </div>

      {/* Credits Overview */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground font-medium mb-1">Free Essay</p>
            <div className="text-2xl font-bold">
              {creditsQuery.isError ? (
                <span className="text-muted-foreground text-base">not loaded</span>
              ) : credits?.freeEssayAvailable ? (
                <span className="text-primary">Available</span>
              ) : (
                <span className="text-muted-foreground">Used</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-muted-foreground font-medium mb-1">Essay Credits</p>
            <div style={SERIF} className="text-2xl font-bold">
              {creditsQuery.isError ? <span className="text-base text-muted-foreground">not loaded</span> : (credits?.essayCredits ?? 0)}
            </div>
            {creditsQuery.isError && (
              <p className="text-xs text-amber-600 mt-1">
                We could not read your balance just now. Reload before buying anything: this is not a statement that you have none.
              </p>
            )}
          </CardContent>
        </Card>

        {(credits?.universityCredits ?? 0) > 0 && (
          <Card>
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground font-medium mb-1">University Credits</p>
              <div style={SERIF} className="text-2xl font-bold">{credits?.universityCredits}</div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Buy Credits */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShoppingCart className="w-4 h-4" />
            Purchase Credits
          </CardTitle>
          <p className="text-xs text-muted-foreground">Pay with card. Credits activate automatically.</p>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-border rounded-lg p-4 text-center">
              <h4 className="font-semibold text-sm mb-1">1 Essay Analysis</h4>
              <div style={SERIF} className="text-xl font-bold my-2">{PRICE_LABELS.ESSAY_SINGLE}</div>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => handleBuy("ESSAY_SINGLE")}
              >
                <CreditCard className="w-3 h-3 mr-1.5" />
                Buy Now
              </Button>
            </div>

            <div className="border border-border rounded-lg p-4 text-center">
              <h4 className="font-semibold text-sm mb-1">5 Essay Analyses</h4>
              <div style={SERIF} className="text-xl font-bold my-1">{PRICE_LABELS.ESSAY_PACK_5}</div>
              <p className="text-xs text-muted-foreground mb-2">$5.00 each</p>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => handleBuy("ESSAY_PACK_5")}
              >
                <CreditCard className="w-3 h-3 mr-1.5" />
                Buy Now
              </Button>
            </div>

            <div className="border-2 border-primary rounded-lg p-4 text-center relative">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-semibold rounded-full">
                Best Value
              </div>
              <h4 className="font-semibold text-sm mb-1">10 Essay Analyses</h4>
              <div style={SERIF} className="text-xl font-bold my-1">{PRICE_LABELS.ESSAY_PACK_10}</div>
              <p className="text-xs text-muted-foreground mb-2">$4.50 each</p>
              <Button
                size="sm"
                className="w-full"
                onClick={() => handleBuy("ESSAY_PACK_10")}
              >
                <CreditCard className="w-3 h-3 mr-1.5" />
                Buy Now
              </Button>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <Link href="/essay" className="flex items-center gap-3">
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Analyze Essay</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {credits?.canAnalyzeEssay
                    ? credits?.freeEssayAvailable
                      ? "Your free analysis is waiting!"
                      : `${credits.essayCredits} credits available`
                    : "Purchase credits to analyze"}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Analysis History */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="w-4 h-4" />
            Analysis History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {historyQuery.isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : history.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-6">No analyses yet. Start with your free essay analysis!</p>
          ) : (
            <div className="space-y-2">
              {history.map((item) => (
                <div key={item.id} className="flex items-center gap-3 border-b border-border last:border-0">
                <Link
                  href={
                    item.essayType === "UCAS"
                      ? "/ucas-personal-statement"
                      : item.unlocked
                        ? `/dashboard/analysis/${item.id}`
                        : "/essay"
                  }
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors flex-1 min-w-0 cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {item.essayType === "UCAS"
                        ? `UCAS personal statement, ${item.subject || "your course"}`
                        : item.type === "essay"
                          ? `${item.essayType}, ${item.subject || "Unknown"}`
                          : `University Strategy, ${item.fieldOfStudy || "Unknown"}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleDateString()}
                      {item.unlocked ? " · Open report" : " · Preview only"}
                    </p>
                  </div>
                  {item.unlocked && item.predictedGrade ? (
                    <Badge variant="secondary" className="flex-shrink-0">{item.predictedGrade}</Badge>
                  ) : item.unlocked ? (
                    <Badge variant="secondary" className="flex-shrink-0">Open</Badge>
                  ) : (
                    <Badge variant="outline" className="flex-shrink-0">Locked</Badge>
                  )}
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-shrink-0 text-muted-foreground hover:text-destructive"
                  disabled={deleteAnalysis.isPending}
                  onClick={() => {
                    if (!window.confirm("Delete this report? The text of your essay was never stored, but the report and its research question go for good.")) return;
                    deleteAnalysis.mutate({ id: item.id });
                  }}
                >
                  Delete
                </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Purchase History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Wallet className="w-4 h-4" />
            Purchase History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {ordersQuery.isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : orders.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-6">No purchases yet, your order history will appear here after your first purchase.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Item</th>
                    <th className="pb-2 font-medium">Amount</th>
                    <th className="pb-2 font-medium">Method</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 pr-3">{new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                      <td className="py-3 pr-3 font-medium">
                        {o.sku === "essay_single" ? "Single Essay Analysis"
                          : o.sku === "essay_pack_5" ? "5-Pack Essays"
                          : o.sku === "essay_pack_10" ? "10-Pack Essays"
                          : "University Strategy Report"}
                      </td>
                      <td className="py-3 pr-3">${(o.amountUsd / 100).toFixed(2)}</td>
                      <td className="py-3 pr-3">
                        {o.provider === "lemonsqueezy" ? "Card"
                          : o.provider === "nowpayments" ? "Crypto"
                          : "Other"}
                      </td>
                      <td className="py-3">
                        <Badge
                          variant={o.status === "paid" ? "default" : o.status === "pending" || o.status === "processing" || o.status === "partial" ? "secondary" : "outline"}
                          className={o.status === "paid" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : o.status === "refunded" ? "bg-gray-100 text-gray-600" : o.status === "pending" || o.status === "processing" || o.status === "partial" ? "bg-amber-100 text-amber-700 border-amber-200" : ""}
                        >
                          {o.status === "paid" ? "Paid" : o.status === "pending" || o.status === "processing" || o.status === "partial" ? "Pending" : o.status === "refunded" ? "Refunded" : o.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
