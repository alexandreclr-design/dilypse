import React from 'react';
import {
  Card, CardContent, CardActions, CardHeader, CardActionArea,
  Button, Typography, Avatar, IconButton, Stack, Box, Chip, Divider,
} from '@mui/material';
import { DocPage } from '../utils/DocPage.jsx';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BarChartIcon from '@mui/icons-material/BarChart';

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>{label}</Typography>
    {children}
  </Box>
);

export default {
  title: 'Molecules/Card',
  component: Card,
  argTypes: {
    variant:   { control: 'select', options: ['elevation', 'outlined'] },
    elevation: { control: { type: 'range', min: 0, max: 8, step: 1 }, if: { arg: 'variant', eq: 'elevation' } },
  },
  args: {
    variant: 'outlined',
    elevation: 1,
  },
};

function StatCard({ icon: Icon, iconColor, label, value, trend, trendLabel }) {
  const isPositive = trend >= 0;
  return (
    <Card variant="outlined" sx={{ width: 220, transition: 'transform 150ms ease', '&:hover': { transform: 'translateY(-2px)' } }}>
      <CardContent sx={{ pb: '16px !important' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>{label}</Typography>
            <Typography variant="h5" fontWeight={700}>{value}</Typography>
          </Box>
          <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: `${iconColor}.light`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon sx={{ color: `${iconColor}.main`, fontSize: 20 }} />
          </Box>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1.5 }}>
          {isPositive
            ? <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
            : <TrendingDownIcon sx={{ fontSize: 16, color: 'error.main' }} />}
          <Typography variant="caption" color={isPositive ? 'success.main' : 'error.main'} fontWeight={600}>
            {isPositive ? '+' : ''}{trend}%
          </Typography>
          <Typography variant="caption" color="text.disabled">{trendLabel}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export const Overview = {
  name: 'Overview',
  parameters: { controls: { disable: true }, options: { showPanel: false } },
  render: () => (
    <>
      <DocPage
        title="Card"
        description="La Card est un conteneur de surface qui regroupe des informations liées à une entité unique. Elle ne fait pas tout — elle amorce : elle résume, donne du contexte et offre une action. Préférer le variant outlined dans Dilypse pour un look cohérent avec les tokens de border."
        dos={[
          'Utiliser variant="outlined" en priorité — cohérent avec les tokens de border Dilypse.',
          'Limiter les actions à 1-2 maximum, clairement hiérarchisées.',
          'Utiliser CardActionArea pour les cartes entièrement cliquables.',
          'Maintenir une largeur fixe dans les grilles — éviter les hauteurs inégales.',
        ]}
        donts={[
          'Ne pas utiliser une Card comme simple container de layout.',
          'Ne pas mettre de Card scrollable sans indicateur clair.',
          'Ne pas mélanger des cartes clickable et non-clickable dans la même liste.',
        ]}
        a11y={[
          'CardActionArea génère un <button> natif — accessible sans effort supplémentaire.',
          'Fournir un aria-label descriptif sur CardActionArea : "Voir le projet Dilypse".',
          'Les actions de Card (IconButton, Button) doivent avoir un aria-label explicite.',
          'Les images dans CardMedia doivent avoir un alt descriptif.',
        ]}
        related={['List', 'Dialog', 'EmptyState']}
      />
      <Divider sx={{ my: 4 }} />
      <Box sx={{ px: 3, pb: 4 }}>
        <S label="Stat cards">
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <StatCard icon={AttachMoneyIcon} iconColor="success" label="Total Revenue" value="$48,295" trend={12.5} trendLabel="vs last month" />
            <StatCard icon={PeopleIcon}      iconColor="primary" label="Active Users"  value="3,842"   trend={4.1}  trendLabel="vs last week" />
            <StatCard icon={BarChartIcon}    iconColor="warning" label="Bounce Rate"   value="34.2%"   trend={-2.8} trendLabel="vs last week" />
          </Stack>
        </S>
        <S label="Horizontal list">
          <Stack spacing={2} sx={{ width: 480 }}>
            {[
              { name: 'Alice Leblanc', role: 'Product Designer', status: 'Active',   statusColor: 'success', initials: 'AL', color: 'primary.main' },
              { name: 'Marc Roux',     role: 'Frontend Engineer', status: 'Away',    statusColor: 'warning', initials: 'MR', color: 'error.main' },
              { name: 'Sophie Chen',   role: 'Data Scientist',    status: 'Offline', statusColor: 'default', initials: 'SC', color: 'success.main' },
            ].map(({ name, role, status, statusColor, initials, color }) => (
              <Card key={name} variant="outlined">
                <CardContent sx={{ py: 1.5, pb: '12px !important' }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar sx={{ bgcolor: color }}>{initials}</Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600}>{name}</Typography>
                      <Typography variant="caption" color="text.secondary">{role}</Typography>
                    </Box>
                    <Chip label={status} size="small" color={statusColor} variant="outlined" />
                    <IconButton size="small" aria-label="options"><MoreVertIcon fontSize="small" /></IconButton>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </S>
        <S label="Clickable cards">
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {[
              { title: 'Q1 Report',     desc: 'Revenue analysis for January–March 2026.',   tag: 'Finance'  },
              { title: 'Design System', desc: 'Dilypse component library and usage guide.', tag: 'Design'   },
              { title: 'User Research', desc: 'Interviews and insights from 24 sessions.',  tag: 'Research' },
            ].map(({ title, desc, tag }) => (
              <Card key={title} variant="outlined" sx={{ width: 220, cursor: 'pointer' }}>
                <CardActionArea aria-label={`Open ${title}`}>
                  <CardContent>
                    <Chip label={tag} size="small" sx={{ mb: 1.5 }} />
                    <Typography variant="body2" fontWeight={600} gutterBottom>{title}</Typography>
                    <Typography variant="caption" color="text.secondary">{desc}</Typography>
                  </CardContent>
                  <CardActions sx={{ pt: 0 }}>
                    <Button size="small" endIcon={<ArrowForwardIcon />} sx={{ ml: 'auto' }}>Open</Button>
                  </CardActions>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        </S>
      </Box>
    </>
  ),
};

export const Playground = {
  render: (args) => (
    <Card {...args} sx={{ width: 340 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>D</Avatar>}
        action={<IconButton aria-label="options"><MoreVertIcon /></IconButton>}
        title="Dilypse Component"
        subheader="March 17, 2026"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          A sample card combining CardHeader, CardContent, and CardActions.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">Action</Button>
        <Button size="small" variant="outlined">Learn More</Button>
      </CardActions>
    </Card>
  ),
};
