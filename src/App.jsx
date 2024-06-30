
import './App.css'
import ExpensesTable from './components/expensestable'
import Camera from "./components/Camera.jsx";
import LandingComponent from "./components/LandingComponent.jsx";
import {useEffect, useState} from "react";
import Login from "./components/Login.jsx";
import { useContext } from 'react';
import { AppContext } from './context/AppContext.jsx';
import Chart from "./components/Chart.jsx";


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
                return <Chart />
            case "camera":
                return <Camera />
            default:
                return <Login />
        }

    }


  return renderComponent()
}

export default App

