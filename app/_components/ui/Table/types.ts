type RenderFnType<T> = (value: T[keyof T], row: T) => React.ReactNode;
export type TableColumnType<T> = {
  key: keyof T;
  header: string;
  render?: RenderFnType<T>;
};

export type TablePropsType<T> = {
  data: T[];
  columns: TableColumnType<T>[];
  bottomContent?: React.ReactNode;
};
export type TableHeaderPropsType<T> = {
  columns: TableColumnType<T>[];
};

export type TableRowPropsType<T> = {
  columns: TableColumnType<T>[];
  row: T;
};

export type TableCellPropsType<T> = {
  value: T[keyof T];
  render?: RenderFnType<T>;
  row: T;
};

export type TableFooterPropsType = {
  bottomContent?: React.ReactNode;
  colSpan: number;
};
