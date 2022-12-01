export class ColumnDef {
  constructor(property: string){
    this.Name = property;
    this.Pipe = null;
    this.Property = property;
    this.IsSort = false;
  }
  public Name: string;
  public Pipe: any;
  public PipeArgs?: string;
  public Property: string;
  public IsSort: boolean;
  public ColorProperty?: string;
  public HideData?: boolean;
  public Icon?: string;
  public IsTooltip?:boolean;
  public SubProperty?: string;
}

export class DynamicTableByndingModel {
  constructor(){
    this.SearchQuery = '';
    this.Filters = [];
    this.PageIndex = 0;
    this.PageSize = 20;
    this.Sort = "Id";
    this.Order = "asc";
  }
  public SearchQuery: string;
  public Filters: Map<string,string>[];
  public PageIndex: number;
  public PageSize: number;
  public Sort: string;
  public Order: string;
}

export interface DynamicTableResult {
  Result: any[];
  ResultSize: number;
}
