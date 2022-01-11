import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-upload-tipo-documento',
  templateUrl: './upload-tipo-documento.component.html',
  styleUrls: ['./upload-tipo-documento.component.scss']
})
export class UploadTipoDocumentoComponent implements OnInit {

  fileForm: FormGroup;
  newFile: any;
  isLoading = false;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public formBuilder: FormBuilder, public api: ApiService) {
    console.log(data);
  }

  ngOnInit(): void {
    this.fileForm = this.createFileForm();
    console.log(this.getUrlAPI(this.data.documentoClasificacionId));
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
    var getFile = this.getFileBuffer(this.newFile);
    const data: ArrayBuffer = await getFile;
    console.log(data);
    this.addFileToFolder(data);
  }

  // getFileBuffer() {
  //   // var deferred = jQuery.Deferred();
  //   var reader = new FileReader();
  //   reader.onloadend = function (e) {
  //     console.log(e.target?.result);
  //     // deferred.resolve(e.target.result);
  //   }
  //   reader.onerror = function (e) {
  //     console.log(e.target?.error);
  //     // deferred.reject(e.target.error);
  //   }

  //   reader.readAsArrayBuffer(this.newFile);
  //   // return deferred.promise();
  // }

  deleteFile() {
    this.newFile = null;
  }

  uploadFile() {
    this.dialogRef.close(this.newFile);
    this.isLoading = true;
    // CREAR ITEM TIPO DOCUMENTO EMPRESA ACREDITACION
    console.log(this.data);
    let req = this.getRequestStructure(this.data.documentoClasificacionId);
    console.log(req);
    // this.api.POST(`/contratos/${this.data.contratoId}/empresas/documento`, req)
    this.api.POST(this.getUrlAPI(this.data.documentoClasificacionId), req)
      .then(data => {
        console.log(data);
        this.isLoading = false;
        this.dialogRef.close(true);
      })
      .catch(err => {
        this.isLoading = false;
        console.log(err);
      });
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
        return `/contratos/${this.data.contratoId}/trabajador/documento`;
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

  async getFileBuffer(file: any): Promise<any> {
    // var deferred = jQuery.Deferred();
    let promise = new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.onloadend = function (e) {
        resolve(e.target?.result);
      }
      reader.onerror = function (e) {
        reject(e.target?.error);
      }
      // reader.readAsArrayBuffer(fileInput[0].files[0]);
      reader.readAsArrayBuffer(file);
      // return deferred.promise();
    });

    return await promise;
  }

  addFileToFolder(arrayBuffer: ArrayBuffer) {
    // Get the file name from the file input control on the page.
    // var parts = fileInput[0].value.split('\\');
    // var fileName = parts[parts.length - 1];

    // Construct the endpoint.
    // var fileCollectionEndpoint = String.format(
    //   "{0}/_api/sp.appcontextsite(@target)/web/getfolderbyserverrelativeurl('{1}')/files" +
    //   "/add(overwrite=true, url='{2}')?@target='{3}'",
    //   appWebUrl, serverRelativeUrlToFolder, fileName, hostWebUrl);

    // let fileCollectionEndpoint = `"https://terminalpuertocoquimbo.sharepoint.com/sites/CapstonePruebas/_api/Web/GetFolderByServerRelativePath(decodedurl='/sites/CapstonePruebas/Documentos%20compartidos/AcreditacionDocumentos')/Files`;
    let fileCollectionEndpoint = `"https://terminalpuertocoquimbo.sharepoint.com/sites/CapstonePruebas/_api/Web/GetFolderByServerRelativePath(decodedurl='/sites/CapstonePruebas/Documentos%20compartidos/AcreditacionDocumentos')/Files/add(url='a.txt',overwrite=true)`;
    // GetFolderByServerRelativeUrl('/Folder Name')/Files/add(url='a.txt',overwrite=true)
    // Send the request and return the response.
    // This call returns the SharePoint file.
    this.api.POSTFile(fileCollectionEndpoint, arrayBuffer)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
    // return jQuery.ajax({
    //   url: fileCollectionEndpoint,
    //   type: "POST",
    //   data: arrayBuffer,
    //   processData: false,
    //   headers: {
    //     "accept": "application/json;odata=verbose",
    //     "X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
    //     "content-length": arrayBuffer.byteLength
    //   }
    // });
  }
}
