export interface TabOptionsType {
    text: string | ReactNode;
    value: string;
    disabled?: boolean;
    selected?: boolean;
    onClick?: (e?: Event) => void;
    className?: string;
    style?: CSSProperties;
    selectedClass?: string;
  }
  interface TabsProps {
    dataList: TabOptionsType[];
    style?: CSSProperties;
    className?: string;
  }