import meJpg from "../resources/me.jpg";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Code Slinger</h2>
      <div style={{ height: "calc(100% - 32px)" }}>
        <img
          src={meJpg}
          alt="me"
          width="100%"
          style={{
            display: "block",
            maxWidth: "min(50%, 2651px)",
            maxHeight: "min(70%, 2388px)",
            width: "auto",
            height: "auto",
            float: "left",
            marginRight: "2rem",
            marginBottom: "2rem",
            borderRadius: "5%",
          }}
        ></img>
        <p
          style={{
            lineHeight: "1.8",
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          I am a software engineer who works mainly on the front end. A lot of
          my work is focused on application and product development. The
          languages that I spend the most time in are: <b>React and Python.</b>{" "}
          I am currently working as a <b>Sr. Software Engineer</b> at{" "}
          <a href="https://earthshot.eco">
            <b>Earthshot Labs</b>
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default Home;
