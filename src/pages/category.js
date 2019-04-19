import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout/layout"
import SEO from "../components/seo/seo"
import * as remark from "remark";

const getCategoryName = (markdown, url) => {
  const parsed = remark().parse(markdown);

  const indexOfToCHeading = parsed.children.findIndex(child => child.type === 'heading' && child.children && child.children[0].value === 'Table of Contents');

  let tocEntry = parsed.children[indexOfToCHeading + 1].children
    .find(child => child.children[0].children[0].url.substring(1) === url);

  return tocEntry ? tocEntry.children[0].children[0].children[0].value : '';
}

const CategoryPage = ({ pageContext }) => (
  <StaticQuery
    query={graphql`
      {
        github {
          repository(name:"awesome-podcasts", owner:"rShetty"){
            content:object(expression:"master:README.md") {
              ... on GitHub_Blob {
                text
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Layout>
        <SEO title="Category" keywords={[`gatsby`, `application`, `react`]} />
        <h1>Hi on sub page</h1>
        { getCategoryName(data.github.repository.content.text, pageContext.category) }
      </Layout>
    )}
  />
)

export default CategoryPage
