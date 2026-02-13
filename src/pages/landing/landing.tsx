import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  School,
  CalendarDays,
  StickyNote,
  Quote,
  Lightbulb,
  BookOpenCheck,
  ClipboardList,
  Timer,
  ShieldCheck,
  Layers,
  Lock,
  RefreshCcw,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LoopLogo from "@/components/logo/logo";
import { Paths } from "@/router/path.routes";
import { useAuthStore } from "@/context/auth/userStore";

function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const chatBubbles = [
  { role: "user" as const, text: "What's due this week?" },
  {
    role: "assistant" as const,
    text: "You have 2 assignments due: Web Development project (Wed) and Statistics homework (Fri). Want me to create study sessions?",
  },
  { role: "user" as const, text: "Yes, schedule them on my calendar" },
  {
    role: "assistant" as const,
    text: "Done! I added two 90-min study blocks to your Google Calendar and created Notion pages for each.",
  },
  {
    role: "user" as const,
    text: "Great, can you also summarize the lecture notes for me?",
  },
  {
    role: "assistant" as const,
    text: "Sure! I pulled the notes from your Notion and created a concise summary highlighting the key concepts and formulas. I've added it to your Notion dashboard.",
  },
];

const integrations = [
  {
    name: "Canvas LMS",
    desc: "Courses & assignments",
    icon: School,
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    name: "Google Calendar",
    desc: "Study sessions & reminders",
    icon: CalendarDays,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    name: "Notion",
    desc: "Notes & summaries",
    icon: StickyNote,
    color: "text-gray-800",
    bg: "bg-gray-100",
  },
];

export function LandingPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasChecked = useAuthStore((s) => s.hasChecked);
  const checkSession = useAuthStore((s) => s.checkSession);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (!hasChecked) checkSession();
  }, [hasChecked, checkSession]);

  const integrationsSection = useInView<HTMLDivElement>(0.1);
  const promptsSection = useInView<HTMLDivElement>(0.1);
  const principlesSection = useInView<HTMLDivElement>(0.1);
  const aboutSection = useInView<HTMLDivElement>(0.1);
  const ctaSection = useInView<HTMLDivElement>(0.15);

  const showAuthButtons = hasChecked;

  const fullText = "One place for your courses, deadlines, and study plans.";
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) {
        clearInterval(id);
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, 35);
    return () => clearInterval(id);
  }, []);

  const [visibleBubbles, setVisibleBubbles] = useState(0);
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    chatBubbles.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleBubbles(i + 1), 1200 + i * 800));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  const firstName = user?.full_name?.split(" ")[0];

  const ctaLink = isAuthenticated ? Paths.app.CHAT : Paths.auth.SIGNUP;
  const ctaLabel = isAuthenticated
    ? `Go to Chat${firstName ? `, ${firstName}` : ""}`
    : "Get Started";

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">
          <div className="flex-1 flex justify-start">
            <LoopLogo size="xs" />
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500 font-medium">
            <a href="#features" className="hover:text-gray-900 transition">
              Features
            </a>
            <a
              href="#ask-it-anything"
              className="hover:text-gray-900 transition"
            >
              Ask It Anything
            </a>
            <a href="#how-it-works" className="hover:text-gray-900 transition">
              How it works
            </a>
            <a href="#about" className="hover:text-gray-900 transition">
              About
            </a>
          </div>

          <div className="flex-1 flex justify-end items-center gap-3">
            {showAuthButtons &&
              (isAuthenticated ? (
                <Link to={Paths.app.CHAT}>
                  <Button className="text-sm rounded-full px-5 gap-2 cursor-pointer">
                    Go to Chat
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to={Paths.auth.LOGIN}>
                    <Button
                      variant="ghost"
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to={Paths.auth.SIGNUP}>
                    <Button className="text-sm rounded-full px-5 cursor-pointer">
                      Get Started
                    </Button>
                  </Link>
                </>
              ))}
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center pt-16">
        <div
          className="pointer-events-none absolute -top-32 right-0 w-150 h-150 rounded-full bg-primary/4 blur-3xl"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-primary tracking-wide mb-4 animate-[fadeInUp_0.5s_ease-out_both]">
              AI Study Assistant
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] animate-[fadeInUp_0.5s_ease-out_0.05s_both]">
              Your courses,
              <br />
              organized by AI.
            </h1>

            <p className="mt-5 text-lg text-gray-500 h-7 animate-[fadeInUp_0.5s_ease-out_0.1s_both]">
              {typed}
              {showCursor && (
                <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-text-bottom animate-pulse" />
              )}
            </p>

            <div className="flex items-center gap-3 mt-10 animate-[fadeInUp_0.5s_ease-out_0.15s_both]">
              <Link to={ctaLink}>
                <Button
                  size="lg"
                  className="rounded-full px-7 text-base gap-2 cursor-pointer"
                >
                  {ctaLabel}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4 mt-10 text-xs text-gray-400 animate-[fadeInUp_0.5s_ease-out_0.2s_both]">
              {integrations.map((int) => (
                <span key={int.name} className="flex items-center gap-1.5">
                  {int.name}
                </span>
              ))}
            </div>
          </div>

          <div className="relative animate-[fadeInUp_0.6s_ease-out_0.3s_both]">
            <div className="bg-gray-50 rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100">
                <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
                <span className="ml-3 text-xs text-gray-400 font-medium">
                  Loop Chat
                </span>
              </div>

              <div className="p-5 space-y-4 min-h-75">
                {chatBubbles.map((bubble, i) => (
                  <div
                    key={i}
                    className={`flex transition-all duration-500 ${
                      i < visibleBubbles
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-3"
                    } ${bubble.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        bubble.role === "user"
                          ? "bg-primary text-white rounded-br-md"
                          : "bg-white border border-gray-200 text-gray-700 rounded-bl-md"
                      }`}
                    >
                      {bubble.text}
                    </div>
                  </div>
                ))}
                {visibleBubbles < chatBubbles.length && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        ref={integrationsSection.ref}
        className="py-24 md:py-32 border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`max-w-2xl mb-16 transition-all duration-700 ${integrationsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Connects the tools you already use.
            </h2>
            <p className="mt-3 text-gray-500 text-lg">
              Link your accounts once — Loop pulls everything together so you
              don't have to.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {integrations.map((item, i) => (
              <div
                key={item.name}
                className={`group relative bg-white rounded-2xl border border-gray-100 p-8 hover:border-gray-200 transition-all duration-500 overflow-hidden ${
                  integrationsSection.inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className={`absolute inset-0 ${item.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${item.bg} group-hover:bg-white/80 transition-colors duration-500`}
                  >
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-6">
            {[
              {
                n: "1",
                title: "Connect",
                desc: "Link Canvas, Google Calendar, and Notion in a few clicks.",
              },
              {
                n: "2",
                title: "Ask",
                desc: "Chat naturally about deadlines, study plans, or anything course-related.",
              },
              {
                n: "3",
                title: "Focus",
                desc: "Loop handles reminders, notes, and scheduling — you handle the learning.",
              },
            ].map((step, i) => (
              <div
                key={step.n}
                className={`group relative flex items-start gap-4 p-5 rounded-xl transition-all duration-700 overflow-hidden ${
                  integrationsSection.inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${300 + i * 120}ms` }}
              >
                <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-xl" />
                <span className="relative shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white text-sm font-semibold flex items-center justify-center">
                  {step.n}
                </span>
                <div className="relative">
                  <h4 className="font-semibold text-gray-900">{step.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="ask-it-anything"
        ref={promptsSection.ref}
        className="py-24 md:py-32 bg-gray-50/60 border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-700 ${
              promptsSection.inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Ask it anything about school.
            </h2>
            <p className="mt-3 text-gray-500 text-lg">
              Loop understands your academic context. Here's a taste of what you
              can do.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
            {[
              {
                icon: ClipboardList,
                prompt: "What assignments are due this week?",
                answer: "Pulls your upcoming deadlines directly from Canvas.",
                accent: "text-blue-600",
                accentBg: "bg-blue-50",
                hoverBg: "group-hover:bg-blue-50/80",
              },
              {
                icon: Timer,
                prompt: "Create a study plan for my finals",
                answer:
                  "Builds a schedule in Google Calendar based on exam dates.",
                accent: "text-amber-600",
                accentBg: "bg-amber-50",
                hoverBg: "group-hover:bg-amber-50/80",
              },
              {
                icon: BookOpenCheck,
                prompt: "Summarize my lecture notes",
                answer:
                  "Creates a Notion page with key concepts and takeaways.",
                accent: "text-emerald-600",
                accentBg: "bg-emerald-50",
                hoverBg: "group-hover:bg-emerald-50/80",
              },
              {
                icon: Lightbulb,
                prompt: "Help me understand this concept",
                answer:
                  "Guides you with Socratic questions — never gives the answer.",
                accent: "text-purple-600",
                accentBg: "bg-purple-50",
                hoverBg: "group-hover:bg-purple-50/80",
              },
              {
                icon: Quote,
                prompt: "What did the professor say about the project?",
                answer: "Searches your course announcements and syllabus.",
                accent: "text-rose-600",
                accentBg: "bg-rose-50",
                hoverBg: "group-hover:bg-rose-50/80",
              },
              {
                icon: RefreshCcw,
                prompt: "What should I review before the quiz?",
                answer:
                  "Analyzes your grades and suggests weak areas to review.",
                accent: "text-cyan-600",
                accentBg: "bg-cyan-50",
                hoverBg: "group-hover:bg-cyan-50/80",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`group relative bg-white rounded-2xl border border-gray-100 p-6 overflow-hidden transition-all duration-500 ${
                  promptsSection.inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div
                  className={`absolute inset-0 opacity-0 ${item.hoverBg} transition-all duration-500`}
                />
                <div className="relative">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${item.accentBg}`}
                  >
                    <item.icon className={`h-5 w-5 ${item.accent}`} />
                  </div>
                  <p className="font-semibold text-gray-900 text-sm mb-2">
                    "{item.prompt}"
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="features"
        ref={principlesSection.ref}
        className="py-24 md:py-32 border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`max-w-2xl mx-auto text-center mb-16 transition-all duration-700 ${
              principlesSection.inView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Built on principles you can trust.
            </h2>
            <p className="mt-3 text-gray-500 text-lg">
              Every design decision was made with your learning in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: ShieldCheck,
                title: "Academic Integrity",
                desc: "Socratic guidance only. Loop will never complete your assignments or give direct answers to graded work.",
                bg: "bg-emerald-50",
                hoverBg: "group-hover:bg-emerald-50",
                color: "text-emerald-600",
              },
              {
                icon: Lock,
                title: "Privacy First",
                desc: "Your data stays yours. We only access what you connect and never share it with third parties.",
                bg: "bg-blue-50",
                hoverBg: "group-hover:bg-blue-50",
                color: "text-blue-600",
              },
              {
                icon: Layers,
                title: "Open Architecture",
                desc: "Built with React, FastAPI, and LangChain — transparent, modular, and designed to evolve.",
                bg: "bg-gray-100",
                hoverBg: "group-hover:bg-gray-100",
                color: "text-gray-700",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`group relative bg-white rounded-2xl border border-gray-100 p-8 overflow-hidden text-center transition-all duration-500 ${
                  principlesSection.inView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className={`absolute inset-0 opacity-0 ${item.hoverBg} transition-opacity duration-500`}
                />
                <div className="relative">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 ${item.bg} group-hover:bg-white/80 transition-colors duration-500`}
                  >
                    <item.icon className={`h-7 w-7 ${item.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        ref={aboutSection.ref}
        className="py-24 md:py-32 border-t border-gray-100 bg-gray-50/60"
      >
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-700 ${aboutSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Built for students,
              <br />
              by a student.
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Loop is a capstone project for{" "}
              <strong className="text-gray-700">
                GS497 — Professional Projects
              </strong>{" "}
              at{" "}
              <strong className="text-gray-700">BYU-Pathway Worldwide</strong>.
              It was built to solve a real problem: juggling multiple courses,
              deadlines, and tools without a single place to stay organized.
            </p>
            <p className="mt-3 text-gray-500 leading-relaxed">
              The assistant follows strict academic integrity guidelines — it
              helps you learn without doing the work for you.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Real-time course data from Canvas",
                "Study sessions on Google Calendar",
                "Organized notes in Notion",
                "Built-in misuse prevention",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${aboutSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="h-7 w-7 text-primary" />
                <div>
                  <p className="font-semibold text-gray-900">
                    BYU-Pathway Worldwide
                  </p>
                  <p className="text-sm text-gray-400">
                    GS497 — Professional Projects
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                    Focus Areas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["AI/ML", "Education", "Full-Stack", "APIs"].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-primary/8 text-primary text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "React",
                      "TypeScript",
                      "Python",
                      "FastAPI",
                      "LangChain",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={ctaSection.ref} className="py-24 md:py-32">
        <div
          className={`max-w-3xl mx-auto px-6 text-center transition-all duration-700 ${ctaSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            {isAuthenticated
              ? "Your assistant is ready."
              : "Start organizing your semester."}
          </h2>
          <p className="mt-3 text-gray-500 text-lg max-w-lg mx-auto">
            {isAuthenticated
              ? "Jump back into your conversation and let Loop handle the rest."
              : "Connect your tools, ask your first question, and let Loop handle the rest."}
          </p>
          <Link to={ctaLink} className="inline-block mt-8">
            <Button
              size="lg"
              className="rounded-full px-8 text-base gap-2 cursor-pointer"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <LoopLogo size="xs" />
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link to="/terms" className="hover:text-gray-600 transition">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-gray-600 transition">
              Privacy
            </Link>
            <span>© {new Date().getFullYear()} Loop Student Assistant</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
