import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrls: ['./detail-panel.component.scss'],
})
export class DetailPanelComponent implements OnInit {
  @Input() panelTitle: string;

  @Input() backLink: any[];

  @Output() backClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
