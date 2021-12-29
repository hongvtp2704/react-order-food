import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Stepper, Step, StepLabel } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& .MuiStepIcon-root.MuiStepIcon-active": {
        color: "var(--color-button-hover)",
      },
      "& .MuiStepIcon-root.MuiStepIcon-completed": {
        color: "var(--color-primary)",
      },
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

enum PaymentStatus {
  PAYMENT = "Payment",
  FINDING_DRIVER = "Finding driver",
  COOKING_FOODS = "Cooking foods",
  DELIVERING = "Delivering",
  DONE = "Done",
}

function getSteps() {
  return [
    PaymentStatus.PAYMENT,
    PaymentStatus.FINDING_DRIVER,
    PaymentStatus.COOKING_FOODS,
    PaymentStatus.DELIVERING,
    PaymentStatus.DONE,
  ];
}

type Props = {
  activeStep: number;
}

export default function CustomizedSteppers({ activeStep }: Props) {
  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
