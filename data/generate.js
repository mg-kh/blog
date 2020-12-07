module.exports = () => {
  const faker = require("faker");
  const _ = require("lodash");
  return {
    posts: _.times(100, (n) => {
      return {
        id: n,
        title: faker.lorem.words(),
        article: faker.lorem.paragraph(),
      };
    }),
  };
};

/*
 ? posts : [
 ?   {
 ?        id,
 ?        title,
 ?        article,
 ?   }
 ? ]
 */
