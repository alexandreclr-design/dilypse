import { useState, useMemo, useEffect, useCallback } from 'react';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon, PlusSignIcon, CheckmarkCircle01Icon, SparklesIcon } from '@hugeicons/core-free-icons';
import BatchReplyQueue from './components/BatchReplyQueue';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ReviewListItem, { DateGroupHeader } from './components/ReviewListItem';
import ReviewDetail from './components/ReviewDetail';
import ReviewFilters from './components/ReviewFilters';
import { reviews as initialReviews, establishmentData } from './data/reviews';
import { text, border, spacing } from './theme/tokens';

const sp = spacing;
const BATCH_SIZE = 50;

// ─── Date grouping helpers ───

function parseDateStr(d) {
  const months = { 'janv.': 0, 'févr.': 1, 'mars': 2, 'avr.': 3, 'mai': 4, 'juin': 5, 'juil.': 6, 'août': 7, 'sept.': 8, 'oct.': 9, 'nov.': 10, 'déc.': 11 };
  const [day, month, year] = d.split(' ');
  return new Date(Number(year), months[month] || 0, Number(day));
}

function getDateGroup(dateStr) {
  const d = parseDateStr(dateStr);
  const now = new Date(2026, 2, 20); // March 20, 2026 (simulated today)
  const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) return "Aujourd'hui";
  if (diffDays <= 30) return 'Ce mois';
  return 'Plus ancien';
}

// ─── App ───

export default function App() {
  const [reviews, setReviews] = useState(initialReviews);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [ratings, setRatings] = useState([]);
  const [period, setPeriod] = useState('all');
  const [sort, setSort] = useState('date-desc');
  const [selectedEstablishments, setSelectedEstablishments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [snackbar, setSnackbar] = useState(false);
  const [batchMode, setBatchMode] = useState(false);

  const filtered = useMemo(() => {
    let result = [...reviews];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(r => r.reviewerName.toLowerCase().includes(q) || (r.text && r.text.toLowerCase().includes(q)));
    }
    if (status === 'unreplied') result = result.filter(r => !r.replied);
    if (ratings.length > 0) result = result.filter(r => ratings.includes(r.rating));
    if (selectedEstablishments.length > 0) result = result.filter(r => selectedEstablishments.includes(r.businessName));
    result.sort((a, b) => {
      if (sort === 'date-desc') return parseDateStr(b.date) - parseDateStr(a.date);
      if (sort === 'date-asc') return parseDateStr(a.date) - parseDateStr(b.date);
      if (sort === 'rating-desc') return b.rating - a.rating;
      if (sort === 'rating-asc') return a.rating - b.rating;
      return 0;
    });
    return result;
  }, [reviews, search, status, ratings, period, sort, selectedEstablishments]);

  const baseFiltered = useMemo(() => {
    let result = [...reviews];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(r => r.reviewerName.toLowerCase().includes(q) || (r.text && r.text.toLowerCase().includes(q)));
    }
    if (ratings.length > 0) result = result.filter(r => ratings.includes(r.rating));
    if (selectedEstablishments.length > 0) result = result.filter(r => selectedEstablishments.includes(r.businessName));
    return result;
  }, [reviews, search, ratings, selectedEstablishments]);

  const counts = { all: baseFiltered.length, unreplied: baseFiltered.filter(r => !r.replied).length };
  const totalUnreplied = useMemo(() => reviews.filter(r => !r.replied).length, [reviews]);
  const unrepliedByEst = useMemo(() => {
    const map = {};
    reviews.forEach(r => { if (!r.replied) map[r.businessName] = (map[r.businessName] || 0) + 1; });
    return map;
  }, [reviews]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const selectedReview = reviews.find(r => r.id === selectedId) || null;

  // Auto-select first unreplied on load
  useEffect(() => {
    if (!selectedId && filtered.length > 0) {
      const firstUnreplied = filtered.find(r => !r.replied);
      setSelectedId(firstUnreplied?.id || filtered[0].id);
    }
  }, []);

  // Group reviews by date (only when sorted by date desc)
  const groupedVisible = useMemo(() => {
    if (sort !== 'date-desc') {
      return visible.map(review => ({ type: 'review', review }));
    }
    // Build groups first, then flatten
    const groupOrder = ["Aujourd'hui", 'Ce mois', 'Plus ancien'];
    const buckets = {};
    groupOrder.forEach(g => { buckets[g] = []; });
    visible.forEach(review => {
      const g = getDateGroup(review.date);
      if (!buckets[g]) buckets[g] = [];
      buckets[g].push(review);
    });
    const result = [];
    groupOrder.forEach(g => {
      if (buckets[g].length > 0) {
        result.push({ type: 'header', label: g });
        buckets[g].forEach(review => result.push({ type: 'review', review }));
      }
    });
    return result;
  }, [visible, sort]);

  // Auto-advance after send
  const handleSendReply = useCallback((reviewId, replyText) => {
    const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
    const d = new Date();
    const dateStr = `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`;

    setReviews(prev => prev.map(r =>
      r.id === reviewId ? { ...r, replied: true, replyText, replyDate: dateStr } : r
    ));

    setSnackbar(true);

    // Auto-advance to next unreplied
    setTimeout(() => {
      const currentIndex = filtered.findIndex(r => r.id === reviewId);
      const nextUnreplied = filtered.find((r, i) => i > currentIndex && !r.replied && r.id !== reviewId);
      if (nextUnreplied) {
        setSelectedId(nextUnreplied.id);
      }
    }, 300);
  }, [filtered]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      // Don't intercept if typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        const reviewItems = visible.filter(Boolean);
        const idx = reviewItems.findIndex(r => r.id === selectedId);
        if (idx < reviewItems.length - 1) setSelectedId(reviewItems[idx + 1].id);
      }
      if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        const reviewItems = visible.filter(Boolean);
        const idx = reviewItems.findIndex(r => r.id === selectedId);
        if (idx > 0) setSelectedId(reviewItems[idx - 1].id);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [visible, selectedId]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar activeItem="reputation" badges={{ reputation: totalUnreplied || undefined }} />

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        <Header
          icon={StarIcon}
          title="Réputation"
          cta={
            <>
              {counts.unreplied > 0 && (
                <Button
                  variant="contained" color="secondary" size="small"
                  startIcon={<HugeiconsIcon icon={SparklesIcon} size={14} />}
                  onClick={() => setBatchMode(true)}
                >
                  Répondre à tous ({counts.unreplied})
                </Button>
              )}
              <Button variant="outlined" size="small" startIcon={<HugeiconsIcon icon={PlusSignIcon} size={16} />}>
                Demandes d'avis
              </Button>
            </>
          }
        />

        <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Left panel */}
          <Box sx={{
            width: 380, flexShrink: 0, borderRight: `1px solid ${border.primary}`,
            display: 'flex', flexDirection: 'column',
          }}>
            <ReviewFilters
              search={search} onSearchChange={setSearch}
              status={status} onStatusChange={setStatus}
              ratings={ratings} onRatingsChange={setRatings}
              period={period} onPeriodChange={setPeriod}
              sort={sort} onSortChange={setSort}
              establishmentData={establishmentData}
              selectedEstablishments={selectedEstablishments}
              onEstablishmentsChange={setSelectedEstablishments}
              counts={counts} unrepliedByEst={unrepliedByEst}
            />

            <Box sx={{
              flex: 1, overflowY: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}>
              {visible.length === 0 ? (
                <Box sx={{ p: sp[9] + 'px', textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: text.disabled }}>Aucun avis trouvé</Typography>
                </Box>
              ) : (
                <>
                  {groupedVisible.map((item, i) => {
                    if (item.type === 'header') {
                      return <DateGroupHeader key={`h-${item.label}`} label={item.label} />;
                    }
                    return (
                      <ReviewListItem
                        key={item.review.id}
                        review={item.review}
                        selected={item.review.id === selectedId}
                        onClick={() => setSelectedId(item.review.id)}
                      />
                    );
                  })}
                  {hasMore && (
                    <Box sx={{ p: sp[6] + 'px', textAlign: 'center' }}>
                      <Button variant="text" size="small" onClick={() => setVisibleCount(c => c + BATCH_SIZE)}>
                        Charger plus ({filtered.length - visibleCount} restants)
                      </Button>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Box>

          {/* Right panel */}
          <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
            {batchMode ? (
              <BatchReplyQueue
                reviews={filtered}
                onSendReply={handleSendReply}
                onClose={() => setBatchMode(false)}
              />
            ) : (
              <ReviewDetail review={selectedReview} onSendReply={handleSendReply} />
            )}

            <Snackbar
              open={snackbar}
              autoHideDuration={3000}
              onClose={() => setSnackbar(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              sx={{ position: 'absolute', top: sp[5] + 'px', right: sp[5] + 'px' }}
            >
              <Alert
                severity="success" variant="filled"
                onClose={() => setSnackbar(false)}
                icon={<HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} />}
                sx={{ borderRadius: '8px', alignItems: 'center', fontSize: 13 }}
              >
                Réponse publiée
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
