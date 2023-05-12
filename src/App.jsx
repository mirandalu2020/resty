/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect, useReducer } from 'react';
import './App.scss';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention. 
// Why is this source of truth beneficial when spread across a global organization?
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import History from './Components/History'

function App(){

  // const [data, setData] = useState(null);
  // const [requestParams, setRequestParams] = useState({});

  const initialState = {
    history: [],
    requestParams: {},
    data: null
  }

  const historyReducer = (state, action) => {
    switch(action.type) {
      case 'ADD_HISTORY':
        return {
          ...state,
          history: [...state.history, action.payload]
        }
      case 'ADD_DATA':
        return {
          ...state,
          data: action.payload
        }
        case 'ADD_REQUEST':
          return {
            ...state,
            requestParams: action.payload
          }
        default: return state
    }
  }

  const addHistory = (history) => {
    dispatch({
      type: 'ADD_HISTORY', 
      payload: history
    })
  }

  const [state, dispatch] = useReducer(historyReducer, initialState);


  const callApi = (requestParams) => {
    dispatch({
      type: 'ADD_REQUEST', 
      payload: requestParams
    })
  }

  useEffect(() => {
    console.log('fetching data', state.requestParams);
      const fetchData = async() => await requestData(state.requestParams.url, state.requestParams.method)
      .then((data)=>{
        setData(data);
        // addHistory(data);
        console.log(data);
    }).then(console.log('state ', state))
    if (state.requestParams.url){
      fetchData()}
  }, [state.requestParams])

  useEffect(() => {
    if (state.data){
      let historyItem = {
        url: state.requestParams.url,
        method:state.requestParams.method,
        data: state.data
      }
      console.log('storing history', historyItem);
      addHistory(historyItem)
      console.log(state);
    }
  }, [state.data])

  const setData = (data) => {
    // console.log(data)
    dispatch({
      type: 'ADD_DATA', 
      payload: data
    })
  }

  const requestData = async (url,  method ='GET') =>{
    const response = await fetch(url, {
      method: method,
      cache: 'force-cache',
    })
    let results = await response.json();
    console.log('RESPONSE ', results);
    return results
  }

  return (
    <React.Fragment>
      <Header />
      {state.requestParams &&
      <>
      <div>Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      </>
      }
      <Form handleApiCall={callApi} addHistory={addHistory}/>
      <Results data={state.data} />
      {/* {state.history && <History history={state.history}/>} */}
      {state.history && state.history.map(item => 
      <History history={item} />
      )}
      <Footer />
    </React.Fragment>
  )
}

export default App;
