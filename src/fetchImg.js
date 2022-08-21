export default  fetchImg = async () => {
  console.log(result)
  pageNumber += 1
  const response = await axios.get(`https://pixabay.com/api/?key=${MY_KEY}&q=${result}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`)
  return response.data
}