interface FormFieldProps {
  label?: string;
  children: React.ReactNode;
}

const FormField = ({ label, children }: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-2 w-full border border-gray-200 rounded-md p-2 cursor-pointer">
      {label ? <label className="text-sm font-medium">{label}</label> : null}
      {children}
    </div>
  );
};

export default FormField;
