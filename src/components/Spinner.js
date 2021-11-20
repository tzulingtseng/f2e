import React from 'react';
import ReactLoading from 'react-loading';

function Spinner() {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <ReactLoading
          type={'spokes'}
          color={'#2F798C'}
          height={'4%'}
          width={'4%'}
        />
      </div>
    </>
  );
}

export default Spinner;
