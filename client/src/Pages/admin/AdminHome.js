import React from 'react'
import Adminhome from '../../Components/admin/AddProducts'
import AdminHeader from '../../Components/admin/AdminHeader'
import ProductList from '../../Components/admin/ProductList'

const AdminHome = () => {
  return (
    <div className='bg-slate-400  w-screen h-screen'>
        <AdminHeader/>
        <ProductList />
    </div>
  )
}

export default AdminHome