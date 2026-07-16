"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff, BookOpen, PenTool } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import AuthShell from "@/components/auth/AuthShell";
import GoogleButton from "@/components/auth/GoogleButton";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("reader");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6)
      e.password = "Password must be at least 6 characters";
    if (confirm !== password) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await register({ name, email, password, role });
      toast.success("Account created. Welcome to Fable!");

      if (role === "writer") router.push("/dashboard/writer");
      else router.push("/");
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: "reader", label: "Reader", desc: "Browse & buy", icon: BookOpen },
    { value: "writer", label: "Writer", desc: "Publish & earn", icon: PenTool },
  ];

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join Fable in less than a minute."
      footer={
        <span className="text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Log in
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          error={errors.name}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          error={errors.email}
        />

        <div className="relative">
          <Input
            label="Password"
            name="password"
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            error={errors.password}
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-3 top-[2.15rem] text-muted hover:text-text"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>

        <Input
          label="Confirm Password"
          name="confirm"
          type={show ? "text" : "password"}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Re-enter password"
          error={errors.confirm}
        />

        <div>
          <p className="mb-2 text-sm font-medium text-text">I want to join as</p>
          <div className="grid grid-cols-2 gap-3">
            {roleOptions.map((o) => {
              const Icon = o.icon;
              const active = role === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setRole(o.value)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    active
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      active ? "text-primary" : "text-muted"
                    }`}
                  />
                  <p className="mt-2 text-sm font-semibold text-text">
                    {o.label}
                  </p>
                  <p className="text-xs text-muted">{o.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" loading={loading}>
          Create Account
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted">OR</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <GoogleButton label="Sign up with Google" />
    </AuthShell>
  );
}