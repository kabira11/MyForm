import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import MyForm from "./react-form";

export class FormControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private container!: HTMLDivElement;
  private value: string = "";
  private notifyOutputChanged!: () => void;
  private root!: ReactDOM.Root;

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this.container = container;
    this.notifyOutputChanged = notifyOutputChanged;

    // ✅ create root only once
    this.root = ReactDOM.createRoot(container);

    this.renderControl();
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this.value = context.parameters.sampleProperty.raw || "";
    this.renderControl();
  }

  private renderControl() {
    this.root.render(
      React.createElement(MyForm, {
        value: this.value,
        onSave: (val: string) => {
          this.value = val;
          this.notifyOutputChanged();
        }
      })
    );
  }

  public getOutputs(): IOutputs {
    return {
      sampleProperty: this.value
    };
  }

  public destroy(): void {
    // ✅ React 18 way
    if (this.root) {
      this.root.unmount();
    }
  }
}

