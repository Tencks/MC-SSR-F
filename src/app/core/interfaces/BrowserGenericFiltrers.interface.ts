export interface FilterConfig{
    key: string,
    label: string,
    type: 'text' | 'number' | 'select',
    options?: { value: any , label: string }[];
  }
  export interface ColumnConfig{
    key: string,
    label: string,
    type?: 'text' | 'number' | 'date' | 'boolean',
    format?: string
  }