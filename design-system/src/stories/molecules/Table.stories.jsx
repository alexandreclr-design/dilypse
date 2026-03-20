import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Avatar, Box, Typography, Divider, Stack, Button,
} from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

const rows = [
  { name: 'Alice Martin', role: 'Designer', status: 'active', date: '2026-01-15' },
  { name: 'Bob Nguyen', role: 'Developer', status: 'active', date: '2026-02-01' },
  { name: 'Carol Smith', role: 'PM', status: 'inactive', date: '2025-12-01' },
  { name: 'David Lee', role: 'Developer', status: 'pending', date: '2026-03-10' },
];

const statusColor = { active: 'success', inactive: 'default', pending: 'warning' };

export default {
  title: 'Molecules/Table',
  component: Table,
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] },
  },
  args: { size: 'medium' },
};

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <>
      <DocPage
        title="Table"
        description="Données structurées en lignes et colonnes. Composant de référence pour les données tabulaires multi-attributs. Supporte tri, sélection, pagination."
        dos={[
          'Nombres à droite, texte à gauche.',
          'Labels courts dans TableHead.',
          'hover sur TableRow pour indiquer la cliquabilité.',
          'size="small" pour les tables denses.',
        ]}
        donts={[
          'Pas trop de colonnes sans scroll horizontal.',
          'Pas plus de 25 lignes sans pagination.',
        ]}
        a11y={[
          'aria-label sur la Table pour décrire le contenu.',
          'scope="col" automatique sur les en-têtes.',
          'aria-selected sur les lignes sélectionnables.',
        ]}
        related={['List', 'Card', 'Pagination']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>

        <S label="Standard">
          <TableContainer component={Paper} variant="outlined" sx={{ maxWidth: 640 }}>
            <Table aria-label="Team members">
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Joined</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', fontSize: 12 }}>{row.name[0]}</Avatar>
                        <Typography variant="body2">{row.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell><Chip label={row.status} color={statusColor[row.status]} size="small" /></TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </S>

        <S label="With actions">
          <TableContainer component={Paper} variant="outlined" sx={{ maxWidth: 700 }}>
            <Table size="small" aria-label="Team with actions">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name} hover>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', fontSize: 12 }}>{row.name[0]}</Avatar>
                        <Typography variant="body2">{row.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell><Chip label={row.status} color={statusColor[row.status]} size="small" /></TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button size="small" variant="outlined">Edit</Button>
                        <Button size="small" variant="text" color="error">Delete</Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </S>

        <S label="Striped rows">
          <TableContainer component={Paper} variant="outlined" sx={{ maxWidth: 640 }}>
            <Table size="small" aria-label="Striped table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, i) => (
                  <TableRow key={row.name} sx={{ bgcolor: i % 2 === 0 ? 'transparent' : '#FAFAFA' }}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </S>

      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => (
    <TableContainer component={Paper} variant="outlined" sx={{ maxWidth: 640 }}>
      <Table {...args} aria-label="Team members">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Joined</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} hover>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar sx={{ width: 28, height: 28, bgcolor: 'primary.main', fontSize: 12 }}>{row.name[0]}</Avatar>
                  {row.name}
                </Stack>
              </TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell><Chip label={row.status} color={statusColor[row.status]} size="small" /></TableCell>
              <TableCell>{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ),
};
