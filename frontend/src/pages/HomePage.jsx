import React from "react";
import { useNavigate } from "react-router-dom";

const featureHighlights = [
  {
    title: "Unified complaint tracking",
    description:
      "Easily capture issues from multiple sources and manage them in one streamlined dashboard.",
  },
  {
    title: "Automated assignments",
    description:
      "Complaints are intelligently routed to the right staff or warden without manual effort.",
  },
  {
    title: "Transparent progress updates",
    description:
      "Students and staff can monitor complaint resolution in real time with clear visibility.",
  },
  {
    title: "Insightful analytics",
    description:
      "Identify recurring problems and trends with a searchable, centralized log of all complaints.",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 lg:px-0">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-primary px-3 py-1 text-white font-semibold tracking-wide">
              HCMS
            </div>
            <span className="text-lg font-semibold">Hostel Helpdesk</span>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary hover:bg-orange-50"
          >
            Log in
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20 lg:px-0">
        <section className="flex flex-col gap-12 py-16">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-600">
              Complaint Portal
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-gray-900 md:text-5xl">
              Managing hostel issues has never been simpler.
            </h1>
            <p className="text-lg text-gray-600">
              Empower residents with a platform to raise concerns, track
              progress, and receive timely resolutions. Inspired by modern
              helpdesk systems, tailored for hostel life.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate("/login")}
                className="rounded-full border border-gray-300 px-8 py-3 text-base font-semibold text-gray-800 hover:border-gray-400"
              >
                Explore Demo
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Already part of the team?{" "}
              <span
                onClick={() => navigate("/login_staff")}
                className="cursor-pointer font-semibold text-secondary"
              >
                Staff Login
              </span>
            </p>
          </div>
        </section>

        <section
          id="features"
          className="rounded-3xl bg-green-50 px-6 py-12 md:px-10"
        >
          <div className="space-y-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green-700">
              Why Choose Us
            </p>
            <h2 className="text-3xl font-semibold text-gray-900">
              Smarter complaint management for hostels
            </h2>
            <p className="mx-auto max-w-3xl text-base text-gray-600">
              Say goodbye to scattered spreadsheets and manual follow-ups. Our
              system ensures every complaint is captured, tracked, and resolved
              efficiently with accountability built in.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featureHighlights.map(({ title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-white bg-white/70 p-6 text-left shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mt-3 text-sm text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-10 rounded-3xl bg-white py-16 lg:flex-row lg:items-center">
          <div className="lg:w-1/2 space-y-6">
            <h3 className="text-3xl font-semibold text-gray-900">
              Quick onboarding for students and staff.
            </h3>
            <p className="text-base text-gray-600">
              Students can raise tickets with ease, while staff benefit from
              dashboards, SLA tracking, and smart assignment suggestions
              tailored to hostel blocks and categories.
            </p>
            <div className="grid grid-cols-2 gap-4 text-center text-sm font-semibold text-gray-700">
              <div className="rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-3xl font-bold text-primary">2m</p>
                <p>Avg. response time</p>
              </div>
              <div className="rounded-2xl border border-gray-100 p-5 shadow-sm">
                <p className="text-3xl font-bold text-primary">98%</p>
                <p>Resolved within SLA</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 rounded-3xl bg-gray-50 p-8 shadow-inner">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
              Sign in as
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/login")}
                className="flex-1 rounded-2xl bg-primary px-6 py-4 text-lg font-semibold text-white transition hover:-translate-y-0.5"
              >
                Student
              </button>
              <button
                onClick={() => navigate("/login_staff")}
                className="flex-1 rounded-2xl border border-gray-300 px-6 py-4 text-lg font-semibold text-gray-800 hover:border-gray-400"
              >
                Staff
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Need an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="cursor-pointer font-semibold text-secondary"
              >
                Register now
              </span>
            </p>
          </div>
        </section>
      </main>

      <footer
        id="contact"
        className="border-t border-gray-200 bg-gray-50 px-4 py-10 text-sm text-gray-600"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-semibold text-gray-900">
              Reach our support team
            </p>
            <p>Phone: +91 98765 43210 • Email: help@hostelhelpdesk.com</p>
          </div>
          <p>
            © {new Date().getFullYear()} Hostel Helpdesk. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
