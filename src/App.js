import "./App.css";
import { Switch, Route } from 'react-router-dom';
import { useState } from "react";
import Form from './components/Pages/Form';
import Welcome from './components/Pages/Welcome';


function App() {

  const [dataBase, setDataBase] = useState([]);

  return (

    <div className="App">
      <Switch>
        <Route exact path='/' >
          <Form dataBase={dataBase} setDataBase={setDataBase} />
        </Route>
        <Route exact path='/welcome/:email' >
          <Welcome dataBase={dataBase} />
        </Route>
      </Switch>
    </div>

  );
}

export default App;
