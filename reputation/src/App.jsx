import { useState, useMemo } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon, PlusSignIcon } from '@hugeicons/core-free-icons';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ReviewListItem from './components/ReviewListItem';
import ReviewDetail from './components/ReviewDetail';
import ReviewFilters from './components/ReviewFilters';
import { reviews as allReviews } from './data/reviews';

const BATCH_SIZE = 50;

export default function App() {
  const [selectedId, setSelectedId] = useState(allReviews[0]?.id ?? null);

  // Filters
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [rating, setRating] = useState('all');
  const [period, setPeriod] = useState('all');
  const [sort, setSort] = useState('date-desc');
  const [selectedEstablishment, setSelectedEstablishment] = useState('all');
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  // Extract unique establishments
  const establishments = useMemo(() =>
    [...new Set(allReviews.map(r => r.businessName))],
    []
  );

  // Filter + sort logic
  const filtered = useMemo(() => {
    let result = [...allReviews];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(r =>
        r.reviewerName.toLowerCase().includes(q) ||
        (r.text && r.text.toLowerCase().includes(q))
      );
    }

    // Status
    if (status === 'replied') result = result.filter(r => r.replied);
    if (status === 'unreplied') result = result.filter(r => !r.replied);

    // Rating
    if (rating !== 'all') result = result.filter(r => r.rating === Number(rating));

    // Establishment
    if (selectedEstablishment !== 'all') {
      result = result.filter(r => r.businessName === selectedEstablishment);
    }

    // Sort
    result.sort((a, b) => {
      if (sort === 'date-desc') return b.id - a.id;
      if (sort === 'date-asc') return a.id - b.id;
      if (sort === 'rating-desc') return b.rating - a.rating;
      if (sort === 'rating-asc') return a.rating - b.rating;
      return 0;
    });

    return result;
  }, [search, status, rating, period, sort, selectedEstablishment]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const selectedReview = allReviews.find(r => r.id === selectedId) || null;
  const unrepliedCount = filtered.filter(r => !r.replied).length;

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activeItem="reputation" />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header
          icon={StarIcon}
          title="Réputation"
          cta={
            <Button
              variant="outlined"
              size="small"
              startIcon={<HugeiconsIcon icon={PlusSignIcon} size={16} />}
              sx={{
                borderColor: '#EEEEEE', color: '#171717',
                fontSize: 14, fontWeight: 600, borderRadius: '8px',
                '&:hover': { borderColor: '#D1D1D1', bgcolor: '#FAFAFA' },
              }}
            >
              Demandes d'avis
            </Button>
          }
        />

        {/* Split view */}
        <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Left panel */}
          <Box sx={{
            width: 400, flexShrink: 0, borderRight: '1px solid #F0F0F0',
            display: 'flex', flexDirection: 'column', bgcolor: '#FFFFFF',
          }}>
            {/* Filters */}
            <ReviewFilters
              search={search} onSearchChange={setSearch}
              status={status} onStatusChange={setStatus}
              rating={rating} onRatingChange={setRating}
              period={period} onPeriodChange={setPeriod}
              sort={sort} onSortChange={setSort}
              establishments={establishments}
              selectedEstablishment={selectedEstablishment}
              onEstablishmentChange={setSelectedEstablishment}
            />

            {/* List header */}
            <Box sx={{
              px: 2.5, py: 1.25, borderBottom: '1px solid #F5F5F5',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <Typography sx={{ fontSize: 12, color: '#A0A0A0' }}>
                {filtered.length} avis
              </Typography>
              {unrepliedCount > 0 && (
                <Box sx={{
                  display: 'flex', alignItems: 'center', gap: 0.5,
                  bgcolor: '#FEF3F2', px: 1, py: 0.25, borderRadius: '6px',
                }}>
                  <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#D92D20' }} />
                  <Typography sx={{ fontSize: 11, fontWeight: 600, color: '#D92D20' }}>
                    {unrepliedCount} sans réponse
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Scrollable list */}
            <Box sx={{
              flex: 1, overflowY: 'auto',
              '&::-webkit-scrollbar': { width: 4 },
              '&::-webkit-scrollbar-thumb': { bgcolor: '#E0E0E0', borderRadius: 2 },
            }}>
              {visible.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Typography sx={{ fontSize: 13, color: '#BFBFBF' }}>
                    Aucun avis trouvé
                  </Typography>
                </Box>
              ) : (
                <>
                  {visible.map(review => (
                    <ReviewListItem
                      key={review.id}
                      review={review}
                      selected={review.id === selectedId}
                      onClick={() => setSelectedId(review.id)}
                    />
                  ))}
                  {hasMore && (
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                      <Button
                        onClick={() => setVisibleCount(c => c + BATCH_SIZE)}
                        sx={{
                          fontSize: 12, fontWeight: 500, color: '#858585',
                          textTransform: 'none', borderRadius: '8px',
                          '&:hover': { bgcolor: '#F5F5F5' },
                        }}
                      >
                        Charger plus ({filtered.length - visibleCount} restants)
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Box>

          {/* Right panel */}
          <Box sx={{ flex: 1, bgcolor: '#FFFFFF', display: 'flex', overflow: 'hidden' }}>
            <ReviewDetail review={selectedReview} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
