import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoopLogo from "@/components/logo/logo";

export function PrivacyPolicyPage() {
  return (
    <>
      <title>Loop Student Assistant: Privacy Policy</title>
      <meta
        name="description"
        content="Privacy Policy for Loop — AI Student Learning Assistant"
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
              Privacy Policy
            </h1>
            <p className="mt-3 text-gray-500">
              Last updated: February 12, 2026
            </p>
          </div>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Loop ("we," "our," or "the Service") is an AI-powered student
                learning assistant developed as an educational capstone project
                for GS497 — Professional Projects at BYU-Pathway Worldwide. This
                Privacy Policy explains how we collect, use, store, and protect
                your personal information when you use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Information We Collect
              </h2>

              <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">
                2.1 Account Information
              </h3>
              <p className="text-gray-600 leading-relaxed">
                When you create an account, we collect:
              </p>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Full name
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Email address
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Password (stored in hashed form)
                </li>
              </ul>

              <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">
                2.2 Third-Party Integration Data
              </h3>
              <p className="text-gray-600 leading-relaxed">
                When you connect third-party services, we access and process the
                following data:
              </p>

              <div className="mt-4 space-y-4">
                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-medium text-gray-800">Canvas LMS</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Course enrollments, assignment details (names, due dates,
                    descriptions, point values), grade information, and course
                    materials. We store your Canvas API access token and base URL
                    to maintain the connection.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-medium text-gray-800">Google Calendar</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    We create and manage calendar events (study sessions and
                    reminders) on your behalf. We access your calendar through
                    OAuth 2.0 authorization and only create events related to
                    your study schedule.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-medium text-gray-800">Notion</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    We create pages and organize study notes in your Notion
                    workspace. Access is granted through Notion's OAuth
                    integration and is limited to the pages and databases you
                    authorize.
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">
                2.3 Chat and Usage Data
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We store your chat conversations with the AI assistant,
                including messages sent and responses received. This data is used
                to maintain conversation context and improve the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Provide, operate, and maintain the Service
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Retrieve and display your course information and assignments
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Generate personalized study plans, reminders, and notes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Provide AI-powered responses to your academic questions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Enforce academic integrity safeguards
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Improve and evaluate the Service as part of the capstone
                  project
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                4. Data Storage and Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We implement reasonable security measures to protect your
                personal information, including:
              </p>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Encrypted storage of passwords using industry-standard hashing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Secure HTTPS connections for all data transmission
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Encrypted storage of third-party API tokens
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Authentication-protected API endpoints
                </li>
              </ul>
              <p className="mt-3 text-gray-600 leading-relaxed">
                As this is an educational project prototype, the Service may not
                meet enterprise-level security standards. We recommend not
                storing highly sensitive data within the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                5. Third-Party Services
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The Service integrates with third-party platforms, each with
                their own privacy policies:
              </p>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <strong>Canvas LMS</strong> — Subject to your institution's
                  Canvas privacy policy
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <strong>Google Calendar</strong> — Subject to{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Google's Privacy Policy
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <strong>Notion</strong> — Subject to{" "}
                  <a
                    href="https://www.notion.so/Privacy-Policy-3468d120cf614d4c9014c09f6adc9091"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Notion's Privacy Policy
                  </a>
                </li>
              </ul>
              <p className="mt-3 text-gray-600 leading-relaxed">
                We also use AI language model services to power the assistant's
                responses. Your queries and conversation context may be processed
                by these AI services. We do not share your personal
                identification information with AI service providers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                6. Data Sharing
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We do <strong>not</strong> sell, trade, or rent your personal
                information to third parties. We may share limited data:
              </p>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  With the connected third-party services you have authorized
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  For academic evaluation of the capstone project (anonymized
                  usage statistics only)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  If required by law or to protect the rights and safety of
                  users
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                7. Your Rights
              </h2>
              <p className="text-gray-600 leading-relaxed">You have the right to:</p>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Access your personal data stored by the Service
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Disconnect third-party integrations at any time
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Delete your chat history and conversations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  Request deletion of your account and associated data
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                8. Data Retention
              </h2>
              <p className="text-gray-600 leading-relaxed">
                As an educational project, data will be retained for the
                duration of the GS497 course and evaluation period. After the
                project concludes, all user data may be deleted. If you wish to
                delete your data before that time, you can disconnect
                integrations or request account deletion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                9. Children's Privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                The Service is designed for university-level students and is not
                intended for use by children under the age of 13. We do not
                knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                10. Changes to This Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. Changes
                will be posted on this page with an updated revision date. Your
                continued use of the Service after changes constitutes
                acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                11. Contact
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have questions or concerns about this Privacy Policy or
                your personal data, please reach out through the project's
                academic channels at BYU-Pathway Worldwide.
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
              <Link to="/terms" className="hover:text-primary transition">
                Terms of Service
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
