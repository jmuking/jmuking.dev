import { colors, photos } from "../configs/default";

function About() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p style={{ marginTop: "0", lineHeight: "1.6" }}>
        In my free time I love to bike, play games, and yell at my cats. I also
        participate in game jams, and have made a few fun little games (with my
        friend Sam) that you can play in the "play" section of this site. When
        I'm making games, I love to keep improving on my pixel art. See some of
        my art{" "}
        <a href="/play" style={{ color: colors.tertiary }}>
          here
        </a>
        !
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          justifyContent: "space-between",
        }}
      >
        {photos.map((photo, index) => {
          return (
            <img
              src={photo.src}
              alt={`${index}`}
              style={{
                aspectRatio: 1,
                maxWidth: "100%",
                height: "fit-content",
                marginTop: "1rem",
                borderRadius: "5%",
              }}
            ></img>
          );
        })}
      </div>
    </div>
  );
}

export default About;
