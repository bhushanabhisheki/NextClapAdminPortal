import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-service-spots',
  templateUrl: './service-spots.component.html',
  styleUrls: ['./service-spots.component.scss'],
})
export class ServiceSpotsComponent {
  @ViewChild('json') jsonElement?: ElementRef;
  public form: Object = { components: [] };
  onChange(event: any) {
    console.log(event.form);
  }
  test() {}
}
