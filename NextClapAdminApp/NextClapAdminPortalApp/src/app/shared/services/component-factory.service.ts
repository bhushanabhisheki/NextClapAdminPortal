import {
  Injectable,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComponentFactoryService {
  rootViewContainer?: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver) {}

  setRootViewContainerRef(view: ViewContainerRef): void {
    this.rootViewContainer = view;
  }

  reset(): void {
    this.rootViewContainer?.clear();
  }

  public insertComponent(componentType: any): void {
    const factory = this.factoryResolver.resolveComponentFactory(componentType);
    this.rootViewContainer?.createComponent(factory);
  }
}
