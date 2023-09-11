import { useSelector } from 'react-redux'
import { StarOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const RatingModal = ({ children }) => {
  const { user } = useSelector(state => ({ ...state }))
  const navigate = useNavigate()
  const { slug } = useParams()
  const [modalVisible, setModalVisible] = useState(false)

  const handleModal = () => {
    if (user?.user?.token) {
      setModalVisible(true)
    } else {
      navigate('/login', { state: { from: `/product/${slug}` } })
    }
  }

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className='text-danger' /> <br />{' '}
        {user?.user?.token ? 'Leave rating' : 'Login to leave rating'}
      </div>
      <Modal
        title='Leave your rating'
        open={modalVisible}
        centered
        onOk={() => {
          setModalVisible(false)
          toast.success('Thank you for the review. It will appear shortly.')
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  )
}

export default RatingModal
