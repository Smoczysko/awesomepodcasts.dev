const remark = require("remark")
const path = require(`path`)

const extractCategories = (markdown) => {
  const parsed = remark().parse(markdown);

  const indexOfToCHeading = parsed.children.findIndex(child => child.type === 'heading' && child.children && child.children[0].value === 'Table of Contents');

  return parsed.children[indexOfToCHeading + 1].children
    .filter(child => child.children[0].type === 'paragraph')
    .map(child => ({
      name: child.children[0].children[0].children[0].value,
      url: child.children[0].children[0].url.substring(1)
    }));
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
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
  `)
    .then(result => {
      extractCategories(result.data.github.repository.content.text)
        .forEach(content => {
          createPage({
            path: content.url,
            component: path.resolve(`./src/pages/category.js`),
            context: {
              category: content.url
            }
          })
        });
    })
}
