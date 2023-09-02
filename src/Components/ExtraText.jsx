import React from 'react'
import { Container } from 'reactstrap'

function ExtraText() {
  return (
    <Container className='d-flex justify-content-center'>
      <div className="d-flex flex-column ">
        <div>
          <h2 className='opacity-75'>Find us at office</h2>
          <p className='m-0 p-0 text-secondary ms-2'>New York Street</p>
          <p className='m-0 p-0 text-secondary ms-2'>New York</p>
          <p className='m-0 p-0 text-secondary ms-2'>United States of America</p>
        </div>
        <div>
          <h2 className='opacity-75'>Give us a ring</h2>
          <p className='m-0 p-0 text-secondary ms-2'>Micheal Jordan</p>
          <p className='m-0 p-0 text-secondary ms-2'>123467889</p>
          <p className='m-0 p-0 text-secondary ms-2'>Mon-Fri, 8:00-22:00</p>
        </div>
        <div>
          <h2 className='opacity-75'>Legal Information</h2>
          <p className='m-0 p-0 text-secondary ms-2'>XYZ</p>
          <p className='m-0 p-0 text-secondary ms-2'>VAT -E123KHBA</p>
          <p className='m-0 p-0 text-secondary ms-2'>IBAN -YIKJODIE123KHBA</p>
          <p className='m-0 p-0 text-secondary ms-2'>BANK Great Britain Bank</p>
        </div>
      </div>
    </Container>
  )
}
export default ExtraText;