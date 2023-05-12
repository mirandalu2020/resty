import React from 'react';
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

function Results({data}){
  console.log(data)
  return (
    <section className='results' >
      <pre data-testid='test-results'>
      <JsonView src={data && data} />
      </pre>
    </section>
  );
}

export default Results;
