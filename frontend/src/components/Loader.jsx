import React from "react";
import { Spinner } from "reactstrap";

function Loader() {
  return (
    <div className='d-flex container-xl align-items-center h-100 justify-content-center'>
      <Spinner className='m-5' color='primary'>
        Loading...
      </Spinner>
    </div>
  );
}

export default Loader;
