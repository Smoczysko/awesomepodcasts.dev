import * as remark from 'remark';

const extractCategories = (markdown) => {
  const parsed = remark().parse(markdown);

  const indexOfToCHeading = parsed.children.findIndex(child => child.type === 'heading' && child.children && child.children[0].value === 'Table of Contents');

  return parsed.children[indexOfToCHeading + 1].children
    .filter(child => child.children[0].type === 'paragraph')
    .map(child => ({
      name: child.children[0].children[0].children[0].value,
      url: child.children[0].children[0].url.substring(1)
    }));
};

module.exports = extractCategories;
