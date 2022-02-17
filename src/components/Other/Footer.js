import { colors, links, strings } from "../../configs/default";
import resumePdf from "../../resources/Resume.pdf";
import styled from "styled-components";

const spacingStyle = {
  marginLeft: "1rem",
  marginRight: "1rem",
  marginTop: "1rem",
  marginBottom: "0",
  textAlign: "center",
};

const aFooterStyle = { ...spacingStyle, ...{ color: colors.tertiary } };

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

function Footer() {
  return (
    <div
      style={{
        paddingTop: "0.5rem",
        paddingBottom: "0.8rem",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        borderTop: `1px solid ${colors.dark}`,
        background: colors.light,
        zIndex: 1,
      }}
    >
      <FooterColumn>
        <a href={resumePdf} style={aFooterStyle}>
          {strings.resume}
        </a>
        <a href={`mailto:${links.email}`} style={aFooterStyle}>
          {strings.email}
        </a>
      </FooterColumn>
      <FooterColumn>
        <p style={spacingStyle}>{strings.byline}</p>
        <p style={spacingStyle}>&#169;{strings.year}</p>
      </FooterColumn>

      <FooterColumn>
        <a href={links.github} style={aFooterStyle}>
          {strings.github}
        </a>
        <a href={links.itch} style={aFooterStyle}>
          {strings.itch}
        </a>
      </FooterColumn>
    </div>
  );
}

export default Footer;
