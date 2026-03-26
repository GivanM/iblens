import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  FileText, GraduationCap, Crown, BarChart3, Clock,
  ArrowRight, Loader2, Sparkles, AlertCircle, CreditCard
} from "lucide-react";

export default function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = getLoginUrl();
    }
  }, [loading, isAuthenticated]);

  const usageQuery = trpc.dashboard.usage.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const stripeCheckout = trpc.stripe.createCheckout.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        toast.info("Redirecting to Stripe checkout...");
        window.open(data.url, "_blank");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to start Stripe checkout");
    },
  });

  const lsCheckout = trpc.lemonsqueezy.createCheckout.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        toast.info("Redirecting to LemonSqueezy checkout...");
        window.open(data.url, "_blank");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to start LemonSqueezy checkout");
    },
  });

  const handleStripeUpgrade = () => {
    stripeCheckout.mutate({ origin: window.location.origin });
  };

  const handleLSUpgrade = () => {
    lsCheckout.mutate({ origin: window.location.origin });
  };

  const isCheckoutPending = stripeCheckout.isPending || lsCheckout.isPending;

  const historyQuery = trpc.dashboard.history.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const usage = usageQuery.data;
  const history = historyQuery.data || [];

  return (
    <div className="container py-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back{user?.name ? `, ${user.name}` : ""}. Here's your analysis overview.
        </p>
      </div>

      {/* Usage Stats */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Plan</span>
              {usage?.tier === "pro" ? (
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                  <Crown className="w-3 h-3 mr-1" /> Pro
                </Badge>
              ) : (
                <Badge variant="secondary">Free</Badge>
              )}
            </div>
            <div className="text-2xl font-bold">
              {usage?.tier === "pro" ? "Unlimited" : `${usage?.remaining ?? 1} left`}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {usage?.tier === "pro" ? "Unlimited analyses" : `of ${usage?.freeAnalysisLimit ?? 1} free analyses`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Total Analyses</span>
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{usage?.analysisCount ?? 0}</div>
            <p className="text-xs text-muted-foreground mt-1">essays & strategies combined</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Quick Actions</span>
              <Sparkles className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" asChild className="flex-1">
                <Link href="/essay">
                  <FileText className="w-3.5 h-3.5 mr-1" />
                  Essay
                </Link>
              </Button>
              <Button size="sm" variant="outline" asChild className="flex-1">
                <Link href="/university">
                  <GraduationCap className="w-3.5 h-3.5 mr-1" />
                  Strategy
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade CTA for free users */}
      {usage?.tier === "free" && (
        <Card className="mb-8 border-primary/30 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Crown className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-0.5">Upgrade to Pro</h3>
                  <p className="text-sm text-muted-foreground">
                    Get unlimited analyses for $14.99/month. Cancel anytime.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="flex-1"
                onClick={handleStripeUpgrade}
                disabled={isCheckoutPending}
              >
                {stripeCheckout.isPending ? (
                  <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Processing...</>
                ) : (
                  <><CreditCard className="w-4 h-4 mr-1" /> Pay with Card (Stripe) <ArrowRight className="w-4 h-4 ml-1" /></>
                )}
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-yellow-400 hover:bg-yellow-50 text-yellow-700"
                onClick={handleLSUpgrade}
                disabled={isCheckoutPending}
              >
                {lsCheckout.isPending ? (
                  <><Loader2 className="w-4 h-4 mr-1 animate-spin" /> Processing...</>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/>
                    </svg>
                    Pay with LemonSqueezy <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Choose your preferred payment method. Both options provide the same Pro features.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Free limit warning */}
      {!usage?.canAnalyze && usage?.tier === "free" && (
        <Card className="mb-8 border-amber-200 bg-amber-50">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm">
              You've used all your free analyses. Upgrade to Pro above for unlimited access.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Analysis History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Analysis History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {historyQuery.isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-2">No analyses yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start by analyzing an essay or building a university strategy.
              </p>
              <div className="flex justify-center gap-3">
                <Button size="sm" asChild>
                  <Link href="/essay">Analyze Essay</Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/university">University Strategy</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    item.type === "essay" ? "bg-blue-100" : "bg-emerald-100"
                  }`}>
                    {item.type === "essay" ? (
                      <FileText className="w-5 h-5 text-blue-600" />
                    ) : (
                      <GraduationCap className="w-5 h-5 text-emerald-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">
                      {item.type === "essay"
                        ? `${item.essayType} — ${item.subject || "Unknown"}`
                        : `University Strategy — ${item.fieldOfStudy || "Unknown"}`}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {item.predictedGrade && (
                      <Badge variant="secondary" className="text-xs">
                        {item.predictedGrade}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
