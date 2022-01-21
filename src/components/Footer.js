import { links, strings } from "../configs/default";
import resumePdf from "../resources/Resume.pdf";

const spacingStyle = { margin: "2rem" };

function Footer() {
  return (
    <div
      style={{
        margin: "2rem",
        display: "flex",
      }}
    >
      <a href={resumePdf} style={spacingStyle}>
        {strings.resume}
      </a>
      <a href={links.github} style={spacingStyle}>
        {strings.github}
      </a>
      <a href={links.itch} style={spacingStyle}>
        {strings.itch}
      </a>
      <a href={`tel:${links.number}`} style={spacingStyle}>
        {strings.call}
      </a>
      <a href={`mailto:${links.email}`} style={spacingStyle}>
        {strings.email}
      </a>
      <div style={spacingStyle}>{strings.byline}</div>
    </div>
  );
}

export default Footer;
