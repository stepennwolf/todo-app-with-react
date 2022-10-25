import './App.css';
import config from './config';
import {TodoAppDataService} from "./components/TodoAppDataService";
import {TodoApp} from "./components/TodoApp";

function App() {
  return (
      <TodoAppDataService apiHost={config.apiHost}>
          {(props) => <TodoApp {...props} />}
      </TodoAppDataService>
  );
}

export default App;
