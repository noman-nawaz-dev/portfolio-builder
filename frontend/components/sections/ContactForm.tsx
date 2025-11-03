import React, { useState } from 'react';
import { SectionProps } from './types';

interface ContactContent {
  title?: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  showForm?: boolean;
}

export const ContactForm: React.FC<SectionProps> = ({
  content,
  styles,
  layout = 'form-only',
  theme,
}) => {
  const contactContent = content as ContactContent;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // TODO: Implement actual form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClasses = "w-full px-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-2";

  return (
    <section
      className="px-4 py-16"
      style={{
        backgroundColor: styles?.backgroundColor || theme.colors.background.primary,
        padding: styles?.padding,
        margin: styles?.margin,
      }}
    >
      <div className="max-w-4xl mx-auto">
        {contactContent.title && (
          <h2
            className="text-5xl font-bold mb-4 text-center"
            style={{
              color: theme.colors.text.primary,
              fontFamily: theme.fonts.heading,
            }}
          >
            {contactContent.title}
          </h2>
        )}

        {contactContent.subtitle && (
          <p
            className="text-xl mb-12 text-center"
            style={{
              color: theme.colors.text.secondary,
              fontFamily: theme.fonts.body,
            }}
          >
            {contactContent.subtitle}
          </p>
        )}

        {/* Contact Information */}
        {(contactContent.email || contactContent.phone) && (
          <div className="mb-12 flex flex-wrap justify-center gap-8">
            {contactContent.email && (
              <div className="flex items-center gap-3">
                <span className="text-2xl">✉️</span>
                <div>
                  <h4
                    className="font-semibold mb-1 text-sm"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    Email
                  </h4>
                  <a
                    href={`mailto:${contactContent.email}`}
                    style={{ color: theme.colors.primary }}
                    className="hover:underline font-medium"
                  >
                    {contactContent.email}
                  </a>
                </div>
              </div>
            )}

            {contactContent.phone && (
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <div>
                  <h4
                    className="font-semibold mb-1 text-sm"
                    style={{ color: theme.colors.text.secondary }}
                  >
                    Phone
                  </h4>
                  <a
                    href={`tel:${contactContent.phone}`}
                    style={{ color: theme.colors.primary }}
                    className="hover:underline font-medium"
                  >
                    {contactContent.phone}
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        <div className={layout === 'sidebar' ? 'grid md:grid-cols-2 gap-12' : ''}>
          {contactContent.showForm !== false && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 font-medium"
                  style={{
                    color: theme.colors.text.primary,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  style={{
                    backgroundColor: theme.colors.background.secondary,
                    color: theme.colors.text.primary,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: theme.borderRadius.lg,
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 font-medium"
                  style={{
                    color: theme.colors.text.primary,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  style={{
                    backgroundColor: theme.colors.background.secondary,
                    color: theme.colors.text.primary,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: theme.borderRadius.lg,
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 font-medium"
                  style={{
                    color: theme.colors.text.primary,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                  style={{
                    backgroundColor: theme.colors.background.secondary,
                    color: theme.colors.text.primary,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: theme.borderRadius.lg,
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 font-medium"
                  style={{
                    color: theme.colors.text.primary,
                    fontFamily: theme.fonts.body,
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={inputClasses}
                  style={{
                    backgroundColor: theme.colors.background.secondary,
                    color: theme.colors.text.primary,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: theme.borderRadius.lg,
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.text.inverse,
                  borderRadius: theme.borderRadius.lg,
                  boxShadow: theme.shadows.md,
                }}
              >
                {status === 'sending' ? 'Sending...' : status === 'success' ? '✓ Sent!' : 'Send Message'}
              </button>

              {status === 'error' && (
                <p className="text-red-500 text-center">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
