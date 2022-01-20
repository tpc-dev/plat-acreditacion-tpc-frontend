import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';
// import * as jquery from 'jquery';
import * as $ from 'jquery'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharepointapiService } from 'src/app/core/services/sharepointapi/sharepointapi.service';

@Component({
  selector: 'app-upload-tipo-documento',
  templateUrl: './upload-tipo-documento.component.html',
  styleUrls: ['./upload-tipo-documento.component.scss']
})
export class UploadTipoDocumentoComponent implements OnInit {

  fileForm: FormGroup;
  newFile: any;
  isLoading = false;

  //
  appWebUrl: string = "https://terminalpuertocoquimbo.sharepoint.com"; // https://terminalpuertocoquimbo.sharepoint.com/sites/CapstonePruebas
  serverRelativeUrlToFolder: string = 'Documentos%20compartidos/AcreditacionDocumentos'; // /sites/CapstonePruebas/Documentos compartidos/AcreditacionDocumentos/Frutas SPA
  hostWebUrl: any;
  newName: string | number | string[] | undefined;
  contratoCodigo: string;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public formBuilder: FormBuilder, public api: ApiService, public http: HttpClient, public sharePointApi: SharepointapiService) {
    console.log(data);
    this.contratoCodigo = data.contratoCodigo;
  }

  ngOnInit(): void {
    this.fileForm = this.createFileForm();
    console.log(this.getUrlAPI(this.data.documentoClasificacionId));
    // this.createFolder();
    // this.getFilePrueba();
    this.generateTokenSharePoint();
  }

  generateTokenSharePoint() {
    this.api.GET('/cuentas/Sharepoint')
      .then(data => {
        // console.log(data);
        this.sharePointApi.setToken(data.access_token);
        this.sharePointApi.createFolder(this.contratoCodigo);
      })
      .catch(err => {
        console.log(err);
      });
  }

  createFileForm() {
    return this.formBuilder.group({
      fechaInicio: [null, Validators.required],
      fechaTermino: [null, Validators.required]
    });
  }

  async fileInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    this.newFile = fileInputEvent.target.files[0];
  }

  deleteFile() {
    this.newFile = null;
  }

  getFilePrueba() {

    // const folderName = "AcreditacionDocumentos";
    // const serverRelativeUrl = "/sites/CapstonePruebas/Documentos compartidos/AcreditacionDocumentos/C123/applicant_1048786052_CV_1043102503 (1).pdf";
    // const codigoContrato = "C123";
    // const nombreArchivo = "applicant_1048786052_CV_1043102503 (1).pdf";
    // const url = "https://terminalpuertocoquimbo.sharepoint.com/sites/CapstonePruebas/_api/Web/GetFileByServerRelativePath(decodedurl='/sites/CapstonePruebas/Documentos%20compartidos/AcreditacionDocumentos/Frutas%20SPA/applicant_1048786052_CV_1043102503%20(1).pdf')/$value";
    // this.http.get(`https://terminalpuertocoquimbo.sharepoint.com/sites/CapstonePruebas/_api/Web/GetFileByServerRelativePath(decodedurl='/sites/CapstonePruebas/Documentos compartidos/AcreditacionDocumentos/C123/applicant_1048786052_CV_1043102503 (1).pdf')/$value`,
    //   {
    //     responseType: 'blob', headers: new HttpHeaders({
    //       "Content-Type": "application/pdf;odata=verbose",
    //       "Accept": "application/pdf;odata=verbose",
    //       "Access-Control-Allow-Origin": "*",
    //       Authorization: "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvdGVybWluYWxwdWVydG9jb3F1aW1iby5zaGFyZXBvaW50LmNvbUBiYjRlNzdjMi04OTZiLTQ4NzYtYmE4NS0wNzNhMmJiOTkxZTYiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAYmI0ZTc3YzItODk2Yi00ODc2LWJhODUtMDczYTJiYjk5MWU2IiwiaWF0IjoxNjQyNTcxNjQxLCJuYmYiOjE2NDI1NzE2NDEsImV4cCI6MTY0MjY1ODM0MSwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEBiYjRlNzdjMi04OTZiLTQ4NzYtYmE4NS0wNzNhMmJiOTkxZTYiLCJuYW1laWQiOiI2ODRiMGU2MC03NmVmLTQ3YjYtOWIwNS0wYTRmZTkxNmFkMWRAYmI0ZTc3YzItODk2Yi00ODc2LWJhODUtMDczYTJiYjk5MWU2Iiwib2lkIjoiMjJhN2IxNzctY2Y5ZS00ZjM1LThlMzYtYTdhOWUwZTc5MmI4Iiwic3ViIjoiMjJhN2IxNzctY2Y5ZS00ZjM1LThlMzYtYTdhOWUwZTc5MmI4IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.HoVaoPCOFBmVH-tM9GyzFiGaoOfg6YUkPInEN6eMmlL_Xpeb_TEPYd8hW3nqe52KM3enW_zwP5PyIGhnb8Rg_0bFQML6aq0rFO9nJx2x6tzH5oe2TpPRLZAKWJgFCcIxcMdhnRfGa6s6ce5gXQ8I6lwJN-qT2WmZHa64QsCeGPPDCJoKmSEZIVpMvJhoo9OVZmX9ce8QVuZD00YZejcJTPZvNZiQqa0amfTk8vJyBs2rRK67e9jPArvzxXOTbtAP3ov747Ttq_2D8VQigvGVzBCn2jPU-2yoTLkPecAWqRBFwi42A4MCHPd6uX5tyAhEceGWh8b0qoFO4g7_Hg5zdQ",
    //     })
    //   })
    //   .subscribe(data => {
    //     console.log(data);
    //     console.log(this.appWebUrl);
    //     var filename = "readme.pdf";
    //     var blob = new Blob([data], { type: 'text/plain' });
    //     var link = document.createElement("a");
    //     link.download = filename;
    //     link.innerHTML = "Download File";
    //     link.href = window.URL.createObjectURL(blob);
    //     document.body.appendChild(link);
    //   },
    //     err => {
    //       console.log(err);
    //       console.log(err.error.text);
    //     });
  }

  createFolder() {
    const req = {
      "__metadata": {
        "type": "SP.Folder"
      },
      "ServerRelativeUrl": "/sites/CapstonePruebas/Documentos compartidos/AcreditacionDocumentos/CODICOCONTRATO1"
    }

    this.http.post(`https://terminalpuertocoquimbo.sharepoint.com/sites/CapstonePruebas/_api/web/folders`, req,
      {
        // responseType: 'blob',
        headers: new HttpHeaders({
          "Content-Type": "application/json;odata=verbose",
          "Accept": "application/json;odata=verbose",
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvdGVybWluYWxwdWVydG9jb3F1aW1iby5zaGFyZXBvaW50LmNvbUBiYjRlNzdjMi04OTZiLTQ4NzYtYmE4NS0wNzNhMmJiOTkxZTYiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAYmI0ZTc3YzItODk2Yi00ODc2LWJhODUtMDczYTJiYjk5MWU2IiwiaWF0IjoxNjQyNTcxNjQxLCJuYmYiOjE2NDI1NzE2NDEsImV4cCI6MTY0MjY1ODM0MSwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEBiYjRlNzdjMi04OTZiLTQ4NzYtYmE4NS0wNzNhMmJiOTkxZTYiLCJuYW1laWQiOiI2ODRiMGU2MC03NmVmLTQ3YjYtOWIwNS0wYTRmZTkxNmFkMWRAYmI0ZTc3YzItODk2Yi00ODc2LWJhODUtMDczYTJiYjk5MWU2Iiwib2lkIjoiMjJhN2IxNzctY2Y5ZS00ZjM1LThlMzYtYTdhOWUwZTc5MmI4Iiwic3ViIjoiMjJhN2IxNzctY2Y5ZS00ZjM1LThlMzYtYTdhOWUwZTc5MmI4IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.HoVaoPCOFBmVH-tM9GyzFiGaoOfg6YUkPInEN6eMmlL_Xpeb_TEPYd8hW3nqe52KM3enW_zwP5PyIGhnb8Rg_0bFQML6aq0rFO9nJx2x6tzH5oe2TpPRLZAKWJgFCcIxcMdhnRfGa6s6ce5gXQ8I6lwJN-qT2WmZHa64QsCeGPPDCJoKmSEZIVpMvJhoo9OVZmX9ce8QVuZD00YZejcJTPZvNZiQqa0amfTk8vJyBs2rRK67e9jPArvzxXOTbtAP3ov747Ttq_2D8VQigvGVzBCn2jPU-2yoTLkPecAWqRBFwi42A4MCHPd6uX5tyAhEceGWh8b0qoFO4g7_Hg5zdQ",
        })
      })
      .subscribe(data => {
        console.log(data);
      },
        error => {
          console.log(error);
        });
  }

  createFile(arrayBuffer: ArrayBuffer) {
    const req = this.newFile;
    let headers: any = {
      "Content-Type": "application/json;odata=verbose",
      "X-RequestDigest": jQuery('#__REQUESTDIGEST').val(),
      "Accept": "application/json;odata=verbose",
      "Access-Control-Allow-Origin": "*",
      "Content-Length": arrayBuffer.byteLength,
      Authorization: "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvdGVybWluYWxwdWVydG9jb3F1aW1iby5zaGFyZXBvaW50LmNvbUBiYjRlNzdjMi04OTZiLTQ4NzYtYmE4NS0wNzNhMmJiOTkxZTYiLCJpc3MiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAYmI0ZTc3YzItODk2Yi00ODc2LWJhODUtMDczYTJiYjk5MWU2IiwiaWF0IjoxNjQyNTcxNjQxLCJuYmYiOjE2NDI1NzE2NDEsImV4cCI6MTY0MjY1ODM0MSwiaWRlbnRpdHlwcm92aWRlciI6IjAwMDAwMDAxLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMEBiYjRlNzdjMi04OTZiLTQ4NzYtYmE4NS0wNzNhMmJiOTkxZTYiLCJuYW1laWQiOiI2ODRiMGU2MC03NmVmLTQ3YjYtOWIwNS0wYTRmZTkxNmFkMWRAYmI0ZTc3YzItODk2Yi00ODc2LWJhODUtMDczYTJiYjk5MWU2Iiwib2lkIjoiMjJhN2IxNzctY2Y5ZS00ZjM1LThlMzYtYTdhOWUwZTc5MmI4Iiwic3ViIjoiMjJhN2IxNzctY2Y5ZS00ZjM1LThlMzYtYTdhOWUwZTc5MmI4IiwidHJ1c3RlZGZvcmRlbGVnYXRpb24iOiJmYWxzZSJ9.HoVaoPCOFBmVH-tM9GyzFiGaoOfg6YUkPInEN6eMmlL_Xpeb_TEPYd8hW3nqe52KM3enW_zwP5PyIGhnb8Rg_0bFQML6aq0rFO9nJx2x6tzH5oe2TpPRLZAKWJgFCcIxcMdhnRfGa6s6ce5gXQ8I6lwJN-qT2WmZHa64QsCeGPPDCJoKmSEZIVpMvJhoo9OVZmX9ce8QVuZD00YZejcJTPZvNZiQqa0amfTk8vJyBs2rRK67e9jPArvzxXOTbtAP3ov747Ttq_2D8VQigvGVzBCn2jPU-2yoTLkPecAWqRBFwi42A4MCHPd6uX5tyAhEceGWh8b0qoFO4g7_Hg5zdQ",
    }
    this.http.post(`https://terminalpuertocoquimbo.sharepoint.com/sites/CapstonePruebas/_api/web/GetFolderByServerRelativeUrl('Documentos%20compartidos/AcreditacionDocumentos/CODICOCONTRATO1')/Files/add(url='${this.newFile.name}',overwrite=true)`,
      arrayBuffer,
      {
        headers: headers
      })
      .subscribe(data => {
        console.log(data);
      },
        error => {
          console.log(error);
        });
  }

  uploadFile() {
    let getFile = this.getFileBuffer(this.newFile);
    getFile.done((arrayBuffer) => {
      console.log(arrayBuffer);
      // this.createFile(arrayBuffer);
      this.isLoading = true;
      // CREAR ITEM TIPO DOCUMENTO EMPRESA ACREDITACION
      // console.log(this.data);
      let req = this.getRequestStructure(this.data.documentoClasificacionId);
      // console.log(req);
      // console.log(this.getUrlAPI(this.data.documentoClasificacionId));
      let serverRelativeUrl: string;
      this.sharePointApi.createFile(arrayBuffer, this.contratoCodigo, this.newFile.name).toPromise()
        .then((data: any) => {
          console.log(data);
          // this.isLoading = false;
          // serverRelativeUrl = 
          req.urlfile = data.d.ServerRelativeUrl;
          return this.api.POST(this.getUrlAPI(this.data.documentoClasificacionId), req);
        })
        .then(data => {
          console.log(data);
          this.dialogRef.close(true);
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
        });
    });
    // this.dialogRef.close(this.newFile);
  }

  getRequestStructure(documentoClasificacionId: number): any {
    switch (documentoClasificacionId) {
      case 1:
        return {
          fechaInicio: this.fileForm.get('fechaInicio')?.value,
          fechaTermino: this.fileForm.get('fechaTermino')?.value,
          EstadoAcreditacionId: 2,
          TipoDocumentoAcreditacionId: this.data.id,
          urlfile: this.newFile.name,
          contratoId: this.data.contratoId
        };
      case 2:
        return {
          fechaInicio: this.fileForm.get('fechaInicio')?.value,
          fechaTermino: this.fileForm.get('fechaTermino')?.value,
          EstadoAcreditacionId: 2,
          TipoDocumentoAcreditacionId: this.data.id,
          urlfile: this.newFile.name,
        };
      case 3:
        return {
          fechaInicio: this.fileForm.get('fechaInicio')?.value,
          fechaTermino: this.fileForm.get('fechaTermino')?.value,
          EstadoAcreditacionId: 2,
          TipoDocumentoAcreditacionId: this.data.id,
          urlfile: this.newFile.name,
        };
      case 4:
        break;
      case 5:
        return {
          fechaInicio: this.fileForm.get('fechaInicio')?.value,
          fechaTermino: this.fileForm.get('fechaTermino')?.value,
          EstadoAcreditacionId: 2,
          TipoDocumentoAcreditacionId: this.data.id,
          urlfile: this.newFile.name,
          contratoId: this.data.contratoId
        };;
    }
  }

  getUrlAPI(documentoClasificacionId: number): string {
    switch (documentoClasificacionId) {
      case 1:
        return `/contratos/${this.data.contratoId}/documento`;
      case 2:
        return `/contratos/${this.data.contratoId}/empresas/documento`;
      case 3:
        return `/contratos/${this.data.contratoId}/trabajador/documento`;
      case 4:
        break;
      case 5:
        return `/contratos/${this.data.contratoId}/vehiculo/documento`;
    }
    return '';
  }

  // Get the local file as an array buffer.
  getFileBuffer(fileInput: any) {
    var deferred = jQuery.Deferred();
    var reader = new FileReader();
    reader.onloadend = (e: any) => {
      deferred.resolve(e.target.result);
    }
    reader.onerror = (e: any) => {
      deferred.reject(e.target.error);
    }
    // reader.readAsArrayBuffer(fileInput[0].files[0]);
    reader.readAsArrayBuffer(fileInput);
    return deferred.promise();
  }

  // Add the file to the file collection in the Shared Documents folder.
  // addFileToFolder(arrayBuffer: any, fileInput: any) {
  //   // Get the file name from the file input control on the page.
  //   // var parts = fileInput[0].value.split('\\');
  //   // var parts = fileInput[0].value.split('\\');
  //   // var fileName = parts[parts.length - 1];

  //   // Construct the endpoint.
  //   let fileCollectionEndpoint =
  //     `${this.appWebUrl}/_api/sp.appcontextsite(@target)/web/GetFolderByServerRelativeUrl(${this.serverRelativeUrlToFolder})/files
  //     /add(overwrite=true, url=${fileInput.name})?@target=${this.hostWebUrl}`;
  //   // /add(overwrite=true, url=${fileName})?@target=${this.hostWebUrl}`;

  //   // Send the request and return the response.
  //   // This call returns the SharePoint file.
  //   // let digest: string | number | string[] = $('#__REQUESTDIGEST').val();
  //   let digest = $('#__REQUESTDIGEST').val();
  //   console.log(arrayBuffer);
  //   return $.ajax({
  //     url: fileCollectionEndpoint,
  //     type: "POST",
  //     data: arrayBuffer,
  //     processData: false,
  //     headers: {
  //       "accept": "application/json;odata=verbose",
  //       // add CORS headers
  //       "X-RequestDigest": digest?.toString(),
  //       "Content-Length": arrayBuffer.byteLength,
  //     }
  //   });
  // }

  // getListItem(fileListItemUri: any) {
  //   // Construct the endpoint.
  //   // The list item URI uses the host web, but the cross-domain call is sent to the
  //   // add-in web and specifies the host web as the context site.
  //   fileListItemUri = fileListItemUri.replace(this.hostWebUrl, '{0}');
  //   fileListItemUri = fileListItemUri.replace('_api/Web', '_api/sp.appcontextsite(@target)/web');
  //   fileListItemUri - fileListItemUri.replace({ '{0}': this.appWebUrl });
  //   var listItemAllFieldsEndpoint = `${fileListItemUri}?@target=${this.hostWebUrl}`;

  //   // Send the request and return the response.
  //   return jQuery.ajax({
  //     url: listItemAllFieldsEndpoint,
  //     type: "GET",
  //     headers: { "accept": "application/json;odata=verbose" }
  //   });
  // }

  // Change the display name and title of the list item.
  // updateListItem(itemMetadata: any) {
  //   // Construct the endpoint.
  //   // Specify the host web as the context site.
  //   var listItemUri = itemMetadata.uri.replace('_api/Web', '_api/sp.appcontextsite(@target)/web');
  //   var listItemEndpoint = `${listItemUri}?@target=${this.hostWebUrl}`;

  //   // Define the list item changes. Use the FileLeafRef property to change the display name.
  //   // For simplicity, also use the name as the title.
  //   // The example gets the list item type from the item's metadata, but you can also get it from the
  //   // ListItemEntityTypeFullName property of the list.
  //   var body = `{{'__metadata':{{'type':${itemMetadata.type}}},'FileLeafRef':${this.newName},'Title':${this.newName}}}`;

  //   // Send the request and return the promise.
  //   // This call does not return response content from the server.
  //   return $.ajax({
  //     url: listItemEndpoint,
  //     type: "POST",
  //     data: body,
  //     headers: {
  //       "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()?.toString(),
  //       "content-type": "application/json;odata=verbose",
  //       "content-length": body.length.toString(),
  //       "IF-MATCH": itemMetadata.etag,
  //       "X-HTTP-Method": "MERGE"
  //     }
  //   });
  // }

  // Display error messages.
  onError(error: any) {
    alert(error.responseText);
  }

}
