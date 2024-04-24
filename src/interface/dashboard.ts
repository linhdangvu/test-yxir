export interface IDashboard {
  type: "kpi" | "table" | "carte" | "monitor";
  data?: any;
  id?: string;
}
