import { FC, useState } from "react";
import { Card, Box } from "@material-ui/core";

import CustomizedSteppers from "./CustomizedStepper";
import { PaymentStatusIndex } from "models/types";

import { BoxOrderItem } from "components";

const BoxOrderStatus: FC = () => {

  const [activeStep, setActiveStep] = useState(PaymentStatusIndex.PAYMENT);

  const handleNextStep = (activeStep: PaymentStatusIndex) => {
    setActiveStep(activeStep);
  }


  return (
    <>
      <Card>
        <Box>
          <CustomizedSteppers activeStep={activeStep} />
        </Box>
      </Card>
      <BoxOrderItem onPaymentSuccess={handleNextStep} />
    </>
  );
};

export default BoxOrderStatus;
