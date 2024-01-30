import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight, FileEdit } from "lucide-react";
import { useState } from "react";
import { Select, SelectItem } from "../select/select";
import Components from "./textInput";

const meta: Meta<typeof Components> = {
  component: Components,
  title: "components/Text Input",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Select is a dropdown component allowing users to choose one option from a list. Use `SelectItem` components to list the options.",
      },
    },
    design: {
      type: "figma",
      url: "https://www.figma.com/file/Gx6UxDt0ZjtPD4pYpOjoKI/Hatch-Head-Base-UI-Template-(Copy)?type=design&node-id=1090-57817&mode=design&t=VX4WxzhpOoqtm6UJ-4",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Components>;

const ICONS = {
  None: undefined,
  FileEdit: <FileEdit />,
  ChevronRight: <ChevronRight />,
};

export const Default: Story = {
  args: {
    label: "Email",
    isLoading: false,
    description: "This is a hint text to help user.",
    tooltip: {
      title: "Tip",
      // cspell: disable-next-line
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    mask: "",
    placeholder: "name@email.com",
  },
  argTypes: {
    leftAccessory: {
      options: Object.keys(ICONS),
      mapping: ICONS,
      control: {
        type: "select",
      },
    },
    rightAccessory: {
      options: Object.keys(ICONS),
      mapping: ICONS,
      control: {
        type: "select",
      },
    },
    error: {
      control: {
        type: "text",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    defaultValue: {
      control: {
        type: "text",
      },
    },
    onChange: {
      action: "onValueChange",
    },
  },
};

export const SelectAddonBasic: Story = () => (
  <Components
    label="Website"
    placeholder="Enter a phone number"
    addon="http://"
  />
);
SelectAddonBasic.args = {};

export const SelectAddonAdvanced: Story = () => {
  const [value, setValue] = useState("us");
  const [textValue, setTextValue] = useState("");

  return (
    <div className="flex flex-col space-y-4">
      <Components
        label="Phone number"
        placeholder="Enter a phone number"
        inputMode="numeric"
        mask="0\7 9999 9999"
        maskChar=" "
        onChange={(e) => setTextValue(e.target.value)}
        addon={
          <Select
            asChild
            className="w-[80px]"
            placeholder="$"
            value={value}
            onValueChange={setValue}
          >
            <SelectItem value="us">US</SelectItem>
            <SelectItem value="au">AUD</SelectItem>
          </Select>
        }
      />
      <code className="rounded-lg bg-gray-100 p-4 text-sm text-gray-600">
        <pre>{JSON.stringify({ value, textValue }, null, 4)}</pre>
      </code>
    </div>
  );
};

SelectAddonAdvanced.args = {};

SelectAddonAdvanced.parameters = {
  docs: {
    source: {
      code: `
import Select from '@ui/select';
const [value, setValue] = useState("us");
const [textValue, setTextValue] = useState("");

<Select
  label="Phone number"
  placeholder="Enter a phone number"
  inputMode="numeric"
  mask="0\\7 9999 9999"
  maskChar=" "
  onChange={(e) => setTextValue(e.target.value)}
  addon={
    <Select
      asChild
      className="w-[80px]"
      placeholder="$"
      value={value}
      onValueChange={setValue}
    >
      <SelectItem value="us">US</SelectItem>
      <SelectItem value="au">AUD</SelectItem>
    </Select>
  }
/>
      `,
    },
  },
};
