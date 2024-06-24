
import './App.css'
import ExpensesTable from './components/expensestable'
import CameraFunction from "./scripts/CameraFunction.jsx";
import LandingComponent from "./components/LandingComponent.jsx";
import {useEffect, useState} from "react";
import Login from "./components/Login.jsx";

function App() {
  const [screen, setScreen] = useState()
    const [back, setBack] = useState(false)

    useEffect(() => {
        renderComponent()
    }, [screen]);

    const renderComponent = () => {
        switch(screen) {
            case "landing":
                return <LandingComponent setScreen={setScreen}/>
            case "chart":
                return <ExpensesTable />
            case "camera":
                return <CameraFunction setScreen={setScreen}  back={back} setBack={setBack}/>
            default:
                return <Login setScreen={setScreen}/>
        }

    }


  return renderComponent()
}

export default App

