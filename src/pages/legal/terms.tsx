import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoopLogo from "@/components/logo/logo";

export function TermsOfServicePage() {
  return (
    <>
      <title>Terms of Service | Loop</title>
      <meta
        name="description"
        content="Terms of Service for Loop — AI Student Learning Assistant"
      />

      <div className="min-h-screen bg-white">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
          <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
            <Link to="/">
              <LoopLogo size="xs" />
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2 cursor-pointer">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </nav>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900">
              Terms of Service
            </h1>
            <p className="mt-3 text-gray-500">
              Last updated: February 12, 2026
            </p>
          </div>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing or using Loop ("the Service"), you agree to be
                bound by these Terms of Service. Loop is an educational project
                developed as part of the GS497 — Professional Projects course at
                BYU-Pathway Worldwide. The Service is provided for educational
                and demonstration purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Description of Service
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Loop is an AI-powered student learning assistant that helps
                students manage their academic experience. The Service integrates
                with third-party platforms including Canvas LMS, Google Calendar,
                and Notion to provide:
              </p>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Course information retrieval (assignments, due dates, grades)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Automated calendar-based reminders and study sessions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Generation of structured study notes and summaries
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  AI-powered study guidance and planning
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. Academic Integrity
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Loop is designed to support learning, not to replace it. The
                Service will <strong>not</strong>:
              </p>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Complete assignments, quizzes, or exams on behalf of students
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Generate content intended to be submitted as the student's own
                  work
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Bypass any academic integrity policies or honor codes
                </li>
              </ul>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Users are responsible for ensuring their use of the Service
                complies with their institution's academic integrity policies.
                Built-in misuse prevention mechanisms are in place to block
                assignment-completion requests.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. User Accounts
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To use certain features of the Service, you must create an
                account. You agree to provide accurate, current, and complete
                information during registration. You are responsible for
                maintaining the confidentiality of your account credentials and
                for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Third-Party Integrations
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The Service connects to third-party platforms (Canvas LMS, Google
                Calendar, Notion) through their respective APIs. By connecting
                these services, you authorize Loop to access and use your data
                from these platforms as described in our Privacy Policy. You
                remain subject to the terms and conditions of each third-party
                service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. AI-Generated Content
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Loop uses artificial intelligence to generate responses, study
                notes, and recommendations. While we strive for accuracy,
                AI-generated content may contain errors or inaccuracies. Users
                should verify important information independently. The Service
                does not guarantee the accuracy, completeness, or suitability of
                any AI-generated content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Acceptable Use
              </h2>
              <p className="text-gray-600 leading-relaxed">You agree not to:</p>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Use the Service in any manner that violates academic integrity
                  policies
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Attempt to circumvent misuse prevention mechanisms
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Share your account credentials with others
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Use the Service for any illegal or unauthorized purpose
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Interfere with or disrupt the Service or its infrastructure
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                This Service is provided as an educational project prototype "as
                is" without warranties of any kind, express or implied. The
                developers shall not be liable for any direct, indirect,
                incidental, consequential, or special damages arising from your
                use of the Service, including but not limited to missed
                deadlines, inaccurate information, or data loss.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Data and Privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Your use of the Service is also governed by our{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                , which describes how we collect, use, and protect your personal
                information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Modifications to Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to modify these Terms of Service at any
                time. Changes will be effective immediately upon posting. Your
                continued use of the Service after changes constitutes
                acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Termination
              </h2>
              <p className="text-gray-600 leading-relaxed">
                As an educational project, the Service may be discontinued at
                any time without notice. We may also suspend or terminate your
                access if you violate these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                12. Contact
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have questions about these Terms of Service, please reach
                out through the project's academic channels at BYU-Pathway
                Worldwide.
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-100 py-8">
          <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Loop. A BYU-Pathway Worldwide
              capstone project.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link to="/privacy" className="hover:text-primary transition">
                Privacy Policy
              </Link>
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
