import React, { useState } from "react";
import CustomCheckbox from "./CustomCheckbox";
import { Heart, Star } from "lucide-react";

const CheckboxDemo = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(true);
  const [checked5, setChecked5] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold mb-4">Custom Checkbox Examples</h2>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-gray-700">
            Default Checkbox
          </h3>
          <CustomCheckbox
            checked={checked1}
            onChange={setChecked1}
            label="Default checkbox with right label"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-gray-700">Label Position</h3>
          <CustomCheckbox
            checked={checked2}
            onChange={setChecked2}
            label="Label on the left side"
            labelPosition="left"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-gray-700">Custom Icons</h3>
          <div className="flex gap-4">
            <CustomCheckbox
              checked={checked3}
              onChange={setChecked3}
              icon={<Heart className="size-3 text-white" />}
              label="Heart icon"
            />
            <CustomCheckbox
              checked={checked4}
              onChange={setChecked4}
              icon={<Star className="size-3 text-white" />}
              label="Star icon"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-gray-700">Sizes</h3>
          <div className="flex gap-4 items-center">
            <CustomCheckbox
              checked={checked5}
              onChange={setChecked5}
              size="sm"
              label="Small"
            />
            <CustomCheckbox
              checked={checked5}
              onChange={setChecked5}
              size="md"
              label="Medium"
            />
            <CustomCheckbox
              checked={checked5}
              onChange={setChecked5}
              size="lg"
              label="Large"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-gray-700">Disabled State</h3>
          <div className="flex gap-4">
            <CustomCheckbox
              checked={false}
              onChange={() => {}}
              disabled={true}
              label="Disabled unchecked"
            />
            <CustomCheckbox
              checked={true}
              onChange={() => {}}
              disabled={true}
              label="Disabled checked"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckboxDemo;
