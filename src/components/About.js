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
        <a href="/play" style={{ color: colors.secondary }}>
          here
        </a>
        !
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
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
                width: `${photo.width}`,
                marginTop: "1rem",
              }}
            ></img>
          );
        })}
      </div>
    </div>
  );
}

export default About;
