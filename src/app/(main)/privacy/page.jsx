export const metadata = {
  title: "Privacy Policy",
};

const sections = [
  {
    title: "Information We Collect",
    body: "We collect the information you provide when creating an account, such as your name and email, along with data about the ebooks you browse, purchase, and bookmark.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information is used to operate the platform, process purchases, personalize your experience, and keep your account secure. We do not sell your personal data.",
  },
  {
    title: "Payments",
    body: "Payments are processed securely through Stripe. We do not store your card details on our servers.",
  },
  {
    title: "Cookies",
    body: "We use essential cookies and local storage to keep you signed in and remember your preferences.",
  },
  {
    title: "Your Rights",
    body: "You may access, update, or request deletion of your account information at any time by contacting our support team.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="w-full py-20">
      <div className="mx-auto w-full max-w-3xl px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-text">
          Privacy Policy
        </h1>
        <p className="mt-3 text-muted">Last updated: July 2026</p>

        <div className="mt-10 space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-semibold text-text">{s.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}