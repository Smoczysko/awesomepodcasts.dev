import React from "react";
import { StaticQuery, graphql } from "gatsby";

import Layout from "../components/layout/layout";
import * as remark from "remark";

import "./index.scss";

const extractCategories = markdown => {
  const parsed = remark().parse(markdown);

  const indexOfToCHeading = parsed.children.findIndex(
    child =>
      child.type === "heading" &&
      child.children &&
      child.children[0].value === "Table of Contents"
  );

  return parsed.children[indexOfToCHeading + 1].children
    .filter(child => child.children[0].type === "paragraph")
    .map(child => ({
      name: child.children[0].children[0].children[0].value,
      url: child.children[0].children[0].url.substring(1)
    }));
};

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      {
        github {
          repository(name: "awesome-podcasts", owner: "rShetty") {
            content: object(expression: "master:README.md") {
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
        <div className="row">
          {extractCategories(data.github.repository.content.text).map(
            (category, index) => (
              <div
                className="col-md-3 category-wrapper"
                key={`category-${index}`}
              >
                <a className="category" href={category.url}>
                  <p>
                    <i className="fas fa-microphone" />
                  </p>
                  <h5>{category.name}</h5>
                </a>
              </div>
            )
          )}
        </div>
      </Layout>
    )}
  />
);

export default IndexPage;
