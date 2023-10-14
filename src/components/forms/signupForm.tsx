import { FC, useState } from 'react';
import { Container } from '@mui/material';
import { StyledTextField, StyledInputLabel, CustomFormControl, StyledTypography } from '../material_Ui';
import Checkbox from '@mui/material/Checkbox';
import Button from '../button';

const RegisterForm: FC = () => {

  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Container>
      <div className="d-flex ai-center f-wrap jc-between mb-8" style={{gap: "10px"}}> 
        <StyledTypography variant="h3" color="rgba(0, 0, 0, 0.88)" fontSize="20px" fontWeight="600" style={{paddingRight: "15px"}}>
          Enter yout registration details
        </StyledTypography>
        <StyledTypography className="required-col" color="rgba(0, 0, 0, 0.88)" variant="body1" fontSize="14px" fontWeight="500">
          Required fields
        </StyledTypography>
      </div>
      <form>
        <div style={{marginBottom: "24px"}}>
          <StyledInputLabel className="required-col" htmlFor="full-name-input">Full name</StyledInputLabel>
          <CustomFormControl>
            <StyledTextField fullWidth variant="outlined" placeholder="full name" id="full-name-input" />
          </CustomFormControl>
        </div>
        <div style={{marginBottom: "24px"}}>
          <StyledInputLabel className="required-col" htmlFor="email-input">Email address</StyledInputLabel>
          <CustomFormControl>
            <StyledTextField fullWidth type="email" variant="outlined" placeholder="Email address" id="email-input" />
          </CustomFormControl>
        </div>
        <div style={{marginBottom: "24px"}}>
        <StyledInputLabel className="required-col" htmlFor="password-input">Password</StyledInputLabel>
          <CustomFormControl>
            <StyledTextField fullWidth type="password" id="password-input" variant="outlined" placeholder="Password" />
          </CustomFormControl>
        </div>
        <div style={{marginBottom: "24px"}}>
          <StyledInputLabel className="required-col" htmlFor="confirm-password-input">Confirm Password</StyledInputLabel>
          <CustomFormControl>
            <StyledTextField fullWidth type="password" variant="outlined" placeholder="Password Confirm" id="confirm-password-input" />
          </CustomFormControl>
        </div>
        <div className="form-col">
          <StyledTypography variant="body1" fontSize="15px" fontWeight="500" color= "rgba(0, 0, 0, 0.88)" className="mb-5">
            We would like to send you marketing information about our products and services
            using email, text, telephone or post. We may also use your information to deliver personalised
            messages or advertising on social media or other digital platforms. You can ask us to stop marketing at any time. For further information about how we use your personal information, please see our Privacy Policy. If you wish to opt-out of receiving marketing information, please click here.
          </StyledTypography>
          <StyledInputLabel className="checkbox-content">
            <Checkbox
              checked={checked}
              onChange={handleCheckboxChange}
              disableRipple
            />
            <StyledTypography className="checkbox-text" variant="body1" fontSize="15px" fontWeight="500" color= "rgba(0, 0, 0, 0.88)">
              I do not wish to receive marketing information about your products and services.
            </StyledTypography>
          </StyledInputLabel>
          <div className="btn-content">
            <Button text="CREATE ACCOUNT" bgColor="#00381f" color="#fff" innerSpacing="10px 15px"/>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default RegisterForm;