import React, { useEffect, useRef, useState } from "react";
import { colors, font } from "../configs/default";
import emailjs, { init } from "@emailjs/browser";
import { emailjsSettings } from "../configs/default";
import styled from "styled-components";
import Loading from "./Other/Loading";

init(emailjsSettings.userId);

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ContactLabel = styled.label`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  font-weight: bold;
  font-size: 16px;
`;

const ContactInput = styled.input`
  height: 2rem;
  margin-top: 0.5rem;
  font-size: 18px;
  padding: 0.5rem;
  font-family: ${font};
  border-width: 2px;
  border-style: solid;
`;

const ContactTextArea = styled.textarea`
  margin-top: 0.5rem;
  font-size: 18px;
  resize: vertical;
  height: 10rem;
  line-height: 1.6rem;
  padding: 0.5rem;
  font-family: ${font};
  border-width: 2px;
`;

const ContactSubmit = styled.input`
  height: 3rem;
  font-size: 16px;
  font-weight: bold;
  background-color: ${colors.tertiary};
  color: white;
  border: 1px solid ${colors.dark};
  font-family: ${font};
`;

function Contact() {
  const form = useRef(null);

  const [validEmail, setValidEmail] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validMessage, setValidMessage] = useState(false);
  const [submitHovering, setSubmitHovering] = useState(false);
  const [validSubmit, setValidSubmit] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValidSubmit(validName && validEmail && validMessage);
  }, [validName, validEmail, validMessage]);

  const sendEmail = (e) => {
    setLoading(true);

    e.preventDefault();

    emailjs
      .sendForm(
        emailjsSettings.serviceId,
        emailjsSettings.templateId,
        form.current,
        emailjsSettings.userId
      )
      .then(
        (result) => {
          setSent(true);
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        }
      );
  };

  const validateEmail = (email) => {
    const validate = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    const validEmail = validate ? email : false;
    setValidEmail(validEmail);
  };

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      {sent && (
        <h3>
          Thank you for the email! I will get back to you shortly &#128512;.
        </h3>
      )}
      {loading && <Loading show={loading}></Loading>}
      {!sent && !loading && (
        <ContactForm ref={form} onSubmit={sendEmail}>
          <ContactLabel>
            <div>
              <span>Name </span>
              <span style={{ color: colors.invalid }}>*</span>
            </div>
            <ContactInput
              type="text"
              name="name"
              placeholder="Joe Mama"
              value={validName || null}
              onChange={(evt) => {
                setValidName(evt.target.value);
              }}
              style={{
                borderColor: validName ? "" : colors.invalid,
              }}
            ></ContactInput>
          </ContactLabel>
          <ContactLabel>
            <div>
              <span>Email </span>
              <span style={{ color: colors.invalid }}>*</span>
            </div>
            <ContactInput
              type="email"
              name="email"
              placeholder="joe.mama@gmail.com"
              value={validEmail || null}
              onChange={(evt) => {
                validateEmail(evt.target.value);
              }}
              style={{
                borderColor: validEmail ? "" : colors.invalid,
              }}
            />
          </ContactLabel>
          <ContactLabel>
            <div>
              <span>Message </span>
              <span style={{ color: colors.invalid }}>*</span>
            </div>
            <ContactTextArea
              name="message"
              placeholder="Have you ever heard of my friend Joe?"
              value={validMessage || null}
              onChange={(evt) => {
                setValidMessage(evt.target.value);
              }}
              style={{
                borderColor: validMessage ? "" : colors.invalid,
              }}
            />
          </ContactLabel>
          <ContactSubmit
            type="submit"
            disabled={!validSubmit}
            value="Send"
            onMouseEnter={() => {
              setSubmitHovering(true);
            }}
            onMouseLeave={() => {
              setSubmitHovering(false);
            }}
            style={{
              backgroundColor: !validSubmit
                ? colors.invalidBg
                : submitHovering
                ? colors.other1
                : colors.tertiary,
              color: !validSubmit ? colors.dark : "white",
              cursor: !validSubmit ? "not-allowed" : "pointer",
            }}
          ></ContactSubmit>
          <p style={{ color: colors.invalid, textAlign: "left" }}>
            * = required
          </p>
        </ContactForm>
      )}
    </div>
  );
}

export default Contact;
