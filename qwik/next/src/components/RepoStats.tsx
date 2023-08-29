import type { ChartConfiguration } from "chart.js/auto";
import { Chart } from "chart.js/auto";
import "chartjs-adapter-moment";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import stats from "../../cf1.json";
import { createChart } from "../../../common/utils";
import { RepoStatArray } from "../../../common/types";

export const RepoStats = (props: { name: string }) => {
  const [statData, setStatData] = useState<RepoStatArray | undefined>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartName = `chartdiv_${props.name}`;

  useEffect(() => {
    const fetchStats = async () => {
      const fetchedStats = stats as unknown as Record<string, RepoStatArray>;
      setStatData(fetchedStats[props.name]);
    };
    fetchStats();
  }, [props.name]);

  useLayoutEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx || !statData) return;
      const chartConfig = createChart(statData);
      new Chart(ctx, chartConfig as unknown as ChartConfiguration);
    }
  }, [chartName, statData]);

  return <canvas ref={canvasRef}></canvas>;
};
