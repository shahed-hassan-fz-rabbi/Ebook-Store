"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send } from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const info = [
  { icon: Mail, label: "Email", value: "support@fable.com" },
  { icon: Phone, label: "Phone", value: "+880 1234 567890" },
  { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh" },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSending(true);
    // No backend contact endpoint — simulate send
    setTimeout(() => {
      toast.success("Thanks! We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
      setSending(false);
    }, 800);
  };

  return (
    <div className="w-full py-20">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 text-lg text-muted">
            Have a question, feedback, or need help with your account? We&apos;d
            love to hear from you.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          {/* Info */}
          <div className="space-y-4">
            {info.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">
                      {item.label}
                    </p>
                    <p className="mt-0.5 font-semibold text-text">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-text">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  placeholder="How can we help?"
                  className="w-full rounded-xl border border-border bg-background p-4 text-sm text-text outline-none transition-all placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <Button type="submit" size="lg" loading={sending}>
                <Send className="h-4 w-4" /> Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}