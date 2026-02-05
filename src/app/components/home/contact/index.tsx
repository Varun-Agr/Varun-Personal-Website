"use client";
import { getDataPath, getImgPath } from "@/utils/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Contact = () => {
  const [contactData, setContactData] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data/page-data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContactData(data?.contactLinks);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const reset = () => {
    formData.name = "";
    formData.number = "";
    formData.email = "";
    formData.message = "";
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

    const googleSheetUrl = "https://script.google.com/macros/s/AKfycbxKxVHEMOYpmFxRfD5svGRpg7J_Dg-jWUGN_3UnUWC_lQYAHGzoCUhkMCKSi5hcwX-g/exec";

    // Convert form data to URLSearchParams for Google Apps Script
    const params = new URLSearchParams({
      full_name: formData.name,
      phone: formData.number,
      email: formData.email,
      message: formData.message,
    });

    fetch(googleSheetUrl, {
      method: "POST",
      body: params,
    })
      .then((response) => response.json())
      .then((data) => {
        setSubmitted(data.success || data.result === "success");
        reset();
      })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="no-print">
      <div className="container">
        <div className="pt-16 md:pt-32 pb-20">
          <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
            <h2>Contact Me</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-7 sm:gap-12">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="name" className="label">
                      Name *
                    </label>
                    <input
                      required
                      className="input"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="number" className="label">
                      Phone *
                    </label>
                    <input
                      required
                      className="input"
                      id="number"
                      type="number"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="label">
                    Email *
                  </label>
                  <input
                    required
                    className="input"
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="label">
                    Message *
                  </label>
                  <textarea
                    required
                    className="input"
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={2}
                  />
                </div>
                {submitted && (
                  <div className="flex items-center gap-2">
                    <Image
                      src={getImgPath("/images/icon/success-icon.svg")}
                      alt="success-icon"
                      width={30}
                      height={30}
                    />
                    <p className="text-secondary">
                      Great!!! Email has been Successfully Sent. We will get in
                      touch asap.
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
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {loading ? "Sending..." : "Send Now"}
                  </span>
                </button>
              </div>
            </form>
            <div className="flex flex-col sm:flex-row md:flex-col justify-between gap-5 md:gap-20 items-center md:items-end">
              <div className="flex flex-wrap flex-row md:flex-col items-start md:items-end gap-4 md:gap-6">
                {contactData?.socialLinks?.map((value: any, index: any) => {
                  return (
                    <div key={index}>
                      <Link
                        className="text-base sm:text-lg font-normal text-secondary hover:text-primary"
                        onClick={(e) => e.preventDefault()}
                        href={"#!"}
                      >
                        {value?.title}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap justify-center gap-5 lg:gap-11 items-end">
                {contactData?.contactInfo?.map((value: any, index: any) => {
                  return (
                    <div key={index}>
                      <Link
                        onClick={(e) => e.preventDefault()}
                        href={"#!"}
                        className="text-base lg:text-lg text-black font-normal border-b border-black pb-3 hover:text-primary hover:border-primary"
                      >
                        {value?.label}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
