import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useTheme from "@/hooks/useTheme.ts";

export const ContactForm = () => {
  const theme = useTheme() || "light";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = async (data: { [key: string]: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendMessage({
        name,
        email,
        message,
      });
      success();
      setName("");
      setEmail("");
      setMessage("");
    } catch (e) {
      error();
    }
    setIsSubmitting(false);
  };

  const success = () =>
    toast("Wiadomość została wysłana. Dziękujemy za kontakt!", {
      type: "success",
      position: "top-center",
      theme,
    });

  const error = () =>
    toast(
      "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.",
      {
        type: "error",
        position: "top-center",
        theme,
      },
    );

  const disabled = !name || !email || !message;
  return (
    <>
      <ToastContainer />

      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="form-label">
            Imię i Nazwisko <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            className="form-input"
            placeholder="Jan Kowalski"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="form-label">
            Adres E-mail <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            className="form-input"
            placeholder="jan.kowalski@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="form-label">
            Wiadomość <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            className="form-input"
            placeholder="W czym możemy pomóc?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={8}
          ></textarea>
        </div>
        <button
          type="submit"
          className={
            "btn btn-primary " +
            (disabled ? "cursor-not-allowed opacity-50" : "")
          }
          disabled={isSubmitting || disabled}
        >
          {isSubmitting ? "Wysyłanie..." : "Wyślij"}
        </button>
      </form>
    </>
  );
};
