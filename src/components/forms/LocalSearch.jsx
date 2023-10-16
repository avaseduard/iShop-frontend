const LocalSearch = ({ keyword, setKeyword }) => {
  // Set the search query to state
  const handleSearchChange = e => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }

  return (
    <input
      type='search'
      value={keyword}
      onChange={handleSearchChange}
      placeholder='Filter values'
      className='form-control mb-4'
    />
  )
}

export default LocalSearch
