import meJpg from "../resources/me.jpg";

function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Sr. Software Engineer</h2>
      <img
        src={meJpg}
        alt="me"
        width="100%"
        style={{ maxWidth: "min(50%, 500px)" }}
      ></img>
      <p style={{ lineHeight: "1.8" }}>
        I am a full stack software engineer who works mainly with React + TS on
        the front end, and Python on the back end. I am currently working as a
        Sr. Software Engineer at Esri.
      </p>
    </div>
  );
}

export default Home;
