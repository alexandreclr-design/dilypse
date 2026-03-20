import { useState } from 'react';
import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon } from '@hugeicons/core-free-icons';
import * as allIcons from '../../icons/iconMap';

const icons = Object.entries(allIcons).map(([exportName, icon]) => ({
  name: exportName.replace(/Icon$/, '').replace(/([a-z])([A-Z0-9])/g, '$1-$2').toLowerCase(),
  exportName,
  icon,
}));

function IconCell({ name, exportName, icon }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(exportName);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        p: 2,
        border: '1px solid',
        borderColor: copied ? '#1570EF' : '#EEEEEE',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 150ms',
        bgcolor: copied ? '#F5FAFF' : 'transparent',
        '&:hover': { borderColor: '#D1D1D1', bgcolor: '#FAFAFA' },
        minHeight: 88,
      }}
    >
      <HugeiconsIcon icon={icon} size={24} color="#171717" />
      <Typography
        sx={{
          fontSize: 11,
          color: copied ? '#1570EF' : '#858585',
          textAlign: 'center',
          fontWeight: copied ? 600 : 400,
          lineHeight: 1.2,
          wordBreak: 'break-word',
        }}
      >
        {copied ? 'Copied!' : name}
      </Typography>
    </Box>
  );
}

export default {
  title: 'Atoms/Icon',
  parameters: {
    controls: { disable: true },
    options: { showPanel: false },
  },
};

export const Browse = {
  name: 'Browse',
  render: function Render() {
    const [search, setSearch] = useState('');

    const filtered = icons.filter(({ name, exportName }) =>
      name.includes(search.toLowerCase()) || exportName.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <Box sx={{ px: 3, pb: 4, maxWidth: 960 }}>
        <Typography sx={{ fontSize: 24, fontWeight: 700, mb: 0.5 }}>
          Icons
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#858585', mb: 3 }}>
          {filtered.length} icônes disponibles — Hugeicons (free, MIT). Cliquez pour copier le nom de l'export.
        </Typography>

        <TextField
          placeholder="Rechercher..."
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <HugeiconsIcon icon={Search01Icon} size={18} color="#858585" />
                </InputAdornment>
              ),
            },
          }}
          sx={{ mb: 4 }}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
            gap: 1,
          }}
        >
          {filtered.map(({ name, exportName, icon }) => (
            <IconCell key={exportName} name={name} exportName={exportName} icon={icon} />
          ))}
        </Box>

        {filtered.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ fontSize: 14, color: '#858585' }}>
              Aucune icône trouvée pour "{search}"
            </Typography>
          </Box>
        )}
      </Box>
    );
  },
};
