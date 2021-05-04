var _ = require('lodash');

const dummy = (blogs) => {
  const result = 1
  return result
}

const totalLikes = (blogs) => {
  //Passed an array of blogs
  //Return sum of likes

  const likes = blogs.reduce((sum, current)=> {
    return sum + current.likes
  }, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  //Receives an array of blogs
  /* Response example:
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12
  } */

  const result = blogs.reduce((sum, current, i) => {
    return current.likes < sum.likes ? sum : {title: current.title, author: current.author, likes: current.likes}
  }, {})
  return result
}

//Exercise 4.6 - 4.7 | Helper functions and units tests below

const mostBlogs = (blogs) => {
  //Receives an array of blogs
  /* Response example:
  {
    author: "Robert C. Martin",
    blogs: 3
  } */
  //Compares number of entries per author
  const authorList = _.reduce(blogs, ({sum, most}, x) => {
    sum[x.author] = (sum[x.author] || 0)
    sum[x.author] += 1
    if (sum[x.author] > most.blogs) {
      most = {author: x.author, blogs: sum[x.author]}
    }
    return {sum, most}
  }, {sum: [], most: {blogs:0}})
  const result = authorList.most
  return result
}

const mostLikes = (blogs) => {
  //Receives an array of blogs
  //"If there are many top bloggers, then it is enough to return any one of them."
  /* Response example:
  {
    author: "Edsger W. Dijkstra",
    likes: 17
  } */
  const result = _.reduce(blogs, (acc, x, i) => {
    return x.likes > acc.likes ? {author: x.author,likes: x.likes} : acc
  }, {author: '', likes: 0})
  return result
}

module.exports = { dummy , totalLikes, favoriteBlog, mostBlogs, mostLikes }