import logo from './logo.svg';
import './App.css';
import { Calculator } from './components/Calculator';
import '../node_modules/semantic-ui-button/button.css';
import '../node_modules/semantic-ui-grid/grid.css';

function App() {
  return (
    <div className="App">
      <h2>calculator</h2>
    
      <Calculator />
      
    </div>
  );
}

export default App;
