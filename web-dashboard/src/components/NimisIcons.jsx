import React from 'react';

// Custom domain-specific vector icons matching the NIMIS Client Concept Visual Board

export const IrrigatedFieldIcon = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M5 26C12 22 28 22 35 26" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M4 31C12 27 28 27 36 31" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M8 35C15 32 25 32 32 35" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.75" />
    <path d="M20 22V12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M20 12C17 9 13 8 10 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2.5" />
    <path d="M20 12C23 9 27 8 30 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2.5" />
    <circle cx="20" cy="10" r="2.2" fill="currentColor" />
    <path d="M14 16L12 18M26 16L28 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
  </svg>
);

export const BullseyeTargetIcon = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <circle cx="19" cy="21" r="13" stroke="currentColor" strokeWidth="2.5" opacity="0.35" />
    <circle cx="19" cy="21" r="8.5" stroke="currentColor" strokeWidth="2.5" opacity="0.7" />
    <circle cx="19" cy="21" r="3.5" fill="currentColor" />
    <path d="M33 7L21.5 18.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M28 7H33V12" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LandscapeSunriseIcon = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <circle cx="20" cy="14" r="5" fill="currentColor" opacity="0.85" />
    <path d="M20 5V7M11 9L12.5 10.5M29 9L27.5 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 25C10 20 16 20 22 24C27 27 32 25 36 22V34H4V25Z" fill="currentColor" opacity="0.22" />
    <path d="M4 26C11 22 18 22 24 25C29 27.5 33 26 36 24" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M6 31C14 28 26 28 34 31" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M10 35C16 33 24 33 30 35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
  </svg>
);

export const DamSpillwayIcon = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M6 12H16L22 30H6V12Z" fill="currentColor" opacity="0.22" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M16 14C22 14 24 22 29 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M18 19C22 20 24 24 27 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
    <path d="M4 33C8 31 12 35 16 33C20 31 24 35 28 33C31 31.5 34 33 36 33" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M8 18H13M8 23H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const ReservoirLakeIcon = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M4 22L12 11L19 18L26 10L36 22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 26C9 24 13 28 17 26C21 24 25 28 29 26C32 24.5 34 26 36 26" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M7 32C11 30 15 34 19 32C23 30 27 34 33 31" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.75" />
  </svg>
);

export const WaterDropAllocIcon = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M20 6C20 6 9 18.5 9 25.5C9 31.3 13.9 36 20 36C26.1 36 31 31.3 31 25.5C31 18.5 20 6 20 6Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
    <path d="M15 26C15 28.8 17.2 31 20 31" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);

export const WaterPumpIcon = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M6 22H14M26 22H34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <circle cx="20" cy="22" r="7" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2.4" />
    <path d="M20 15V9M15 9H25" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M17 22H23M20 19V25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M31 27C31 27 28 30.5 28 32.5C28 34.2 29.3 35.5 31 35.5C32.7 35.5 34 34.2 34 32.5C34 30.5 31 27 31 27Z" fill="currentColor" />
  </svg>
);

export const BalanceScalesIcon = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M20 7V33M13 33H27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M9 13H31" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M10 13L6 23H14L10 13Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <path d="M30 13L26 23H34L30 13Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="20" cy="13" r="2.2" fill="currentColor" />
  </svg>
);

export const HeadworksGaugeIcon = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M7 27A14 14 0 1 1 33 27" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M20 24L27 16" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    <circle cx="20" cy="24" r="3" fill="currentColor" />
    <path d="M10 31H30" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export const ConveyancePipeIcon = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <rect x="4" y="16" width="32" height="8" rx="2" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2.3" />
    <path d="M14 13V27M26 13V27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M20 16V10M16 10H24" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
  </svg>
);

export const InfieldSprinklerIcon = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M20 34V16" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M14 34H26" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M16 16H24" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M18 14C14 10 9 10 6 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="2 3" />
    <path d="M22 14C26 10 31 10 34 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="2 3" />
    <path d="M12 20L10 23M28 20L30 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const AccessRoadIcon = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M13 6L6 34H34L27 6H13Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="round" />
    <path d="M20 10V15M20 19V24M20 28V32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const OmFundBagIcon = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M15 11L13 7H27L25 11" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M11 16C11 13 14 11 20 11C26 11 29 13 29 16L32 28C32 32 28 35 20 35C12 35 8 32 8 28L11 16Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2.3" />
    <text x="20" y="27" textAnchor="middle" fill="currentColor" fontSize="13" fontWeight="900">$</text>
  </svg>
);

export const HarvestSackIcon = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M15 10L12 6H28L25 10" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M12 14C12 11.5 15 10 20 10C25 10 28 11.5 28 14L31 28C31 32 27 35 20 35C13 35 9 32 9 28L12 14Z" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2.3" />
    <path d="M20 17V29M17 20L20 17L23 20M17 24L20 21L23 24" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const YieldChartIcon = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <rect x="7" y="24" width="5" height="10" rx="1" fill="currentColor" opacity="0.45" />
    <rect x="16" y="19" width="5" height="15" rx="1" fill="currentColor" opacity="0.7" />
    <rect x="25" y="13" width="5" height="21" rx="1" fill="currentColor" />
    <path d="M7 18L17 12L24 14L33 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M28 6H33V11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SeasonCycleIcon = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <path d="M31 16A12 12 0 0 0 10 13" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M10 8V14H16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 24A12 12 0 0 0 30 27" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M30 32V26H24" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const GoldCoinIcon = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className}>
    <circle cx="20" cy="20" r="13" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="20" cy="20" r="9.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.65" />
    <text x="20" y="25" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="900">$</text>
  </svg>
);
