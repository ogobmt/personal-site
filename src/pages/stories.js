import React from "react";
import styled, { keyframes } from "styled-components";
import Link from "gatsby-link";
import { rhythm } from "../utils/typography";
import images from "../utils/images";
import COLORS from "../utils/styles";
import media from "../utils/media";

const StyledTitle = styled.h4`margin-bottom: ${rhythm(1 / 4)};`;

const StyledDate = styled.h6`
  color: ${COLORS.NAV_BORDER};

  ${media.small`
    margin-bottom: ${rhythm(1 / 4)};
  `};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;

  ${media.extraSmall`
    flex-direction: column;
  `};
`;

const StyledExcerptArea = styled.div`
  flex-direction: column;
  margin: ${rhythm(1)};
  margin-top: 0;

  p {
    margin: 0;
    line-height: ${rhythm(0.9)};
    font-size: 80%;
  }

  ${media.small`
    * {
      font-size: 70%;
    }
  `};

  ${media.extraSmall`
    * {
      font-size: 100%;
    }
  `};
`;

const StyledImageWrapper = styled.div`
  width: ${rhythm(6)};

  img {
    border-radius: 8px;
  }

  ${media.extraSmall`
    width: 100%;
  `};
`;

const StyledStory = styled.div`
  border-bottom: 1px solid ${COLORS.NAV_BORDER};
`;

const Story = ({title, date, image, caption, slug, timeToRead}) => (
  <StyledStory className="animated bounceInRight">
    <StyledLink to={slug}>
      <StyledImageWrapper>
        <img src={image}/>
      </StyledImageWrapper>
      <StyledExcerptArea>
        <StyledTitle>{title}</StyledTitle>
        <StyledDate>{date} - {timeToRead} minute read</StyledDate>
        <p>{caption}</p>
      </StyledExcerptArea>
    </StyledLink>
  </StyledStory>
)

export default ({ data }) => (
  <div>
    {/*<h4>{data.allMarkdownRemark.totalCount} Stories</h4>*/}
    {data.allMarkdownRemark.edges.map(({ node }) => (
      <Story
        key={node.fields.slug}
        title={node.frontmatter.title}
        date={node.frontmatter.date}
        image={images[node.frontmatter.featured_image]}
        caption={node.frontmatter.caption}
        slug={node.fields.slug}
        timeToRead={node.timeToRead}
      />
    ))}
  </div>
);

export const query = graphql`
  query StoriesQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            featured_image
            caption
          }
          fields {
            slug
          }
          timeToRead
        }
      }
    }
  }
`;
