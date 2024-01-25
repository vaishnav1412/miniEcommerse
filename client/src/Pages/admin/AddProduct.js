import React from 'react'
import AdminHeader from '../../Components/admin/AdminHeader'
import AddProducts from '../../Components/admin/AddProducts'

const AdminHome = () => {
  return (
    <div className='bg-slate-400  w-screen h-screen '>
        <AdminHeader/>
        <AddProducts />
    </div>
  )
}

export default AdminHome