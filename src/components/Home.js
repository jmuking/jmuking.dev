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
      <h2 style={{ marginTop: 0 }}>Sr. Software Engineer</h2>
      <div>
        <img
          src={meJpg}
          alt="me"
          width="100%"
          style={{
            display: "block",
            maxWidth: "min(65%, 671px)",
            maxHeight: "min(46%, 604px)",
            width: "auto",
            height: "auto",
            float: "left",
            marginRight: "2rem",
            marginBottom: "2rem",
          }}
        ></img>
        <p
          style={{
            lineHeight: "1.8",
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          I am a full stack software engineer who works mainly with React + TS
          on the front end, and Python on the back end. I am currently working
          as a Sr. Software Engineer at Esri.
        </p>
      </div>
    </div>
  );
}

export default Home;
