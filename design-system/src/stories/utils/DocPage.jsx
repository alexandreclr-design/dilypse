import React from 'react';
import { Box, Typography, Stack, Divider, Chip } from '@mui/material';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import LinkIcon from '@mui/icons-material/Link';

// ─── Section wrapper ────────────────────────────────────────────────────────

const Section = ({ title, children }) => (
  <Box>
    <Typography
      variant="overline"
      sx={{ color: 'text.secondary', letterSpacing: '0.1em', fontSize: 12, fontWeight: 600 }}
    >
      {title}
    </Typography>
    <Box sx={{ mt: 1.5 }}>{children}</Box>
  </Box>
);

// ─── Do/Don't column ────────────────────────────────────────────────────────

const RuleColumn = ({ title, items, type }) => (
  <Box
    sx={{
      flex: 1,
      p: 2,
      borderRadius: 2,
      border: '1px solid',
      borderColor: type === 'do' ? 'success.light' : 'error.light',
      bgcolor: type === 'do' ? '#F6FEF9' : '#FFFBFA',
    }}
  >
    <Typography
      variant="caption"
      sx={{
        fontWeight: 700,
        color: type === 'do' ? 'success.dark' : 'error.dark',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        display: 'block',
        mb: 1.5,
      }}
    >
      {type === 'do' ? '✓  Do' : '✕  Don\'t'}
    </Typography>
    <Stack spacing={1}>
      {items.map((item, i) => (
        <Typography key={i} variant="body2" color="text.secondary">
          {item}
        </Typography>
      ))}
    </Stack>
  </Box>
);

// ─── Main DocPage component ──────────────────────────────────────────────────

/**
 * @param {object}   props
 * @param {string}   props.title         — Component name
 * @param {string}   props.description   — One paragraph description
 * @param {string[]} props.when          — When to use (bullet list)
 * @param {string[]} props.avoid         — When to avoid (bullet list)
 * @param {string[]} props.dos           — Do rules
 * @param {string[]} props.donts         — Don't rules
 * @param {string[]} props.a11y          — Accessibility notes
 * @param {string[]} [props.related]     — Related component names
 */
export const DocPage = ({ title, description, dos = [], donts = [], a11y = [], related = [] }) => (
  <Box sx={{ maxWidth: 760, p: 3 }}>

    {/* Header */}
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>{title}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7, maxWidth: 640 }}>
        {description}
      </Typography>
    </Box>

    <Stack spacing={4} divider={<Divider />}>

      {/* Dos & Don'ts */}
      {(dos.length > 0 || donts.length > 0) && (
        <Section title="Dos & Don'ts">
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {dos.length > 0 && <RuleColumn title="Do" type="do" items={dos} />}
            {donts.length > 0 && <RuleColumn title="Don't" type="dont" items={donts} />}
          </Box>
        </Section>
      )}

      {/* Accessibility */}
      {a11y.length > 0 && (
        <Section title="Accessibility">
          <Stack spacing={1}>
            {a11y.map((item, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <AccessibilityNewIcon sx={{ fontSize: 16, color: 'primary.main', mt: 0.3, flexShrink: 0 }} />
                <Typography variant="body2" color="text.secondary">{item}</Typography>
              </Box>
            ))}
          </Stack>
        </Section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <Section title="Related components">
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {related.map((name) => (
              <Chip key={name} label={name} size="small" variant="outlined" icon={<LinkIcon />} />
            ))}
          </Stack>
        </Section>
      )}

    </Stack>
  </Box>
);
