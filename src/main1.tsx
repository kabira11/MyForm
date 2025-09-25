import * as React from "react";
import MyForm from "./components/MyForm";

interface FormProps {
  value: string;
  onSave: (val: string) => void;
}

const FormEntry: React.FC<FormProps> = ({ value, onSave }) => {
  return <MyForm value={value} onSave={onSave} />;
};

export default FormEntry;
