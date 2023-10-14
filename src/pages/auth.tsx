import  { FC, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import FormOptional from "../components/forms/formOptional";
import MainBtn from "../components/button";

const Form: FC = () => {

  const [formType, setFormType] = useState<string>("");
  const location = useLocation();
  
  useEffect(() => {
    setFormType("log in")
  },[location]);
    
  const selectFormHandle = (formTypeValue: string) => {
    setFormType (formTypeValue)
  };

  return (
    <>
      <div className="py-10" style={{backgroundColor: "rgb(242, 242, 242)"}}>
        <div className="container">
          <div className="d-flex jc-center">
            <div className="xs-12 sm-9 lg-6">
              <div className={`option-btn-layout ${formType === 'log in' ? 'left' : formType === 'register' ? 'right' : ''}`}>
                <div className="option-btn-content">
                  <MainBtn text="Log In" bgColor="transparent" color="#00381f" innerSpacing="10px 15px" onClick={() => selectFormHandle("log in")}/>
                </div>
                <div className="option-btn-content">
                  <MainBtn text="Create Account" bgColor="transparent" color="#00381f" innerSpacing="10px 15px" onClick={() => selectFormHandle("register")}/> 
                </div>
              </div>
              <FormOptional formType={formType}/>
            </div>
          </div>
        </div>
      </div>
    </> 
  );
};

export default Form;