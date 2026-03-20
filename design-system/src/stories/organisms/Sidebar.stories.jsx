import { useState } from 'react';
import { Box, Typography, Avatar, Tooltip, Collapse, Divider } from '@mui/material';
import { HugeiconsIcon } from '@hugeicons/react';
import { DocPage } from '../utils/DocPage.jsx';
import {
  Building01Icon, CheckListIcon, Globe02Icon, StarIcon, Megaphone01Icon,
  Share01Icon, BarChartIcon, Settings01Icon, Logout01Icon, ArrowRight02Icon,
  Analytics01Icon, Chart01Icon, Target01Icon, UserIcon, Calendar01Icon,
  ProfileIcon, GroupIcon, CreditCardIcon,
} from '@hugeicons/core-free-icons';

/* ─── Light theme tokens ─── */

const s = {
  width: 256,
  widthCollapsed: 52,
  bg: '#FBFBFB',
  borderColor: '#F0F0F0',
  fg: '#6B6B6B',
  fgActive: '#171717',
  fgMuted: '#A0A0A0',
  activeBg: '#F0F0F0',
  hoverBg: '#F5F5F5',
  itemH: 34,
  subItemH: 30,
  iconSize: 18,
  radius: '8px',
  transition: 'all 180ms ease',
};

/* ─── Shared components ─── */

function NavItem({ icon, label, active, children, collapsed, activeItem, onNavigate }) {
  const hasChildren = children && children.length > 0;
  const isParentActive = hasChildren && children.some(c => c.id === activeItem);
  const [open, setOpen] = useState(isParentActive);
  const highlighted = active || isParentActive;

  const handleClick = () => {
    if (hasChildren) setOpen(o => !o);
    else onNavigate(label);
  };

  return (
    <>
      <Tooltip title={collapsed ? label : ''} placement="right" arrow disableInteractive>
        <Box
          onClick={handleClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            height: s.itemH,
            px: collapsed ? 0 : '10px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            borderRadius: s.radius,
            cursor: 'pointer',
            transition: s.transition,
            bgcolor: highlighted ? s.activeBg : 'transparent',
            '&:hover': { bgcolor: highlighted ? s.activeBg : s.hoverBg },
          }}
        >
          <Box sx={{ width: s.iconSize, height: s.iconSize, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HugeiconsIcon icon={icon} size={s.iconSize} color={highlighted ? s.fgActive : s.fg} />
          </Box>
          {!collapsed && (
            <>
              <Typography sx={{
                fontSize: 13.5, fontWeight: highlighted ? 500 : 400,
                color: highlighted ? s.fgActive : s.fg,
                flex: 1, lineHeight: '20px',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {label}
              </Typography>
              {hasChildren && (
                <Box sx={{ transition: s.transition, transform: open ? 'rotate(90deg)' : 'rotate(0deg)', display: 'flex', alignItems: 'center' }}>
                  <HugeiconsIcon icon={ArrowRight02Icon} size={14} color={s.fgMuted} />
                </Box>
              )}
            </>
          )}
        </Box>
      </Tooltip>
      {hasChildren && !collapsed && (
        <Collapse in={open} timeout={180}>
          <Box sx={{ ml: '21px', borderLeft: `1px solid ${s.borderColor}`, pl: '10px', display: 'flex', flexDirection: 'column', gap: '2px', py: '4px' }}>
            {children.map((child) => {
              const childActive = activeItem === child.id;
              return (
                <Box key={child.id} onClick={() => onNavigate(child.id)} sx={{
                  display: 'flex', alignItems: 'center', height: s.subItemH, px: '10px',
                  borderRadius: s.radius, cursor: 'pointer', transition: s.transition,
                  bgcolor: childActive ? s.activeBg : 'transparent',
                  '&:hover': { bgcolor: childActive ? s.activeBg : s.hoverBg },
                }}>
                  <Typography sx={{ fontSize: 13, fontWeight: childActive ? 500 : 400, color: childActive ? s.fgActive : s.fg }}>
                    {child.label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Collapse>
      )}
    </>
  );
}

function GroupLabel({ label }) {
  return (
    <Typography sx={{
      fontSize: 11, fontWeight: 500, color: s.fgMuted, textTransform: 'uppercase',
      letterSpacing: '0.05em', px: '10px', pt: '12px', pb: '4px',
    }}>
      {label}
    </Typography>
  );
}

function UserFooter({ name, email, collapsed }) {
  const initials = name.split(' ').map(n => n[0]).join('');
  if (collapsed) {
    return (
      <Tooltip title={name} placement="right" arrow>
        <Avatar sx={{ width: 30, height: 30, bgcolor: '#171717', fontSize: 11, fontWeight: 600, borderRadius: '8px', cursor: 'pointer', mx: 'auto' }}>
          {initials}
        </Avatar>
      </Tooltip>
    );
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', px: '10px', py: '8px', borderRadius: s.radius, cursor: 'pointer', transition: s.transition, '&:hover': { bgcolor: s.hoverBg } }}>
      <Avatar sx={{ width: 30, height: 30, bgcolor: '#171717', fontSize: 11, fontWeight: 600, borderRadius: '8px' }}>
        {initials}
      </Avatar>
      <Box sx={{ overflow: 'hidden', flex: 1 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 500, color: s.fgActive, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {name}
        </Typography>
        <Typography sx={{ fontSize: 11, color: s.fgMuted, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {email}
        </Typography>
      </Box>
      <HugeiconsIcon icon={Logout01Icon} size={15} color={s.fgMuted} />
    </Box>
  );
}

function SidebarShell({ width, collapsed, children }) {
  return (
    <Box sx={{
      width, height: '100vh', bgcolor: s.bg,
      borderRight: `1px solid ${s.borderColor}`,
      display: 'flex', flexDirection: 'column',
      ...(collapsed ? { alignItems: 'center', py: '8px', px: '4px' } : { p: '8px' }),
      boxSizing: 'border-box',
    }}>
      {children}
    </Box>
  );
}

/* ─── Nav configs ─── */

const SAAS_NAV = {
  groups: [
    {
      label: 'Platform',
      items: [
        { id: 'etablissements', label: 'Établissements', icon: Building01Icon },
        { id: 'listings', label: 'Listings', icon: CheckListIcon },
        { id: 'quicksite', label: 'Quicksite', icon: Globe02Icon },
        { id: 'reputation', label: 'Réputation', icon: StarIcon },
        { id: 'campagne', label: 'Campagne', icon: Megaphone01Icon },
        { id: 'social', label: 'Social', icon: Share01Icon },
        {
          id: 'performance', label: 'Performance', icon: BarChartIcon,
          children: [
            { id: 'perf-analytics', label: 'Analytics', icon: Analytics01Icon },
            { id: 'perf-reports', label: 'Rapports', icon: Chart01Icon },
            { id: 'perf-goals', label: 'Objectifs', icon: Target01Icon },
          ],
        },
      ],
    },
  ],
  bottom: [{ id: 'parametres', label: 'Paramètres', icon: Settings01Icon }],
  user: { name: 'Alexandre Clair', email: 'alex@dilypse.com' },
};

const BACKOFFICE_NAV = {
  groups: [
    {
      label: 'Gestion',
      items: [
        { id: 'comptes', label: 'Comptes', icon: Building01Icon },
        { id: 'revendeurs', label: 'Revendeurs', icon: GroupIcon },
        { id: 'utilisateurs', label: 'Utilisateurs', icon: UserIcon },
        { id: 'jours-feries', label: 'Jours fériés', icon: Calendar01Icon },
      ],
    },
    {
      label: 'Système',
      items: [
        { id: 'abonnements', label: 'Abonnements', icon: CreditCardIcon },
        { id: 'profils', label: 'Profils & rôles', icon: ProfileIcon },
        {
          id: 'analytics', label: 'Analytics', icon: BarChartIcon,
          children: [
            { id: 'ana-usage', label: 'Utilisation' },
            { id: 'ana-perf', label: 'Performance' },
            { id: 'ana-logs', label: 'Logs' },
          ],
        },
      ],
    },
  ],
  bottom: [{ id: 'parametres', label: 'Paramètres', icon: Settings01Icon }],
  user: { name: 'Admin Dilypse', email: 'admin@dilypse.com' },
};

/* ─── Sidebar renderer ─── */

function Sidebar({ nav, defaultActive, collapsed = false }) {
  const [active, setActive] = useState(defaultActive || nav.groups[0]?.items[0]?.id);

  if (collapsed) {
    const allItems = nav.groups.flatMap(g => g.items);
    return (
      <SidebarShell width={s.widthCollapsed} collapsed>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', width: '100%', pt: '4px' }}>
          {allItems.map((item) => (
            <NavItem key={item.id} icon={item.icon} label={item.label} active={active === item.id} collapsed activeItem={active} onNavigate={setActive} />
          ))}
        </Box>
        <Box sx={{ borderTop: `1px solid ${s.borderColor}`, pt: '8px', mt: '4px', width: '100%', display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
          {nav.bottom.map((item) => (
            <NavItem key={item.id} icon={item.icon} label={item.label} active={active === item.id} collapsed activeItem={active} onNavigate={setActive} />
          ))}
          <Box sx={{ pt: '4px' }}>
            <UserFooter name={nav.user.name} email={nav.user.email} collapsed />
          </Box>
        </Box>
      </SidebarShell>
    );
  }

  return (
    <SidebarShell width={s.width}>
      <Box sx={{
        flex: 1, overflowY: 'auto', overflowX: 'hidden',
        display: 'flex', flexDirection: 'column', gap: '2px',
        '&::-webkit-scrollbar': { width: 4 },
        '&::-webkit-scrollbar-thumb': { bgcolor: '#E0E0E0', borderRadius: 2 },
      }}>
        {nav.groups.map((group, i) => (
          <Box key={group.label}>
            <GroupLabel label={group.label} />
            {group.items.map((item) => (
              <NavItem
                key={item.id} icon={item.icon} label={item.label}
                active={active === item.id} children={item.children}
                collapsed={false} activeItem={active} onNavigate={setActive}
              />
            ))}
          </Box>
        ))}
      </Box>
      <Box sx={{ borderTop: `1px solid ${s.borderColor}`, pt: '8px', mt: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {nav.bottom.map((item) => (
          <NavItem key={item.id} icon={item.icon} label={item.label} active={active === item.id} collapsed={false} activeItem={active} onNavigate={setActive} />
        ))}
        <UserFooter name={nav.user.name} email={nav.user.email} />
      </Box>
    </SidebarShell>
  );
}

/* ─── Section helper ─── */

const S = ({ label, children }) => (
  <Box sx={{ mt: 4 }}>
    <Typography variant="overline" sx={{ color: 'text.disabled', fontSize: 12, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 2 }}>
      {label}
    </Typography>
    {children}
  </Box>
);

/* ─── Stories ─── */

export default {
  title: 'Organisms/Sidebar',
  parameters: {
    controls: { disable: true },
    options: { showPanel: false },
    layout: 'fullscreen',
  },
};

export const Overview = {
  name: 'Overview',
  render: function Render() {
    return (
      <>
        <DocPage
          title="Sidebar"
          description="La Sidebar est le composant de navigation principal de l'application. Elle organise les pages en groupes logiques avec des labels, supporte les sous-menus collapsibles, et inclut un user footer. Elle suit les guidelines shadcn/ui : structure 3 zones (content scrollable, footer sticky), items de 34px, icônes 18px, transitions 180ms."
          dos={[
            'Grouper les items par domaine fonctionnel avec un GroupLabel (ex : Platform, Gestion).',
            'Limiter les labels à 1–2 mots pour éviter le truncate.',
            'Toujours afficher un item actif — jamais de sidebar sans sélection.',
            'Utiliser les sous-menus uniquement pour les sections avec 2+ sous-pages.',
            'Placer le user footer en bas avec avatar, nom et email.',
          ]}
          donts={[
            'Ne pas dépasser 2 niveaux de navigation (parent → enfant).',
            'Ne pas ajouter plus de 10 items au premier niveau — regrouper ou simplifier.',
            'Ne pas utiliser de couleurs vives pour l\'état actif — rester sur un fond neutre subtil.',
            'Ne pas masquer le footer user en mode expanded.',
          ]}
          a11y={[
            'Chaque item de navigation doit être focusable au clavier (Tab / Shift+Tab).',
            'L\'item actif doit avoir aria-current="page".',
            'Les sous-menus utilisent aria-expanded pour indiquer leur état.',
            'En mode collapsed, chaque icône a un Tooltip accessible.',
          ]}
          related={['Header', 'Tabs', 'Breadcrumbs']}
        />
        <Divider sx={{ my: 4 }} />
        <Box sx={{ px: 3, pb: 4 }}>
          <S label="SaaS — Expanded">
            <Box sx={{ border: '1px solid #F0F0F0', borderRadius: '12px', overflow: 'hidden', display: 'inline-flex', height: 560 }}>
              <Sidebar nav={SAAS_NAV} defaultActive="reputation" />
            </Box>
          </S>

          <S label="SaaS — Collapsed">
            <Box sx={{ border: '1px solid #F0F0F0', borderRadius: '12px', overflow: 'hidden', display: 'inline-flex', height: 560 }}>
              <Sidebar nav={SAAS_NAV} defaultActive="reputation" collapsed />
            </Box>
          </S>

          <S label="Back-office — Expanded">
            <Box sx={{ border: '1px solid #F0F0F0', borderRadius: '12px', overflow: 'hidden', display: 'inline-flex', height: 560 }}>
              <Sidebar nav={BACKOFFICE_NAV} defaultActive="comptes" />
            </Box>
          </S>

          <S label="Back-office — Collapsed">
            <Box sx={{ border: '1px solid #F0F0F0', borderRadius: '12px', overflow: 'hidden', display: 'inline-flex', height: 560 }}>
              <Sidebar nav={BACKOFFICE_NAV} defaultActive="comptes" collapsed />
            </Box>
          </S>
        </Box>
      </>
    );
  },
};
