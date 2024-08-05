import React from 'react'

const AddressCard = ({ address }) => {
  console.log("Dia chi nhan: ", address)
  return (
    <div>
      <div className='space-y-3'>
        <div className='space-y-1'>
          <span className='font-semibold'>Customer name: </span>
          <span>{address?.customerName}</span>
        </div>
        <div className='space-y-1'>
          <span className='font-semibold'>Address: </span>
          <span>{address?.customerAddress}</span>
        </div>
        <div className='space-y-1'>
            <span className='font-semibold'>Phone number: </span>
            <span>{address?.customerPhone}</span>
        </div>
        <div className='space-y-1'>
          <span className='font-semibold'>Email: </span>
          <span>{address?.customerEmail}</span>
        </div>
      </div>
    </div>
  )
}

export default AddressCard