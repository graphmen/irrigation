// NIMIS — National Irrigation Management Information System
// Unified Survey Questionnaire Schema (mWater Baseline) + NIMIS Concept Architecture & Power BI KPI Standards

export const NATIONAL_2030_TARGET_HA = 496000;
export const DATA_AS_AT_DATE = '24 November 2026';

export const PROVINCES = [
  'Masvingo',
  'Manicaland',
  'Midlands',
  'Mashonaland East',
  'Mashonaland West',
  'Mashonaland Central',
  'Matabeleland South',
  'Matabeleland North'
];

export const WATER_SOURCES = [
  'River',
  'Dam',
  'Borehole',
  'Treated wastewater',
  'Spring',
  'Well',
  'Disused mine shafts',
  'Other'
];

export const SCHEME_STATUSES = [
  'Fully functional',
  'Partially functional',
  'Under Construction',
  'Under rehabilitation',
  'Non-functional'
];

export const IRRIGATION_SYSTEMS = [
  'Gravity-fed sprinkler',
  'Pumped sprinkler',
  'Piped surface',
  'Gravity-fed canals',
  'Drip',
  'Pivots',
  'Drag hose',
  'Hose reel',
  'Other'
];

export const ENERGY_SOURCES = [
  'Solar',
  'Electricity',
  'Diesel/petrol',
  'Gravity',
  'Other'
];

export const POWER_STATUSES = [
  'Connected (ZESA)',
  'Solar Off-Grid',
  'Gravity / No Power Needed',
  'Intermittent / Outages',
  'Disconnected / Pending'
];

export const SECTOR_TYPES = [
  'Communal',
  'A1',
  'A2',
  'Institutional',
  'Estates',
  'Private',
  'Farmer-led',
  'Individual',
  'Commercial',
  'Other'
];

export const MANAGEMENT_MODELS = [
  'Farmer/ IMC',
  'Cooperative',
  'ARDA',
  'Public / GoZ',
  'Private Estate',
  'Other'
];

export const VERIFICATION_STAGES = [
  { id: 'Captured',           step: 1, role: 'Scheme Manager / Field Officer / IMC', short: 'Captured',          color: 'slate' },
  { id: 'District Verified',  step: 2, role: 'District Irrigation Dev. Officer',     short: 'District Verified', color: 'sky' },
  { id: 'Provincial Review',  step: 3, role: 'Provincial Irrigation Dev. Officer',   short: 'Provincial Review', color: 'amber' },
  { id: 'Technical Approval', step: 4, role: 'National Technical Unit',              short: 'Tech. Approved',    color: 'violet' },
  { id: 'Published',          step: 5, role: 'NIMIS Administrator',                  short: 'Published',         color: 'emerald' },
];

export const DATA_SOURCE_TYPES = [
  'Field Officer Survey',
  'Automated Telemetry',
  'Satellite Estimate',
  'Partner Feed (ZINWA/ZESA)',
  'Manual Entry'
];

export const USER_ROLES = [
  { id: 'national_director', label: 'Director of Irrigation (National)', scope: 'National', province: '', district: '' },
  { id: 'nimis_admin',       label: 'National NIMIS Administrator',      scope: 'National', province: '', district: '' },
  { id: 'provincial_man',    label: 'Provincial Officer — Manicaland',   scope: 'Province', province: 'Manicaland', district: '' },
  { id: 'provincial_mid',    label: 'Provincial Officer — Midlands',     scope: 'Province', province: 'Midlands', district: '' },
  { id: 'district_chi',      label: 'District Officer — Chiredzi',       scope: 'District', province: 'Masvingo', district: 'Chiredzi' },
  { id: 'scheme_imc',        label: 'Scheme Manager / IMC',              scope: 'Scheme',   province: '', district: '' },
];

export const INFRASTRUCTURE_RATINGS = ['Good', 'Moderate', 'Bad'];
export const ROAD_RATINGS = ['Good', 'Moderate', 'Poor/ Bad'];
export const NETWORK_PROVIDERS = ['Econet', 'Netone', 'Telecel', 'Other'];
export const MAINTENANCE_RESPONSIBLE = ['Farmers', 'Government of Zimbabwe', 'NGOs', 'Other'];

export const WEATHER_INSTRUMENTS = [
  'Rain gauge',
  'Cup anemometer',
  'Wind vane',
  'Barometer',
  'Thermometer',
  'Hygrometer',
  'Lightning detector',
  'Pyranometer',
  'Other'
];

export const WEATHER_COMPONENTS = [
  'Rainfall',
  'Temperature',
  'Wind speed',
  'Wind direction',
  'Other'
];

export const MAJOR_CROPS = [
  'Green mealies',
  'Grain maize',
  'Wheat',
  'Sugarcane',
  'Soyabeans',
  'Tobacco',
  'Citrus / Oranges',
  'Potatoes',
  'Butternuts',
  'Tomatoes',
  'Onions',
  'Cabbage',
  'Paprika / Chilly',
  'Sugar beans',
  'Watermelons',
  'Lucerne / Fodder',
  'Chomolia',
  'Other'
];

export const SUSTAINABILITY_CHALLENGES = [
  'Unsustainable plot sizes',
  'Inefficient, unreliable, and inequitable water delivery service',
  'Rapid deterioration of infrastructure',
  'Incapacitated to sustainably operate and maintain irrigation infrastructure',
  'Confusion on ownership of the irrigation scheme',
  'Lack of government policy on irrigation',
  'Difficulties accessing finances (loans & credits)',
  'Farmers are not committed to their projects',
  'Unsustainable approaches to development',
  'Political interferences',
  'Other'
];

// ── Illustrative National Context Datasets (clearly labelled as pilot/demo) ──

export const MAJOR_DAMS_DATA = [
  { id: 'DAM-001', name: 'Tugwi-Mukosi', province: 'Masvingo',         capacity_mcm: 1800, storage_mcm: 1620, pct: 90, source: 'ZINWA Feed (Demo)', status: 'Healthy' },
  { id: 'DAM-002', name: 'Mutirikwi',    province: 'Masvingo',         capacity_mcm: 1378, storage_mcm: 1130, pct: 82, source: 'ZINWA Feed (Demo)', status: 'Healthy' },
  { id: 'DAM-003', name: 'Osborne',      province: 'Manicaland',       capacity_mcm: 400,  storage_mcm: 312,  pct: 78, source: 'ZINWA Feed (Demo)', status: 'Healthy' },
  { id: 'DAM-004', name: 'Manyuchi',     province: 'Masvingo',         capacity_mcm: 309,  storage_mcm: 235,  pct: 76, source: 'ZINWA Feed (Demo)', status: 'Healthy' },
  { id: 'DAM-005', name: 'Silalatshani', province: 'Matabeleland South',capacity_mcm: 23,  storage_mcm: 11,   pct: 48, source: 'Officer Survey',    status: 'Watch' },
  { id: 'DAM-006', name: 'Lake Kariba',  province: 'Mashonaland West', capacity_mcm: 64800,storage_mcm: 22420,pct: 35, source: 'ZRA / ZINWA (Demo)',status: 'Low' },
];

export const NATIONAL_PROJECTS_DATA = [
  {
    id: 'PRJ-PSIP-2027',
    programme: 'PSIP National Irrigation Rehabilitation (2026/27)',
    funding_source: 'Government of Zimbabwe (PSIP)',
    province: 'National (8 Provinces)',
    contractor: 'Dept. of Irrigation & Local Contractors',
    target_ha: 17103,
    achieved_ha: 7183,
    physical_progress_pct: 42,
    financial_progress_pct: 38,
    budget_usd: 42500000,
    spent_usd: 16150000,
    status: 'On Track',
    next_milestone: 'Commissioning of 14 communal headworks (Q1 2027)',
    risk_level: 'Medium',
    last_updated: '2026-11-20'
  },
  {
    id: 'PRJ-BI87-2026',
    programme: 'BI-87 Programme (Smallholder Solar & Drip)',
    funding_source: 'GoZ / Bilateral Facility',
    province: 'Manicaland & Masvingo',
    contractor: 'Agricon & Pedstock Consortium',
    target_ha: 1850,
    achieved_ha: 870,
    physical_progress_pct: 47,
    financial_progress_pct: 51,
    budget_usd: 11200000,
    spent_usd: 5712000,
    status: 'On Track',
    next_milestone: 'Solar pump installation at 6 communal blocks',
    risk_level: 'Low',
    last_updated: '2026-11-22'
  },
  {
    id: 'PRJ-BOOST-2026',
    programme: 'Booster Kits & Electrification Rollout',
    funding_source: 'GoZ / ZESA Joint Fund',
    province: 'Matabeleland South & Midlands',
    contractor: 'ZETDC & Provincial Units',
    target_ha: 3112,
    achieved_ha: 218,
    physical_progress_pct: 7,
    financial_progress_pct: 19,
    budget_usd: 8900000,
    spent_usd: 1691000,
    status: 'Behind',
    next_milestone: 'Transformer procurement & 33kV feeder tie-in',
    risk_level: 'High',
    last_updated: '2026-11-18'
  },
  {
    id: 'PRJ-PED-2026',
    programme: 'PEDSTOCK Pivot Expansion (Phase II)',
    funding_source: 'AFC / Private-Public Facility',
    province: 'Mashonaland West & Central',
    contractor: 'Pedstock Zimbabwe',
    target_ha: 1618,
    achieved_ha: 1230,
    physical_progress_pct: 76,
    financial_progress_pct: 72,
    budget_usd: 14600000,
    spent_usd: 10512000,
    status: 'On Track',
    next_milestone: 'Final pressure testing on 8 centre pivots',
    risk_level: 'Low',
    last_updated: '2026-11-21'
  },
  {
    id: 'PRJ-SIRP-2026',
    programme: 'SIRP / IFAD Smallholder Revitalisation',
    funding_source: 'IFAD / OFID / GoZ',
    province: 'Midlands, Masvingo, Mat South, Manicaland',
    contractor: 'Multiple Civil Works Contractors',
    target_ha: 5200,
    achieved_ha: 4420,
    physical_progress_pct: 85,
    financial_progress_pct: 81,
    budget_usd: 28400000,
    spent_usd: 23004000,
    status: 'On Track',
    next_milestone: 'Handover of Exchange & Silalatshani canal lining',
    risk_level: 'Low',
    last_updated: '2026-11-23'
  },
  {
    id: 'PRJ-TURNKEY-CH',
    programme: 'Turnkey Chiredzi North & South Schemes',
    funding_source: 'Treasury / Infrastructure Bond',
    province: 'Masvingo',
    contractor: 'HydroTech Civil Engineering',
    target_ha: 3325,
    achieved_ha: 2660,
    physical_progress_pct: 80,
    financial_progress_pct: 77,
    budget_usd: 19800000,
    spent_usd: 15246000,
    status: 'In Progress',
    next_milestone: 'Night storage dam lining & infield hydrant commissioning',
    risk_level: 'Medium',
    last_updated: '2026-11-19'
  }
];

export const IRRIGATED_AREA_TREND = [
  { year: '2022', equipped_ha: 217000, irrigated_ha: 217000, target_ha: 260000 },
  { year: '2023', equipped_ha: 258770, irrigated_ha: 258770, target_ha: 300000 },
  { year: '2024', equipped_ha: 299326, irrigated_ha: 299326, target_ha: 350000 },
  { year: '2025', equipped_ha: 304930, irrigated_ha: 304930, target_ha: 410000 },
  { year: '2026', equipped_ha: 305121, irrigated_ha: 305121, target_ha: 496000 },
];

export const PROGRAMME_CONTRIBUTION_DATA = [
  { name: 'A1 Commercial',   pct: 48, color: '#1E6BB8' },
  { name: 'Communal',        pct: 28, color: '#279B5E' },
  { name: 'ARDA Estates',    pct: 9,  color: '#5B9BD5' },
  { name: 'BI-87 Programme', pct: 6,  color: '#8E44AD' },
  { name: 'PSIP',            pct: 5,  color: '#E67E22' },
  { name: 'Other (Turnkey)', pct: 4,  color: '#D9534F' },
];

export const MARKET_DESTINATIONS_DATA = [
  { name: 'GMB',             pct: 46, color: '#1E6BB8' },
  { name: 'Agro-Processors', pct: 24, color: '#279B5E' },
  { name: 'Local Markets',   pct: 20, color: '#E67E22' },
  { name: 'Exports',         pct: 6,  color: '#F1C40F' },
  { name: 'Other',           pct: 4,  color: '#7F8C8D' },
];

// ── Pilot Schemes Master Registry (All 5 mWater Baseline Schemes + NIMIS Mandatory Fields) ──

export const INITIAL_SCHEMES_DATA = [
  {
    id: 'ZIM-MAN-CHI-001',
    legacy_id: 'IRR-ZIM-001',
    site_name: 'Nyanyadzi Block A-D',
    scheme_name: 'Nyanyadzi Irrigation Scheme',
    aliases: 'Nyanyadzi Communal Scheme',
    photo_scheme: '/images/canal-communal.jpg',
    province: 'Manicaland',
    district: 'Chimanimani',
    ward: 'Ward 8',
    coordinates: { lat: -19.742, lng: 32.456, alt: 580, verified: true },
    officer: {
      name: 'Tendai Mutasa',
      designation: 'District Irrigation Engineer',
      phone: '+263 77 212 3456',
      email: 't.mutasa@irrigation.gov.zw'
    },
    technical: {
      design_area_ha: 435,
      irrigable_area_ha: 420,
      equipped_area_ha: 412,
      developed_area_ha: 412,
      potential_expansion_ha: 150,
      functional_area_ha: 290,
      actual_irrigated_area_ha: 268,
      current_season: '2026/27 Summer',
      water_source: 'River',
      water_source_name: 'Nyanyadzi & Odzi Rivers',
      abstraction_capacity_ls: 420,
      water_allocation_m3: 3200000,
      water_abstraction_m3: 2450000,
      photo_water_source: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
      beneficiaries_count: 420,
      active_farmers_count: 378,
      plot_size_ha: 0.98,
      blocking_system: 'Yes',
      commissioning_year: 1934,
      status: 'Partially functional',
      irrigation_system: 'Gravity-fed canals',
      energy_source: 'Gravity',
      sector_type: 'Communal',
      management_model: 'Farmer/ IMC'
    },
    energy: {
      power_status: 'Gravity / No Power Needed',
      zesa_meter_no: 'N/A (Gravity Intake)',
      monthly_kwh: 0,
      outage_hours_month: 0,
      bill_status: 'Not Applicable'
    },
    infrastructure: {
      headworks: 'Moderate',
      conveyance: 'Bad',
      has_storage: 'Yes',
      storage: 'Moderate',
      infield: 'Moderate',
      perimeter_fence: 'Bad',
      access_road: 'Moderate',
      mobile_network: 'Good',
      network_providers: ['Econet', 'Netone'],
      last_assessment_date: '2026-10-14'
    },
    om: {
      responsible: 'Farmers',
      has_manual: 'Yes',
      has_fund: 'Yes',
      pays_levy: 'No',
      fund_balance_usd: 4200,
      rehab_count: 3,
      last_rehab_year: 2018,
      rehabilitated_by: 'FAO & Govt of Zimbabwe'
    },
    rehab: {
      needs_rehab: true,
      priority: 'High',
      estimated_cost_usd: 1450000,
      programme: 'PSIP 2026/27',
      funding_source: 'GoZ Treasury / SIRP'
    },
    water_mgmt: {
      sufficient_year_round: 'No',
      has_committee: 'Yes',
      uniform_fittings: 'Yes',
      consistent_schedule: 'Yes',
      water_saving: 'Yes',
      drainage: 'Yes',
      waterlogging: 'No',
      weather_station: 'Yes',
      instruments: ['Rain gauge', 'Thermometer'],
      components: ['Rainfall', 'Temperature']
    },
    agronomic: {
      crops: ['Green mealies', 'Wheat', 'Sugar beans', 'Tomatoes'],
      grow_similar: 'Yes',
      markets: 'Mutare Fresh Produce Market & Local Vendors',
      conducts_market_analysis: 'Yes',
      cropping_intensity_pct: 158
    },
    seasonal_production: [
      { season: '2026 Winter', crop: 'Wheat',         planted_ha: 180, harvested_ha: 175, yield_t_ha: 5.4, production_mt: 945,  market_destination: 'GMB Mutare' },
      { season: '2026 Winter', crop: 'Tomatoes',      planted_ha: 65,  harvested_ha: 62,  yield_t_ha: 38.0,production_mt: 2356, market_destination: 'Mutare Fresh Market' },
      { season: '2026/27 Summer', crop: 'Green mealies', planted_ha: 160, harvested_ha: 155, yield_t_ha: 7.2, production_mt: 1116, market_destination: 'Local & Urban Vendors' },
      { season: '2026/27 Summer', crop: 'Sugar beans',   planted_ha: 108, harvested_ha: 104, yield_t_ha: 2.1, production_mt: 218,  market_destination: 'Regional Traders' },
    ],
    challenges: [
      'Inefficient, unreliable, and inequitable water delivery service',
      'Rapid deterioration of infrastructure',
      'Incapacitated to sustainably operate and maintain irrigation infrastructure',
      'Difficulties accessing finances (loans & credits)'
    ],
    verification: {
      stage: 'Published',
      verified_by: 'Provincial Irrigation Dev. Officer (Manicaland)',
      verified_date: '2026-11-12',
      method: 'Field GPS & Engineering Audit',
      data_source_type: 'Field Officer Survey',
      completeness_pct: 96,
      audit_log: [
        { stage: 'Captured', by: 'Tendai Mutasa (District Eng.)', date: '2026-10-14', note: 'mWater baseline survey & GPS verification submitted' },
        { stage: 'District Verified', by: 'Chimanimani DIDO', date: '2026-10-21', note: 'Canal condition photos and beneficiary register verified' },
        { stage: 'Provincial Review', by: 'Manicaland PIDO', date: '2026-11-02', note: 'Approved for PSIP rehabilitation pipeline' },
        { stage: 'Published', by: 'NIMIS National Admin', date: '2026-11-12', note: 'Published to authoritative national registry' }
      ]
    },
    documents: [
      { title: 'Nyanyadzi Engineering Assessment Report 2026.pdf', type: 'Engineering Audit', date: '2026-10-14', uploaded_by: 'Tendai Mutasa' },
      { title: 'Scheme Boundary & Canal Layout (KML/GeoJSON)', type: 'GIS Boundary', date: '2026-10-18', uploaded_by: 'Manicaland GIS Unit' },
      { title: 'IMC Constitution & Beneficiary Register.xlsx', type: 'Governance', date: '2026-09-29', uploaded_by: 'Nyanyadzi IMC' }
    ],
    updatedAt: '2026-11-12T14:32:00.000Z'
  },
  {
    id: 'ZIM-MID-ZHO-002',
    legacy_id: 'IRR-ZIM-002',
    site_name: 'Exchange Scheme Main',
    scheme_name: 'Exchange Irrigation Scheme',
    aliases: 'Exchange Communal Dam Scheme',
    photo_scheme: '/images/sprinkler-field.jpg',
    province: 'Midlands',
    district: 'Zhombe',
    ward: 'Ward 14',
    coordinates: { lat: -18.912, lng: 29.215, alt: 1120, verified: true },
    officer: {
      name: 'Chipo Zhou',
      designation: 'Irrigation Specialist',
      phone: '+263 71 890 1234',
      email: 'czhou@midlandsirr.org'
    },
    technical: {
      design_area_ha: 540,
      irrigable_area_ha: 525,
      equipped_area_ha: 525,
      developed_area_ha: 525,
      potential_expansion_ha: 200,
      functional_area_ha: 480,
      actual_irrigated_area_ha: 465,
      current_season: '2026/27 Summer',
      water_source: 'Dam',
      water_source_name: 'Exchange Dam',
      abstraction_capacity_ls: 560,
      water_allocation_m3: 4800000,
      water_abstraction_m3: 4120000,
      photo_water_source: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      beneficiaries_count: 980,
      active_farmers_count: 942,
      plot_size_ha: 0.53,
      blocking_system: 'Yes',
      commissioning_year: 1973,
      status: 'Fully functional',
      irrigation_system: 'Pumped sprinkler',
      energy_source: 'Solar',
      sector_type: 'Communal',
      management_model: 'Cooperative'
    },
    energy: {
      power_status: 'Solar Off-Grid',
      zesa_meter_no: 'SOLAR-MID-014 (Hybrid Backup)',
      monthly_kwh: 18400,
      outage_hours_month: 2,
      bill_status: 'Current (Paid)'
    },
    infrastructure: {
      headworks: 'Good',
      conveyance: 'Good',
      has_storage: 'Yes',
      storage: 'Good',
      infield: 'Good',
      perimeter_fence: 'Moderate',
      access_road: 'Good',
      mobile_network: 'Good',
      network_providers: ['Econet', 'Netone', 'Telecel'],
      last_assessment_date: '2026-10-28'
    },
    om: {
      responsible: 'Government of Zimbabwe',
      has_manual: 'Yes',
      has_fund: 'Yes',
      pays_levy: 'Yes',
      fund_balance_usd: 18500,
      rehab_count: 2,
      last_rehab_year: 2022,
      rehabilitated_by: 'SIRP & IFAD'
    },
    rehab: {
      needs_rehab: false,
      priority: 'Low',
      estimated_cost_usd: 120000,
      programme: 'SIRP / IFAD',
      funding_source: 'Cooperative O&M Fund'
    },
    water_mgmt: {
      sufficient_year_round: 'Yes',
      has_committee: 'Yes',
      uniform_fittings: 'Yes',
      consistent_schedule: 'Yes',
      water_saving: 'Yes',
      drainage: 'Yes',
      waterlogging: 'No',
      weather_station: 'Yes',
      instruments: ['Rain gauge', 'Cup anemometer', 'Thermometer', 'Wind vane'],
      components: ['Rainfall', 'Temperature', 'Wind speed']
    },
    agronomic: {
      crops: ['Wheat', 'Grain maize', 'Sugar beans', 'Potatoes'],
      grow_similar: 'Yes',
      markets: 'GMB Kwekwe & Grain Millers Association',
      conducts_market_analysis: 'Yes',
      cropping_intensity_pct: 178
    },
    seasonal_production: [
      { season: '2026 Winter', crop: 'Wheat',       planted_ha: 390, harvested_ha: 386, yield_t_ha: 6.4, production_mt: 2470, market_destination: 'GMB Kwekwe' },
      { season: '2026 Winter', crop: 'Potatoes',    planted_ha: 80,  harvested_ha: 78,  yield_t_ha: 29.5,production_mt: 2301, market_destination: 'Kwekwe & Gweru Wholesalers' },
      { season: '2026/27 Summer', crop: 'Grain maize', planted_ha: 360, harvested_ha: 355, yield_t_ha: 8.1, production_mt: 2875, market_destination: 'GMB Kwekwe' },
      { season: '2026/27 Summer', crop: 'Sugar beans', planted_ha: 105, harvested_ha: 102, yield_t_ha: 2.6, production_mt: 265,  market_destination: 'Grain Millers Assoc.' },
    ],
    challenges: [
      'Unsustainable plot sizes',
      'Difficulties accessing finances (loans & credits)'
    ],
    verification: {
      stage: 'Published',
      verified_by: 'National Technical Unit (Engineering)',
      verified_date: '2026-11-16',
      method: 'Site Inspection & Satellite Cross-Check',
      data_source_type: 'Field Officer Survey',
      completeness_pct: 100,
      audit_log: [
        { stage: 'Captured', by: 'Chipo Zhou (Irrigation Specialist)', date: '2026-10-28', note: 'Full baseline & seasonal yield capture' },
        { stage: 'District Verified', by: 'Zhombe DIDO', date: '2026-11-03', note: 'Verified solar pump logs and dam gauge' },
        { stage: 'Technical Approval', by: 'National Engineering Unit', date: '2026-11-10', note: 'SIRP rehabilitation assets signed off' },
        { stage: 'Published', by: 'NIMIS National Admin', date: '2026-11-16', note: 'Published as reference pilot scheme' }
      ]
    },
    documents: [
      { title: 'SIRP Completion & Handover Certificate.pdf', type: 'Project Handover', date: '2022-11-15', uploaded_by: 'Midlands PIDO' },
      { title: '2026 Winter Wheat Yield Verification.pdf', type: 'Agronomy Audit', date: '2026-10-30', uploaded_by: 'Agritex Zhombe' }
    ],
    updatedAt: '2026-11-16T09:15:00.000Z'
  },
  {
    id: 'ZIM-MAS-CHI-003',
    legacy_id: 'IRR-ZIM-003',
    site_name: 'Tshovane Block 1',
    scheme_name: 'Tshovane Irrigation Scheme',
    aliases: 'Tshovane A1 Drip Cluster',
    photo_scheme: '/images/drip-horticulture.jpg',
    province: 'Masvingo',
    district: 'Chiredzi',
    ward: 'Ward 5',
    coordinates: { lat: -21.045, lng: 31.670, alt: 420, verified: true },
    officer: {
      name: 'Farai Moyo',
      designation: 'Agricultural Extension Officer',
      phone: '+263 77 456 7890',
      email: 'fmoyo@agritex.gov.zw'
    },
    technical: {
      design_area_ha: 200,
      irrigable_area_ha: 185,
      equipped_area_ha: 180,
      developed_area_ha: 165,
      potential_expansion_ha: 80,
      functional_area_ha: 110,
      actual_irrigated_area_ha: 96,
      current_season: '2026/27 Summer',
      water_source: 'Borehole',
      water_source_name: 'Chiredzi Underground Aquifer',
      abstraction_capacity_ls: 145,
      water_allocation_m3: 1100000,
      water_abstraction_m3: 780000,
      photo_water_source: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
      beneficiaries_count: 140,
      active_farmers_count: 118,
      plot_size_ha: 1.28,
      blocking_system: 'No',
      commissioning_year: 1998,
      status: 'Under rehabilitation',
      irrigation_system: 'Drip',
      energy_source: 'Solar',
      sector_type: 'A1',
      management_model: 'Farmer/ IMC'
    },
    energy: {
      power_status: 'Solar Off-Grid',
      zesa_meter_no: 'SOLAR-MAS-009',
      monthly_kwh: 6200,
      outage_hours_month: 14,
      bill_status: 'Maintenance Pending'
    },
    infrastructure: {
      headworks: 'Moderate',
      conveyance: 'Good',
      has_storage: 'No',
      storage: 'Bad',
      infield: 'Moderate',
      perimeter_fence: 'Good',
      access_road: 'Poor/ Bad',
      mobile_network: 'Moderate',
      network_providers: ['Econet'],
      last_assessment_date: '2026-11-01'
    },
    om: {
      responsible: 'Farmers',
      has_manual: 'No',
      has_fund: 'No',
      pays_levy: 'No',
      fund_balance_usd: 0,
      rehab_count: 1,
      last_rehab_year: 2024,
      rehabilitated_by: 'World Vision & Agritex'
    },
    rehab: {
      needs_rehab: true,
      priority: 'High',
      estimated_cost_usd: 640000,
      programme: 'BI-87 Programme',
      funding_source: 'GoZ / World Vision Co-Funding'
    },
    water_mgmt: {
      sufficient_year_round: 'Yes',
      has_committee: 'Yes',
      uniform_fittings: 'Yes',
      consistent_schedule: 'No',
      water_saving: 'Yes',
      drainage: 'No',
      waterlogging: 'No',
      weather_station: 'No',
      instruments: [],
      components: []
    },
    agronomic: {
      crops: ['Chilly', 'Tomatoes', 'Butternuts', 'Onions'],
      grow_similar: 'No',
      markets: 'Chiredzi Town Market & Export Off-takers',
      conducts_market_analysis: 'Yes',
      cropping_intensity_pct: 122
    },
    seasonal_production: [
      { season: '2026 Winter', crop: 'Tomatoes',   planted_ha: 42, harvested_ha: 40, yield_t_ha: 42.0, production_mt: 1680, market_destination: 'Chiredzi & Export Off-takers' },
      { season: '2026 Winter', crop: 'Onions',     planted_ha: 34, harvested_ha: 32, yield_t_ha: 24.0, production_mt: 768,  market_destination: 'Masvingo Wholesalers' },
      { season: '2026/27 Summer', crop: 'Butternuts', planted_ha: 55, harvested_ha: 50, yield_t_ha: 18.5, production_mt: 925,  market_destination: 'Regional Traders' },
      { season: '2026/27 Summer', crop: 'Chilly',     planted_ha: 41, harvested_ha: 39, yield_t_ha: 6.8,  production_mt: 265,  market_destination: 'Export Off-takers' },
    ],
    challenges: [
      'Incapacitated to sustainably operate and maintain irrigation infrastructure',
      'Lack of government policy on irrigation',
      'Difficulties accessing finances (loans & credits)'
    ],
    verification: {
      stage: 'Provincial Review',
      verified_by: 'Chiredzi District Irrigation Officer',
      verified_date: '2026-11-09',
      method: 'Mobile Offline Survey + Photos',
      data_source_type: 'Field Officer Survey',
      completeness_pct: 88,
      audit_log: [
        { stage: 'Captured', by: 'Farai Moyo (Extension Officer)', date: '2026-11-01', note: 'Submitted offline from Tshovane Block 1' },
        { stage: 'District Verified', by: 'Chiredzi DIDO', date: '2026-11-09', note: 'Borehole yield and drip manifold checked' }
      ]
    },
    documents: [
      { title: 'Borehole Pumping Test & Hydrogeology Log.pdf', type: 'Water Resource', date: '2026-10-20', uploaded_by: 'ZINWA Runde' }
    ],
    updatedAt: '2026-11-09T11:45:00.000Z'
  },
  {
    id: 'ZIM-MSW-MHO-004',
    legacy_id: 'IRR-ZIM-004',
    site_name: 'Mubaira Irrigation Hub',
    scheme_name: 'Mubaira Solar Irrigation Scheme',
    aliases: 'Mubaira A2 Pivot Hub',
    photo_scheme: '/images/solar-irrigation.jpg',
    province: 'Mashonaland West',
    district: 'Mhondoro-Ngezi',
    ward: 'Ward 2',
    coordinates: { lat: -18.320, lng: 30.612, alt: 1240, verified: true },
    officer: {
      name: 'Kudzai Gava',
      designation: 'Field Monitoring Officer',
      phone: '+263 78 333 4455',
      email: 'kgava@mashwest-irr.co.zw'
    },
    technical: {
      design_area_ha: 110,
      irrigable_area_ha: 100,
      equipped_area_ha: 95,
      developed_area_ha: 95,
      potential_expansion_ha: 120,
      functional_area_ha: 95,
      actual_irrigated_area_ha: 92,
      current_season: '2026/27 Summer',
      water_source: 'Borehole',
      water_source_name: 'Deep Borehole Field (6 Wells)',
      abstraction_capacity_ls: 115,
      water_allocation_m3: 850000,
      water_abstraction_m3: 790000,
      photo_water_source: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
      beneficiaries_count: 85,
      active_farmers_count: 85,
      plot_size_ha: 1.11,
      blocking_system: 'No',
      commissioning_year: 2021,
      status: 'Fully functional',
      irrigation_system: 'Pivots',
      energy_source: 'Solar',
      sector_type: 'A2',
      management_model: 'Cooperative'
    },
    energy: {
      power_status: 'Connected (ZESA)',
      zesa_meter_no: 'ZETDC-MSW-88412',
      monthly_kwh: 9400,
      outage_hours_month: 6,
      bill_status: 'Current (Paid)'
    },
    infrastructure: {
      headworks: 'Good',
      conveyance: 'Good',
      has_storage: 'Yes',
      storage: 'Good',
      infield: 'Good',
      perimeter_fence: 'Good',
      access_road: 'Good',
      mobile_network: 'Good',
      network_providers: ['Econet', 'Netone'],
      last_assessment_date: '2026-11-05'
    },
    om: {
      responsible: 'Farmers',
      has_manual: 'Yes',
      has_fund: 'Yes',
      pays_levy: 'Yes',
      fund_balance_usd: 11200,
      rehab_count: 0,
      last_rehab_year: 2021,
      rehabilitated_by: 'Initial commissioning by GoZ'
    },
    rehab: {
      needs_rehab: false,
      priority: 'Low',
      estimated_cost_usd: 0,
      programme: 'PEDSTOCK Phase II',
      funding_source: 'AFC Commercial Facility'
    },
    water_mgmt: {
      sufficient_year_round: 'Yes',
      has_committee: 'Yes',
      uniform_fittings: 'Yes',
      consistent_schedule: 'Yes',
      water_saving: 'Yes',
      drainage: 'Yes',
      waterlogging: 'No',
      weather_station: 'Yes',
      instruments: ['Rain gauge', 'Thermometer', 'Barometer', 'Hygrometer'],
      components: ['Rainfall', 'Temperature', 'Wind speed']
    },
    agronomic: {
      crops: ['Wheat', 'Potatoes', 'Grain maize'],
      grow_similar: 'Yes',
      markets: 'Harare Mbare Musika & Supermarket Chains',
      conducts_market_analysis: 'Yes',
      cropping_intensity_pct: 192
    },
    seasonal_production: [
      { season: '2026 Winter', crop: 'Wheat',       planted_ha: 65, harvested_ha: 65, yield_t_ha: 6.8, production_mt: 442, market_destination: 'GMB & Millers' },
      { season: '2026 Winter', crop: 'Potatoes',    planted_ha: 30, harvested_ha: 30, yield_t_ha: 31.0,production_mt: 930, market_destination: 'Supermarket Chains' },
      { season: '2026/27 Summer', crop: 'Grain maize', planted_ha: 92, harvested_ha: 92, yield_t_ha: 8.6, production_mt: 791, market_destination: 'GMB Chegutu' },
    ],
    challenges: [
      'Confusion on ownership of the irrigation scheme'
    ],
    verification: {
      stage: 'Technical Approval',
      verified_by: 'Mashonaland West PIDO',
      verified_date: '2026-11-18',
      method: 'Telemetry + Field Verification',
      data_source_type: 'Automated Telemetry',
      completeness_pct: 98,
      audit_log: [
        { stage: 'Captured', by: 'Kudzai Gava (Monitoring Officer)', date: '2026-11-05', note: 'Pivot telemetry and seasonal yield uploaded' },
        { stage: 'District Verified', by: 'Mhondoro-Ngezi DIDO', date: '2026-11-11', note: 'Verified solar-ZESA hybrid meter readings' },
        { stage: 'Provincial Review', by: 'Mash West PIDO', date: '2026-11-18', note: 'Forwarded for national publication' }
      ]
    },
    documents: [
      { title: 'Mubaira Pivot Telemetry Calibration Log.pdf', type: 'Telemetry QA', date: '2026-11-05', uploaded_by: 'Kudzai Gava' },
      { title: 'ZETDC Grid Tie-In Certificate.pdf', type: 'Energy', date: '2025-08-12', uploaded_by: 'ZESA Mash West' }
    ],
    updatedAt: '2026-11-18T16:10:00.000Z'
  },
  {
    id: 'ZIM-MATS-INS-005',
    legacy_id: 'IRR-ZIM-005',
    site_name: 'Silalatshani Sector 4',
    scheme_name: 'Silalatshani Irrigation Scheme',
    aliases: 'Silalatshani Communal Scheme',
    photo_scheme: '/images/dam-headworks.jpg',
    province: 'Matabeleland South',
    district: 'Insiza',
    ward: 'Ward 11',
    coordinates: { lat: -20.615, lng: 29.350, alt: 960, verified: true },
    officer: {
      name: 'Nkosilathi Nkomo',
      designation: 'Provincial Engineer',
      phone: '+263 77 666 9988',
      email: 'n.nkomo@mat-south.gov.zw'
    },
    technical: {
      design_area_ha: 880,
      irrigable_area_ha: 850,
      equipped_area_ha: 850,
      developed_area_ha: 850,
      potential_expansion_ha: 300,
      functional_area_ha: 310,
      actual_irrigated_area_ha: 245,
      current_season: '2026/27 Summer',
      water_source: 'Dam',
      water_source_name: 'Silalatshani Dam',
      abstraction_capacity_ls: 680,
      water_allocation_m3: 5400000,
      water_abstraction_m3: 2150000,
      photo_water_source: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
      beneficiaries_count: 853,
      active_farmers_count: 412,
      plot_size_ha: 0.99,
      blocking_system: 'Yes',
      commissioning_year: 1967,
      status: 'Partially functional',
      irrigation_system: 'Gravity-fed canals',
      energy_source: 'Gravity',
      sector_type: 'Communal',
      management_model: 'Farmer/ IMC'
    },
    energy: {
      power_status: 'Gravity / No Power Needed',
      zesa_meter_no: 'N/A (Gravity Dam Canal)',
      monthly_kwh: 0,
      outage_hours_month: 0,
      bill_status: 'Not Applicable'
    },
    infrastructure: {
      headworks: 'Bad',
      conveyance: 'Bad',
      has_storage: 'Yes',
      storage: 'Moderate',
      infield: 'Bad',
      perimeter_fence: 'Bad',
      access_road: 'Poor/ Bad',
      mobile_network: 'Poor/Bad',
      network_providers: ['Netone'],
      last_assessment_date: '2026-10-19'
    },
    om: {
      responsible: 'Farmers',
      has_manual: 'No',
      has_fund: 'No',
      pays_levy: 'No',
      fund_balance_usd: 0,
      rehab_count: 4,
      last_rehab_year: 2012,
      rehabilitated_by: 'ZINWA & Agritex'
    },
    rehab: {
      needs_rehab: true,
      priority: 'Critical',
      estimated_cost_usd: 3850000,
      programme: 'PSIP 2026/27 Priority Rehab',
      funding_source: 'GoZ / IFAD Pipeline'
    },
    water_mgmt: {
      sufficient_year_round: 'No',
      has_committee: 'Yes',
      uniform_fittings: 'No',
      consistent_schedule: 'No',
      water_saving: 'No',
      drainage: 'No',
      waterlogging: 'Yes',
      weather_station: 'No',
      instruments: [],
      components: []
    },
    agronomic: {
      crops: ['Green mealies', 'Sugar beans', 'Chomolia'],
      grow_similar: 'Yes',
      markets: 'Bulawayo Produce Market & Gwanda Traders',
      conducts_market_analysis: 'No',
      cropping_intensity_pct: 68
    },
    seasonal_production: [
      { season: '2026 Winter', crop: 'Chomolia',      planted_ha: 95,  harvested_ha: 88,  yield_t_ha: 14.0, production_mt: 1232, market_destination: 'Bulawayo Produce Market' },
      { season: '2026/27 Summer', crop: 'Green mealies', planted_ha: 150, harvested_ha: 138, yield_t_ha: 5.8,  production_mt: 800,  market_destination: 'Gwanda & Bulawayo Traders' },
      { season: '2026/27 Summer', crop: 'Sugar beans',   planted_ha: 95,  harvested_ha: 86,  yield_t_ha: 1.7,  production_mt: 146,  market_destination: 'Local Markets' },
    ],
    challenges: [
      'Inefficient, unreliable, and inequitable water delivery service',
      'Rapid deterioration of infrastructure',
      'Incapacitated to sustainably operate and maintain irrigation infrastructure',
      'Farmers are not committed to their projects'
    ],
    verification: {
      stage: 'District Verified',
      verified_by: 'Insiza District Irrigation Officer',
      verified_date: '2026-10-26',
      method: 'Field Inspection (Urgent Rehab Flag)',
      data_source_type: 'Field Officer Survey',
      completeness_pct: 84,
      audit_log: [
        { stage: 'Captured', by: 'Nkosilathi Nkomo (Prov. Engineer)', date: '2026-10-19', note: 'Critical canal & headworks deterioration logged' },
        { stage: 'District Verified', by: 'Insiza DIDO', date: '2026-10-26', note: 'Flagged for emergency PSIP intervention' }
      ]
    },
    documents: [
      { title: 'Silalatshani Canal Failure & Rehab BoQ.pdf', type: 'Rehab Estimate', date: '2026-10-19', uploaded_by: 'Nkosilathi Nkomo' }
    ],
    updatedAt: '2026-10-26T08:20:00.000Z'
  },
  // ── Additional 16 Presentation Schemes across all 8 Zimbabwe Provinces ──
  ...[
    {
      id: 'ZIM-MAN-CHP-006', scheme_name: 'Chisumbanje ARDA Estate & Outgrowers', site_name: 'Middle Save Block 1-4',
      province: 'Manicaland', district: 'Chipinge', ward: 'Ward 26', lat: -20.798, lng: 32.233, alt: 410,
      officer: ['Tatenda Chigwida', 'Estate Irrigation Manager', '+263 77 301 8821', 't.chigwida@arda.co.zw'],
      design: 5100, eq: 4850, fn: 4620, irr: 4480, ben: 1450, act: 1390, yr: 1966, status: 'Fully functional',
      ws: 'River', wsn: 'Save River', tech: 'Pivots', en: 'Electricity', pstat: 'Connected (ZESA)', cat: 'Estates', mgmt: 'ARDA',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Good', omFund: 'Yes', omBal: 94000,
      rehab: [false, 'Low', 0, 'ARDA Commercial O&M'], stage: 'Published', src: 'Automated Telemetry',
      crops: [['Sugarcane', 2600, 96.0, 'GreenFuel & Ethanol Mill'], ['Wheat', 1200, 6.5, 'GMB Chipinge'], ['Soyabeans', 680, 3.2, 'Agro-Processors']],
      challenges: ['Intermittent grid voltage fluctuations during peak pumping']
    },
    {
      id: 'ZIM-MAN-MUT-007', scheme_name: 'Mutema Irrigation Scheme', site_name: 'Mutema North Block',
      province: 'Manicaland', district: 'Chipinge', ward: 'Ward 4', lat: -20.068, lng: 32.392, alt: 520,
      officer: ['Rumbidzai Mlambo', 'District Irrigation Officer', '+263 77 412 5509', 'rmlambo@irrigation.gov.zw'],
      design: 350, eq: 320, fn: 175, irr: 150, ben: 310, act: 220, yr: 1958, status: 'Under rehabilitation',
      ws: 'Borehole', wsn: 'Save Alluvial Borehole Field', tech: 'Gravity-fed canals', en: 'Solar', pstat: 'Solar Off-Grid', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Moderate', cv: 'Bad', st: 'Moderate', inf: 'Moderate', fnz: 'Bad', rd: 'Moderate', omFund: 'Yes', omBal: 2800,
      rehab: [true, 'High', 980000, 'BI-87 Programme'], stage: 'Provincial Review', src: 'Field Officer Survey',
      crops: [['Tomatoes', 55, 36.0, 'Mutare & Chipinge Markets'], ['Green mealies', 95, 6.8, 'Local Markets']],
      challenges: ['Rapid deterioration of infrastructure', 'Difficulties accessing finances (loans & credits)']
    },
    {
      id: 'ZIM-MID-MBE-008', scheme_name: 'Mundi-Mataga Irrigation Scheme', site_name: 'Mataga Main Command',
      province: 'Midlands', district: 'Mberengwa', ward: 'Ward 16', lat: -20.841, lng: 30.228, alt: 890,
      officer: ['Blessing Ncube', 'District Engineer', '+263 71 654 2210', 'bncube@midlandsirr.gov.zw'],
      design: 260, eq: 240, fn: 225, irr: 210, ben: 380, act: 365, yr: 2019, status: 'Fully functional',
      ws: 'Dam', wsn: 'Mundi-Mataga Dam', tech: 'Gravity-fed sprinkler', en: 'Gravity', pstat: 'Gravity / No Power Needed', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Moderate', omFund: 'Yes', omBal: 9600,
      rehab: [false, 'Low', 0, 'SIRP / IFAD'], stage: 'Published', src: 'Field Officer Survey',
      crops: [['Wheat', 110, 5.9, 'GMB Zvishavane'], ['Grain maize', 120, 7.6, 'GMB Zvishavane'], ['Sugar beans', 60, 2.3, 'Local Markets']],
      challenges: ['Unsustainable plot sizes']
    },
    {
      id: 'ZIM-MID-SHU-009', scheme_name: 'Gato Irrigation Scheme', site_name: 'Shurugwi South Sector',
      province: 'Midlands', district: 'Shurugwi', ward: 'Ward 9', lat: -19.728, lng: 30.065, alt: 1210,
      officer: ['Simbarashe Dube', 'Agritex Supervisor', '+263 77 889 1143', 'sdube@agritex.gov.zw'],
      design: 130, eq: 115, fn: 18, irr: 0, ben: 165, act: 34, yr: 1989, status: 'Non-functional',
      ws: 'Dam', wsn: 'Gato Small Dam', tech: 'Pumped sprinkler', en: 'Electricity', pstat: 'Disconnected / Pending', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Bad', cv: 'Bad', st: 'Bad', inf: 'Bad', fnz: 'Bad', rd: 'Poor/ Bad', omFund: 'No', omBal: 0,
      rehab: [true, 'Critical', 740000, 'PSIP 2026/27 Priority Rehab'], stage: 'District Verified', src: 'Field Officer Survey',
      crops: [['Green mealies', 18, 4.2, 'Local Vendors']],
      challenges: ['Rapid deterioration of infrastructure', 'Incapacitated to sustainably operate and maintain irrigation infrastructure', 'Difficulties accessing finances (loans & credits)']
    },
    {
      id: 'ZIM-MAS-BIK-010', scheme_name: 'Mushandike Irrigation Scheme', site_name: 'Mushandike Villages 1-14',
      province: 'Masvingo', district: 'Masvingo', ward: 'Ward 10', lat: -20.145, lng: 30.635, alt: 990,
      officer: ['Tafadzwa Mupfumi', 'Senior Irrigation Engineer', '+263 77 290 4412', 'tmupfumi@masvingoirr.gov.zw'],
      design: 900, eq: 840, fn: 590, irr: 540, ben: 610, act: 495, yr: 1938, status: 'Partially functional',
      ws: 'Dam', wsn: 'Mushandike Dam', tech: 'Gravity-fed canals', en: 'Gravity', pstat: 'Gravity / No Power Needed', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Moderate', cv: 'Bad', st: 'Moderate', inf: 'Moderate', fnz: 'Moderate', rd: 'Good', omFund: 'Yes', omBal: 7400,
      rehab: [true, 'High', 2150000, 'PSIP 2026/27'], stage: 'Published', src: 'Field Officer Survey',
      crops: [['Wheat', 290, 5.6, 'GMB Masvingo'], ['Grain maize', 310, 7.1, 'GMB Masvingo'], ['Sugar beans', 140, 2.2, 'Masvingo Traders']],
      challenges: ['Inefficient, unreliable, and inequitable water delivery service', 'Rapid deterioration of infrastructure']
    },
    {
      id: 'ZIM-MAS-MWZ-011', scheme_name: 'Manyuchi Commercial Irrigation Hub', site_name: 'Mwenezi Estate South',
      province: 'Masvingo', district: 'Mwenezi', ward: 'Ward 7', lat: -20.912, lng: 30.485, alt: 690,
      officer: ['Garikai Chikwanda', 'Scheme Operations Lead', '+263 78 512 9087', 'gchikwanda@manyuchi.co.zw'],
      design: 1700, eq: 1620, fn: 1580, irr: 1510, ben: 245, act: 240, yr: 2014, status: 'Fully functional',
      ws: 'Dam', wsn: 'Manyuchi Dam', tech: 'Pivots', en: 'Electricity', pstat: 'Connected (ZESA)', cat: 'A2', mgmt: 'Cooperative',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Good', omFund: 'Yes', omBal: 48000,
      rehab: [false, 'Low', 0, 'PEDSTOCK Phase II'], stage: 'Published', src: 'Automated Telemetry',
      crops: [['Wheat', 780, 6.7, 'GMB & Millers'], ['Grain maize', 820, 8.8, 'GMB Masvingo'], ['Potatoes', 180, 30.5, 'Supermarket Chains']],
      challenges: ['Difficulties accessing finances (loans & credits)']
    },
    {
      id: 'ZIM-MSW-MAK-012', scheme_name: 'Biri Dam A2 Irrigation Cluster', site_name: 'Makonde Pivot Cluster',
      province: 'Mashonaland West', district: 'Makonde', ward: 'Ward 12', lat: -17.425, lng: 30.228, alt: 1180,
      officer: ['Nyasha Chirwa', 'Provincial Agronomist', '+263 77 610 3399', 'nchirwa@mashwest.gov.zw'],
      design: 1350, eq: 1280, fn: 1220, irr: 1170, ben: 190, act: 185, yr: 2016, status: 'Fully functional',
      ws: 'Dam', wsn: 'Biri Dam', tech: 'Pivots', en: 'Electricity', pstat: 'Connected (ZESA)', cat: 'A2', mgmt: 'Cooperative',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Good', omFund: 'Yes', omBal: 36000,
      rehab: [false, 'Low', 0, 'PEDSTOCK Phase II'], stage: 'Published', src: 'Satellite Estimate',
      crops: [['Wheat', 640, 7.1, 'GMB Chinhoyi'], ['Grain maize', 620, 9.0, 'GMB Chinhoyi'], ['Potatoes', 140, 32.0, 'Harare Wholesalers']],
      challenges: ['Confusion on ownership of the irrigation scheme']
    },
    {
      id: 'ZIM-MSW-HUR-013', scheme_name: 'Tengwe A1 Irrigation Scheme', site_name: 'Hurungwe Block B',
      province: 'Mashonaland West', district: 'Hurungwe', ward: 'Ward 15', lat: -17.162, lng: 29.465, alt: 1220,
      officer: ['Patrick Nyoni', 'District Irrigation Officer', '+263 71 774 3210', 'pnyoni@irrigation.gov.zw'],
      design: 400, eq: 360, fn: 265, irr: 230, ben: 275, act: 230, yr: 2004, status: 'Partially functional',
      ws: 'Dam', wsn: 'Tengwe Weir', tech: 'Pumped sprinkler', en: 'Electricity', pstat: 'Intermittent / Outages', cat: 'A1', mgmt: 'Farmer/ IMC',
      hw: 'Moderate', cv: 'Moderate', st: 'Good', inf: 'Moderate', fnz: 'Moderate', rd: 'Good', omFund: 'Yes', omBal: 5100,
      rehab: [true, 'High', 520000, 'Booster Kits & Electrification'], stage: 'Technical Approval', src: 'Field Officer Survey',
      crops: [['Wheat', 110, 5.8, 'GMB Karoi'], ['Grain maize', 145, 7.4, 'GMB Karoi'], ['Sugar beans', 75, 2.3, 'Agro-Processors']],
      challenges: ['Inefficient, unreliable, and inequitable water delivery service', 'Difficulties accessing finances (loans & credits)']
    },
    {
      id: 'ZIM-MATS-BEI-014', scheme_name: 'Shashe Solar Irrigation Scheme', site_name: 'Shashe Riverbank Blocks',
      province: 'Matabeleland South', district: 'Beitbridge', ward: 'Ward 8', lat: -22.025, lng: 29.415, alt: 460,
      officer: ['Thabani Sibanda', 'District Irrigation Engineer', '+263 77 329 7744', 'tsibanda@matsouth.gov.zw'],
      design: 450, eq: 420, fn: 395, irr: 380, ben: 540, act: 518, yr: 2020, status: 'Fully functional',
      ws: 'River', wsn: 'Shashe Sand-Abstraction', tech: 'Drip', en: 'Solar', pstat: 'Solar Off-Grid', cat: 'Communal', mgmt: 'Cooperative',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Moderate', omFund: 'Yes', omBal: 14200,
      rehab: [false, 'Low', 0, 'BI-87 Programme'], stage: 'Published', src: 'Field Officer Survey',
      crops: [['Tomatoes', 120, 41.0, 'Beitbridge & Export Off-takers'], ['Butternuts', 140, 21.0, 'Bulawayo Wholesalers'], ['Onions', 120, 26.5, 'Regional Traders']],
      challenges: ['Difficulties accessing finances (loans & credits)']
    },
    {
      id: 'ZIM-MATS-GWA-015', scheme_name: 'Makwe Irrigation Scheme', site_name: 'Makwe Main Sector',
      province: 'Matabeleland South', district: 'Gwanda', ward: 'Ward 17', lat: -21.088, lng: 28.912, alt: 880,
      officer: ['Sikhululekile Dlamini', 'Extension Officer', '+263 71 908 4411', 'sdlamini@agritex.gov.zw'],
      design: 230, eq: 210, fn: 25, irr: 0, ben: 240, act: 42, yr: 1978, status: 'Non-functional',
      ws: 'Dam', wsn: 'Makwe Dam', tech: 'Pumped sprinkler', en: 'Electricity', pstat: 'Disconnected / Pending', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Bad', cv: 'Bad', st: 'Moderate', inf: 'Bad', fnz: 'Bad', rd: 'Poor/ Bad', omFund: 'No', omBal: 0,
      rehab: [true, 'Critical', 1120000, 'Booster Kits & Electrification'], stage: 'Captured', src: 'Field Officer Survey',
      crops: [['Chomolia', 15, 11.0, 'Gwanda Local Market']],
      challenges: ['Rapid deterioration of infrastructure', 'Incapacitated to sustainably operate and maintain irrigation infrastructure', 'Farmers are not committed to their projects']
    },
    {
      id: 'ZIM-MSC-BIN-016', scheme_name: 'Mazowe Valley Irrigation Hub', site_name: 'Bindura North Pivots',
      province: 'Mashonaland Central', district: 'Bindura', ward: 'Ward 6', lat: -17.295, lng: 31.332, alt: 1120,
      officer: ['Tinashe Makoni', 'Provincial Irrigation Engineer', '+263 77 501 2298', 'tmakoni@mashcent.gov.zw'],
      design: 1520, eq: 1450, fn: 1410, irr: 1360, ben: 260, act: 252, yr: 2015, status: 'Fully functional',
      ws: 'Dam', wsn: 'Mazowe & Arcadia Dams', tech: 'Pivots', en: 'Electricity', pstat: 'Connected (ZESA)', cat: 'A2', mgmt: 'Cooperative',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Good', omFund: 'Yes', omBal: 52000,
      rehab: [false, 'Low', 0, 'PEDSTOCK Phase II'], stage: 'Published', src: 'Automated Telemetry',
      crops: [['Wheat', 720, 7.2, 'GMB Bindura'], ['Grain maize', 760, 9.2, 'GMB Bindura'], ['Potatoes', 150, 31.5, 'Harare Supermarkets']],
      challenges: ['Difficulties accessing finances (loans & credits)']
    },
    {
      id: 'ZIM-MSC-MTC-017', scheme_name: 'Chesa Irrigation Scheme', site_name: 'Mt Darwin Block 2',
      province: 'Mashonaland Central', district: 'Mt Darwin', ward: 'Ward 19', lat: -16.775, lng: 31.585, alt: 970,
      officer: ['Memory Choto', 'District Irrigation Officer', '+263 78 221 6734', 'mchoto@irrigation.gov.zw'],
      design: 310, eq: 290, fn: 185, irr: 160, ben: 295, act: 240, yr: 1995, status: 'Under rehabilitation',
      ws: 'Dam', wsn: 'Chesa Dam', tech: 'Drag hose', en: 'Solar', pstat: 'Solar Off-Grid', cat: 'A1', mgmt: 'Farmer/ IMC',
      hw: 'Moderate', cv: 'Moderate', st: 'Bad', inf: 'Moderate', fnz: 'Moderate', rd: 'Moderate', omFund: 'Yes', omBal: 3400,
      rehab: [true, 'High', 810000, 'PSIP 2026/27'], stage: 'Provincial Review', src: 'Field Officer Survey',
      crops: [['Green mealies', 90, 6.9, 'Bindura & Local Markets'], ['Sugar beans', 70, 2.2, 'Agro-Processors']],
      challenges: ['Rapid deterioration of infrastructure', 'Unsustainable plot sizes']
    },
    {
      id: 'ZIM-MSE-MRD-018', scheme_name: 'Wenimbi Dam Irrigation Scheme', site_name: 'Marondera South Pivots',
      province: 'Mashonaland East', district: 'Marondera', ward: 'Ward 4', lat: -18.255, lng: 31.595, alt: 1620,
      officer: ['Fungai Zvobgo', 'Provincial Engineer', '+263 77 440 8821', 'fzvobgo@masheast.gov.zw'],
      design: 820, eq: 780, fn: 755, irr: 730, ben: 175, act: 172, yr: 2017, status: 'Fully functional',
      ws: 'Dam', wsn: 'Wenimbi Dam', tech: 'Pivots', en: 'Electricity', pstat: 'Connected (ZESA)', cat: 'Institutional', mgmt: 'Public / GoZ',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Good', omFund: 'Yes', omBal: 29500,
      rehab: [false, 'Low', 0, 'PEDSTOCK Phase II'], stage: 'Published', src: 'Satellite Estimate',
      crops: [['Tobacco', 260, 3.2, 'TIMB Auction Floors'], ['Potatoes', 210, 33.0, 'Harare & Supermarket Chains'], ['Lucerne / Fodder', 260, 14.5, 'Dairy Board Farmers']],
      challenges: ['Difficulties accessing finances (loans & credits)']
    },
    {
      id: 'ZIM-MSE-MUT-019', scheme_name: 'Nyakomba Irrigation Scheme', site_name: 'Nyakomba Blocks A-C',
      province: 'Mashonaland East', district: 'Mutoko', ward: 'Ward 22', lat: -17.392, lng: 32.745, alt: 780,
      officer: ['Charity Katsande', 'Scheme Manager', '+263 77 912 3045', 'ckatsande@nyakomba-imc.org'],
      design: 610, eq: 580, fn: 545, irr: 515, ben: 760, act: 725, yr: 2001, status: 'Fully functional',
      ws: 'River', wsn: 'Gairezi River', tech: 'Gravity-fed canals', en: 'Gravity', pstat: 'Gravity / No Power Needed', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Moderate', rd: 'Good', omFund: 'Yes', omBal: 16800,
      rehab: [false, 'Low', 0, 'JICA / GoZ'], stage: 'Published', src: 'Field Officer Survey',
      crops: [['Tomatoes', 180, 44.0, 'Harare Mbare Musika'], ['Onions', 150, 27.5, 'Harare & Agro-Processors'], ['Green mealies', 185, 7.6, 'Urban Markets']],
      challenges: ['Unsustainable plot sizes']
    },
    {
      id: 'ZIM-MATN-BUB-020', scheme_name: 'Bubi-Lupane ARDA Irrigation Scheme', site_name: 'Lupane Main Estate',
      province: 'Matabeleland North', district: 'Lupane', ward: 'Ward 13', lat: -18.932, lng: 27.805, alt: 990,
      officer: ['Mthokozisi Ndlovu', 'ARDA Estate Engineer', '+263 77 688 9120', 'mndlovu@arda.co.zw'],
      design: 1200, eq: 1120, fn: 1060, irr: 1020, ben: 410, act: 395, yr: 2021, status: 'Fully functional',
      ws: 'Dam', wsn: 'Bubi-Lupane Dam', tech: 'Pivots', en: 'Electricity', pstat: 'Connected (ZESA)', cat: 'Estates', mgmt: 'ARDA',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Good', omFund: 'Yes', omBal: 41000,
      rehab: [false, 'Low', 0, 'PSIP 2026/27'], stage: 'Published', src: 'Automated Telemetry',
      crops: [['Wheat', 520, 6.6, 'GMB Bulawayo'], ['Grain maize', 580, 8.5, 'GMB Bulawayo'], ['Sugar beans', 190, 2.5, 'Agro-Processors']],
      challenges: ['Intermittent grid voltage fluctuations during peak pumping']
    },
    {
      id: 'ZIM-MATN-HWA-021', scheme_name: 'Tshongokwe Irrigation Scheme', site_name: 'Tshongokwe Solar Block',
      province: 'Matabeleland North', district: 'Lupane', ward: 'Ward 20', lat: -18.715, lng: 27.495, alt: 1010,
      officer: ['Bhekinkosi Mpofu', 'District Irrigation Officer', '+263 71 452 8890', 'bmpofu@matnorth.gov.zw'],
      design: 280, eq: 265, fn: 195, irr: 175, ben: 230, act: 195, yr: 2018, status: 'Partially functional',
      ws: 'Borehole', wsn: 'Kalahari Sand Aquifer', tech: 'Drip', en: 'Solar', pstat: 'Solar Off-Grid', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Moderate', cv: 'Good', st: 'Moderate', inf: 'Moderate', fnz: 'Good', rd: 'Moderate', omFund: 'Yes', omBal: 4600,
      rehab: [true, 'High', 390000, 'BI-87 Programme'], stage: 'Technical Approval', src: 'Field Officer Survey',
      crops: [['Butternuts', 75, 19.5, 'Bulawayo Produce Market'], ['Tomatoes', 55, 37.0, 'Victoria Falls & Hwange Hotels'], ['Chomolia', 45, 14.5, 'Local Markets']],
      challenges: ['Inefficient, unreliable, and inequitable water delivery service', 'Difficulties accessing finances (loans & credits)']
    },
    // ── Additional 30 Presentation Schemes (IDs 022 – 051) ──
    {
      id: 'ZIM-MAN-NYA-022', scheme_name: 'Nyamaropa Irrigation Scheme', site_name: 'Nyanga North Command',
      province: 'Manicaland', district: 'Nyanga', ward: 'Ward 8', lat: -17.985, lng: 32.865, alt: 1040,
      officer: ['Kudakwashe Nyathi', 'District Engineer', '+263 77 215 9901', 'knyathi@manicaland.gov.zw'],
      design: 460, eq: 430, fn: 390, irr: 365, ben: 485, act: 460, yr: 1961, status: 'Fully functional',
      ws: 'River', wsn: 'Gairezi Tributary', tech: 'Gravity-fed canals', en: 'Gravity', pstat: 'Gravity / No Power Needed', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Good', cv: 'Moderate', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Moderate', omFund: 'Yes', omBal: 12400,
      rehab: [false, 'Low', 0, 'SIRP / IFAD'], stage: 'Published', src: 'Field Officer Survey',
      crops: [['Wheat', 180, 6.0, 'GMB Rusape'], ['Potatoes', 110, 29.0, 'Mutare & Harare Markets'], ['Sugar beans', 95, 2.3, 'Regional Traders']],
      challenges: ['Unsustainable plot sizes']
    },
    {
      id: 'ZIM-MAN-MAK-023', scheme_name: 'Osborne Dam A2 Irrigation Scheme', site_name: 'Mutasa South Pivots',
      province: 'Manicaland', district: 'Mutasa', ward: 'Ward 18', lat: -18.795, lng: 32.482, alt: 1120,
      officer: ['Farirai Chikomo', 'Provincial Agronomist', '+263 77 334 1128', 'fchikomo@manicaland.gov.zw'],
      design: 920, eq: 880, fn: 840, irr: 810, ben: 145, act: 142, yr: 2012, status: 'Fully functional',
      ws: 'Dam', wsn: 'Osborne Dam', tech: 'Pivots', en: 'Electricity', pstat: 'Connected (ZESA)', cat: 'A2', mgmt: 'Cooperative',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Good', omFund: 'Yes', omBal: 31000,
      rehab: [false, 'Low', 0, 'PEDSTOCK Phase II'], stage: 'Published', src: 'Automated Telemetry',
      crops: [['Wheat', 420, 6.8, 'GMB Mutare'], ['Grain maize', 440, 8.6, 'GMB Mutare'], ['Potatoes', 120, 31.0, 'Mutare Wholesalers']],
      challenges: ['Intermittent grid voltage fluctuations during peak pumping']
    },
    {
      id: 'ZIM-MAN-BUH-024', scheme_name: 'Romsley Irrigation Scheme', site_name: 'Makoni South Block',
      province: 'Manicaland', district: 'Makoni', ward: 'Ward 24', lat: -18.885, lng: 31.945, alt: 1190,
      officer: ['Munashe Moyo', 'Extension Officer', '+263 71 508 7732', 'mmoyo@agritex.gov.zw'],
      design: 310, eq: 280, fn: 170, irr: 145, ben: 240, act: 180, yr: 1996, status: 'Partially functional',
      ws: 'Dam', wsn: 'Rusape Dam', tech: 'Pumped sprinkler', en: 'Electricity', pstat: 'Intermittent / Outages', cat: 'A1', mgmt: 'Farmer/ IMC',
      hw: 'Moderate', cv: 'Moderate', st: 'Moderate', inf: 'Bad', fnz: 'Bad', rd: 'Moderate', omFund: 'Yes', omBal: 3200,
      rehab: [true, 'High', 680000, 'PSIP 2026/27'], stage: 'District Verified', src: 'Field Officer Survey',
      crops: [['Grain maize', 95, 6.8, 'GMB Rusape'], ['Sugar beans', 50, 2.1, 'Local Markets']],
      challenges: ['Rapid deterioration of infrastructure', 'Difficulties accessing finances (loans & credits)']
    },
    {
      id: 'ZIM-MAN-BUH-025', scheme_name: 'Deure Irrigation Scheme', site_name: 'Buhera East Sector',
      province: 'Manicaland', district: 'Buhera', ward: 'Ward 31', lat: -19.865, lng: 32.165, alt: 610,
      officer: ['Chenai Mupanduki', 'District Officer', '+263 77 618 2201', 'cmupanduki@irrigation.gov.zw'],
      design: 390, eq: 365, fn: 290, irr: 265, ben: 410, act: 360, yr: 1954, status: 'Partially functional',
      ws: 'River', wsn: 'Devure River', tech: 'Gravity-fed canals', en: 'Gravity', pstat: 'Gravity / No Power Needed', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Moderate', cv: 'Bad', st: 'Moderate', inf: 'Moderate', fnz: 'Moderate', rd: 'Moderate', omFund: 'Yes', omBal: 5800,
      rehab: [true, 'High', 1050000, 'SIRP / IFAD'], stage: 'Provincial Review', src: 'Field Officer Survey',
      crops: [['Green mealies', 140, 7.1, 'Birchenough & Mutare'], ['Tomatoes', 70, 36.5, 'Mutare Fresh Market'], ['Sugar beans', 85, 2.1, 'Local Markets']],
      challenges: ['Inefficient, unreliable, and inequitable water delivery service', 'Rapid deterioration of infrastructure']
    },
    {
      id: 'ZIM-MID-KWE-026', scheme_name: 'Sebakwe A2 Pivot Scheme', site_name: 'Kwekwe East Hub',
      province: 'Midlands', district: 'Kwekwe', ward: 'Ward 5', lat: -18.995, lng: 29.965, alt: 1210,
      officer: ['Tawanda Mhlanga', 'Irrigation Engineer', '+263 77 401 3344', 'tmhlanga@midlands.gov.zw'],
      design: 1150, eq: 1080, fn: 1040, irr: 990, ben: 160, act: 155, yr: 2015, status: 'Fully functional',
      ws: 'Dam', wsn: 'Sebakwe Dam', tech: 'Pivots', en: 'Electricity', pstat: 'Connected (ZESA)', cat: 'A2', mgmt: 'Cooperative',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Good', omFund: 'Yes', omBal: 42000,
      rehab: [false, 'Low', 0, 'PEDSTOCK Phase II'], stage: 'Published', src: 'Automated Telemetry',
      crops: [['Wheat', 510, 6.9, 'GMB Kwekwe'], ['Grain maize', 530, 8.8, 'GMB Kwekwe'], ['Potatoes', 110, 30.0, 'Gweru & Kwekwe']],
      challenges: ['Difficulties accessing finances (loans & credits)']
    },
    {
      id: 'ZIM-MID-GOK-027', scheme_name: 'Gokwe South Sengwa Scheme', site_name: 'Sengwa Communal Block',
      province: 'Midlands', district: 'Gokwe South', ward: 'Ward 22', lat: -18.285, lng: 28.865, alt: 1090,
      officer: ['Nomsa Ndlovu', 'District Irrigation Officer', '+263 71 782 1190', 'nndlovu@midlands.gov.zw'],
      design: 210, eq: 195, fn: 130, irr: 110, ben: 245, act: 195, yr: 2008, status: 'Under rehabilitation',
      ws: 'Borehole', wsn: 'Gokwe Deep Aquifer', tech: 'Drip', en: 'Solar', pstat: 'Solar Off-Grid', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Moderate', cv: 'Moderate', st: 'Bad', inf: 'Moderate', fnz: 'Good', rd: 'Poor/ Bad', omFund: 'Yes', omBal: 2100,
      rehab: [true, 'High', 480000, 'BI-87 Programme'], stage: 'District Verified', src: 'Field Officer Survey',
      crops: [['Tomatoes', 45, 34.0, 'Gokwe Centre'], ['Onions', 35, 22.5, 'Kadoma & Kwekwe'], ['Green mealies', 60, 6.4, 'Local Markets']],
      challenges: ['Incapacitated to sustainably operate and maintain irrigation infrastructure']
    },
    {
      id: 'ZIM-MID-GWE-028', scheme_name: 'Insukamini Irrigation Scheme', site_name: 'Lower Gweru Blocks 1-3',
      province: 'Midlands', district: 'Gweru', ward: 'Ward 12', lat: -19.365, lng: 29.465, alt: 1310,
      officer: ['Pardon Sibanda', 'Scheme Agronomist', '+263 77 522 8901', 'psibanda@midlands.gov.zw'],
      design: 295, eq: 280, fn: 265, irr: 250, ben: 320, act: 308, yr: 1988, status: 'Fully functional',
      ws: 'Dam', wsn: 'Insukamini Dam', tech: 'Gravity-fed canals', en: 'Gravity', pstat: 'Gravity / No Power Needed', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Moderate', rd: 'Good', omFund: 'Yes', omBal: 11800,
      rehab: [false, 'Low', 0, 'SIRP / IFAD'], stage: 'Published', src: 'Field Officer Survey',
      crops: [['Wheat', 130, 6.1, 'GMB Gweru'], ['Grain maize', 140, 7.8, 'GMB Gweru'], ['Sugar beans', 80, 2.4, 'Gweru Wholesalers']],
      challenges: ['Unsustainable plot sizes']
    },
    {
      id: 'ZIM-MID-CHI-029', scheme_name: 'Chirumanzu Hama Mavhaire Scheme', site_name: 'Hama Main Command',
      province: 'Midlands', district: 'Chirumanzu', ward: 'Ward 15', lat: -19.565, lng: 30.525, alt: 1240,
      officer: ['Loveness Shumba', 'District Engineer', '+263 78 309 4415', 'lshumba@midlands.gov.zw'],
      design: 240, eq: 220, fn: 195, irr: 185, ben: 290, act: 270, yr: 1994, status: 'Fully functional',
      ws: 'Dam', wsn: 'Mavhaire Dam', tech: 'Gravity-fed sprinkler', en: 'Gravity', pstat: 'Gravity / No Power Needed', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Good', cv: 'Good', st: 'Moderate', inf: 'Good', fnz: 'Good', rd: 'Moderate', omFund: 'Yes', omBal: 8200,
      rehab: [false, 'Low', 0, 'SIRP / IFAD'], stage: 'Technical Approval', src: 'Field Officer Survey',
      crops: [['Green mealies', 100, 7.2, 'Mvuma & Gweru'], ['Sugar beans', 85, 2.3, 'Local Markets']],
      challenges: ['Difficulties accessing finances (loans & credits)']
    },
    {
      id: 'ZIM-MAS-ZAK-030', scheme_name: 'Fuve Panganai Irrigation Scheme', site_name: 'Zaka Blocks A-D',
      province: 'Masvingo', district: 'Zaka', ward: 'Ward 28', lat: -20.445, lng: 31.495, alt: 740,
      officer: ['Tapiwa Zizhou', 'District Irrigation Officer', '+263 77 318 6620', 'tzizhou@masvingo.gov.zw'],
      design: 560, eq: 520, fn: 470, irr: 445, ben: 640, act: 610, yr: 1992, status: 'Fully functional',
      ws: 'Dam', wsn: 'Siya Dam', tech: 'Gravity-fed canals', en: 'Gravity', pstat: 'Gravity / No Power Needed', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Moderate', rd: 'Good', omFund: 'Yes', omBal: 15400,
      rehab: [false, 'Low', 0, 'SIRP / IFAD'], stage: 'Published', src: 'Field Officer Survey',
      crops: [['Wheat', 230, 5.9, 'GMB Jerera'], ['Grain maize', 260, 7.5, 'GMB Jerera'], ['Sugar beans', 120, 2.3, 'Masvingo Traders']],
      challenges: ['Unsustainable plot sizes']
    },
    {
      id: 'ZIM-MAS-CHI-031', scheme_name: 'Chiredzi Hippo Valley Outgrowers', site_name: 'Mkwasine A2 Blocks',
      province: 'Masvingo', district: 'Chiredzi', ward: 'Ward 21', lat: -20.895, lng: 31.885, alt: 430,
      officer: ['Brighton Chauke', 'Operations Engineer', '+263 77 612 9041', 'bchauke@masvingo.gov.zw'],
      design: 2100, eq: 1980, fn: 1910, irr: 1850, ben: 340, act: 332, yr: 2011, status: 'Fully functional',
      ws: 'Dam', wsn: 'Tugwi-Mukosi & Manjirenji', tech: 'Pivots', en: 'Electricity', pstat: 'Connected (ZESA)', cat: 'A2', mgmt: 'Cooperative',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Good', omFund: 'Yes', omBal: 68000,
      rehab: [false, 'Low', 0, 'Turnkey Chiredzi'], stage: 'Published', src: 'Automated Telemetry',
      crops: [['Sugarcane', 1150, 92.0, 'Tongaat Hulett Mill'], ['Citrus / Oranges', 420, 38.0, 'Export Citrus Packhouse'], ['Wheat', 280, 6.7, 'GMB & Millers']],
      challenges: ['Intermittent grid voltage fluctuations during peak pumping']
    },
    {
      id: 'ZIM-MAS-GUT-032', scheme_name: 'Nyika Gutu Solar Irrigation Scheme', site_name: 'Gutu East Hub',
      province: 'Masvingo', district: 'Gutu', ward: 'Ward 14', lat: -19.685, lng: 31.325, alt: 1080,
      officer: ['Miriam Madziva', 'Agritex Officer', '+263 71 644 2098', 'mmadziva@agritex.gov.zw'],
      design: 175, eq: 160, fn: 145, irr: 135, ben: 215, act: 205, yr: 2022, status: 'Fully functional',
      ws: 'Borehole', wsn: 'Gutu Borehole Cluster', tech: 'Drip', en: 'Solar', pstat: 'Solar Off-Grid', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Good', omFund: 'Yes', omBal: 6800,
      rehab: [false, 'Low', 0, 'BI-87 Programme'], stage: 'Published', src: 'Field Officer Survey',
      crops: [['Tomatoes', 55, 39.0, 'Masvingo & Gutu Markets'], ['Onions', 45, 25.0, 'Regional Traders'], ['Chomolia', 35, 15.0, 'Local Markets']],
      challenges: ['Difficulties accessing finances (loans & credits)']
    },
    {
      id: 'ZIM-MAS-CHV-033', scheme_name: 'Chivi Gororo Irrigation Scheme', site_name: 'Chivi South Command',
      province: 'Masvingo', district: 'Chivi', ward: 'Ward 25', lat: -20.625, lng: 30.515, alt: 820,
      officer: ['Gift Moyo', 'Field Engineer', '+263 77 809 3311', 'gmoyo@masvingo.gov.zw'],
      design: 220, eq: 200, fn: 115, irr: 95, ben: 260, act: 170, yr: 1999, status: 'Partially functional',
      ws: 'Dam', wsn: 'Tugwi-Mukosi Feeder', tech: 'Piped surface', en: 'Solar', pstat: 'Solar Off-Grid', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Moderate', cv: 'Moderate', st: 'Bad', inf: 'Moderate', fnz: 'Bad', rd: 'Poor/ Bad', omFund: 'No', omBal: 0,
      rehab: [true, 'High', 560000, 'PSIP 2026/27'], stage: 'District Verified', src: 'Field Officer Survey',
      crops: [['Green mealies', 60, 6.2, 'Chivi Growth Point'], ['Sugar beans', 35, 1.9, 'Local Markets']],
      challenges: ['Inefficient, unreliable, and inequitable water delivery service', 'Incapacitated to sustainably operate and maintain irrigation infrastructure']
    },
    {
      id: 'ZIM-MSW-CHE-034', scheme_name: 'Chegutu Clifton A2 Irrigation Hub', site_name: 'Chegutu West Pivots',
      province: 'Mashonaland West', district: 'Chegutu', ward: 'Ward 11', lat: -18.135, lng: 30.145, alt: 1190,
      officer: ['Ropafadzo Marufu', 'Irrigation Specialist', '+263 77 488 2219', 'rmarufu@mashwest.gov.zw'],
      design: 960, eq: 910, fn: 880, irr: 850, ben: 135, act: 132, yr: 2016, status: 'Fully functional',
      ws: 'Dam', wsn: 'Clifton & Mupfure Dam', tech: 'Pivots', en: 'Electricity', pstat: 'Connected (ZESA)', cat: 'A2', mgmt: 'Cooperative',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Good', omFund: 'Yes', omBal: 34500,
      rehab: [false, 'Low', 0, 'PEDSTOCK Phase II'], stage: 'Published', src: 'Satellite Estimate',
      crops: [['Wheat', 450, 7.0, 'GMB Chegutu'], ['Grain maize', 430, 8.9, 'GMB Chegutu'], ['Potatoes', 100, 31.5, 'Harare Markets']],
      challenges: ['Difficulties accessing finances (loans & credits)']
    },
    {
      id: 'ZIM-MSW-ZVI-035', scheme_name: 'Darwendale Lake Manyame Scheme', site_name: 'Zvimba East Pivots',
      province: 'Mashonaland West', district: 'Zvimba', ward: 'Ward 19', lat: -17.755, lng: 30.565, alt: 1360,
      officer: ['Tonderai Goredema', 'Senior Agronomist', '+263 77 719 4402', 'tgoredema@mashwest.gov.zw'],
      design: 1480, eq: 1420, fn: 1380, irr: 1320, ben: 210, act: 205, yr: 2013, status: 'Fully functional',
      ws: 'Dam', wsn: 'Lake Manyame (Darwendale)', tech: 'Pivots', en: 'Electricity', pstat: 'Connected (ZESA)', cat: 'Commercial', mgmt: 'Private Estate',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Good', omFund: 'Yes', omBal: 58000,
      rehab: [false, 'Low', 0, 'AFC Commercial Facility'], stage: 'Published', src: 'Automated Telemetry',
      crops: [['Wheat', 680, 7.3, 'GMB & Millers'], ['Grain maize', 690, 9.1, 'GMB Norton'], ['Potatoes', 180, 33.0, 'Supermarket Chains']],
      challenges: ['Intermittent grid voltage fluctuations during peak pumping']
    },
    {
      id: 'ZIM-MSW-SAN-036', scheme_name: 'Sanyati ARDA Estate Scheme', site_name: 'Sanyati Blocks 1-5',
      province: 'Mashonaland West', district: 'Sanyati', ward: 'Ward 7', lat: -17.955, lng: 29.315, alt: 880,
      officer: ['Wellington Kaseke', 'Estate Engineer', '+263 77 299 5510', 'wkaseke@arda.co.zw'],
      design: 1050, eq: 980, fn: 620, irr: 560, ben: 390, act: 310, yr: 1976, status: 'Under rehabilitation',
      ws: 'River', wsn: 'Munyati River', tech: 'Pivots', en: 'Electricity', pstat: 'Intermittent / Outages', cat: 'Estates', mgmt: 'ARDA',
      hw: 'Moderate', cv: 'Bad', st: 'Moderate', inf: 'Moderate', fnz: 'Moderate', rd: 'Moderate', omFund: 'Yes', omBal: 12000,
      rehab: [true, 'High', 1850000, 'PSIP 2026/27'], stage: 'Technical Approval', src: 'Field Officer Survey',
      crops: [['Wheat', 280, 6.2, 'GMB Kadoma'], ['Grain maize', 310, 7.9, 'GMB Kadoma']],
      challenges: ['Rapid deterioration of infrastructure', 'Inefficient, unreliable, and inequitable water delivery service']
    },
    {
      id: 'ZIM-MSW-KAR-037', scheme_name: 'Kariba Gatche-Gatche Solar Hub', site_name: 'Nyaminyami Shore Block',
      province: 'Mashonaland West', district: 'Kariba', ward: 'Ward 3', lat: -16.785, lng: 28.945, alt: 510,
      officer: ['Eunice Macheka', 'District Officer', '+263 71 334 8810', 'emacheka@mashwest.gov.zw'],
      design: 140, eq: 125, fn: 118, irr: 110, ben: 185, act: 175, yr: 2023, status: 'Fully functional',
      ws: 'Dam', wsn: 'Lake Kariba Intake', tech: 'Drip', en: 'Solar', pstat: 'Solar Off-Grid', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Moderate', omFund: 'Yes', omBal: 5200,
      rehab: [false, 'Low', 0, 'BI-87 Programme'], stage: 'Published', src: 'Field Officer Survey',
      crops: [['Tomatoes', 45, 38.0, 'Kariba Town & Lodges'], ['Butternuts', 40, 20.0, 'Karoi Markets'], ['Green mealies', 45, 7.0, 'Local Markets']],
      challenges: ['Difficulties accessing finances (loans & credits)']
    },
    {
      id: 'ZIM-MATS-MAT-038', scheme_name: 'Antelope ARDA Estate Scheme', site_name: 'Matobo South Command',
      province: 'Matabeleland South', district: 'Matobo', ward: 'Ward 9', lat: -21.035, lng: 28.435, alt: 910,
      officer: ['Ndabezinhle Khumalo', 'Estate Operations Manager', '+263 77 415 6602', 'nkhumalo@arda.co.zw'],
      design: 1320, eq: 1250, fn: 1190, irr: 1140, ben: 460, act: 445, yr: 1974, status: 'Fully functional',
      ws: 'Dam', wsn: 'Antelope Dam', tech: 'Pivots', en: 'Electricity', pstat: 'Connected (ZESA)', cat: 'Estates', mgmt: 'ARDA',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Good', omFund: 'Yes', omBal: 44000,
      rehab: [false, 'Low', 0, 'PSIP 2026/27'], stage: 'Published', src: 'Automated Telemetry',
      crops: [['Wheat', 580, 6.5, 'GMB Bulawayo'], ['Grain maize', 610, 8.4, 'GMB Bulawayo'], ['Sugar beans', 150, 2.4, 'Agro-Processors']],
      challenges: ['Intermittent grid voltage fluctuations during peak pumping']
    },
    {
      id: 'ZIM-MATS-UMZ-039', scheme_name: 'Umzingwane Esigodini Scheme', site_name: 'Umzingwane Valley Block',
      province: 'Matabeleland South', district: 'Umzingwane', ward: 'Ward 4', lat: -20.285, lng: 28.945, alt: 1130,
      officer: ['Precious Ncube', 'District Engineer', '+263 77 509 1122', 'pncube@matsouth.gov.zw'],
      design: 340, eq: 310, fn: 225, irr: 195, ben: 310, act: 255, yr: 1991, status: 'Partially functional',
      ws: 'Dam', wsn: 'Umzingwane Dam', tech: 'Pumped sprinkler', en: 'Solar', pstat: 'Solar Off-Grid', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Moderate', cv: 'Moderate', st: 'Moderate', inf: 'Moderate', fnz: 'Bad', rd: 'Good', omFund: 'Yes', omBal: 4800,
      rehab: [true, 'High', 610000, 'SIRP / IFAD'], stage: 'Provincial Review', src: 'Field Officer Survey',
      crops: [['Tomatoes', 70, 36.0, 'Bulawayo Produce Market'], ['Green mealies', 85, 6.9, 'Bulawayo Traders'], ['Chomolia', 40, 14.0, 'Local Markets']],
      challenges: ['Inefficient, unreliable, and inequitable water delivery service']
    },
    {
      id: 'ZIM-MATS-MAN-040', scheme_name: 'Ingwizi Irrigation Scheme', site_name: 'Mangwe West Sector',
      province: 'Matabeleland South', district: 'Mangwe', ward: 'Ward 11', lat: -20.895, lng: 27.885, alt: 980,
      officer: ['Mduduzi Moyo', 'Extension Supervisor', '+263 71 802 5541', 'mmoyo@matsouth.gov.zw'],
      design: 480, eq: 440, fn: 320, irr: 285, ben: 415, act: 340, yr: 1969, status: 'Partially functional',
      ws: 'Dam', wsn: 'Ingwizi Dam', tech: 'Gravity-fed canals', en: 'Gravity', pstat: 'Gravity / No Power Needed', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Moderate', cv: 'Bad', st: 'Good', inf: 'Moderate', fnz: 'Moderate', rd: 'Moderate', omFund: 'Yes', omBal: 6100,
      rehab: [true, 'High', 920000, 'SIRP / IFAD'], stage: 'District Verified', src: 'Field Officer Survey',
      crops: [['Grain maize', 165, 6.8, 'Plumtree & Bulawayo'], ['Sugar beans', 85, 2.1, 'Local Markets'], ['Onions', 35, 22.0, 'Bulawayo Wholesalers']],
      challenges: ['Rapid deterioration of infrastructure', 'Unsustainable plot sizes']
    },
    {
      id: 'ZIM-MATS-BUL-041', scheme_name: 'Moza Dam Irrigation Scheme', site_name: 'Bulilima North Block',
      province: 'Matabeleland South', district: 'Bulilima', ward: 'Ward 16', lat: -20.385, lng: 27.645, alt: 1090,
      officer: ['Sipho Nkomo', 'Field Officer', '+263 78 214 7766', 'snkomo@matsouth.gov.zw'],
      design: 165, eq: 150, fn: 12, irr: 0, ben: 190, act: 28, yr: 1997, status: 'Non-functional',
      ws: 'Dam', wsn: 'Moza Dam', tech: 'Pumped sprinkler', en: 'Diesel/petrol', pstat: 'Disconnected / Pending', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Bad', cv: 'Bad', st: 'Bad', inf: 'Bad', fnz: 'Bad', rd: 'Poor/ Bad', omFund: 'No', omBal: 0,
      rehab: [true, 'Critical', 890000, 'Booster Kits & Electrification'], stage: 'Captured', src: 'Field Officer Survey',
      crops: [['Green mealies', 12, 4.0, 'Local Market']],
      challenges: ['Rapid deterioration of infrastructure', 'Incapacitated to sustainably operate and maintain irrigation infrastructure', 'Difficulties accessing finances (loans & credits)']
    },
    {
      id: 'ZIM-MSC-MAZ-042', scheme_name: 'Concession Jumbo A2 Pivots', site_name: 'Mazowe Central Cluster',
      province: 'Mashonaland Central', district: 'Mazowe', ward: 'Ward 14', lat: -17.395, lng: 30.945, alt: 1280,
      officer: ['Rudo Chidzero', 'Senior Irrigation Specialist', '+263 77 302 1188', 'rchidzero@mashcent.gov.zw'],
      design: 1650, eq: 1580, fn: 1540, irr: 1490, ben: 225, act: 220, yr: 2014, status: 'Fully functional',
      ws: 'Dam', wsn: 'Mazowe Citrus Dam', tech: 'Pivots', en: 'Electricity', pstat: 'Connected (ZESA)', cat: 'Private', mgmt: 'Private Estate',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Good', omFund: 'Yes', omBal: 61000,
      rehab: [false, 'Low', 0, 'PEDSTOCK Phase II'], stage: 'Published', src: 'Automated Telemetry',
      crops: [['Citrus / Oranges', 640, 41.0, 'Schweppes & Export Packhouse'], ['Tobacco', 420, 3.4, 'TIMB Auction Floors'], ['Soyabeans', 430, 3.5, 'Agro-Processors']],
      challenges: ['Intermittent grid voltage fluctuations during peak pumping']
    },
    {
      id: 'ZIM-MSC-SHA-043', scheme_name: 'Shamva Chindunduma Scheme', site_name: 'Shamva North Block',
      province: 'Mashonaland Central', district: 'Shamva', ward: 'Ward 9', lat: -17.245, lng: 31.665, alt: 990,
      officer: ['Kudzai Nyamande', 'District Engineer', '+263 77 615 4490', 'knyamande@mashcent.gov.zw'],
      design: 420, eq: 390, fn: 360, irr: 340, ben: 380, act: 365, yr: 2003, status: 'Fully functional',
      ws: 'River', wsn: 'Mazowe River Weir', tech: 'Pumped sprinkler', en: 'Solar', pstat: 'Solar Off-Grid', cat: 'A1', mgmt: 'Farmer/ IMC',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Moderate', rd: 'Good', omFund: 'Yes', omBal: 13200,
      rehab: [false, 'Low', 0, 'BI-87 Programme'], stage: 'Published', src: 'Field Officer Survey',
      crops: [['Wheat', 175, 6.2, 'GMB Shamva'], ['Grain maize', 190, 8.0, 'GMB Shamva'], ['Tomatoes', 65, 39.5, 'Bindura & Harare']],
      challenges: ['Difficulties accessing finances (loans & credits)']
    },
    {
      id: 'ZIM-MSC-GUR-044', scheme_name: 'Guruve Dande Irrigation Scheme', site_name: 'Lower Guruve Command',
      province: 'Mashonaland Central', district: 'Mbire', ward: 'Ward 11', lat: -16.345, lng: 30.685, alt: 460,
      officer: ['Admire Kamudyariwa', 'District Officer', '+263 71 912 3304', 'akamudyariwa@mashcent.gov.zw'],
      design: 540, eq: 500, fn: 310, irr: 270, ben: 460, act: 350, yr: 1998, status: 'Under rehabilitation',
      ws: 'Dam', wsn: 'Dande Dam', tech: 'Gravity-fed canals', en: 'Gravity', pstat: 'Gravity / No Power Needed', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Moderate', cv: 'Bad', st: 'Moderate', inf: 'Moderate', fnz: 'Bad', rd: 'Poor/ Bad', omFund: 'Yes', omBal: 3900,
      rehab: [true, 'High', 1320000, 'PSIP 2026/27'], stage: 'Provincial Review', src: 'Field Officer Survey',
      crops: [['Green mealies', 145, 6.7, 'Guruve & Bindura'], ['Sugar beans', 125, 2.1, 'Agro-Processors']],
      challenges: ['Rapid deterioration of infrastructure', 'Inefficient, unreliable, and inequitable water delivery service']
    },
    {
      id: 'ZIM-MSC-CEN-045', scheme_name: 'Centenary Muzarabani ARDA Hub', site_name: 'Muzarabani East Block',
      province: 'Mashonaland Central', district: 'Muzarabani', ward: 'Ward 17', lat: -16.425, lng: 31.145, alt: 440,
      officer: ['Gilbert Chivasa', 'Estate Manager', '+263 77 540 2188', 'gchivasa@arda.co.zw'],
      design: 890, eq: 840, fn: 790, irr: 760, ben: 310, act: 298, yr: 2018, status: 'Fully functional',
      ws: 'River', wsn: 'Musengezi River', tech: 'Pivots', en: 'Electricity', pstat: 'Connected (ZESA)', cat: 'Estates', mgmt: 'ARDA',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Moderate', omFund: 'Yes', omBal: 28000,
      rehab: [false, 'Low', 0, 'PSIP 2026/27'], stage: 'Published', src: 'Satellite Estimate',
      crops: [['Wheat', 390, 6.4, 'GMB Bindura'], ['Grain maize', 410, 8.3, 'GMB & Agro-Processors']],
      challenges: ['Intermittent grid voltage fluctuations during peak pumping']
    },
    {
      id: 'ZIM-MSE-GOR-046', scheme_name: 'Goromonzi Kunzvi Feeder Cluster', site_name: 'Goromonzi South A2',
      province: 'Mashonaland East', district: 'Goromonzi', ward: 'Ward 16', lat: -17.865, lng: 31.425, alt: 1460,
      officer: ['Shingirai Mutembedza', 'Irrigation Engineer', '+263 77 288 9940', 'smutembedza@masheast.gov.zw'],
      design: 720, eq: 690, fn: 670, irr: 650, ben: 140, act: 138, yr: 2019, status: 'Fully functional',
      ws: 'Dam', wsn: 'Nyakambiri & Kunzvi Basin', tech: 'Pivots', en: 'Electricity', pstat: 'Connected (ZESA)', cat: 'A2', mgmt: 'Cooperative',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Good', omFund: 'Yes', omBal: 33000,
      rehab: [false, 'Low', 0, 'PEDSTOCK Phase II'], stage: 'Published', src: 'Automated Telemetry',
      crops: [['Potatoes', 220, 34.0, 'Harare Supermarket Chains'], ['Wheat', 310, 7.1, 'GMB Harare'], ['Tomatoes', 120, 43.0, 'Harare Mbare Musika']],
      challenges: ['Difficulties accessing finances (loans & credits)']
    },
    {
      id: 'ZIM-MSE-CHIK-047', scheme_name: 'Chivhu Mwerahari Irrigation Scheme', site_name: 'Chikomba Central Block',
      province: 'Mashonaland East', district: 'Chikomba', ward: 'Ward 10', lat: -19.015, lng: 30.925, alt: 1420,
      officer: ['Vimbai Gweshe', 'District Irrigation Officer', '+263 78 411 6609', 'vgweshe@masheast.gov.zw'],
      design: 310, eq: 290, fn: 205, irr: 185, ben: 265, act: 220, yr: 1993, status: 'Partially functional',
      ws: 'Dam', wsn: 'Chivhu Dam', tech: 'Pumped sprinkler', en: 'Solar', pstat: 'Solar Off-Grid', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Moderate', cv: 'Moderate', st: 'Moderate', inf: 'Moderate', fnz: 'Moderate', rd: 'Good', omFund: 'Yes', omBal: 5400,
      rehab: [true, 'High', 490000, 'BI-87 Programme'], stage: 'Technical Approval', src: 'Field Officer Survey',
      crops: [['Green mealies', 100, 7.0, 'Chivhu & Harare'], ['Sugar beans', 85, 2.2, 'Local Markets']],
      challenges: ['Rapid deterioration of infrastructure']
    },
    {
      id: 'ZIM-MSE-MRE-048', scheme_name: 'Murewa Chibvuti Solar Scheme', site_name: 'Murewa West Blocks',
      province: 'Mashonaland East', district: 'Murewa', ward: 'Ward 7', lat: -17.645, lng: 31.825, alt: 1380,
      officer: ['Tarisai Nyakudya', 'Extension Officer', '+263 77 702 5531', 'tnyakudya@agritex.gov.zw'],
      design: 250, eq: 235, fn: 220, irr: 210, ben: 315, act: 302, yr: 2021, status: 'Fully functional',
      ws: 'Dam', wsn: 'Chibvuti Weir', tech: 'Drip', en: 'Solar', pstat: 'Solar Off-Grid', cat: 'Farmer-led', mgmt: 'Farmer/ IMC',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Good', omFund: 'Yes', omBal: 10500,
      rehab: [false, 'Low', 0, 'BI-87 Programme'], stage: 'Published', src: 'Field Officer Survey',
      crops: [['Cabbage', 75, 48.0, 'Harare Mbare Musika'], ['Paprika / Chilly', 65, 5.8, 'Export Spice Off-takers'], ['Watermelons', 70, 34.0, 'Supermarket Chains']],
      challenges: ['Unsustainable plot sizes']
    },
    {
      id: 'ZIM-MATN-UMG-049', scheme_name: 'Nyamandlovu Aquifer A2 Cluster', site_name: 'Umguza Borehole Pivots',
      province: 'Matabeleland North', district: 'Umguza', ward: 'Ward 15', lat: -19.865, lng: 28.265, alt: 1210,
      officer: ['Qhubekani Ncube', 'Provincial Hydrologist', '+263 77 380 9912', 'qncube@matnorth.gov.zw'],
      design: 940, eq: 890, fn: 840, irr: 810, ben: 155, act: 150, yr: 2015, status: 'Fully functional',
      ws: 'Borehole', wsn: 'Nyamandlovu Forest Sandstone Aquifer', tech: 'Pivots', en: 'Electricity', pstat: 'Connected (ZESA)', cat: 'A2', mgmt: 'Cooperative',
      hw: 'Good', cv: 'Good', st: 'Good', inf: 'Good', fnz: 'Good', rd: 'Good', omFund: 'Yes', omBal: 37000,
      rehab: [false, 'Low', 0, 'PEDSTOCK Phase II'], stage: 'Published', src: 'Automated Telemetry',
      crops: [['Wheat', 410, 6.6, 'GMB Bulawayo'], ['Potatoes', 190, 31.0, 'Bulawayo Supermarkets'], ['Grain maize', 360, 8.5, 'GMB Bulawayo']],
      challenges: ['Intermittent grid voltage fluctuations during peak pumping']
    },
    {
      id: 'ZIM-MATN-BIN-050', scheme_name: 'Binga Bulawayo Kraal Scheme', site_name: 'Zambezi Intake Block 1-3',
      province: 'Matabeleland North', district: 'Binga', ward: 'Ward 8', lat: -17.645, lng: 27.335, alt: 530,
      officer: ['Siamupa Muleya', 'District Irrigation Engineer', '+263 77 611 8840', 'smuleya@matnorth.gov.zw'],
      design: 1500, eq: 650, fn: 420, irr: 380, ben: 520, act: 410, yr: 2017, status: 'Under rehabilitation',
      ws: 'River', wsn: 'Zambezi River', tech: 'Pivots', en: 'Electricity', pstat: 'Intermittent / Outages', cat: 'Estates', mgmt: 'ARDA',
      hw: 'Moderate', cv: 'Moderate', st: 'Good', inf: 'Moderate', fnz: 'Moderate', rd: 'Moderate', omFund: 'Yes', omBal: 14000,
      rehab: [true, 'High', 2400000, 'PSIP 2026/27'], stage: 'Technical Approval', src: 'Field Officer Survey',
      crops: [['Grain maize', 240, 7.8, 'GMB Binga & Lupane'], ['Wheat', 140, 6.0, 'GMB Bulawayo']],
      challenges: ['Inefficient, unreliable, and inequitable water delivery service', 'Difficulties accessing finances (loans & credits)']
    },
    {
      id: 'ZIM-MATN-NKA-051', scheme_name: 'Nkayi Fanisoni Irrigation Scheme', site_name: 'Shangani Valley Block',
      province: 'Matabeleland North', district: 'Nkayi', ward: 'Ward 24', lat: -18.995, lng: 28.885, alt: 1080,
      officer: ['Lindiwe Moyo', 'Agritex Supervisor', '+263 71 740 5521', 'lmoyo@matnorth.gov.zw'],
      design: 190, eq: 175, fn: 15, irr: 0, ben: 210, act: 30, yr: 1995, status: 'Non-functional',
      ws: 'River', wsn: 'Shangani River Weir', tech: 'Pumped sprinkler', en: 'Diesel/petrol', pstat: 'Disconnected / Pending', cat: 'Communal', mgmt: 'Farmer/ IMC',
      hw: 'Bad', cv: 'Bad', st: 'Bad', inf: 'Bad', fnz: 'Bad', rd: 'Poor/ Bad', omFund: 'No', omBal: 0,
      rehab: [true, 'Critical', 780000, 'Booster Kits & Electrification'], stage: 'District Verified', src: 'Field Officer Survey',
      crops: [['Green mealies', 15, 4.1, 'Nkayi Growth Point']],
      challenges: ['Rapid deterioration of infrastructure', 'Incapacitated to sustainably operate and maintain irrigation infrastructure']
    }
  ].map((x, idx) => ({
    id: x.id,
    site_name: x.site_name,
    scheme_name: x.scheme_name,
    photo_scheme:
      x.tech === 'Pivots' ? (idx % 3 === 0 ? '/images/dam-headworks.jpg' : '/images/pivot-irrigation.jpg')
      : x.tech === 'Drip' ? (x.en === 'Solar' && idx % 2 === 0 ? '/images/solar-irrigation.jpg' : '/images/drip-horticulture.jpg')
      : x.tech === 'Gravity-fed canals' || x.tech === 'Piped surface' ? '/images/canal-communal.jpg'
      : x.en === 'Solar' ? '/images/solar-irrigation.jpg'
      : '/images/sprinkler-field.jpg',
    province: x.province,
    district: x.district,
    ward: x.ward,
    coordinates: { lat: x.lat, lng: x.lng, alt: x.alt, verified: true },
    officer: { name: x.officer[0], designation: x.officer[1], phone: x.officer[2], email: x.officer[3] },
    technical: {
      design_area_ha: x.design,
      irrigable_area_ha: x.eq,
      equipped_area_ha: x.eq,
      developed_area_ha: x.eq,
      potential_expansion_ha: Math.round(x.design * 0.25),
      functional_area_ha: x.fn,
      actual_irrigated_area_ha: x.irr,
      current_season: '2026/27 Summer',
      water_source: x.ws,
      water_source_name: x.wsn,
      abstraction_capacity_ls: Math.round(x.eq * 0.9),
      water_allocation_m3: x.eq * 8500,
      water_abstraction_m3: Math.round(x.irr * 7800),
      beneficiaries_count: x.ben,
      active_farmers_count: x.act,
      plot_size_ha: Number((x.eq / Math.max(1, x.ben)).toFixed(2)),
      blocking_system: 'Yes',
      commissioning_year: x.yr,
      status: x.status,
      irrigation_system: x.tech,
      energy_source: x.en,
      sector_type: x.cat,
      management_model: x.mgmt
    },
    energy: {
      power_status: x.pstat,
      zesa_meter_no: x.en === 'Electricity' ? `ZETDC-${x.id.slice(4, 11)}` : x.en === 'Solar' ? `SOLAR-${x.id.slice(4, 11)}` : 'N/A (Gravity)',
      monthly_kwh: x.en === 'Electricity' ? Math.round(x.eq * 28) : x.en === 'Solar' ? Math.round(x.eq * 18) : 0,
      bill_status: x.pstat.includes('Disconnected') ? 'Arrears / Disconnected' : 'Current (Paid)'
    },
    infrastructure: {
      headworks: x.hw, conveyance: x.cv, has_storage: x.st !== 'Bad' ? 'Yes' : 'No',
      storage: x.st, infield: x.inf, perimeter_fence: x.fnz, access_road: x.rd,
      mobile_network: 'Good', network_providers: ['Econet', 'Netone'], last_assessment_date: '2026-11-10'
    },
    om: {
      responsible: x.mgmt === 'ARDA' ? 'Government of Zimbabwe' : 'Farmers',
      has_manual: x.omFund, has_fund: x.omFund, pays_levy: x.omFund,
      fund_balance_usd: x.omBal, rehab_count: x.rehab[0] ? 2 : 1,
      last_rehab_year: x.rehab[0] ? 2016 : 2022, rehabilitated_by: x.rehab[3]
    },
    rehab: {
      needs_rehab: x.rehab[0], priority: x.rehab[1], estimated_cost_usd: x.rehab[2],
      programme: x.rehab[3], funding_source: 'GoZ / Partner Co-Funding'
    },
    water_mgmt: {
      sufficient_year_round: x.status === 'Fully functional' ? 'Yes' : 'No',
      has_committee: 'Yes', uniform_fittings: x.hw === 'Good' ? 'Yes' : 'No',
      consistent_schedule: x.status === 'Fully functional' ? 'Yes' : 'No',
      water_saving: ['Drip', 'Pivots'].includes(x.tech) ? 'Yes' : 'No',
      drainage: x.hw === 'Good' ? 'Yes' : 'No', waterlogging: 'No',
      weather_station: x.src === 'Automated Telemetry' ? 'Yes' : 'No',
      instruments: ['Rain gauge', 'Thermometer'], components: ['Rainfall', 'Temperature']
    },
    agronomic: {
      crops: x.crops.map(c => c[0]),
      grow_similar: 'Yes',
      markets: x.crops.map(c => c[3]).slice(0, 2).join(' & '),
      conducts_market_analysis: x.status === 'Fully functional' ? 'Yes' : 'No',
      cropping_intensity_pct: x.status === 'Fully functional' ? 168 : x.status === 'Non-functional' ? 15 : 112
    },
    seasonal_production: x.crops.map((c, idx) => ({
      season: idx === 0 ? '2026 Winter' : '2026/27 Summer',
      crop: c[0], planted_ha: c[1], harvested_ha: Math.round(c[1] * 0.96),
      yield_t_ha: c[2], production_mt: Math.round(c[1] * 0.96 * c[2]), market_destination: c[3]
    })),
    challenges: x.challenges,
    verification: {
      stage: x.stage,
      verified_by: `${x.province} PIDO`,
      verified_date: '2026-11-18',
      method: x.src === 'Automated Telemetry' ? 'Telemetry + Field Audit' : 'Field GPS & Engineering Audit',
      data_source_type: x.src,
      completeness_pct: x.stage === 'Published' ? 98 : 86,
      audit_log: [
        { stage: 'Captured', by: x.officer[0], date: '2026-11-04', note: 'Baseline field survey & GPS verification submitted' },
        { stage: x.stage, by: `${x.province} Review Unit`, date: '2026-11-18', note: `Status updated to ${x.stage}` }
      ]
    },
    documents: [
      { title: `${x.scheme_name} Field Assessment 2026.pdf`, type: 'Engineering Audit', date: '2026-11-10', uploaded_by: x.officer[0] }
    ],
    updatedAt: '2026-11-18T10:00:00.000Z'
  }))
];

export function calculateSummaryMetrics(schemes = []) {
  const totalSchemes = schemes.length;
  const totalDesignArea = schemes.reduce((sum, s) => sum + (Number(s.technical?.design_area_ha) || Number(s.technical?.equipped_area_ha) || 0), 0);
  const totalIrrigableArea = schemes.reduce((sum, s) => sum + (Number(s.technical?.irrigable_area_ha) || Number(s.technical?.equipped_area_ha) || 0), 0);
  const totalEquippedArea = schemes.reduce((sum, s) => sum + (Number(s.technical?.equipped_area_ha) || 0), 0);
  const totalDevelopedArea = schemes.reduce((sum, s) => sum + (Number(s.technical?.developed_area_ha) || Number(s.technical?.equipped_area_ha) || 0), 0);
  const totalFunctionalArea = schemes.reduce((sum, s) => sum + (Number(s.technical?.functional_area_ha) || 0), 0);
  const totalActualIrrigatedArea = schemes.reduce((sum, s) => sum + (Number(s.technical?.actual_irrigated_area_ha) || Number(s.technical?.functional_area_ha) || 0), 0);
  const totalBeneficiaries = schemes.reduce((sum, s) => sum + (Number(s.technical?.beneficiaries_count) || 0), 0);
  const totalActiveFarmers = schemes.reduce((sum, s) => sum + (Number(s.technical?.active_farmers_count) || Number(s.technical?.beneficiaries_count) || 0), 0);

  const fullyFunctional = schemes.filter(s => s.technical?.status === 'Fully functional').length;
  const partiallyFunctional = schemes.filter(s => s.technical?.status === 'Partially functional').length;
  const underRehab = schemes.filter(s => ['Under rehabilitation', 'Under Construction'].includes(s.technical?.status)).length;
  const nonFunctional = schemes.filter(s => s.technical?.status === 'Non-functional').length;

  // National KPI Formula (PDF Section 15): Cropping Intensity = Sum of seasonal cropped area / Net irrigable command area * 100
  const totalSeasonalPlantedHa = schemes.reduce((sum, s) => {
    const prodSum = (s.seasonal_production || []).reduce((pSum, r) => pSum + (Number(r.planted_ha) || 0), 0);
    return sum + (prodSum > 0 ? prodSum : (Number(s.technical?.actual_irrigated_area_ha) || 0));
  }, 0);
  const croppingIntensityPct = totalIrrigableArea > 0 ? ((totalSeasonalPlantedHa / totalIrrigableArea) * 100).toFixed(1) : '0.0';

  const totalProductionMt = schemes.reduce((sum, s) => {
    return sum + (s.seasonal_production || []).reduce((pSum, r) => pSum + (Number(r.production_mt) || 0), 0);
  }, 0);

  const verifiedSchemesCount = schemes.filter(s => ['Published', 'Technical Approval', 'Provincial Review', 'District Verified'].includes(s.verification?.stage)).length;
  const publishedSchemesCount = schemes.filter(s => s.verification?.stage === 'Published').length;
  const verificationCoveragePct = totalSchemes > 0 ? Math.round((verifiedSchemesCount / totalSchemes) * 100) : 0;

  const schemesNeedingRehab = schemes.filter(s => s.rehab?.needs_rehab || ['Partially functional', 'Under rehabilitation', 'Non-functional'].includes(s.technical?.status)).length;
  const totalRehabCostUsd = schemes.reduce((sum, s) => sum + (Number(s.rehab?.estimated_cost_usd) || 0), 0);

  const totalWaterAllocationM3 = schemes.reduce((sum, s) => sum + (Number(s.technical?.water_allocation_m3) || 0), 0);
  const totalWaterAbstractionM3 = schemes.reduce((sum, s) => sum + (Number(s.technical?.water_abstraction_m3) || 0), 0);

  return {
    totalSchemes,
    totalDesignArea: totalDesignArea.toFixed(1),
    totalIrrigableArea: totalIrrigableArea.toFixed(1),
    totalEquippedArea: totalEquippedArea.toFixed(1),
    totalDevelopedArea: totalDevelopedArea.toFixed(1),
    totalFunctionalArea: totalFunctionalArea.toFixed(1),
    totalActualIrrigatedArea: totalActualIrrigatedArea.toFixed(1),
    functionalPercentage: totalEquippedArea > 0 ? ((totalFunctionalArea / totalEquippedArea) * 100).toFixed(1) : '0.0',
    irrigatedUtilizationPct: totalFunctionalArea > 0 ? ((totalActualIrrigatedArea / totalFunctionalArea) * 100).toFixed(1) : '0.0',
    croppingIntensityPct,
    totalSeasonalPlantedHa: Math.round(totalSeasonalPlantedHa),
    totalProductionMt: Math.round(totalProductionMt),
    totalBeneficiaries,
    totalActiveFarmers,
    fullyFunctionalSchemes: fullyFunctional,
    partiallyFunctionalSchemes: partiallyFunctional,
    underRehabSchemes: underRehab,
    nonFunctionalSchemes: nonFunctional,
    fullyFunctionalRate: totalSchemes > 0 ? ((fullyFunctional / totalSchemes) * 100).toFixed(1) : '0.0',
    verifiedSchemesCount,
    publishedSchemesCount,
    verificationCoveragePct,
    schemesNeedingRehab,
    totalRehabCostUsd,
    totalWaterAllocationM3,
    totalWaterAbstractionM3,
    target2030ProgressPct: ((totalActualIrrigatedArea / NATIONAL_2030_TARGET_HA) * 100).toFixed(2)
  };
}
