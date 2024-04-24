export interface IDatasetsKpi {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

export interface IKpi {
  id?: string;
  title?: string;
  datasets: IDatasetsKpi[];
}

export interface IChart {
  title: string;
  data: any;
}
