import React from "react";
import stripFrontMatterAndCompile from "../utils/marksyCompiler";
import styled from "styled-components";
import { sizes, fadeIn } from "../utils/styles";
import images from "../utils/images";
import { rhythm } from "../utils/typography";
import { Share } from "react-twitter-widgets";
import media from "../utils/media";

const StyledPostWrapper = styled.div`
  width: 100%;
`

const StyledTextWrapper = styled.div`
  max-width: ${sizes.maxWidthContent};
  margin: 0 auto;
  padding: ${rhythm(1)};
`

const StyledMainImage = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  height: 0;
  padding-top: 56.25%;
  margin-top: -${rhythm(1.5)};
`

const StyledTitleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  text-align: center;
  animation: ${fadeIn} 1.5s 0.5s forwards;
  color: white;
  padding: ${rhythm(1)};
  text-shadow: 3px 3px 1px #000,
     -1px -1px 1px #000,
      1px -1px 1px #000,
     -1px 1px 1px #000,
      1px 1px 1px #000;

  ${media.small`
    margin-top: ${rhythm(1)};

    h1 {
      font-size: ${rhythm(1)};
    }
    h2 {
      font-size: ${rhythm(0.75)};
    }
  `}

  ${media.extraSmall`
    h1 {
      font-size: ${rhythm(0.6)};
    }
    h2 {
      font-size: ${rhythm(0.45)};
    }
  `}
`

export default ({ data, location }) => {
  const post = data.markdownRemark;
  return (
    <StyledPostWrapper>
      <StyledMainImage image={images[post.frontmatter.featured_image]}>
        <StyledTitleWrapper>
          <h1>{post.frontmatter.title}</h1>
          <h2>{post.frontmatter.date}</h2>
        </StyledTitleWrapper>
      </StyledMainImage>
      <StyledTextWrapper>
        {stripFrontMatterAndCompile(post.internal.content)}
        <Share
          url={`${process.env.GATSBY_BASE_URL}${location.pathname}`}
          options={{
            size: "large",
            via: "mmmaaatttttt",
            text: post.frontmatter.title
          }} />
      </StyledTextWrapper>
    </StyledPostWrapper>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      internal {
        content
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        featured_image
        caption
      }
    }
  }
`;
