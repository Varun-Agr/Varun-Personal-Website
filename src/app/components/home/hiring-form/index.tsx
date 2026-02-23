"use client";
import { getImgPath } from "@/utils/image";
import Image from "next/image";
import { useState } from "react";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbxtPLoyZk7MNlyoahjnaPLP_4SmpXpVaQin1zgaLm2OSXQqcz-PJLv17Ps9Q8LK18iL/exec";

const HiringForm = () => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    linkedin: "",
    resume: "",
  });

  const reset = () => {
    setFormData({
      name: "",
      email: "",
      contact: "",
      linkedin: "",
      resume: "",
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      linkedin: formData.linkedin,
      resume: formData.resume,
    });

    fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      body: params,
    })
      .then(async (response) => {
        const rawText = await response.text();
        let data: any = {};
        try {
          data = JSON.parse(rawText);
        } catch (parseErr) {
          setStatus("error");
          return;
        }
        if (data.success || data.result === "success") {
          setStatus("success");
          reset();
        } else {
          setStatus("error");
        }
      })
      .catch((e) => {
        setStatus("error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="no-print border-t border-softGray" id="hiring">
      <div className="container">
        <div className="pt-16 md:pt-20 pb-16 md:pb-20 items-center">
          <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-14">
            <h4>Hiring - Talent Identification Advisor</h4>
          </div>
          <p className="text-secondary max-w-2xl mb-10 md:mb-14">
            I am looking for professionals with a basic understanding of AI
            Safety to help us identify and connect with world-class STEM talent
            in their regions for advancing research on safe and aligned AI
            systems.
            <br />
            <br />
            For a detailed job description, please see{" "}
            <a href="https://docs.google.com/document/d/1TejOVERGX5ks3fOwyn08Ag7HGegRz_3IvndE95SMptI/edit?tab=t.0#heading=h.84dlvptdzo6f">
              here.
            </a>
            <br />
            <br />
            If you are interested in this role, please fill out the form below
            and we will get back to you as soon as possible.
          </p>
          <form onSubmit={handleSubmit} className="max-w-2xl" suppressHydrationWarning>
            <div className="flex flex-col gap-7 sm:gap-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="hiring-name" className="label">
                    Name *
                  </label>
                  <input
                    required
                    className="input"
                    id="hiring-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label htmlFor="hiring-email" className="label">
                    Email *
                  </label>
                  <input
                    required
                    className="input"
                    id="hiring-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    suppressHydrationWarning
                  />
                </div>
              </div>
              <div>
                <label htmlFor="hiring-contact" className="label">
                  Contact (optional)
                </label>
                <input
                  className="input"
                  id="hiring-contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label htmlFor="hiring-linkedin" className="label">
                  LinkedIn URL *
                </label>
                <input
                  required
                  className="input"
                  id="hiring-linkedin"
                  type="url"
                  name="linkedin"
                  placeholder="https://linkedin.com/in/..."
                  value={formData.linkedin}
                  onChange={handleChange}
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label htmlFor="hiring-cv" className="label">
                  CV / Resume URL *
                </label>
                <input
                  required
                  className="input"
                  id="hiring-cv"
                  type="url"
                  name="resume"
                  placeholder="https://..."
                  value={formData.resume}
                  onChange={handleChange}
                  suppressHydrationWarning
                />
              </div>
              {status === "success" && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-50 border border-green-200">
                  <Image
                    src={getImgPath("/images/icon/success-icon.svg")}
                    alt="success-icon"
                    width={24}
                    height={24}
                    className="shrink-0"
                  />
                  <p className="text-green-700 text-sm">
                    Thank you! Your application has been submitted. We will get back to you soon.
                  </p>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-50 border border-red-200">
                  <svg className="shrink-0 w-5 h-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 13a1 1 0 102 0v-4a1 1 0 10-2 0v4zm1-8a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-600 text-sm">
                    Something went wrong. Please try again or email me directly.
                  </p>
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="relative overflow-hidden cursor-pointer w-fit py-2 sm:py-3 md:py-5 px-4 sm:px-5 md:px-7 border border-primary rounded-full group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 text-xl font-medium text-primary group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                  {loading && (
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {loading ? "Submitting..." : "Apply Now"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HiringForm;
