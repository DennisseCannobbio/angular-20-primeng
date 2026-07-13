import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageSeverity, MessageVariant } from '../../../shared/components/message/message';
import { AppFile } from '../../../shared/components/file/file';

@Component({
  selector: 'app-file-showcase',
  imports: [FormsModule, AppFile],
  templateUrl: './file-showcase.html',
  styleUrl: './file-showcase.scss',
})
export class FileShowcase {
  singleFile: any;
  multipleFiles: any;
  invalidFile: any;
  disabledFile: any;
}
