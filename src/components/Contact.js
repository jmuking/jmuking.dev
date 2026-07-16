import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { colors } from "../configs/default";
import emailjs, { init } from "@emailjs/browser";
import { emailjsSettings } from "../configs/default";
import Loading from "./Other/Loading";

init(emailjsSettings.userId);

function Contact() {
  const form = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validSubmit, setValidSubmit] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const validName = name.trim().length > 0;
  const validMessage = message.trim().length > 0;

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
        emailjsSettings.userId,
      )
      .then(
        (result) => {
          setSent(true);
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        },
      );
  };

  const validateEmail = (email) => {
    const validate = String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );

    const validEmail = validate ? email : false;
    setValidEmail(validEmail);
  };

  return (
    <Box sx={{ textAlign: "center", maxWidth: "40rem", mx: "auto" }}>
      {sent && (
        <Alert severity="success" sx={{ mb: 3, alignItems: "center" }}>
          Thank you for the email! I will get back to you shortly &#128512;.
        </Alert>
      )}
      {loading && <Loading show={loading} />}
      {!sent && !loading && (
        <Box component="form" ref={form} onSubmit={sendEmail}>
          <Stack spacing={3}>
            <TextField
              label="Name *"
              name="name"
              placeholder="Joe Mama"
              value={name}
              error={!validName}
              helperText={!validName ? "Required" : " "}
              fullWidth
              onChange={(evt) => {
                setName(evt.target.value);
              }}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              label="Email *"
              type="email"
              name="email"
              placeholder="joe.mama@gmail.com"
              value={email}
              error={!validEmail}
              helperText={!validEmail ? "Enter a valid email" : " "}
              fullWidth
              onChange={(evt) => {
                setEmail(evt.target.value);
                validateEmail(evt.target.value);
              }}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              label="Message *"
              name="message"
              placeholder="Have you ever heard of my friend Joe?"
              value={message}
              error={!validMessage}
              helperText={!validMessage ? "Required" : " "}
              fullWidth
              multiline
              minRows={6}
              onChange={(evt) => {
                setMessage(evt.target.value);
              }}
            />
            <Button
              type="submit"
              disabled={!validSubmit}
              variant="contained"
              color="secondary"
              size="large"
              sx={{ py: 1.25 }}
            >
              Send
            </Button>
            <Typography sx={{ color: colors.invalid, textAlign: "left" }}>
              * = required
            </Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
}

export default Contact;
