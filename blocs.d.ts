import type { ReactElement } from "react";
export function VotingBlocs(props: { layout: { id: string; x: number; y: number }[]; names: Record<string, string>; agreements: Record<string, number | null>; mayorId: string | null; onSelect: (id: string) => void }): ReactElement;
