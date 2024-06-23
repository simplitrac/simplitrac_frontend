
import './App.css'
import ExpensesTable from './components/expensestable'
import CameraFunction from "./scripts/CameraFunction.jsx";
import LandingComponent from "./components/LandingComponent.jsx";
import {useEffect, useState} from "react";

function App() {
  const [screen, setScreen] = useState("landing")
    const [back, setBack] = useState(false)

    useEffect(() => {
        renderComponent()
    }, [screen]);

    const renderComponent = () => {
        switch(screen) {
            case "landing":
                return <LandingComponent setScreen={setScreen}/>
            case "expenses":
                return <ExpensesTable />
            case "camera":
                return <CameraFunction setScreen={setScreen}  back={back} setBack={setBack}/>
            default:
                return <LandingComponent setScreen={setScreen}/>
        }

    }


  return renderComponent()
}

export default App

