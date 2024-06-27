
import './App.css'
import ExpensesTable from './components/expensestable'
import CameraFunction from "./scripts/CameraFunction.jsx";
import LandingComponent from "./components/LandingComponent.jsx";
import {useEffect, useState} from "react";
import Login from "./components/Login.jsx";
import { useContext } from 'react';
import { AppContext } from './context/AppContext.jsx';


function App() {
    const { screen, setScreen, user, setUser } = useContext(AppContext);
  // const [screen, setScreen] = useState()
  //   const [back, setBack] = useState(false)
  //   const [user, setUser] = useState(null)

    useEffect(() => {
        renderComponent()
    }, [screen, user]);

    const renderComponent = () => {
        switch(screen) {
            case "landing":
                return <LandingComponent setScreen={setScreen} user={user} setUser = {setUser}/>
            case "chart":
                return <ExpensesTable />
            case "camera":
                return <CameraFunction setScreen={setScreen} />
            default:
                return <Login setScreen={setScreen} setUser = {setUser}/>
        }

    }


  return renderComponent()
}

export default App

