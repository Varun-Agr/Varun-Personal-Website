"use client";

import { useState } from "react";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxtPLoyZk7MNlyoahjnaPLP_4SmpXpVaQin1zgaLm2OSXQqcz-PJLv17Ps9Q8LK18iL/exec";

const ConnectForm = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    subject: "",
    message: "",
    links: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const params = new URLSearchParams({
      full_name: formData.name,
      email: formData.email,
      phone: formData.role,
      message: `[${formData.subject}] ${formData.message}\n\nLinks: ${formData.links}`,
    });

    try {
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        body: params,
      });
      const raw = await response.text();
      let data: any = {};
      try {
        data = JSON.parse(raw);
      } catch {
        setStatus("error");
        return;
      }
      if (data.success || data.result === "success") {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          role: "",
          subject: "",
          message: "",
          links: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="connect"
      style={{ background: "var(--paper-dark)", padding: "0 24px 48px" }}
    >
      <div className="connect__inner" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="connect__header">
          <hr className="bs-double-rule" />
          <h2>Letters to the Editor</h2>
          <p>Submit your candidacy for review</p>
        </div>

        <div className="connect__editorial">
          The Agrawal Dispatch welcomes correspondence from engineers,
          researchers, and operators who believe great work speaks louder than a
          polished resume. Submissions are reviewed personally. We do not use ATS
          software here.
        </div>

        <form className="connect__form" onSubmit={handleSubmit}>
          {status === "success" && (
            <div className="connect__success">
              Your dispatch has been received. The editor will respond within 48
              hours.
            </div>
          )}
          {status === "error" && (
            <div className="connect__error">
              Something went wrong. Please try again or write directly to
              hello@varunagrawal.com.
            </div>
          )}

          <div className="connect__field-row">
            <div className="connect__field">
              <label htmlFor="connect-name">Your Name:</label>
              <input
                id="connect-name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>
            <div className="connect__field">
              <label htmlFor="connect-email">Contact Details:</label>
              <input
                id="connect-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="connect__field">
            <label htmlFor="connect-role">Current Post:</label>
            <input
              id="connect-role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          </div>

          <div className="connect__field">
            <label htmlFor="connect-subject">Subject of Correspondence:</label>
            <input
              id="connect-subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div className="connect__field">
            <label htmlFor="connect-message">Your Dispatch:</label>
            <textarea
              id="connect-message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <div className="connect__field">
            <label htmlFor="connect-links">Supporting Documents:</label>
            <input
              id="connect-links"
              name="links"
              placeholder="LinkedIn, GitHub, or portfolio URL"
              value={formData.links}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="connect__submit"
          >
            {loading
              ? "Transmitting..."
              : "Submit for Editorial Review"}
          </button>

          <div className="connect__note">
            The editor responds to all correspondence within 48 hours. Unsolicited junk mail will be composted.
          </div>
        </form>
      </div>
    </section>
  );
};

export default ConnectForm;
