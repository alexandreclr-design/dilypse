import React, { useState } from 'react';
import {
  Select, MenuItem, FormControl, InputLabel, FormHelperText,
  Chip, Stack, Box, Typography, Divider, TextField,
  ListSubheader, Autocomplete,
} from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

const departments = ['Product Design', 'Engineering', 'Marketing', 'Sales', 'Operations'];

const countries = [
  { group: 'Europe', items: ['France', 'Germany', 'Spain', 'Italy'] },
  { group: 'North America', items: ['United States', 'Canada'] },
  { group: 'Asia', items: ['Japan', 'Singapore'] },
];
const allCountries = countries.flatMap(({ items }) => items);
const tags = ['React', 'TypeScript', 'Node.js', 'Python', 'Go', 'Rust'];

const BasicSelect = ({ size = 'medium', disabled = false, error = false, label = 'Department', helperText }) => {
  const [value, setValue] = useState('');
  return (
    <FormControl variant="outlined" size={size} sx={{ minWidth: 220 }} error={error} disabled={disabled}>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        value={value}
        label={label}
        onChange={(e) => setValue(e.target.value)}
        MenuProps={{
          PaperProps: { sx: { maxHeight: 240 } },
        }}
      >
        {departments.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default {
  title: 'Atoms/Select',
  component: Select,
  argTypes: {
    size:     { control: 'select', options: ['small', 'medium'] },
    disabled: { control: 'boolean' },
    error:    { control: 'boolean' },
  },
  args: { size: 'medium', disabled: false, error: false },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => {
    const [multi, setMulti] = useState([]);
    const [grouped, setGrouped] = useState('');

    return (
      <>
        <DocPage
          title="Select"
          description="Liste déroulante d'options prédéfinies. Préféré aux RadioButtons dès 5+ options. Pour les listes longues (20+), utiliser Autocomplete."
          dos={[
            'Toujours un label clair lié via FormControl.',
            'Trier les options logiquement.',
            'Grouper les longues listes avec ListSubheader.',
          ]}
          donts={[
            'Pas plus de 50 options sans recherche (→ Autocomplete).',
            'Ne pas utiliser un placeholder comme seule indication.',
          ]}
          a11y={[
            'InputLabel lié au Select via labelId.',
            'Clavier : Tab → focus, Espace/Enter → ouvrir, Flèches → naviguer.',
            'aria-describedby automatique via FormControl + FormHelperText.',
          ]}
          related={['TextField', 'Radio', 'Checkbox']}
        />
        <Divider sx={{ my: 4 }} />
        <Box sx={{ px: 3, pb: 4 }}>

          <S label="Basic">
            <Stack direction="row" spacing={3} alignItems="flex-start" flexWrap="wrap">
              <BasicSelect label="Default" />
              <BasicSelect label="Error" error helperText="Required field" />
              <BasicSelect label="Disabled" disabled />
            </Stack>
          </S>

          <S label="Grouped options">
            <FormControl variant="outlined" size="medium" sx={{ minWidth: 260 }}>
              <InputLabel id="country-label">Country</InputLabel>
              <Select
                labelId="country-label"
                value={grouped}
                label="Country"
                onChange={(e) => setGrouped(e.target.value)}
                MenuProps={{ PaperProps: { sx: { maxHeight: 240 } } }}
              >
                {countries.map(({ group, items }) => [
                  <ListSubheader key={group}>{group}</ListSubheader>,
                  ...items.map((item) => (
                    <MenuItem key={item} value={item}>{item}</MenuItem>
                  )),
                ])}
              </Select>
            </FormControl>
          </S>

          <S label="Multi-select with chips">
            <FormControl variant="outlined" size="medium" sx={{ minWidth: 320 }}>
              <InputLabel id="skills-label">Skills</InputLabel>
              <Select
                labelId="skills-label"
                multiple
                value={multi}
                label="Skills"
                onChange={(e) => setMulti(e.target.value)}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((val) => <Chip key={val} label={val} size="medium" />)}
                  </Box>
                )}
              >
                {tags.map((tag) => <MenuItem key={tag} value={tag}>{tag}</MenuItem>)}
              </Select>
            </FormControl>
          </S>

          <S label="Autocomplete — searchable">
            <Autocomplete
              size="medium"
              options={allCountries}
              sx={{ width: 280 }}
              renderInput={(params) => <TextField {...params} label="Country" />}
            />
          </S>

          <S label="Autocomplete — multiple">
            <Autocomplete
              multiple
              size="medium"
              options={tags}
              defaultValue={['React']}
              sx={{ width: 360 }}
              renderInput={(params) => <TextField {...params} label="Tech stack" placeholder="Add…" />}
            />
          </S>

        </Box>
      </>
    );
  },
};

export const Playground = {
  render: (args) => <BasicSelect {...args} />,
};
