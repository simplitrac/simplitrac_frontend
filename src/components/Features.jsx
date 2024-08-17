// import '../App.css';
import BackButton from "./BackButton.jsx";
import { Card } from 'primereact/card';
// import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';

const FeaturesList = () => {
    const features = [
      // <Card title="Website Features">
      //   <Card><p className="m-0">
      // Our application is a simple to use financial tracker that allows you to record expenses on the go!
      //   </p></Card>
      //   <Card><p className="m-1">
      // Intuitive AI-Driven Camera Support
      // </p></Card>
      // <Card><p className="m-2">
      // Manual Expense Entry
      // </p></Card>
      // <Card><p className="m-3">
      // Cost Tracker via Up-to-date data display and Pie Chart
      // </p></Card>
      // <Card><p className="m-4">
      // Edit/Delete Transaction Fuctionality
      // </p></Card>
      // <Card><p className="m-5">
      // Achievement System to display activity and rewards
      // </p></Card>
      // </Card>
      
      <Stepper ref={Stepper} style={{ flexBasis: '50rem' }}>
      <StepperPanel header="Fin Tracker">
          <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              Our application is a simple to use financial tracker that allows you to record expenses on the go</div>
          </div>
          <div className="flex pt-4 justify-content-end">
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
          </div>
      </StepperPanel>
      <StepperPanel header="Camera">
          <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              Intuitive AI-Driven Camera Support</div>
          </div>
          <div className="flex pt-4 justify-content-between">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
          </div>
      </StepperPanel>
      <StepperPanel header="Expenses">
          <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              Manual Expense Entry
              </div>
          </div>
          <div className="flex pt-4 justify-content-start">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
          </div>
      </StepperPanel>
      <StepperPanel header="Data">
          <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              Cost Tracker via Up-to-date data display and Pie Chart
              </div>
          </div>
          <div className="flex pt-4 justify-content-start">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
          </div>
      </StepperPanel>
      <StepperPanel header="Modify">
          <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              Edit/Delete Transaction Fuctionality
              </div>
          </div>
          <div className="flex pt-4 justify-content-start">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
          </div>
      </StepperPanel>
      <StepperPanel header="Achievements">
          <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
              Achievement System to display activity and rewards
              </div>
          </div>
          <div className="flex pt-4 justify-content-start">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
          </div>
      </StepperPanel>
  </Stepper>
    ];
  
    // Render the features list
    return (
        <div>
          {features
          }
        </div>
    );
  };
  
  
  export default FeaturesList;