import { ApiLlanteraService } from "src/app/services/api-llantera.service";


export class Helper {
  constructor(private apiService: ApiLlanteraService) {}


  public insertNewRow<T>(
    jsonData: JSON,
    endpointPath:string,
    dialogRef
  ) {
    return this.apiService
      .insertRow<T>(jsonData, endpointPath)
      .subscribe(() => dialogRef.close(true));
  }
  public getDataForSelectInput<T> (endpointPath: string){
    let selectData;
    this.apiService.getRows<T>(endpointPath).subscribe((data: {}) => selectData = data);
    return selectData
  }
}
