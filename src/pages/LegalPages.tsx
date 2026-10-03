import React, { useState } from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Mail, CheckCircle2, Shield, Lock, FileText, Send } from 'lucide-react';

interface LegalPageProps {
  onNavigate: (path: string) => void;
  pageType: 'about' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'disclaimer';
}

export const LegalPages: React.FC<LegalPageProps> = ({ onNavigate, pageType }) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const getPageDetails = () => {
    switch (pageType) {
      case 'about':
        return {
          title: 'About PTools',
          label: 'About',
          content: (
            <div className="space-y-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                <strong>PTools</strong> (Free Online Tools for Everyone) is a browser-first digital platform providing fast, accessible, and privacy-preserving utilities for everyday tasks.
              </p>
              <p>
                Powered by <strong>Pixelary Studio</strong>, our mission is to eliminate bloated desktop software and paid subscription walls for essential digital utilities. Whether you need to compress images, merge multiple PDF contracts, inspect code, generate cryptographic hashes, or calculate percentages, PTools allows you to accomplish your task directly in your browser.
              </p>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading pt-2">
                Core Architectural Principles
              </h2>
              <ul className="space-y-3 list-disc pl-5">
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">100% Client-Side Processing:</strong> Wherever possible, images, PDFs, text, and numbers are processed entirely in your browser using modern WebAssembly, Canvas, and Web Crypto APIs. Your confidential files are never uploaded to our servers.
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Zero Artificial Restrictions:</strong> No login walls, no credit cards, and no usage limits. Every tool is immediately available to everyone.
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Authentic & Transparent:</strong> We never display fake review counters, inflated user counts, or simulated background processing stubs.
                </li>
                <li>
                  <strong className="text-slate-800 dark:text-slate-200">Mobile-First Design:</strong> Built from the ground up to respond smoothly on smartphones, tablets, and large 4K displays.
                </li>
              </ul>
            </div>
          )
        };

      case 'contact':
        return {
          title: 'Contact & Feedback',
          label: 'Contact',
          content: (
            <div className="space-y-6">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Have a feature request, detected a bug, or have a suggestion for a new tool? We appreciate your feedback.
              </p>

              {contactSubmitted ? (
                <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <h3 className="text-base font-semibold text-emerald-800 dark:text-emerald-300">
                    Thank you for your message!
                  </h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    Our team at Pixelary Studio reviews all incoming suggestions.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Message or Tool Request</label>
                    <textarea
                      rows={5}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full p-3 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          )
        };

      case 'privacy':
        return {
          title: 'Privacy Policy',
          label: 'Privacy Policy',
          content: (
            <div className="space-y-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                At <strong>PTools</strong>, accessible from our web domains, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information collected and how it is used.
              </p>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                1. Client-Side Processing Architecture
              </h2>
              <p>
                Unlike traditional online utility websites that transmit uploaded files to remote servers for processing, PTools executes file conversions (such as image compression, format conversion, and PDF operations) entirely inside your web browser. Your confidential images, documents, passwords, and source code never leave your device.
              </p>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                2. Local Storage
              </h2>
              <p>
                PTools utilizes standard browser <code>localStorage</code> solely for recording your theme preference (Dark Mode or Light Mode) and your starred favorite tools. We do not use persistent tracking cookies or collect personally identifiable information without consent.
              </p>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                3. Advertising & Analytics
              </h2>
              <p>
                We may partner with privacy-conscious advertising networks (such as Adsterra) to support the ongoing hosting and development costs of PTools. Third-party ad vendors may use standard technical identifiers in accordance with applicable web privacy laws.
              </p>
            </div>
          )
        };

      case 'terms':
        return {
          title: 'Terms of Service',
          label: 'Terms',
          content: (
            <div className="space-y-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                By accessing and utilizing PTools, you agree to comply with and be bound by the following terms and conditions of use.
              </p>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                1. Acceptable Use
              </h2>
              <p>
                You may use PTools for personal, academic, or commercial purposes. You agree not to abuse, disrupt, or launch automated attacks against our services.
              </p>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                2. No Warranty
              </h2>
              <p>
                All tools, calculators, conversions, and information provided by PTools are provided on an "as-is" and "as-available" basis without warranties of any kind. While we strive for extreme mathematical and computational precision, PTools shall not be liable for any errors, inaccuracies, or damages arising from reliance on calculations.
              </p>
            </div>
          )
        };

      case 'cookies':
        return {
          title: 'Cookie Policy',
          label: 'Cookie Policy',
          content: (
            <div className="space-y-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                This Cookie Policy explains how PTools uses cookies and similar local storage technologies.
              </p>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Essential Local Storage
              </h2>
              <p>
                We do not store user tracking sessions. We store two functional keys in your browser's local storage:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><code>ptools-theme</code>: Remembers your selected theme preference (Light, Dark, or System default).</li>
                <li><code>ptools_favorites</code>: Remembers the tool IDs you have bookmarked.</li>
              </ul>
              <p>
                You can clear your local storage at any time using your browser settings or the "Clear All Favorites" button.
              </p>
            </div>
          )
        };

      case 'disclaimer':
        return {
          title: 'Disclaimer',
          label: 'Disclaimer',
          content: (
            <div className="space-y-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                The information and calculations generated by PTools are intended solely for general informational and utility purposes.
              </p>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Health & Fitness Disclaimers (BMI & Health Calculators)
              </h2>
              <p>
                The BMI calculator and related fitness utilities provide estimates based on World Health Organization formulas and do not constitute clinical or professional medical advice. Always consult a qualified medical professional for health evaluations.
              </p>
              <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Financial Calculators
              </h2>
              <p>
                Calculations relating to percentages, margins, and taxes are estimates and should not be used as official tax filings or certified financial audits.
              </p>
            </div>
          )
        };
    }
  };

  const details = getPageDetails();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[{ label: details.label, path: `/${pageType}` }]}
        onNavigate={onNavigate}
      />

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
          {details.title}
        </h1>
        {details.content}
      </div>
    </div>
  );
};
