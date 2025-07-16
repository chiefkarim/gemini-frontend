import { FC } from "react";
import { MessageSquare, Zap, Shield } from "lucide-react";
import { SignInBtn } from "./sign-in-button";

const LandingPage: FC = () => {
  return (
    <div className="flex flex-col items-center   min-h-screen bg-background text-foreground">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Your Intelligent Chat Companion
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Engage in seamless conversations, get instant answers, and
                    explore the power of AI.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <SignInBtn />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <MessageSquare className="h-32 w-32 text-primary" />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Why You'll Love Our Chatbot
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the features that make our chatbot your perfect
                  conversational partner.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <Zap className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">Instant Responses</h3>
                </div>
                <p className="text-muted-foreground">
                  Get immediate answers to your queries without any delay.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <Shield className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">Secure Conversations</h3>
                </div>
                <p className="text-muted-foreground">
                  Your privacy is our priority. All conversations are encrypted
                  and secure.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">Natural Language</h3>
                </div>
                <p className="text-muted-foreground">
                  Converse naturally, just like you would with a human.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p className="text-muted-foreground">
          © 2025 Gemini Frontend. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;

