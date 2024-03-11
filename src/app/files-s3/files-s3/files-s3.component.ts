import { Component, OnInit } from '@angular/core';
import { FileService } from '../../api/file.service';

@Component({
  selector: 'app-files-s3',
  templateUrl: './files-s3.component.html',
  styleUrls: ['./files-s3.component.scss']
})
export class FilesS3Component implements OnInit {
  files: any[] = [];
  selectedFile: File | undefined;
  description: string = 'Desc teste'; // Definir uma descrição padrão aqui

  constructor(private fileService: FileService) {}

  ngOnInit() {
    this.fetchFiles();
  }

  fetchFiles() {
    this.fileService.getFiles()
      .subscribe(
        response => {
          this.files = response.files;
        },
        error => {
          console.error('Erro ao buscar arquivos:', error);
        }
      );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      console.log('Nenhum arquivo selecionado.');
      return;
    }

    this.fileService.uploadFile(this.selectedFile, this.description)
      .subscribe(
        response => {
          console.log('Arquivo enviado com sucesso!', response);
          // Limpar seleção e recarregar a lista de arquivos
          this.selectedFile = undefined;
          this.fetchFiles();
        },
        error => {
          console.error('Erro ao enviar arquivo:', error);
        }
      );
  }

  removeImage(id: number) {
    this.fileService.deleteFile(id).subscribe(
      response => {
        console.log('Arquivo removido com sucesso!', response);
        // Atualize a lista de arquivos após a remoção bem-sucedida
        this.files = this.files.filter(file => file.id !== id);
      },
      error => {
        console.error('Erro ao remover arquivo:', error);
      }
    );
  }
}