const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit} className='form-group'>
    <br />
    <input
      type='text'
      className='form-control'
      onChange={e => setName(e.target.value)}
      value={name}
      autoFocus
      required
      placeholder='Enter new category name'
    />
    <br />
    <button className='btn btn-outline-primary'>Save</button>
  </form>
)

export default CategoryForm
