import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Logo from "@/components/shared/Logo";
import {
  ArrowRight,
  TrendingUp,
  Upload,
  Star,
  Github,
  Linkedin,
  Menu,
  X,
  Plus,
  BarChart3,
  Globe,
} from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background h-screen overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Logo />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                How it Works
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hidden md:inline-flex" asChild>
                <a href="/auth">Sign Up</a>
              </Button>
              <Button asChild>
                <a href="/auth">Login</a>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 space-y-2 border-t">
              <a
                href="#features"
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                How it Works
              </a>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                Take control of your finances
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent leading-tight">
                Smart Wealth
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Management with AI
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Track expenses, import transactions, and gain AI-powered
                insights into your spending habits with our intelligent wealth
                management platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="group" asChild>
                <a href="/auth">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#how-it-works">Learn More</a>
              </Button>
            </div>

            {/* Hero Image */}
            <div className="mt-16 relative">
              <div className="rounded-xl border bg-muted/50 p-2 backdrop-blur">
                <img
                  src="/images/landing/app-overview.webp"
                  alt="Wealth AI Dashboard Overview - AI-powered expense tracking with beautiful analytics and insights"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything you need to manage expenses
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make expense tracking effortless and
              insightful.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Easy Expense Entry
                  </h3>
                  <p className="text-muted-foreground">
                    Add expenses in seconds with our intuitive interface.
                    Categorize, add notes, and attach receipts effortlessly.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Import Transactions
                  </h3>
                  <p className="text-muted-foreground">
                    Seamlessly import bank statements and credit card
                    transactions. Support for CSV, OFX, and QIF formats.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 group">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Smart Analytics
                  </h3>
                  <p className="text-muted-foreground">
                    Get detailed insights with beautiful charts and reports.
                    Track spending patterns and set budgets.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process.
            </p>
          </div>

          <div className="space-y-20">
            {/* Step 1 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground text-xl font-bold">
                  1
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  Add Your First Expense
                </h3>
                <p className="text-lg text-muted-foreground">
                  Start by adding your expenses manually or by taking a photo of
                  your receipt. Our smart categorization will automatically sort
                  your expenses.
                </p>
                <div className="flex gap-4">
                  <Button asChild>
                    <a href="/auth">Get Started</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="#features">Learn More</a>
                  </Button>
                </div>
              </div>
              <div className="rounded-xl border bg-muted/50 p-4 backdrop-blur">
                <img
                  src="/images/landing/add-transaction.webp"
                  alt="Add expense interface - Easy expense entry with smart categorization"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="rounded-xl border bg-muted/50 p-4 backdrop-blur lg:order-1">
                <img
                  src="/images/landing/import-transactions.webp"
                  alt="Import transactions interface - Upload and import bank statements and CSV files"
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="space-y-6 lg:order-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground text-xl font-bold">
                  2
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  Import Your Transactions
                </h3>
                <p className="text-lg text-muted-foreground">
                  Connect your bank accounts or upload CSV files to
                  automatically import all your transactions. Save hours of
                  manual data entry.
                </p>
                <div className="flex gap-4">
                  <Button asChild>
                    <a href="/auth">Try Import</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="#features">View Features</a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground text-xl font-bold">
                  3
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  Analyze & Optimize
                </h3>
                <p className="text-lg text-muted-foreground">
                  View detailed reports, set budgets, and get insights into your
                  spending patterns. Make informed decisions about your
                  finances.
                </p>
                <div className="flex gap-4">
                  <Button asChild>
                    <a href="/auth">Start Tracking</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="#features">See Features</a>
                  </Button>
                </div>
              </div>
              <div className="rounded-xl border bg-muted/50 p-4 backdrop-blur">
                <img
                  src="/images/landing/imported-transactions.webp"
                  alt="Analytics dashboard with imported transactions - View detailed reports and spending insights"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Ready to take control of your expenses?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Start tracking your expenses and gain insights into your spending
              habits with this powerful expense tracker.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" variant="secondary" className="group" asChild>
                <a href="/auth">
                  Get Started Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <a href="#features">Explore Features</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Logo />
              </div>
              <p className="text-sm text-muted-foreground">
                The smartest AI-powered way to track and manage your wealth.
              </p>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#features"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    How it Works
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/sujitIwale/track-wealth"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source Code
                  </a>
                </li>
                <li>
                  <a
                    href="/auth"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Get Started
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">About</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://github.com/sujitIwale/track-wealth"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Project Info
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/sujitIwale/track-wealth/issues"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Report Issues
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/sujitIwale/track-wealth/blob/main/README.md"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold">Connect with me</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/sujitIwale/track-wealth"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5" />
                </a>
                {/* <a
                  href="https://twitter.com"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a> */}
                <a
                  href="https://www.linkedin.com/in/sujitIwale/"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.sujitiwale.info/"
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label="Website"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="w-5 h-5" />
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Star className="w-4 h-4 text-yellow-500" />
                <a
                  href="https://github.com/sujitIwale/track-wealth"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Star on GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Made with ❤️ by <strong>Sujit Iwale</strong> • © 2024 Wealth AI.
              All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
