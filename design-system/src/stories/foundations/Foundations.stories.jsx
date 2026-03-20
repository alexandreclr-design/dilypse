import React, { useState, useCallback } from 'react';
import { Box, Typography as T, Stack, Snackbar, Chip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { colors, text, foreground, background, border, radius, spacing, typographyTokens } from '../../theme/tokens.js';

export default {
  title: 'Foundations',
  parameters: {
    controls: { disable: true },
    options: { showPanel: false },
    noWrapper: true,
  },
};

// ─── Shared primitives ──────────────────────────────────────────────────────

const mono = { fontFamily: '"SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace' };

const useCopy = () => {
  const [open, setOpen] = useState(false);
  const copy = useCallback((val) => {
    navigator.clipboard.writeText(val);
    setOpen(true);
  }, []);
  const snackbar = (
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={1200}
      message="Copied"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    />
  );
  return { copy, snackbar };
};

const Page = ({ children }) => (
  <Box sx={{ maxWidth: 880, mx: 'auto', px: 5, py: 6 }}>
    {children}
  </Box>
);

const PageHeader = ({ title, description }) => (
  <Box>
    <Box sx={{ mb: 6 }}>
      <T sx={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em', color: text.primary }}>{title}</T>
      <T sx={{ fontSize: 14, color: text.secondary, mt: 1, maxWidth: 600, lineHeight: 1.7 }}>{description}</T>
    </Box>
  </Box>
);

const SectionTitle = ({ children, description }) => (
  <Box sx={{ mb: 2.5 }}>
    <T sx={{ fontSize: 16, fontWeight: 600, color: text.primary }}>{children}</T>
    {description && <T sx={{ fontSize: 12, color: text.tertiary, mt: 0.5 }}>{description}</T>}
  </Box>
);

// ─── Color helpers ──────────────────────────────────────────────────────────

const isDark = (hex) => {
  if (!hex || hex === 'transparent') return false;
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
};

// ═══════════════════════════════════════════════════════════════════════════════
// COLORS — Tailwind-inspired compact ramps
// ═══════════════════════════════════════════════════════════════════════════════

export const Colors = {
  name: 'Colors',
  render: () => {
    const { copy, snackbar } = useCopy();
    const palettes = Object.entries(colors);

    return (
      <Page>
        <PageHeader
          title="Colors"
          description="8 palettes de couleurs avec une échelle de luminosité cohérente. En production, utiliser les tokens sémantiques plutôt que les valeurs brutes."
        />

        <Stack spacing={4}>
          {palettes.map(([name, scale]) => {
            const entries = Object.entries(scale);
            return (
              <Box key={name}>
                <T sx={{ fontSize: 14, fontWeight: 600, color: text.secondary, mb: 1, textTransform: 'capitalize' }}>
                  {name}
                </T>
                <Box sx={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${entries.length}, 1fr)`,
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}>
                  {entries.map(([step, value]) => (
                    <Box
                      key={step}
                      title={value}
                      onClick={() => copy(value)}
                      sx={{
                        bgcolor: value,
                        cursor: 'pointer',
                        pt: '100%',
                        position: 'relative',
                        '&:hover': { opacity: 0.85 },
                      }}
                    >
                      <T sx={{
                        position: 'absolute', bottom: 4, left: 0, right: 0,
                        textAlign: 'center', fontSize: 9, fontWeight: 600, ...mono,
                        color: isDark(value) ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.3)',
                      }}>
                        {step}
                      </T>
                    </Box>
                  ))}
                </Box>
              </Box>
            );
          })}
        </Stack>

        {snackbar}
      </Page>
    );
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// SEMANTIC TOKENS — Clean card-based layout
// ═══════════════════════════════════════════════════════════════════════════════

const tokenGroups = [
  { key: 'text', label: 'Text', tokens: text },
  { key: 'foreground', label: 'Foreground', tokens: foreground },
  { key: 'background', label: 'Background', tokens: background },
  { key: 'border', label: 'Border', tokens: border },
];

const TokenItem = ({ tokenKey, name, value, onCopy }) => (
  <Box
    onClick={() => onCopy(value)}
    sx={{
      display: 'flex', alignItems: 'center', gap: 1.5,
      py: 1, px: 1.5, cursor: 'pointer', borderRadius: '6px',
      transition: 'background-color 100ms ease',
      '&:hover': { bgcolor: background.secondaryHover },
      '&:hover .copy': { opacity: 1 },
    }}
  >
    {tokenKey === 'border' ? (
      <Box sx={{ width: 28, height: 28, borderRadius: '6px', border: `2px solid ${value}`, flexShrink: 0 }} />
    ) : (
      <Box sx={{ width: 28, height: 28, borderRadius: '6px', bgcolor: value, border: `1px solid ${border.primary}`, flexShrink: 0 }} />
    )}
    <T sx={{ flex: 1, fontSize: 14, fontWeight: 500, ...mono, color: text.primary }}>{name}</T>
    <T sx={{ fontSize: 12, ...mono, color: text.tertiary }}>{value}</T>
    <ContentCopyIcon className="copy" sx={{ fontSize: 12, color: text.disabled, opacity: 0, transition: 'opacity 100ms ease' }} />
  </Box>
);

export const SemanticTokens = {
  name: 'Semantic Tokens',
  render: () => {
    const { copy, snackbar } = useCopy();

    return (
      <Page>
        <PageHeader
          title="Semantic Tokens"
          description="Les tokens sémantiques décrivent un rôle, pas une couleur. Utiliser ces tokens garantit la cohérence et prépare le dark mode."
        />

        <Stack spacing={5}>
          {tokenGroups.map(({ key, label, tokens }) => (
            <Box key={key}>
              <SectionTitle>{label}</SectionTitle>
              <Box sx={{ border: `1px solid ${border.primary}`, borderRadius: '8px', overflow: 'hidden', py: 0.5 }}>
                {Object.entries(tokens).map(([name, value]) => (
                  <TokenItem key={name} tokenKey={key} name={`${key}.${name}`} value={value} onCopy={copy} />
                ))}
              </Box>
            </Box>
          ))}
        </Stack>

        {snackbar}
      </Page>
    );
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// TYPOGRAPHY — Clean specimen table
// ═══════════════════════════════════════════════════════════════════════════════

const { size, lineHeight, weight, family } = typographyTokens;

const typeScale = [
  { variant: 'h1', sz: size['5xl'], wt: weight.semibold, lh: lineHeight['4xl'] },
  { variant: 'h2', sz: size['4xl'], wt: weight.semibold, lh: lineHeight['3xl'] },
  { variant: 'h3', sz: size['3xl'], wt: weight.semibold, lh: lineHeight['2xl'] },
  { variant: 'h4', sz: size['2xl'], wt: weight.semibold, lh: lineHeight.xl },
  { variant: 'h5', sz: size.xl, wt: weight.semibold, lh: lineHeight.lg },
  { variant: 'h6', sz: size.lg, wt: weight.semibold, lh: lineHeight.lg },
  { variant: 'subtitle1', sz: size.md, wt: weight.medium, lh: lineHeight.md },
  { variant: 'subtitle2', sz: size.sm, wt: weight.medium, lh: lineHeight.sm },
  { variant: 'body1', sz: size.md, wt: weight.regular, lh: lineHeight.md },
  { variant: 'body2', sz: size.sm, wt: weight.regular, lh: lineHeight.sm },
  { variant: 'caption', sz: size.xs, wt: weight.regular, lh: lineHeight.xs },
  { variant: 'overline', sz: size.xs, wt: weight.medium, lh: lineHeight.xs },
];

export const Typography = {
  name: 'Typography',
  render: () => (
    <Page>
      <PageHeader
        title="Typography"
        description={`${family.split(',')[0].replace(/"/g, '')} avec des proportions compactes et modernes. Chaque variant est mappé sur une combinaison taille / graisse / interligne.`}
      />

      <Box sx={{ mb: 6 }}>
        <SectionTitle description="Tous les variants MUI disponibles.">Type scale</SectionTitle>
        <Stack spacing={0}>
          {typeScale.map(({ variant, sz, wt, lh }) => (
            <Box
              key={variant}
              sx={{
                display: 'flex', alignItems: 'baseline', gap: 2,
                py: 1.5, borderBottom: `1px solid ${border.primary}`,
              }}
            >
              <Box sx={{ width: 100, flexShrink: 0 }}>
                <T sx={{ fontSize: 12, fontWeight: 500, ...mono, color: text.tertiary }}>{variant}</T>
              </Box>
              <Box sx={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                <T variant={variant} sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', display: 'block' }}>
                  The quick brown fox
                </T>
              </Box>
              <Stack direction="row" spacing={2} sx={{ flexShrink: 0 }}>
                <T sx={{ fontSize: 12, ...mono, color: text.disabled }}>{sz}px</T>
                <T sx={{ fontSize: 12, ...mono, color: text.disabled }}>{wt}</T>
                <T sx={{ fontSize: 12, ...mono, color: text.disabled }}>{lh}px</T>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box>
        <SectionTitle>Font weights</SectionTitle>
        <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
          {Object.entries(weight).map(([name, value]) => (
            <Box
              key={name}
              sx={{
                flex: 1, py: 2, px: 2.5,
                border: `1px solid ${border.primary}`, borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <T sx={{ fontSize: 32, fontWeight: value, mb: 1, color: text.primary }}>Aa</T>
              <T sx={{ fontSize: 12, fontWeight: 600, color: text.primary }}>{name}</T>
              <T sx={{ fontSize: 12, ...mono, color: text.tertiary, mt: 0.25 }}>{value}</T>
            </Box>
          ))}
        </Stack>
      </Box>
    </Page>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// SPACING & LAYOUT — Compact visual scale
// ═══════════════════════════════════════════════════════════════════════════════

export const SpacingLayout = {
  name: 'Spacing & Layout',
  render: () => {
    const { copy, snackbar } = useCopy();

    return (
      <Page>
        <PageHeader
          title="Spacing & Layout"
          description="Échelle de 24 niveaux (0–23) de 0 à 160px. Border-radius et breakpoints complètent le système."
        />

        <Box sx={{ mb: 6 }}>
          <SectionTitle description="Cliquer sur une ligne pour copier la valeur.">Spacing scale</SectionTitle>
          <Box sx={{ border: `1px solid ${border.primary}`, borderRadius: '8px', overflow: 'hidden', py: 0.5 }}>
            {Object.entries(spacing).map(([step, px]) => (
              <Box
                key={step}
                onClick={() => copy(`${px}px`)}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 2,
                  py: 0.75, px: 1.5, cursor: 'pointer',
                  transition: 'background-color 100ms ease',
                  '&:hover': { bgcolor: background.secondaryHover },
                }}
              >
                <T sx={{ width: 48, fontSize: 12, fontWeight: 500, ...mono, color: text.tertiary, flexShrink: 0 }}>
                  sp[{step}]
                </T>
                <T sx={{ width: 40, fontSize: 12, ...mono, color: text.secondary, textAlign: 'right', flexShrink: 0 }}>
                  {px}
                </T>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{
                    height: 12, width: Math.max(px, 2), maxWidth: '100%',
                    bgcolor: colors.blue[600], borderRadius: '3px', opacity: 0.2,
                  }} />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 6 }}>
          <SectionTitle description="Radius par défaut : md (8px).">Border radius</SectionTitle>
          <Stack direction="row" flexWrap="wrap" gap={2}>
            {Object.entries(radius).map(([name, px]) => (
              <Box
                key={name}
                title={`${px}px`}
                onClick={() => copy(`${px}px`)}
                sx={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
                  cursor: 'pointer', p: 1.5, borderRadius: '8px',
                  transition: 'background-color 100ms ease',
                  '&:hover': { bgcolor: background.secondaryHover },
                }}
              >
                <Box sx={{
                  width: 48, height: 48, borderRadius: `${px}px`,
                  border: `2px solid ${colors.blue[600]}`, opacity: 0.4,
                }} />
                <T sx={{ fontSize: 12, fontWeight: 600, color: text.primary }}>{name}</T>
                <T sx={{ fontSize: 12, ...mono, color: text.tertiary }}>{px}px</T>
              </Box>
            ))}
          </Stack>
        </Box>

        <Box>
          <SectionTitle>Breakpoints</SectionTitle>
          <Stack spacing={0}>
            {[
              { key: 'xs', px: 0, desc: 'Mobile portrait' },
              { key: 'sm', px: 600, desc: 'Mobile landscape' },
              { key: 'md', px: 900, desc: 'Tablette' },
              { key: 'lg', px: 1200, desc: 'Desktop' },
              { key: 'xl', px: 1536, desc: 'Large desktop' },
            ].map(({ key, px, desc }, i) => (
              <Box
                key={key}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 2,
                  py: 1.25, borderBottom: `1px solid ${border.primary}`,
                }}
              >
                <Chip label={key} size="small" sx={{ ...mono, fontWeight: 700, fontSize: 12, minWidth: 40 }} />
                <T sx={{ width: 64, fontSize: 12, ...mono, color: text.secondary, textAlign: 'right' }}>{px}px</T>
                <T sx={{ fontSize: 14, color: text.tertiary }}>{desc}</T>
                <Box sx={{ flex: 1 }} />
                <Box sx={{
                  height: 6, width: Math.max((px / 1536) * 200, 8),
                  bgcolor: colors.blue[600], borderRadius: '3px',
                  opacity: 0.15 + i * 0.18,
                }} />
              </Box>
            ))}
          </Stack>
        </Box>

        {snackbar}
      </Page>
    );
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ELEVATION — Shadow cards
// ═══════════════════════════════════════════════════════════════════════════════

const shadows = [
  { level: 0, name: 'none', usage: 'Flat / outlined' },
  { level: 1, name: 'xs', usage: 'Hover subtil' },
  { level: 2, name: 'sm', usage: 'Dropdowns' },
  { level: 3, name: 'md', usage: 'Menus, popovers' },
  { level: 4, name: 'lg', usage: 'Modales' },
  { level: 5, name: 'xl', usage: 'Focus overlay' },
];

export const Elevation = {
  name: 'Elevation',
  render: () => (
    <Page>
      <PageHeader
        title="Elevation"
        description="Shadows volontairement légères. Préférer les bordures pour les composants statiques."
      />

      <Box>
        <SectionTitle>Shadow scale</SectionTitle>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
        }}>
          {shadows.map(({ level, name, usage }) => (
            <Box
              key={level}
              sx={{
                p: 3, borderRadius: '8px',
                border: `1px solid ${border.primary}`,
                bgcolor: background.primary,
                boxShadow: level,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                transition: 'transform 150ms ease',
                '&:hover': { transform: 'translateY(-3px)' },
              }}
            >
              <T sx={{ fontSize: 32, fontWeight: 700, color: text.disabled, mb: 1 }}>{level}</T>
              <T sx={{ fontSize: 14, fontWeight: 600, color: text.primary }}>{name}</T>
              <T sx={{ fontSize: 12, color: text.tertiary, mt: 0.25 }}>{usage}</T>
            </Box>
          ))}
        </Box>
      </Box>
    </Page>
  ),
};

// ═══════════════════════════════════════════════════════════════════════════════
// MOTION — Interactive previews
// ═══════════════════════════════════════════════════════════════════════════════

const durations = [
  { name: 'shortest', ms: 150, usage: 'Micro-interactions' },
  { name: 'shorter', ms: 200, usage: 'Hover states' },
  { name: 'short', ms: 250, usage: 'Boutons, chips' },
  { name: 'standard', ms: 300, usage: 'Transitions de page' },
  { name: 'complex', ms: 375, usage: 'Drawers, panels' },
  { name: 'entering', ms: 225, usage: 'Entrée' },
  { name: 'leaving', ms: 195, usage: 'Sortie' },
];

const easings = [
  { name: 'easeInOut', value: 'cubic-bezier(0.4, 0, 0.2, 1)', usage: 'Standard' },
  { name: 'easeOut', value: 'cubic-bezier(0.0, 0, 0.2, 1)', usage: 'Entrée' },
  { name: 'easeIn', value: 'cubic-bezier(0.4, 0, 1, 1)', usage: 'Sortie' },
  { name: 'sharp', value: 'cubic-bezier(0.4, 0, 0.6, 1)', usage: 'Ré-entrée' },
];

const MotionDot = ({ ms }) => {
  const [active, setActive] = useState(false);
  const trigger = () => { setActive(true); setTimeout(() => setActive(false), ms + 100); };
  return (
    <Box
      onClick={trigger}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && trigger()}
      aria-label={`Preview ${ms}ms`}
      sx={{
        width: 24, height: 24, borderRadius: '50%', flexShrink: 0, cursor: 'pointer',
        bgcolor: active ? colors.blue[600] : border.secondary,
        transition: `background-color ${ms}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    />
  );
};

export const Motion = {
  name: 'Motion',
  render: () => (
    <Page>
      <PageHeader
        title="Motion"
        description="Vitesse et rythme des transitions. Plus l'interaction est simple, plus elle est courte. Cliquer sur les cercles pour prévisualiser."
      />

      <Box sx={{ mb: 6 }}>
        <SectionTitle>Durations</SectionTitle>
        <Box sx={{ border: `1px solid ${border.primary}`, borderRadius: '8px', overflow: 'hidden', py: 0.5 }}>
          {durations.map(({ name, ms, usage }) => (
            <Box
              key={name}
              sx={{
                display: 'flex', alignItems: 'center', gap: 2,
                py: 1, px: 1.5,
              }}
            >
              <MotionDot ms={ms} />
              <T sx={{ width: 90, fontSize: 14, fontWeight: 500, ...mono, color: text.primary }}>{name}</T>
              <T sx={{ width: 48, fontSize: 12, ...mono, color: text.tertiary, textAlign: 'right' }}>{ms}ms</T>
              <T sx={{ fontSize: 14, color: text.tertiary }}>{usage}</T>
            </Box>
          ))}
        </Box>
      </Box>

      <Box>
        <SectionTitle>Easing curves</SectionTitle>
        <Stack direction="row" spacing={2}>
          {easings.map(({ name, value, usage }) => (
            <Box
              key={name}
              sx={{
                flex: 1, py: 2, px: 2,
                border: `1px solid ${border.primary}`, borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <T sx={{ fontSize: 14, fontWeight: 600, color: text.primary, mb: 0.5 }}>{name}</T>
              <T sx={{ fontSize: 12, ...mono, color: text.disabled, mb: 0.5 }}>{value}</T>
              <T sx={{ fontSize: 12, color: text.tertiary }}>{usage}</T>
            </Box>
          ))}
        </Stack>
      </Box>
    </Page>
  ),
};
