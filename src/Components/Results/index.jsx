import React from 'react';
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

function Results({data}){
  console.log(data)
  return (
    <section className='results' >
      <pre data-testid='test-results'>
        Count: {data ? JSON.stringify(data.count, undefined, 2) : null} <br></br>
        Pagination: {
        data ? JSON.stringify(data.results.length, undefined, 2) : null}
        <br></br>
      </pre>
      <pre>
        Results: 
       <JsonView src={data ? data.results : null} />
      </pre>
    </section>
  );
}

export default Results;
