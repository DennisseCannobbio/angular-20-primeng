import { Component } from '@angular/core';
import { Spinner } from '../../../shared/components/spinner/spinner';

@Component({
  selector: 'app-spinner-showcase',
  imports: [Spinner],
  templateUrl: './spinner-showcase.html',
  styleUrl: './spinner-showcase.scss',
})
export class SpinnerShowcase {}
