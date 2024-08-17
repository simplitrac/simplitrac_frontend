
// import './App.css'
import ExpensesTable from './components/ExpensesTable.jsx'
import Camera from "./components/Camera.jsx";
import LandingComponent from "./components/LandingComponent.jsx";
import {useEffect, useState} from "react";
import Login from "./components/Login.jsx";
import { useContext } from 'react';
import { AppContext } from './context/AppContext.jsx';
import Chart from "./components/Chart.jsx";
import EditTransactionsPage from './components/EditTransactionsPage';
import UserGuide from './components/UserGuide.jsx';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { PrimeReactProvider } from 'primereact/api';


function App() {
    const { screen, setScreen, user } = useContext(AppContext);
  // const [screen, setScreen] = useState()
  //   const [back, setBack] = useState(false)
  //   const [user, setUser] = useState(null)

    // useEffect(() => {
    //     renderComponent()
    // }, [screen, user]);

    const renderComponent = () => {
        switch(screen) {
            case "landing":
                return <LandingComponent />
            case "chart":
                return <Chart />
            case "camera":
                return <Camera />
            case "edit":
                return <EditTransactionsPage />
            case "userguide":
                return <UserGuide />
            default:
                return <Login />
        }

    }

    return renderComponent()
}

export default App

