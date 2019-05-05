import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import { Page, Content, Sections, ContentTube } from "../components/common"
import Navbar from "../components/navbar"
import Meta from "../components/meta"
import Footer from "../components/footer"

const BlogTemplate = ({
  pageContext: { currentPage, numPages },
  data: {
    allPrismicPost: { edges },
  },
}) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages

  const prevPage =
    currentPage - 1 === 1 ? "/blog" : (currentPage - 1).toString()
  const nextPage = (currentPage + 1).toString()

  return (
    <Page>
      <Meta title="Blog" author="Me" description="desc" />

      <Navbar active="blog" />

      <Sections>
        <header className="section">
          <ContentTube>
            <h1 className="is-size-3">Latest News</h1>
          </ContentTube>
        </header>

        {edges.map((post, index) => (
          <article className="section" key={index}>
            <ContentTube>
              <h2 className="is-size-4">{post.node.data.post_title.text}</h2>
              <Content html={post.node.data.intro.html} />
              <Link to={`/posts/${post.node.uid}`}>Read&hellip;</Link>
            </ContentTube>
          </article>
        ))}
      </Sections>

      {!isFirst && !isLast && (
        <NextPrev>
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              ← Previous Page
            </Link>
          )}

          {!isLast && (
            <Link to={nextPage} rel="next">
              Next Page →
            </Link>
          )}
        </NextPrev>
      )}

      <Footer />
    </Page>
  )
}

const NextPrev = styled.div`
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  background-color: #3e1b93;
  margin: 3.5rem 0;

  a {
    margin: 0 1rem;
    color: #fff;

    &:hover {
      color: #ddd;
    }
  }
`

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allPrismicPost(
      sort: { fields: [first_publication_date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          uid
          data {
            post_title {
              text
            }
            intro {
              html
            }
          }
        }
      }
    }
  }
`

export default BlogTemplate