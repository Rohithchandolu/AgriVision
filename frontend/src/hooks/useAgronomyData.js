import { useState, useEffect } from "react";
import { agroService } from "../services/agroService";
import { MOCK_FARM_DATA } from "../data/mockData";

export function useAgronomyData() {
  const [data, setData] = useState(MOCK_FARM_DATA);
  const [loading, setLoading] = useState(false);
  const [selectedField, setSelectedField] = useState(MOCK_FARM_DATA.fields[0]);
  const [anomalies, setAnomalies] = useState(MOCK_FARM_DATA.anomaliesList);

  useEffect(() => {
    setLoading(true);
    agroService
      .getFarmData()
      .then((farmData) => {
        setData(farmData);
        setAnomalies(farmData.anomaliesList);
      })
      .finally(() => setLoading(false));
  }, []);

  const selectFieldById = (id) => {
    const found = data.fields.find((f) => f.id === id);
    if (found) setSelectedField(found);
  };

  return {
    farmData: data,
    loading,
    selectedField,
    setSelectedField,
    selectFieldById,
    anomalies,
  };
}

