import { MOCK_FARM_DATA } from "../data/mockData";

export const agroService = {
  getFarmData() {
    return Promise.resolve(MOCK_FARM_DATA);
  },

  getFieldById(id) {
    const field = MOCK_FARM_DATA.fields.find((f) => f.id === id);
    return Promise.resolve(field || null);
  },

  getAnomalies() {
    return Promise.resolve(MOCK_FARM_DATA.anomaliesList);
  },

  queryAssistant(prompt) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lower = prompt.toLowerCase();
        let reply = "";
        let badges = ["Gemini Grounded", "Level-2A Surface Calibrated"];

        if (lower.includes("irrigation") || lower.includes("water") || lower.includes("schedule")) {
          reply = `### Automated Variable-Rate Irrigation Prescription

Based on NOAA evapotranspiration metrics (4.2 mm/day) and multi-spectral NDWI readings:
* **Field A-01:** Standard 45-minute pulse at 05:00 UTC. Moisture adequate at 38.2%.
* **Field B-07:** Urgent +2.5 hours supplemental run needed. Current root moisture (21.4%) is within hydric stress territory.
* **Field W-12 & C-04:** Defer watering until Thursday evening cycle to prevent nitrogen runoff.
* **Estimated Water Savings:** 1.84 megaliters (-16% vs calendar scheduling).`;
          badges.push("VRI Hydric Algorithm", "Valve 4B Overridden");
        } else if (lower.includes("nitrogen") || lower.includes("e-09") || lower.includes("fertilizer")) {
          reply = `### Spectral Chlorophyll & Nitrogen Assessment (Field E-09)

* **Vegetation Red-Edge Band (705nm - 783nm):** Shows a 12% slope flattening across the northern 42 Ha quadrant.
* **Diagnosis:** Early-stage nitrogen leaching following recent heavy percolation events.
* **Prescription:** Apply variable-rate foliar urea (28-0-0) at 32 kg/Ha targeted exclusively to sub-polygon E-09-North. Avoid southern zones where chlorophyll saturation is 94%.`;
          badges.push("Red-Edge Nitrogen Diagnostic", "Variable Rate Map Generated");
        } else if (lower.includes("yield") || lower.includes("harvest") || lower.includes("forecast")) {
          reply = `### Whole-Farm Harvest Yield & Economic Impact Forecast

* **Aggregate Projected Yield:** 4.82 tons/Ha (+14.2% over regional 5-year benchmark).
* **Top Performing Parcel:** Field S-03 (Canola) tracking at +18.5% yield index with uniform canopy cover (98%).
* **Risk Mitigated:** Rapid intervention on Field B-07 saves an estimated 11.4 tons of premium Nonpareil almond yield valued at approx. $42,500.`;
          badges.push("Yield AI Model v4.2", "Confidence 94.6%");
        } else {
          reply = `### Planetary Agronomy Synthesis for: "${prompt}"

* **Sentinel-2B Pass:** Calibrated across 10m spatial resolution. Top-of-canopy reflectance confirms robust photosynthetic vigor across 16 of 18 parcels.
* **Micro-Climate Synergy:** Ambient temp is 24.5°C with 48% relative humidity, generating stable transpiration gradients.
* **Recommended Next Step:** Check the GIS Satellite Monitor for real-time spectral layer toggles or inspect the Anomaly Alert Center.`;
        }

        resolve({
          id: `msg-${Date.now()}`,
          sender: "assistant",
          timestamp: "Just now",
          text: reply,
          badges,
        });
      }, 700);
    });
  },
};

