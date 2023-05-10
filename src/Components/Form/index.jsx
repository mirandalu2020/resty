import React from 'react';
import { useState } from 'react';

import './Form.scss';

function Form({handleApiCall}){

  const [method, setMethod] = useState('get');
  const [url, setUrl] = useState('');
  const [requestBody, setRequestBody] = useState({})

    const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      method: method,
      url: url,
    };
    console.log(formData);
    handleApiCall(formData);
  }

    const handleRequestInput = (e) => {
      setRequestBody(e.target.value)
      console.log(requestBody)
    }

      return (
      <>
        <form onSubmit={handleSubmit}>
          <label >
            <span>URL: </span>
            <input name='url' type='text' data-testid='test-url' onChange={(e)=> setUrl(e.target.value)}/>
            <button type="submit">GO!</button>
          </label>

          <select className="methods" data-testid='methods' onClick={(e)=> setMethod(e.target.id)}>
            <option id="get">GET</option>
            <option id="post">POST</option>
            <option id="put">PUT</option>
            <option id="delete">DELETE</option>
          </select>

        {(method === "post" || method === "put") &&

        <textarea name="user-input" data-testid='test-input' id="user-input" cols="50" rows="10" onChange={handleRequestInput}> </textarea>
        }

        </form>
      </>
    );
}

export default Form;
