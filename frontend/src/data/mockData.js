// AgriSat Precision Health Monitor - Comprehensive Mock Data & GeoJSON
export const MOCK_FARM_DATA = {
  farmName: "Green Valley Agri-Corporation",
  operator: "Sarah Jenkins",
  role: "Lead Agronomist & Planetary GIS Specialist",
  parcelsCount: 18,
  totalAreaHa: 1420,
  location: "Central Valley Agricultural Basin (EPSG:4326)",
  coordinates: [41.2033, -95.9984],
  satellite: {
    constellation: "Sentinel-2B (10m Multispectral)",
    status: "Orbit Live • Ground-Syncd",
    cloudCoverage: "0.6%",
    cloudlessPct: "99.4%",
    lastPassTime: "Today at 07:14 UTC",
    nextPassCountdown: "2h 45m",
    sensorBandwidths: ["B02 Blue 490nm", "B04 Red 665nm", "B08 NIR 842nm", "B11 SWIR 1610nm"],
    calibrationStandard: "Level-2A BOA Bottom-of-Atmosphere Reflectance"
  },
  weather: {
    temperature: "24.5°C",
    humidity: "48%",
    wind: "8.2 km/h NW",
    soilTemp: "19.8°C",
    dewPoint: "13.2°C",
    solarIrradiance: "840 W/m²",
    uvIndex: 7
  },
  kpis: [
    {
      id: "ndvi",
      title: "Farm Health Index (NDVI)",
      value: "0.81",
      unit: "Mean Index",
      change: "+4.2%",
      isPositive: true,
      baseline: "0.77 (30d avg)",
      status: "Optimal Vigor",
      sparkline: [0.72, 0.74, 0.75, 0.78, 0.79, 0.80, 0.81]
    },
    {
      id: "anomalies",
      title: "Active Stress Anomalies",
      value: "2",
      unit: "Parcels Flagged",
      change: "-1 from yesterday",
      isPositive: true,
      baseline: "Isolation Forest Model",
      status: "High Attention",
      sparkline: [4, 3, 4, 3, 2, 3, 2]
    },
    {
      id: "moisture",
      title: "Root Zone Soil Moisture",
      value: "34.8%",
      unit: "Volumetric Content",
      change: "-1.8%",
      isPositive: false,
      baseline: "Target: 32% - 42%",
      status: "Adequate",
      sparkline: [38.2, 37.1, 36.4, 35.8, 35.0, 34.8, 34.8]
    },
    {
      id: "et",
      title: "Evapotranspiration (ET)",
      value: "4.2",
      unit: "mm / day",
      change: "+0.3 mm",
      isPositive: false,
      baseline: "Penman-Monteith",
      status: "Normal Crop Demand",
      sparkline: [3.8, 3.9, 4.0, 4.1, 4.3, 4.1, 4.2]
    },
    {
      id: "nitrogen",
      title: "Nitrogen Uptake Efficiency",
      value: "88%",
      unit: "Chlorophyll Index",
      change: "+2.1%",
      isPositive: true,
      baseline: "Red-Edge Spectral Ratio",
      status: "Target Reached",
      sparkline: [82, 84, 85, 86, 86, 87, 88]
    },
    {
      id: "canopy",
      title: "Canopy Cover Density",
      value: "92%",
      unit: "Spatial Coverage",
      change: "+5.0%",
      isPositive: true,
      baseline: "Crown Area Analysis",
      status: "Closed Canopy",
      sparkline: [85, 87, 88, 89, 90, 91, 92]
    },
    {
      id: "yield",
      title: "Projected Yield Boost",
      value: "+14.2%",
      unit: "4.82 t/Ha Expected",
      change: "+1.4% vs Prev Cycle",
      isPositive: true,
      baseline: "Biomass Growth Curve",
      status: "Ahead of Benchmark",
      sparkline: [10.5, 11.2, 12.0, 12.8, 13.5, 13.9, 14.2]
    },
    {
      id: "sensors",
      title: "IoT Sensor Mesh Sync",
      value: "99.8%",
      unit: "18 / 18 Probes Active",
      change: "100% Signal Strength",
      isPositive: true,
      baseline: "LoRaWAN 915MHz Gateway",
      status: "All Online",
      sparkline: [99.5, 99.7, 99.8, 99.8, 99.9, 99.8, 99.8]
    }
  ],
  fields: [
    {
      id: "A-01",
      name: "Field A-01 'North Orchard'",
      crop: "Almonds",
      areaHa: 180,
      ndvi: 0.84,
      ndwi: 0.44,
      evi: 0.78,
      savi: 0.71,
      moisture: "38.2%",
      soilType: "Fine Sandy Loam",
      irrigation: "Automated Drip (Sector A)",
      status: "Optimal Growth",
      statusColor: "secondary",
      riskLevel: "Low",
      lastScanned: "Today, 07:14 UTC",
      coordinates: [
        [41.215, -96.012],
        [41.222, -96.002],
        [41.218, -95.989],
        [41.209, -95.998],
        [41.215, -96.012]
      ],
      center: [41.216, -96.000],
      recommendation: "Maintain standard drip schedule. Biomass accumulation is on track for record bloom."
    },
    {
      id: "W-12",
      name: "Field W-12 'West Prairie'",
      crop: "Winter Wheat",
      areaHa: 320,
      ndvi: 0.79,
      ndwi: 0.39,
      evi: 0.73,
      savi: 0.67,
      moisture: "33.5%",
      soilType: "Silty Clay Loam",
      irrigation: "Linear Pivot Irrigation",
      status: "Healthy / Vigorous",
      statusColor: "secondary",
      riskLevel: "Low",
      lastScanned: "Today, 07:14 UTC",
      coordinates: [
        [41.205, -96.025],
        [41.212, -96.015],
        [41.202, -96.008],
        [41.196, -96.019],
        [41.205, -96.025]
      ],
      center: [41.204, -96.017],
      recommendation: "Soil moisture stable. Prepare second stage macro-nutrient fertigation by Friday."
    },
    {
      id: "C-04",
      name: "Field C-04 'Central Pivot'",
      crop: "Grain Corn (Field Maize)",
      areaHa: 210,
      ndvi: 0.82,
      ndwi: 0.41,
      evi: 0.76,
      savi: 0.69,
      moisture: "36.0%",
      soilType: "Alluvial Loam",
      irrigation: "Center Pivot Circle",
      status: "Optimal Growth",
      statusColor: "secondary",
      riskLevel: "Low",
      lastScanned: "Today, 07:14 UTC",
      coordinates: [
        [41.198, -96.005],
        [41.205, -95.995],
        [41.199, -95.982],
        [41.191, -95.993],
        [41.198, -96.005]
      ],
      center: [41.198, -95.994],
      recommendation: "Canopy height +8cm over 5 days. Nitrogen assimilation peak."
    },
    {
      id: "B-07",
      name: "Field B-07 'South Basin'",
      crop: "Almonds (Nonpareil)",
      areaHa: 145,
      ndvi: 0.58,
      ndwi: 0.22,
      evi: 0.51,
      savi: 0.48,
      moisture: "21.4%",
      soilType: "Sandy Loam with Gravel Substratum",
      irrigation: "Subsurface Micro-Drip",
      status: "Critical Stress Detected",
      statusColor: "error",
      riskLevel: "Critical",
      anomaly: "Severe Moisture Deficit & Chlorophyll Drop",
      lastScanned: "Today, 07:14 UTC",
      coordinates: [
        [41.185, -96.015],
        [41.192, -96.005],
        [41.186, -95.995],
        [41.179, -96.006],
        [41.185, -96.015]
      ],
      center: [41.185, -96.005],
      recommendation: "Urgent: Increase irrigation duration +2.5 hours immediately. Inspect south-west sub-lateral valve 4B for pressure drop."
    },
    {
      id: "E-09",
      name: "Field E-09 'East Meadow'",
      crop: "Soybean",
      areaHa: 240,
      ndvi: 0.74,
      ndwi: 0.35,
      evi: 0.69,
      savi: 0.63,
      moisture: "29.1%",
      soilType: "Clay Loam",
      irrigation: "Overhead Traveling Gun",
      status: "Moderate Stress",
      statusColor: "tertiary",
      riskLevel: "Moderate",
      anomaly: "Early Nitrogen Dispersion Drift",
      lastScanned: "Today, 07:14 UTC",
      coordinates: [
        [41.210, -95.985],
        [41.218, -95.975],
        [41.211, -95.962],
        [41.202, -95.972],
        [41.210, -95.985]
      ],
      center: [41.210, -95.973],
      recommendation: "Red-edge spectral divergence detected in northern 40 Ha. Adjust foliar nitrogen application."
    },
    {
      id: "S-03",
      name: "Field S-03 'South Plateau'",
      crop: "Canola",
      areaHa: 325,
      ndvi: 0.85,
      ndwi: 0.46,
      evi: 0.81,
      savi: 0.74,
      moisture: "41.0%",
      soilType: "Deep Prairie Silt Loam",
      irrigation: "Natural Rainfall & Supplemental Pivot",
      status: "Peak Vigor",
      statusColor: "secondary",
      riskLevel: "Low",
      lastScanned: "Today, 07:14 UTC",
      coordinates: [
        [41.175, -95.995],
        [41.182, -95.984],
        [41.174, -95.970],
        [41.166, -95.983],
        [41.175, -95.995]
      ],
      center: [41.174, -95.983],
      recommendation: "Exceptional vigor index. Flowering phase uniform across 98% of parcel."
    }
  ],
  anomaliesList: [
    {
      id: "ANOM-2026-081",
      fieldId: "B-07",
      fieldName: "Field B-07 'South Basin'",
      type: "Severe Moisture Deficit",
      severity: "CRITICAL",
      confidence: "98.4%",
      detectedDate: "Today, 07:14 UTC",
      metricImpact: "NDVI -0.23 below historical baseline",
      affectedArea: "68 Ha (47% of parcel)",
      cause: "Irrigation Sub-Lateral Blockage",
      isolationScore: "-0.78 (Severe Outlier)",
      actionRequired: "Increase Pivot Run +2.5 hrs & Inspect Valve 4B"
    },
    {
      id: "ANOM-2026-079",
      fieldId: "E-09",
      fieldName: "Field E-09 'East Meadow'",
      type: "Spectral Red-Edge Shift",
      severity: "MODERATE",
      confidence: "91.2%",
      detectedDate: "Yesterday, 16:30 UTC",
      metricImpact: "Chlorophyll Index -12%",
      affectedArea: "42 Ha (17.5% of parcel)",
      cause: "Localized Nitrogen Leaching",
      isolationScore: "-0.54 (Mild Outlier)",
      actionRequired: "Schedule Targeted Foliar Urea Injection"
    },
    {
      id: "ANOM-2026-072",
      fieldId: "W-12",
      fieldName: "Field W-12 'West Prairie'",
      type: "Thermal Radiance Anomaly",
      severity: "RESOLVED",
      confidence: "88.9%",
      detectedDate: "Oct 28, 2026",
      metricImpact: "Surface Temp +3.4°C",
      affectedArea: "15 Ha (4.6% of parcel)",
      cause: "Nozzle Pressure Fluctuations",
      isolationScore: "-0.41",
      actionRequired: "Cleaned Nozzle Assembly (Closed)"
    }
  ],
  spectralIndices: [
    {
      name: "NDVI",
      fullName: "Normalized Difference Vegetation Index",
      formula: "(NIR - Red) / (NIR + Red)",
      currentVal: "0.81",
      benchmark: "0.76",
      trend: "+6.5%",
      description: "Primary indicator of live green vegetation, biomass chlorophyll concentration, and canopy vigor."
    },
    {
      name: "NDWI",
      fullName: "Normalized Difference Water Index",
      formula: "(NIR - SWIR) / (NIR + SWIR)",
      currentVal: "0.42",
      benchmark: "0.38",
      trend: "+10.5%",
      description: "Monitors liquid water content in crop leaves and detects canopy hydric stress before visible wilting."
    },
    {
      name: "EVI",
      fullName: "Enhanced Vegetation Index",
      formula: "2.5 × ((NIR - Red) / (NIR + 6Red - 7.5Blue + 1))",
      currentVal: "0.76",
      benchmark: "0.71",
      trend: "+7.0%",
      description: "Optimized for dense high-biomass canopies, decoupling soil background signals and atmospheric aerosol scatter."
    },
    {
      name: "SAVI",
      fullName: "Soil-Adjusted Vegetation Index",
      formula: "((NIR - Red) / (NIR + Red + 0.5)) × (1.5)",
      currentVal: "0.68",
      benchmark: "0.62",
      trend: "+9.6%",
      description: "Minimizes soil brightness influences in early vegetative or sparse canopy coverage stages."
    }
  ],
  wavelengthReflectance: [
    { band: "443nm Coastal", healthy: 0.05, stressed: 0.08, soil: 0.12 },
    { band: "490nm Blue", healthy: 0.06, stressed: 0.11, soil: 0.15 },
    { band: "560nm Green", healthy: 0.14, stressed: 0.18, soil: 0.20 },
    { band: "665nm Red", healthy: 0.07, stressed: 0.22, soil: 0.26 },
    { band: "705nm Red Edge 1", healthy: 0.32, stressed: 0.26, soil: 0.28 },
    { band: "740nm Red Edge 2", healthy: 0.62, stressed: 0.42, soil: 0.30 },
    { band: "783nm Red Edge 3", healthy: 0.74, stressed: 0.49, soil: 0.32 },
    { band: "842nm NIR", healthy: 0.78, stressed: 0.51, soil: 0.33 },
    { band: "1610nm SWIR 1", healthy: 0.22, stressed: 0.39, soil: 0.41 },
    { band: "2190nm SWIR 2", healthy: 0.12, stressed: 0.28, soil: 0.38 }
  ],
  historicalNdviTimeline: [
    { date: "Oct 01", avgNdvi: 0.68, fieldA: 0.72, fieldB: 0.65, fieldW: 0.70 },
    { date: "Oct 06", avgNdvi: 0.72, fieldA: 0.76, fieldB: 0.68, fieldW: 0.73 },
    { date: "Oct 12", avgNdvi: 0.75, fieldA: 0.79, fieldB: 0.71, fieldW: 0.75 },
    { date: "Oct 18", avgNdvi: 0.78, fieldA: 0.81, fieldB: 0.69, fieldW: 0.77 },
    { date: "Oct 24", avgNdvi: 0.80, fieldA: 0.83, fieldB: 0.62, fieldW: 0.78 },
    { date: "Oct 31", avgNdvi: 0.81, fieldA: 0.84, fieldB: 0.58, fieldW: 0.79 }
  ],
  aiChatHistory: [
    {
      id: "msg-1",
      sender: "assistant",
      timestamp: "Today at 07:15 UTC",
      text: "Greetings Sarah. I have processed the Sentinel-2B pass over Green Valley parcels. Ground resolution is calibrated at 10m. All parcels show vigorous canopy development except Field B-07 (South Basin), which has triggered a Level 1 High Priority hydric anomaly. How would you like to proceed?",
      badges: ["Sentinel-2B Grounded", "Anomaly Level 1 Active", "ISO-14064 Ag-Data"]
    },
    {
      id: "msg-2",
      sender: "user",
      timestamp: "Today at 07:16 UTC",
      text: "Analyze the root cause for Field B-07's NDVI decline and give me an immediate remediation plan."
    },
    {
      id: "msg-3",
      sender: "assistant",
      timestamp: "Today at 07:16 UTC",
      text: `### Agronomic Analysis: Field B-07 'South Basin' (Almonds - 145 Ha)

1. **Spectral Signal Degradation:**
   - **NDVI:** Dropped from **0.71** (Oct 18) to **0.58** today (-18.3% relative drop).
   - **NDWI (Leaf Water):** Decreased to **0.22**, showing acute moisture depletion in the upper almond canopy.
   - **NIR/Red-Edge Ratio:** Reduced chlorophyll reflectance localized in the south-western 68 hectares.

2. **Root Cause Synthesis:**
   - Cross-referencing IoT probe **PB-07-SW** shows root-zone (30-60cm) moisture at **21.4%**, which is **10.6% below the permanent wilting threshold** for Nonpareil almond varieties in sandy loam.
   - Line pressure at sub-lateral 4B dropped by 18 PSI at 03:00 UTC, indicating a physical manifold blockage or pump trip.

3. **Recommended Remedial Action:**
   - **Immediate:** Dispatch irrigation technician to inspect Valve 4B & clear filter screens.
   - **Irrigation:** Execute supplemental pulse irrigation of **+2.5 hours (approx. 18mm equivalent)** as soon as manifold pressure is restored.
   - **Monitoring:** Re-evaluate canopy temperature using tomorrow morning's PlanetScope 3m high-frequency pass.`,
      badges: ["Isolation Forest Outlier (-0.78)", "Irrigation Valve 4B Flagged", "Yield Protection: +$42,000 Saved"]
    }
  ],
  samplePrompts: [
    "Explain the nitrogen deficit anomaly in Field E-09",
    "Generate a weekly variable-rate irrigation schedule",
    "Calculate projected harvest yield impact across all 18 parcels",
    "Audit greenhouse gas flux & ISO-14064 compliance metrics"
  ]
};

