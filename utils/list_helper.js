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
  console.log(result)
  return result
}

module.exports = { dummy , totalLikes, favoriteBlog }