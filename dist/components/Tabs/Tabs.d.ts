interface Tab {
    key: string;
    label: string;
    /** Optional id of the tabpanel this tab controls. */
    panelId?: string;
}
interface TabsProps {
    tabs: Tab[];
    activeKey: string;
    onChange: (key: string) => void;
    className?: string;
}
export declare function Tabs({ tabs, activeKey, onChange, className }: TabsProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Tabs.d.ts.map