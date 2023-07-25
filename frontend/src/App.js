import { useRoutes } from 'react-router-dom'
import routes from './routes/index'


function App() {
  return (
    <>
      { useRoutes(routes) }
    </>
  );
}

export default App;
