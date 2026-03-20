import { Box, Typography, InputBase, Select, MenuItem, Chip } from '@mui/material';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, MultiplicationSignIcon } from '@hugeicons/core-free-icons';

const selectSx = {
  fontSize: 13, fontWeight: 500, color: '#171717',
  borderRadius: '8px', height: 34,
  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#F0F0F0' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#E0E0E0' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#D1D1D1' },
  '& .MuiSelect-select': { py: '7px', pl: '12px', pr: '32px !important' },
};

const menuItemSx = { fontSize: 13 };

export default function ReviewFilters({
  search, onSearchChange,
  status, onStatusChange,
  rating, onRatingChange,
  period, onPeriodChange,
  sort, onSortChange,
  establishments, selectedEstablishment, onEstablishmentChange,
}) {
  const hasActiveFilters = status !== 'all' || rating !== 'all' || period !== 'all' || selectedEstablishment !== 'all';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, px: 2, py: 1.5, borderBottom: '1px solid #F0F0F0' }}>
      {/* Search */}
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: '8px',
        height: 34, px: '10px', borderRadius: '8px',
        border: '1px solid #F0F0F0', bgcolor: '#FAFAFA',
        transition: 'all 150ms',
        '&:focus-within': { borderColor: '#D1D1D1', bgcolor: '#FFFFFF' },
      }}>
        <HugeiconsIcon icon={Search01Icon} size={15} color="#BFBFBF" />
        <InputBase
          placeholder="Rechercher dans les avis..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ flex: 1, fontSize: 13, color: '#171717', '& ::placeholder': { color: '#BFBFBF', opacity: 1 } }}
        />
      </Box>

      {/* Filter row */}
      <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
        {/* Status */}
        <Select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          size="small"
          sx={{ ...selectSx, minWidth: 110 }}
        >
          <MenuItem value="all" sx={menuItemSx}>Tous</MenuItem>
          <MenuItem value="unreplied" sx={menuItemSx}>Non répondu</MenuItem>
          <MenuItem value="replied" sx={menuItemSx}>Répondu</MenuItem>
        </Select>

        {/* Rating */}
        <Select
          value={rating}
          onChange={(e) => onRatingChange(e.target.value)}
          size="small"
          sx={{ ...selectSx, minWidth: 90 }}
        >
          <MenuItem value="all" sx={menuItemSx}>Note</MenuItem>
          <MenuItem value="5" sx={menuItemSx}>5 étoiles</MenuItem>
          <MenuItem value="4" sx={menuItemSx}>4 étoiles</MenuItem>
          <MenuItem value="3" sx={menuItemSx}>3 étoiles</MenuItem>
          <MenuItem value="2" sx={menuItemSx}>2 étoiles</MenuItem>
          <MenuItem value="1" sx={menuItemSx}>1 étoile</MenuItem>
        </Select>

        {/* Period */}
        <Select
          value={period}
          onChange={(e) => onPeriodChange(e.target.value)}
          size="small"
          sx={{ ...selectSx, minWidth: 100 }}
        >
          <MenuItem value="all" sx={menuItemSx}>Période</MenuItem>
          <MenuItem value="7" sx={menuItemSx}>7 jours</MenuItem>
          <MenuItem value="30" sx={menuItemSx}>30 jours</MenuItem>
          <MenuItem value="90" sx={menuItemSx}>90 jours</MenuItem>
        </Select>

        {/* Establishment */}
        <Select
          value={selectedEstablishment}
          onChange={(e) => onEstablishmentChange(e.target.value)}
          size="small"
          sx={{ ...selectSx, minWidth: 120, flex: 1 }}
          renderValue={(val) => (
            <Typography sx={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {val === 'all' ? 'Établissement' : val}
            </Typography>
          )}
        >
          <MenuItem value="all" sx={menuItemSx}>Tous</MenuItem>
          {establishments.map((est) => (
            <MenuItem key={est} value={est} sx={menuItemSx}>{est}</MenuItem>
          ))}
        </Select>
      </Box>

      {/* Sort + active filter indicator */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          size="small"
          variant="standard"
          disableUnderline
          sx={{ fontSize: 12, color: '#858585', fontWeight: 500, '& .MuiSelect-select': { py: 0, pr: '20px !important' } }}
        >
          <MenuItem value="date-desc" sx={menuItemSx}>Plus récent</MenuItem>
          <MenuItem value="date-asc" sx={menuItemSx}>Plus ancien</MenuItem>
          <MenuItem value="rating-desc" sx={menuItemSx}>Meilleure note</MenuItem>
          <MenuItem value="rating-asc" sx={menuItemSx}>Pire note</MenuItem>
        </Select>

        {hasActiveFilters && (
          <Chip
            label="Réinitialiser"
            size="small"
            onDelete={() => {
              onStatusChange('all');
              onRatingChange('all');
              onPeriodChange('all');
              onEstablishmentChange('all');
            }}
            deleteIcon={<HugeiconsIcon icon={MultiplicationSignIcon} size={12} color="#858585" />}
            sx={{
              height: 24, fontSize: 11, fontWeight: 500, color: '#858585',
              bgcolor: '#F5F5F5', border: 'none',
              '& .MuiChip-deleteIcon': { ml: 0.25 },
            }}
          />
        )}
      </Box>
    </Box>
  );
}
