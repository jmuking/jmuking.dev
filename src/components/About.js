import styled from "styled-components";
import Gallery from "react-photo-gallery";
import { colors, photos } from "../configs/default";

const HalfImg = styled.img`
  max-width: calc(50% - 2rem);
  max-height: 100%;
  width: auto;
  height: auto;
  margin: 1rem;
`;

const WholeImg = styled.img`
  max-width: calc(100% - 2rem);
  max-height: calc(50% - 2rem);
  width: auto;
  height: auto;
  margin: 1rem;
`;

function About() {
  return (
    <div
      style={{
        margin: "2rem",
        padding: "1rem",
        background: colors.dark,
      }}
    >
      <p style={{ color: colors.light, marginTop: "0" }}>
        In my free time I love to bike, play games, and yell at my cats. I also
        participate in game jams, and have made a few fun little games that you
        can play in the "play" section of this site!
      </p>
      <Gallery photos={photos}></Gallery>
    </div>
  );
}

export default About;
