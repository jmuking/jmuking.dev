import React, { useEffect, useRef, useState } from "react";
import { colors, font } from "../configs/default";
import emailjs, { init } from "@emailjs/browser";
import { emailjsSettings } from "../configs/default";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { render } from "@testing-library/react";

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
`;

const ContactTextArea = styled.textarea`
  margin-top: 0.5rem;
  font-size: 18px;
  resize: vertical;
  height: 10rem;
  line-height: 1.6rem;
  padding: 0.5rem;
  font-family: ${font};
`;

const ContactSubmit = styled.input`
  height: 3rem;
  font-size: 16px;
  font-weight: bold;
  background-color: ${colors.tertiary};
  color: ${colors.light};
  border: 1px solid ${colors.dark};
  font-family: ${font};
`;

function useSent() {
  const { search } = useLocation();

  const query = new URLSearchParams(search);
  const userName = query.get("user_name");
  const userEmail = query.get("user_email");
  const message = query.get("message");
  return userName && userEmail && message;
}

function Contact() {
  const form = useRef(null);
  const sent = useSent();

  const [validEmail, setValidEmail] = useState(false);
  const [validName, setValidName] = useState(false);
  const [validMessage, setValidMessage] = useState(false);
  const [submitHovering, setSubmitHovering] = useState(false);
  const [validSubmit, setValidSubmit] = useState(false);

  useEffect(() => {
    setValidSubmit(validName && validEmail && validMessage);
  }, [validName, validEmail, validMessage]);

  const sendEmail = (e) => {
    emailjs
      .sendForm(
        emailjsSettings.serviceId,
        emailjsSettings.templateId,
        form.current,
        emailjsSettings.userId
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.error(error.text);
        }
      );
  };

  const validateEmail = (email) => {
    const validate = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    setValidEmail(validate);
  };

  const renderContact = () => {
    if (sent)
      return (
        <h3>
          Thank you for the email! I will get back to you shortly &#128512;.
        </h3>
      );
    else
      return (
        <ContactForm ref={form} onSubmit={sendEmail}>
          <ContactLabel>
            <div>
              <span>Name </span>
              <span style={{ color: colors.invalid }}>*</span>
            </div>
            <ContactInput
              type="text"
              name="user_name"
              placeholder="Joe Mama"
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
              name="user_email"
              placeholder="joe.mama@gmail.com"
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
              console.log("waaa");
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
              color: !validSubmit ? colors.dark : colors.light,
              cursor: !validSubmit ? "not-allowed" : "pointer",
            }}
            onClick={() => {
              try {
                navigator.vibrate(10);
              } catch {
                /*do nothing*/
              }
            }}
          ></ContactSubmit>
        </ContactForm>
      );
  };

  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
      }}
    >
      {renderContact()}
    </div>
  );
}

export default Contact;
