import React from 'react';
import { useState } from 'react';

import './Form.scss';

function Form({ handleApiCall, addHistory}) {

  const [method, setMethod] = useState('GET');
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
    // console.log(result);
  }

  const handleRequestInput = (e) => {
    setRequestBody(e.target.value);
    console.log(requestBody);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label >
          <span>URL: </span>
          <input name='url' type='text' data-testid='test-url' onChange={(e) => setUrl(e.target.value)} />
          <button type="submit">GO!</button>
        </label>

        <select className="methods" data-testid='methods' onChange={(e) => setMethod(e.target.value)}>
          <option id="get">GET</option>
          <option id="post">POST</option>
          <option id="put">PUT</option>
          <option id="delete">DELETE</option>
        </select>

        {(method === "POST" || method === "PUT") &&

          <textarea name="user-input" data-testid='test-input' id="user-input" cols="50" rows="10" onChange={handleRequestInput}> </textarea>
        }
      </form>
    </>
  );
}

export default Form;
