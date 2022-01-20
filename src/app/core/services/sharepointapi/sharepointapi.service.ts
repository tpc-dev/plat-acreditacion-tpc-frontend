import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharepointapiService {
  appWebUrl: string = "https://terminalpuertocoquimbo.sharepoint.com"; // https://terminalpuertocoquimbo.sharepoint.com/sites/CapstonePruebas
  serverRelativeUrlToFolder: string = 'Documentos%20compartidos/AcreditacionDocumentos'; // /sites/CapstonePruebas/Documentos compartidos/AcreditacionDocumentos/Frutas SPA

  httpOptions: any;
  token: string;
  headers: Headers = new Headers();
  constructor(public http: HttpClient) { }

  setToken(token: string): void {
    // console.log(token)
    this.token = token;
    // this.headers.append('Authorization', 'Bearer ' + token);
    // this.httpOptions = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     Authorization: "Bearer " + token,
    //   }),
    // };
  }


  getSharePointToken() {
  }

  getFile(serverRelativeUrl: string) {
    return this.http.get(`${this.appWebUrl}/sites/CapstonePruebas/_api/Web/GetFileByServerRelativePath(decodedurl='${serverRelativeUrl}')/$value`,
      {
        responseType: 'blob', headers: new HttpHeaders({
          "Content-Type": "application/pdf;odata=verbose",
          "Accept": "application/pdf;odata=verbose",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + this.token,
        })
      })
  }

  createFile(arrayBuffer: ArrayBuffer, codigoContrato: string, fileName: string) {
    console.log(arrayBuffer)
    console.log(codigoContrato)
    console.log(fileName)
    let headers: any = {
      "Content-Type": "application/json;odata=verbose",
      "X-RequestDigest": jQuery('#__REQUESTDIGEST').val(),
      "Accept": "application/json;odata=verbose",
      "Access-Control-Allow-Origin": "*",
      "Content-Length": arrayBuffer.byteLength,
      Authorization: "Bearer " + this.token,
    }
    return this.http.post(`${this.appWebUrl}/sites/CapstonePruebas/_api/web/GetFolderByServerRelativeUrl('Documentos%20compartidos/AcreditacionDocumentos/${codigoContrato}')/Files/add(url='${fileName}',overwrite=true)`,
      arrayBuffer,
      {
        headers: headers
      })
  }

  deleteFile(folderName: string, serverRelativeUrl: string, file_name: string) {
    console.log(`${this.appWebUrl}/sites/CapstonePruebas/_api/web/GetFileByServerRelativeUrl('Documentos%20compartidos/AcreditacionDocumentos/${folderName}/${file_name}')`);

    let headers: any = {
      "Content-Type": "application/json;odata=verbose",
      "X-HTTP-Method": "DELETE",
      "X-RequestDigest": jQuery('#__REQUESTDIGEST').val(),
      "Accept": "application/json;odata=verbose",
      "Access-Control-Allow-Origin": "*",
      "If-Match": "{etag or *}",
      Authorization: "Bearer " + this.token,
    }
    return this.http.delete(`${this.appWebUrl}/sites/CapstonePruebas/_api/web/GetFileByServerRelativePath(decodedurl='${serverRelativeUrl}')`,
      {
        headers: headers
      })
  }

  editFile() {

  }

  createFolder(codigoContrato: string) {
    const req = {
      "__metadata": {
        "type": "SP.Folder"
      },
      "ServerRelativeUrl": `/sites/CapstonePruebas/Documentos compartidos/AcreditacionDocumentos/${codigoContrato}`
    }

    this.http.post(`${this.appWebUrl}/sites/CapstonePruebas/_api/web/folders`, req,
      {
        // responseType: 'blob',
        headers: new HttpHeaders({
          "Content-Type": "application/json;odata=verbose",
          "Accept": "application/json;odata=verbose",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + this.token,
        })
      })
      .subscribe(data => {
        console.log(data);
      },
        error => {
          console.log(error);
        });
  }

}
