import type { ReactNode, ReactElement } from "react";

export function Card(props: { title: string; note?: string; children: ReactNode }): ReactElement;
export function PageTitle(props: { title: string; children?: ReactNode }): ReactElement;
export function ElectionsLabel(): ReactElement;
export function Brand(props: { children: ReactNode }): ReactElement;
export function OverviewIntro(props: { eyebrow: ReactNode; title: ReactNode; description: ReactNode; titleId?: string; children?: ReactNode }): ReactElement;
