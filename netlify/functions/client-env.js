exports.handler = async function handler() {
  const env = {
    EMAILJS_SERVICE_ID:
      process.env.EMAILJS_SERVICE_ID || process.env.VITE_EMAILJS_SERVICE_ID || "",
    EMAILJS_TEMPLATE_ID:
      process.env.EMAILJS_TEMPLATE_ID || process.env.VITE_EMAILJS_TEMPLATE_ID || "",
    EMAILJS_USER_ID:
      process.env.EMAILJS_USER_ID || process.env.VITE_EMAILJS_USER_ID || "",
    PENGUIN_LIVESTREAM_ID:
      process.env.PENGUIN_LIVESTREAM_ID ||
      process.env.VITE_PENGUIN_LIVESTREAM_ID ||
      "",
  };

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
    },
    body: JSON.stringify(env),
  };
};
