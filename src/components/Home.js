import meJpg from "../resources/me.jpg";

function Home() {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Sr. Software Engineer</h1>
      <img
        src={meJpg}
        alt="me"
        width="100%"
        style={{ maxWidth: "500px" }}
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
