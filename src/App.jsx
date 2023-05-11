import React from 'react';
import { useState, useEffect } from 'react';
import './App.scss';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

function App(){

  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});

  const callApi = async (requestParams) => {
    setRequestParams( requestParams );
  }

  useEffect(() => {
    console.log('fetching data', requestParams);
      const fetchData = async() => await requestData(requestParams.url, requestParams.method)
      .then((data)=>{
        console.log(data);
        setData(data);
    })
    if (requestParams.url){
      fetchData();
    }

  }, [requestParams])

  const requestData = async (url,  method ='GET') =>{
    const response = await fetch(url, {
      method: method,
      cache: 'force-cache',
    })
    let results = await response.json();
    console.log(response)
    return results
  }

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={data} />
      <Footer />
    </React.Fragment>
  )
}

export default App;
