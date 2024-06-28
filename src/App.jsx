
import './App.css'
import ExpensesTable from './components/expensestable'
import CameraFunction from "./scripts/CameraFunction.jsx";
import LandingComponent from "./components/LandingComponent.jsx";
import {useEffect, useState} from "react";
import Login from "./components/Login.jsx";
import { useContext } from 'react';
import { AppContext } from './context/AppContext.jsx';


function App() {
    const { screen, setScreen, user } = useContext(AppContext);
  // const [screen, setScreen] = useState()
  //   const [back, setBack] = useState(false)
  //   const [user, setUser] = useState(null)

    useEffect(() => {
        renderComponent()
    }, [screen, user]);

    const renderComponent = () => {
        switch(screen) {
            case "landing":
                return <LandingComponent />
            case "chart":
                return <ExpensesTable />
            case "camera":
                return <CameraFunction />
            default:
                return <Login />
        }

    }


  return renderComponent()
}

export default App

