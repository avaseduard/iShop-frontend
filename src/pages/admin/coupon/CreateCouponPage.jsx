import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { DeleteOutlined } from '@ant-design/icons'
import {
  createCoupon,
  getCoupons,
  removeCoupon,
} from '../../../functions/coupon'

import 'react-datepicker/dist/react-datepicker.css'

const CreateCouponPage = () => {
  const [name, setName] = useState('')
  const [expiry, setExpiry] = useState(new Date())
  const [discount, setDiscount] = useState('')
  const [loading, setLoading] = useState(false)
  const [coupons, setCoupons] = useState([])
  const { user } = useSelector(state => ({ ...state }))

  useEffect(() => {
    loadAllCoupons()
  }, [])

  const loadAllCoupons = () => {
    getCoupons().then(res => setCoupons(res.data))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    createCoupon({ name, expiry, discount }, user.user.token)
      .then(res => {
        setLoading(false)
        setName('')
        setExpiry('')
        setDiscount('')
        toast.success(`'${res.data.name}' coupon has been created`)
        loadAllCoupons()
      })
      .catch(error => console.log('CREATE COUPON FE FAILED -->', error))
  }

  const handleRemove = couponId => {
    setLoading(true)
    if (window.confirm('Sure to delete coupon?')) {
      removeCoupon(couponId, user.user.token)
        .then(res => {
          setLoading(false)
          toast.error(`'${res.data.name}' coupon has been deleted`)
          loadAllCoupons()
        })
        .catch(error => console.log('REMOVE COUPON FE FAILED -->', error))
    }
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          <br />
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Manage coupons</h4>
          )}
          <hr />

          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label className='text-muted'>Name</label>
              <input
                type='text'
                className='form-control'
                onChange={e => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>

            <div className='form-group'>
              <label className='text-muted'>Discount (%)</label>
              <input
                type='text'
                className='form-control'
                onChange={e => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>

            <div className='form-group'>
              <label className='text-muted'>Expiry date</label>
              <br />
              <DatePicker
                className='form-control'
                selected={expiry}
                onChange={date => setExpiry(date)}
                required
              />
            </div>

            <button className='btn btn-outline-primary'>Save</button>
          </form>
          <br />

          <h4>{coupons.length} coupons</h4>

          <table className='table table-bordered'>
            <thead className='thead-light'>
              <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Expiry</th>
                <th scope='col'>Discount</th>
                <th scope='col'>Remove</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map(coupon => (
                <tr key={coupon._id}>
                  <td>{coupon.name}</td>
                  <td>{new Date(coupon.expiry).toLocaleDateString()}</td>
                  <td>{coupon.discount}</td>
                  <td>
                    <DeleteOutlined
                      onClick={() => handleRemove(coupon._id)}
                      className='text-danger pointer'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CreateCouponPage
