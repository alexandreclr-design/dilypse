import { useState } from 'react';
import { Box, Typography, InputBase, Select, MenuItem, Popover, Chip, Button, TextField, List, ListItemButton, ListItemText, Checkbox } from '@mui/material';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, FilterHorizontalIcon, Building01Icon } from '@hugeicons/core-free-icons';
import { text, foreground, background, border, radius, spacing } from '../theme/tokens';

const sp = spacing;

/* ─── Status tabs ─── */

function StatusTabs({ value, onChange, counts }) {
  const tabs = [
    { id: 'all', label: 'Tous' },
    { id: 'unreplied', label: 'Non répondu', count: counts.unreplied },
  ];

  return (
    <Box sx={{ display: 'flex', borderBottom: `1px solid ${border.primary}` }}>
      {tabs.map((tab) => {
        const active = value === tab.id;
        const isUnreplied = tab.id === 'unreplied' && tab.count > 0;
        return (
          <Box
            key={tab.id}
            onClick={() => onChange(tab.id)}
            sx={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: sp[3] + 'px', py: sp[5] + 'px', cursor: 'pointer',
              borderBottom: '2px solid',
              borderColor: active ? text.primary : 'transparent',
              transition: 'all 150ms',
              '&:hover': { bgcolor: background.primaryHover },
            }}
          >
            <Typography variant="caption" sx={{
              fontWeight: active ? 600 : 400,
              color: active ? text.primary : text.tertiary,
            }}>
              {tab.label}
            </Typography>
            <Box sx={{
              px: sp[3] + 'px', borderRadius: radius.xs,
              bgcolor: isUnreplied && active ? background.errorLight : (active ? background.tertiary : background.secondary),
            }}>
              <Typography variant="caption" sx={{
                fontWeight: 500,
                color: isUnreplied && active ? text.error : (active ? text.primary : text.disabled),
              }}>
                {tab.count}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

/* ─── Establishment picker (multi-select with search) ─── */

function EstablishmentPicker({ anchorEl, open, onClose, establishmentData, selected, onChange, unrepliedByEst }) {
  const [search, setSearch] = useState('');
  const filtered = establishmentData.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.address.toLowerCase().includes(search.toLowerCase())
  );
  const totalUnreplied = Object.values(unrepliedByEst).reduce((s, n) => s + n, 0);

  const sorted = [...filtered].sort((a, b) => {
    const ua = unrepliedByEst[a.name] || 0;
    const ub = unrepliedByEst[b.name] || 0;
    if (ub !== ua) return ub - ua;
    return a.name.localeCompare(b.name);
  });

  const toggle = (name) => {
    if (selected.includes(name)) onChange(selected.filter(e => e !== name));
    else onChange([...selected, name]);
  };

  return (
    <Popover
      open={open} anchorEl={anchorEl} onClose={() => { onClose(); setSearch(''); }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      slotProps={{ paper: { sx: { width: 380 } } }}
    >
      <Box sx={{ p: sp[5] + 'px', borderBottom: `1px solid ${border.primary}` }}>
        <TextField
          placeholder="Rechercher un établissement..."
          size="small" fullWidth autoFocus
          value={search} onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <List sx={{
        maxHeight: 360, overflowY: 'auto', p: sp[2] + 'px',
        '&::-webkit-scrollbar': { width: 4 },
        '&::-webkit-scrollbar-thumb': { bgcolor: border.secondary, borderRadius: 2 },
      }}>
        <ListItemButton onClick={() => onChange([])}>
          <Checkbox size="small" checked={selected.length === 0} sx={{ p: 0, mr: sp[4] + 'px' }} />
          <ListItemText primary="Tous les établissements" />
          {totalUnreplied > 0 && (
            <Box sx={{ px: sp[3] + 'px', borderRadius: radius.xs, bgcolor: background.errorLight }}>
              <Typography variant="caption" sx={{ fontWeight: 600, color: text.error }}>{totalUnreplied}</Typography>
            </Box>
          )}
        </ListItemButton>
        {sorted.map((est) => {
          const count = unrepliedByEst[est.name] || 0;
          return (
            <ListItemButton key={est.name} onClick={() => toggle(est.name)}>
              <Checkbox size="small" checked={selected.includes(est.name)} sx={{ p: 0, mr: sp[4] + 'px' }} />
              <ListItemText
                primary={est.name.replace('Dilypse ', '')}
                secondary={est.address}
              />
              {count > 0 && (
                <Box sx={{ px: sp[3] + 'px', borderRadius: radius.xs, bgcolor: background.errorLight, ml: sp[4] + 'px', flexShrink: 0 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: text.error }}>{count}</Typography>
                </Box>
              )}
            </ListItemButton>
          );
        })}
        {sorted.length === 0 && (
          <Box sx={{ p: sp[6] + 'px', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: text.disabled }}>Aucun résultat</Typography>
          </Box>
        )}
      </List>
    </Popover>
  );
}

/* ─── Filter popover (note multi-select, période, tri) ─── */

function FilterPopover({ anchorEl, open, onClose, ratings, onRatingsChange, period, onPeriodChange, sort, onSortChange, onClearAll }) {
  const hasFilters = ratings.length > 0 || period !== 'all' || sort !== 'date-desc';

  return (
    <Popover
      open={open} anchorEl={anchorEl} onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      slotProps={{ paper: { sx: { width: 280 } } }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: sp[7] + 'px', p: sp[7] + 'px' }}>
        <Box>
          <Typography variant="overline" sx={{ display: 'block', mb: sp[3] + 'px' }}>Note</Typography>
          <Select
            multiple value={ratings}
            onChange={(e) => onRatingsChange(e.target.value)}
            displayEmpty size="small" fullWidth
            renderValue={(sel) => sel.length === 0 ? 'Toutes les notes' : `${sel.join(', ')} étoiles`}
          >
            {[5, 4, 3, 2, 1].map(n => (
              <MenuItem key={n} value={n}>
                <Checkbox size="small" checked={ratings.includes(n)} sx={{ p: 0, mr: sp[4] + 'px' }} />
                <ListItemText primary={`${n} étoile${n > 1 ? 's' : ''}`} />
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          <Typography variant="overline" sx={{ display: 'block', mb: sp[3] + 'px' }}>Période</Typography>
          <Select value={period} onChange={(e) => onPeriodChange(e.target.value)} size="small" fullWidth>
            <MenuItem value="all">Toutes les périodes</MenuItem>
            <MenuItem value="7">7 derniers jours</MenuItem>
            <MenuItem value="30">30 derniers jours</MenuItem>
            <MenuItem value="90">90 derniers jours</MenuItem>
          </Select>
        </Box>
        <Box>
          <Typography variant="overline" sx={{ display: 'block', mb: sp[3] + 'px' }}>Trier par</Typography>
          <Select value={sort} onChange={(e) => onSortChange(e.target.value)} size="small" fullWidth>
            <MenuItem value="date-desc">Plus récent</MenuItem>
            <MenuItem value="date-asc">Plus ancien</MenuItem>
            <MenuItem value="rating-desc">Meilleure note</MenuItem>
            <MenuItem value="rating-asc">Pire note</MenuItem>
          </Select>
        </Box>
        {hasFilters && (
          <Button onClick={onClearAll} fullWidth variant="outlined" size="small">Réinitialiser</Button>
        )}
      </Box>
    </Popover>
  );
}

/* ─── Main ─── */

export default function ReviewFilters({
  search, onSearchChange,
  status, onStatusChange,
  ratings, onRatingsChange,
  period, onPeriodChange,
  sort, onSortChange,
  establishmentData, selectedEstablishments, onEstablishmentsChange,
  counts, unrepliedByEst,
}) {
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [estAnchor, setEstAnchor] = useState(null);

  const hasAdvancedFilters = ratings.length > 0 || period !== 'all';
  const hasEstFilter = selectedEstablishments.length > 0;
  const filterCount = [ratings.length > 0, period !== 'all'].filter(Boolean).length;

  const clearAll = () => {
    onRatingsChange([]);
    onPeriodChange('all');
    onEstablishmentsChange([]);
    onSortChange('date-desc');
  };

  return (
    <Box>
      <StatusTabs value={status} onChange={onStatusChange} counts={counts} />

      {/* Search + icon buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: sp[3] + 'px', px: sp[6] + 'px', py: sp[5] + 'px' }}>
        <Box sx={{
          flex: 1, display: 'flex', alignItems: 'center', gap: sp[4] + 'px',
          height: sp[9], px: sp[5] + 'px', borderRadius: radius.md,
          border: `1px solid ${border.primary}`,
          transition: 'all 150ms',
          '&:focus-within': { borderColor: border.tertiary },
        }}>
          <HugeiconsIcon icon={Search01Icon} size={16} color={foreground.disabled} />
          <InputBase
            placeholder="Rechercher..."
            value={search} onChange={(e) => onSearchChange(e.target.value)}
            sx={{ flex: 1, fontSize: 14, color: text.primary, '& ::placeholder': { color: text.placeholder, opacity: 1 } }}
          />
        </Box>

        {/* Establishment button */}
        <Box
          onClick={(e) => setEstAnchor(e.currentTarget)}
          sx={{
            height: sp[9], px: sp[5] + 'px', display: 'flex', alignItems: 'center', gap: sp[3] + 'px',
            borderRadius: radius.md, cursor: 'pointer',
            border: `1px solid ${hasEstFilter ? border.brand : border.secondary}`,
            bgcolor: hasEstFilter ? background.brandLight : 'transparent',
            transition: 'all 150ms',
            '&:hover': { bgcolor: hasEstFilter ? background.brandLightHover : background.secondaryHover },
          }}
        >
          <HugeiconsIcon icon={Building01Icon} size={16} color={hasEstFilter ? foreground.brandPrimary : foreground.tertiary} />
          {hasEstFilter && (
            <Typography variant="caption" sx={{ fontWeight: 600, color: foreground.brandPrimary }}>{selectedEstablishments.length}</Typography>
          )}
        </Box>

        {/* Filter button */}
        <Box
          onClick={(e) => setFilterAnchor(e.currentTarget)}
          sx={{
            height: sp[9], px: sp[5] + 'px', display: 'flex', alignItems: 'center', gap: sp[3] + 'px',
            borderRadius: radius.md, cursor: 'pointer',
            border: `1px solid ${hasAdvancedFilters ? border.brand : border.secondary}`,
            bgcolor: hasAdvancedFilters ? background.brandLight : 'transparent',
            transition: 'all 150ms',
            '&:hover': { bgcolor: hasAdvancedFilters ? background.brandLightHover : background.secondaryHover },
          }}
        >
          <HugeiconsIcon icon={FilterHorizontalIcon} size={16} color={hasAdvancedFilters ? foreground.brandPrimary : foreground.tertiary} />
          {filterCount > 0 && (
            <Typography variant="caption" sx={{ fontWeight: 600, color: foreground.brandPrimary }}>{filterCount}</Typography>
          )}
        </Box>
      </Box>

      {/* Active chips */}
      {(hasEstFilter || hasAdvancedFilters || period !== 'all') && (
        <Box sx={{ display: 'flex', gap: sp[2] + 'px', flexWrap: 'wrap', alignItems: 'center', px: sp[6] + 'px', pb: sp[5] + 'px' }}>
          {selectedEstablishments.map(est => (
            <Chip key={est} label={est.replace('Dilypse ', '')} size="small"
              onDelete={() => onEstablishmentsChange(selectedEstablishments.filter(e => e !== est))}
              sx={{ bgcolor: background.brandLight, color: text.brandPrimary, border: `1px solid ${border.brandLight}` }}
            />
          ))}
          {ratings.map(r => (
            <Chip key={r} label={`${r}★`} size="small"
              onDelete={() => onRatingsChange(ratings.filter(x => x !== r))}
              sx={{ bgcolor: background.brandLight, color: text.brandPrimary, border: `1px solid ${border.brandLight}` }}
            />
          ))}
          {period !== 'all' && (
            <Chip label={`${period}j`} size="small"
              onDelete={() => onPeriodChange('all')}
              sx={{ bgcolor: background.brandLight, color: text.brandPrimary, border: `1px solid ${border.brandLight}` }}
            />
          )}
          <Typography variant="caption" onClick={clearAll}
            sx={{ fontWeight: 500, color: text.tertiary, cursor: 'pointer', ml: sp[2] + 'px', '&:hover': { color: text.secondary } }}
          >
            Effacer
          </Typography>
        </Box>
      )}

      <EstablishmentPicker
        anchorEl={estAnchor} open={Boolean(estAnchor)} onClose={() => setEstAnchor(null)}
        establishmentData={establishmentData} selected={selectedEstablishments} onChange={onEstablishmentsChange}
        unrepliedByEst={unrepliedByEst}
      />
      <FilterPopover
        anchorEl={filterAnchor} open={Boolean(filterAnchor)} onClose={() => setFilterAnchor(null)}
        ratings={ratings} onRatingsChange={onRatingsChange}
        period={period} onPeriodChange={onPeriodChange}
        sort={sort} onSortChange={onSortChange}
        onClearAll={clearAll}
      />
    </Box>
  );
}
