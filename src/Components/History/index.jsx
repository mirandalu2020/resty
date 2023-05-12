import './history.css'
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'


function History({ history }) {

  return (
      <>
        <div> {history.method}   {history.url}
        <JsonView src={history.data && history.data} />
        </div>
      </>

  )
}

export default History;