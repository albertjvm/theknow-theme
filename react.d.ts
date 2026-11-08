import type { ReactNode, ReactElement } from "react";

export function Card(props: { title: string; note?: string; children: ReactNode }): ReactElement;
export function PageTitle(props: { title: string; children?: ReactNode }): ReactElement;
export function ElectionsLabel(): ReactElement;
export function Brand(props: { children: ReactNode }): ReactElement;
export function OverviewIntro(props: { eyebrow: ReactNode; title: ReactNode; description: ReactNode; titleId?: string; children?: ReactNode }): ReactElement;
export function TallyBar(props: { yes: number; no: number }): ReactElement;
export function MotionRow(props: { title: ReactNode; meta: ReactNode; children?: ReactNode; yes: number; no: number; outcome: ReactNode; outcomeClass?: string }): ReactElement;
export function SortHeader(props: { label: string; active: boolean; descending: boolean; onClick: () => void }): ReactElement;
export type TableColumn<T> = { key: string; label: string; value: (row: T) => string | number | null; render?: (row: T) => ReactNode };
export function SortableTable<T>(props: { rows: T[]; columns: TableColumn<T>[]; rowKey: (row: T) => string; initialSort: string; initialDescending?: boolean }): ReactElement;
