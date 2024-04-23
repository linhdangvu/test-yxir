export interface IDatasetsKpi {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

export interface IKpi {
  id?: string;
  datasets: IDatasetsKpi[];
}
