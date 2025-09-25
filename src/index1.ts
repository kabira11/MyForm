import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import MyForm from "./react-form/main";

export class FormControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private container!: HTMLDivElement;
  private value: string = "";
  private notifyOutputChanged!: () => void;

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this.container = container;
    this.notifyOutputChanged = notifyOutputChanged;

    const root = ReactDOM.createRoot(container);
    root.render(
      <MyForm
        value={this.value}
        onSave={(val: string) => {
          this.value = val;
          this.notifyOutputChanged();
        }}
      />
    );
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // if bound to field, sync value
    this.value = context.parameters.sampleProperty.raw || "";
  }

  public getOutputs(): IOutputs {
    return {
      sampleProperty: this.value
    };
  }

  public destroy(): void {
    ReactDOM.unmountComponentAtNode(this.container);
  }
}
