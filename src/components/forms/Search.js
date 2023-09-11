import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import { setSearch } from '../../store/reducers/search.reducer'

const Search = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { search } = useSelector(state => ({ ...state }))
  const { text } = search

  const handleChange = e => {
    dispatch(setSearch(e.target.value))
  }

  const handleSubmit = e => {
    e.preventDefault()
    navigate(`/shop?${text}`)
  }

  return (
    <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type='search'
        value={text}
        className='form-control mr-sm-2'
        placeholder='Search'
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} />
    </form>
  )
}

export default Search
