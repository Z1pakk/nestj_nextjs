import React, { PropsWithChildren } from 'react';
import { Card, Container, Grid, Step, StepLabel, Stepper } from "@mui/material";

interface StepWrapperProps {
    activeStep: number
}

const steps = ['Info', 'Load a picture', 'Load an audio']
const StepWrapper: React.FC<PropsWithChildren<StepWrapperProps>> = ({activeStep, children}) => {
    return (
        <Container>
            <Stepper
                activeStep={activeStep}
            >
                {steps.map((step, index) =>
                    <Step
                        key={index}
                        completed={activeStep > index}
                    >
                        <StepLabel>{step}</StepLabel>
                    </Step>
                )}
            </Stepper>
            <Grid container justifyContent="center" style={{margin: '70px 0', height: 270}}>
                <Card style={{width: 600}}>
                    {children}
                </Card>
            </Grid>
        </Container>
    );
};

export default StepWrapper;
