import { useState } from 'react';
import { Box, Typography, Avatar, Tooltip, Collapse } from '@mui/material';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Building01Icon, CheckListIcon, Globe02Icon, StarIcon, Megaphone01Icon,
  Share01Icon, BarChartIcon, Settings01Icon, Logout01Icon, ArrowRight02Icon,
  Analytics01Icon, Chart01Icon, Target01Icon,
} from '@hugeicons/core-free-icons';

const s = {
  width: 256,
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

const NAV = [
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
];

function NavItem({ icon, label, active, children, activeItem, onNavigate }) {
  const hasChildren = children && children.length > 0;
  const isParentActive = hasChildren && children.some(c => c.id === activeItem);
  const [open, setOpen] = useState(isParentActive);
  const highlighted = active || isParentActive;

  return (
    <>
      <Box
        onClick={() => hasChildren ? setOpen(o => !o) : onNavigate?.(label)}
        sx={{
          display: 'flex', alignItems: 'center', gap: '10px',
          height: s.itemH, px: '10px', borderRadius: s.radius,
          cursor: 'pointer', transition: s.transition,
          bgcolor: highlighted ? s.activeBg : 'transparent',
          '&:hover': { bgcolor: highlighted ? s.activeBg : s.hoverBg },
        }}
      >
        <Box sx={{ width: s.iconSize, height: s.iconSize, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <HugeiconsIcon icon={icon} size={s.iconSize} color={highlighted ? s.fgActive : s.fg} />
        </Box>
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
      </Box>
      {hasChildren && (
        <Collapse in={open} timeout={180}>
          <Box sx={{ ml: '21px', borderLeft: `1px solid ${s.borderColor}`, pl: '10px', display: 'flex', flexDirection: 'column', gap: '2px', py: '4px' }}>
            {children.map((child) => {
              const childActive = activeItem === child.id;
              return (
                <Box key={child.id} onClick={() => onNavigate?.(child.id)} sx={{
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

export default function Sidebar({ activeItem = 'reputation' }) {
  return (
    <Box sx={{
      width: s.width, height: '100vh', bgcolor: s.bg,
      borderRight: `1px solid ${s.borderColor}`,
      display: 'flex', flexDirection: 'column',
      p: '8px', boxSizing: 'border-box', flexShrink: 0,
    }}>
      {/* Content */}
      <Box sx={{
        flex: 1, overflowY: 'auto', overflowX: 'hidden',
        display: 'flex', flexDirection: 'column', gap: '2px',
        '&::-webkit-scrollbar': { width: 4 },
        '&::-webkit-scrollbar-thumb': { bgcolor: '#E0E0E0', borderRadius: 2 },
      }}>
        {NAV.map((group) => (
          <Box key={group.label}>
            <Typography sx={{
              fontSize: 11, fontWeight: 500, color: s.fgMuted, textTransform: 'uppercase',
              letterSpacing: '0.05em', px: '10px', pt: '12px', pb: '4px',
            }}>
              {group.label}
            </Typography>
            {group.items.map((item) => (
              <NavItem
                key={item.id} icon={item.icon} label={item.label}
                active={activeItem === item.id} children={item.children}
                activeItem={activeItem}
              />
            ))}
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box sx={{ borderTop: `1px solid ${s.borderColor}`, pt: '8px', mt: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: '10px', height: s.itemH, px: '10px',
          borderRadius: s.radius, cursor: 'pointer', transition: s.transition,
          '&:hover': { bgcolor: s.hoverBg },
        }}>
          <HugeiconsIcon icon={Settings01Icon} size={s.iconSize} color={s.fg} />
          <Typography sx={{ fontSize: 13.5, color: s.fg, flex: 1 }}>Paramètres</Typography>
        </Box>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: '10px',
          px: '10px', py: '8px', borderRadius: s.radius,
          cursor: 'pointer', transition: s.transition,
          '&:hover': { bgcolor: s.hoverBg },
        }}>
          <Avatar sx={{ width: 30, height: 30, bgcolor: '#171717', fontSize: 11, fontWeight: 600, borderRadius: '8px' }}>
            AC
          </Avatar>
          <Box sx={{ overflow: 'hidden', flex: 1 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 500, color: s.fgActive, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Alexandre Clair
            </Typography>
            <Typography sx={{ fontSize: 11, color: s.fgMuted, lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              alex@dilypse.com
            </Typography>
          </Box>
          <HugeiconsIcon icon={Logout01Icon} size={15} color={s.fgMuted} />
        </Box>
      </Box>
    </Box>
  );
}
