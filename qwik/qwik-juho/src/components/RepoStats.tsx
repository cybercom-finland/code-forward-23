import type { ChartConfiguration } from "chart.js/auto";
import { Chart } from "chart.js/auto";
import "chartjs-adapter-moment";
import stats from "../../../common/stats.json";
import type { RepoStatArray } from "../../../common/types";
import { createChart } from "../../../common/utils";
import {
  component$,
  useSignal,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";

export const RepoStats = component$((props: { name: string }) => {
  const statDataSignal = useSignal<RepoStatArray | undefined>();
  const canvasRef = useSignal<HTMLCanvasElement>();

  useTask$(async () => {
    const fetchedStats = stats as unknown as Record<string, RepoStatArray>;
    statDataSignal.value = fetchedStats[props.name];
  });

  useVisibleTask$(() => {
    if (canvasRef.value) {
      const ctx = canvasRef.value.getContext("2d");
      if (!ctx || !statDataSignal.value) return;
      const chartConfig = createChart(statDataSignal.value);
      new Chart(ctx, chartConfig as unknown as ChartConfiguration);
    }
  });

  return <canvas ref={canvasRef}></canvas>;
});
