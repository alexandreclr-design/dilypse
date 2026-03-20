import React, { useState } from 'react';
import {
  Stepper, Step, StepLabel, StepContent,
  Button, Typography, Box, Paper, Stack, Divider,
} from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

const steps = [
  { label: 'Account details', description: 'Enter your email address and choose a secure password for your account.' },
  { label: 'Personal info', description: 'Tell us a bit about yourself — your name and role help us personalize your experience.' },
  { label: 'Confirmation', description: 'Review your information and confirm to complete your account setup.' },
];

export default {
  title: 'Molecules/Stepper',
  component: Stepper,
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    alternativeLabel: { control: 'boolean' },
  },
  args: {
    orientation: 'horizontal',
    alternativeLabel: false,
  },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => {
    const [hStep, setHStep] = useState(1);
    const [vStep, setVStep] = useState(0);
    return (
      <>
        <DocPage
          title="Stepper"
          description="Le Stepper guide l'utilisateur à travers un processus séquentiel en plusieurs étapes clairement définies. Il indique la progression, l'étape courante et les étapes complétées. Indispensable pour les onboardings, formulaires multi-étapes et workflows complexes où l'ordre des actions est imposé."
          dos={[
            'Afficher toutes les étapes dès le début pour que l\'utilisateur sache où il va.',
            'Permettre de revenir aux étapes précédentes (bouton "Retour").',
            'Valider chaque étape avant de passer à la suivante.',
            'Utiliser orientation="vertical" pour des étapes avec beaucoup de contenu.',
          ]}
          donts={[
            'Ne pas bloquer la navigation retour — frustrant et anti-UX.',
            'Ne pas avoir plus de 6-7 étapes — décomposer ou regrouper.',
            'Ne pas perdre les données de l\'utilisateur lors d\'un retour en arrière.',
          ]}
          a11y={[
            'Chaque étape a aria-label décrivant son contenu.',
            'L\'étape active porte aria-current="step".',
            'Les étapes complétées ont une indication textuelle accessible (pas seulement visuelle).',
            'Navigation clavier entre les boutons Précédent/Suivant via Tab.',
          ]}
          related={['Tabs', 'Accordion', 'Collapse']}
        />
        <Divider sx={{ my: 4 }} />
        <Box sx={{ px: 3, pb: 4 }}>
          <S label="Horizontal">
            <Box sx={{ width: 560 }}>
              <Stepper activeStep={hStep}>
                {steps.map(({ label }) => (
                  <Step key={label}><StepLabel>{label}</StepLabel></Step>
                ))}
              </Stepper>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Button disabled={hStep === 0} onClick={() => setHStep((s) => s - 1)}>Back</Button>
                <Button variant="contained" onClick={() => setHStep((s) => Math.min(s + 1, steps.length))}>
                  {hStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Stack>
            </Box>
          </S>
          <S label="With error">
            <Box sx={{ width: 560 }}>
              <Stepper activeStep={1}>
                <Step completed><StepLabel>Account details</StepLabel></Step>
                <Step><StepLabel error>Personal info</StepLabel></Step>
                <Step><StepLabel>Confirmation</StepLabel></Step>
              </Stepper>
            </Box>
          </S>

          <S label="Vertical">
            <Box sx={{ maxWidth: 400 }}>
              <Stepper activeStep={vStep} orientation="vertical">
                {steps.map(({ label, description }, i) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <Typography variant="body2" color="text.secondary">{description}</Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        <Button variant="contained" size="small" onClick={() => setVStep((s) => s + 1)}>
                          {i === steps.length - 1 ? 'Finish' : 'Continue'}
                        </Button>
                        <Button size="small" disabled={i === 0} onClick={() => setVStep((s) => s - 1)}>Back</Button>
                      </Stack>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {vStep === steps.length && (
                <Paper elevation={0} sx={{ p: 2, mt: 1, bgcolor: 'success.light', borderRadius: 2 }}>
                  <Typography variant="body2">All steps completed!</Typography>
                  <Button size="small" onClick={() => setVStep(0)} sx={{ mt: 1 }}>Reset</Button>
                </Paper>
              )}
            </Box>
          </S>
        </Box>
      </>
    );
  },
};

export const Playground = {
  render: (args) => {
    const [active, setActive] = useState(0);
    return (
      <Box sx={{ width: 560 }}>
        <Stepper activeStep={active} {...args}>
          {steps.map(({ label }) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button disabled={active === 0} onClick={() => setActive((s) => s - 1)}>Back</Button>
          <Button variant="contained" onClick={() => setActive((s) => Math.min(s + 1, steps.length))}>
            {active === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Stack>
      </Box>
    );
  },
};
