const CategoryForm = ({ handleSubmit, name, setName }) => (
  <form onSubmit={handleSubmit} className='form-group'>
    <label>Enter new category name</label>
    <input
      type='text'
      className='form-control'
      onChange={e => setName(e.target.value)}
      value={name}
      autoFocus
      required
    />
    <br />
    <button className='btn btn-outline-primary'>Save</button>
  </form>
)

export default CategoryForm
