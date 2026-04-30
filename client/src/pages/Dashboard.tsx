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
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSku, setModalSku] = useState<ProductKey>("ESSAY_SINGLE");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("payment") === "success") {
      toast.success("Payment successful! Credits have been added to your account.");
      window.history.replaceState({}, "", "/dashboard");
      creditsQuery.refetch();
      paymentsQuery.refetch();
    } else if (params.get("payment") === "cancelled") {
      toast.info("Payment was cancelled.");
      window.history.replaceState({}, "", "/dashboard");
    }
  }, []);

  const creditsQuery = trpc.dashboard.credits.useQuery(undefined, { enabled: isAuthenticated });
  const historyQuery = trpc.dashboard.history.useQuery(undefined, { enabled: isAuthenticated });
  const paymentsQuery = trpc.dashboard.payments.useQuery(undefined, { enabled: isAuthenticated });

  const handleBuy = (productKey: ProductKey) => {
    setModalSku(productKey);
    setModalOpen(true);
  };

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
            <h2 className="text-xl font-semibold mb-3">Sign in to access your dashboard</h2>
            <p className="text-muted-foreground mb-6">View your credits, analysis history, and purchase more analyses.</p>
            <Button asChild><a href={getLoginUrl()}>Sign In</a></Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const credits = creditsQuery.data;
  const history = historyQuery.data || [];
  const paymentsList = paymentsQuery.data || [];

  return (
    <div className="container py-8 max-w-5xl">
      {/* Purchase Modal */}
      <PurchaseModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        sku={modalSku}
      />

      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Welcome back{user?.name ? `, ${user.name}` : ""}.</p>
      </div>

      {/* Credits Overview */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <Gift className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-medium text-muted-foreground">Free Essay</span>
            </div>
            <div className="text-2xl font-bold">
              {credits?.freeEssayAvailable ? (
                <span className="text-emerald-500">Available</span>
              ) : (
                <span className="text-muted-foreground">Used</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Essay Credits</span>
            </div>
            <div className="text-2xl font-bold">{credits?.essayCredits ?? 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">University Credits</span>
            </div>
            <div className="text-2xl font-bold">{credits?.universityCredits ?? 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Buy Credits */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Purchase Credits
          </CardTitle>
          <p className="text-xs text-muted-foreground">Pay with card or crypto. Credits activate automatically.</p>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Essay Single */}
            <div className="border rounded-lg p-4 text-center">
              <FileText className="w-6 h-6 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-sm">1 Essay Analysis</h4>
              <div className="text-xl font-bold my-2">{PRICE_LABELS.ESSAY_SINGLE}</div>
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

            {/* Essay Pack 5 */}
            <div className="border rounded-lg p-4 text-center">
              <Package className="w-6 h-6 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-sm">5 Essay Analyses</h4>
              <div className="text-xl font-bold my-1">{PRICE_LABELS.ESSAY_PACK_5}</div>
              <p className="text-xs text-muted-foreground mb-2">$4 each</p>
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

            {/* Essay Pack 10 */}
            <div className="border border-primary rounded-lg p-4 text-center relative">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-semibold rounded-full">
                Best Value
              </div>
              <Package className="w-6 h-6 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-sm">10 Essay Analyses</h4>
              <div className="text-xl font-bold my-1">{PRICE_LABELS.ESSAY_PACK_10}</div>
              <p className="text-xs text-muted-foreground mb-2">$3.50 each — best value</p>
              <Button
                size="sm"
                className="w-full"
                onClick={() => handleBuy("ESSAY_PACK_10")}
              >
                <CreditCard className="w-3 h-3 mr-1.5" />
                Buy Now
              </Button>
            </div>

            {/* University Single */}
            <div className="border rounded-lg p-4 text-center">
              <GraduationCap className="w-6 h-6 text-primary mx-auto mb-2" />
              <h4 className="font-semibold text-sm">University Strategy</h4>
              <div className="text-xl font-bold my-1">{PRICE_LABELS.UNIVERSITY_SINGLE}</div>
              <p className="text-xs text-muted-foreground mb-2">Personalized plan</p>
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={() => handleBuy("UNIVERSITY_SINGLE")}
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
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">Analyze Essay</h3>
                <p className="text-xs text-muted-foreground">
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

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <Link href="/university" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">University Strategy</h3>
                <p className="text-xs text-muted-foreground">
                  {credits?.canAnalyzeUniversity
                    ? `${credits.universityCredits} credits available`
                    : "Purchase credits to use"}
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
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
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
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  {item.type === "essay" ? (
                    <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <GraduationCap className="w-5 h-5 text-primary flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {item.type === "essay"
                        ? `${item.essayType} — ${item.subject || "Unknown"}`
                        : `University Strategy — ${item.fieldOfStudy || "Unknown"}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {item.predictedGrade && (
                    <Badge variant="secondary" className="flex-shrink-0">{item.predictedGrade}</Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment History */}
      {paymentsList.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Payment History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {paymentsList.map((p) => (
                <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <CreditCard className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      {p.productType === "essay_single" ? "1 Essay Analysis"
                        : p.productType === "essay_pack_5" ? "5 Essay Analyses"
                        : p.productType === "essay_pack_10" ? "10 Essay Analyses"
                        : "University Strategy"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-medium">${(p.amount / 100).toFixed(2)}</p>
                    <Badge variant={p.status === "completed" ? "default" : p.status === "pending" ? "secondary" : "destructive"} className="text-[10px]">
                      {p.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
