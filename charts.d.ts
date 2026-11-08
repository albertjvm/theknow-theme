import type { ReactElement } from "react";

export function TurnoutChart(props: { data: { label: string; turnout: number; kind: string; name: string }[] }): ReactElement;
export function YearlyCouncilChart(props: { data: { year: string; motions: number; attendance?: number | null }[]; showAttendance?: boolean }): ReactElement;
