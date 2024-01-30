import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import StarRating, { type StarRatingProps } from "./starRating";

const meta: Meta<typeof StarRating> = {
  component: StarRating,
  tags: ["autodocs"],
  title: "components/Star Rating",
  parameters: {
    docs: {
      description: {
        component:
          "The star rating component is used for displaying a rating of a product or service. The component responds to click and dragging events to call the `onChange` callback with the new rating value. The default rating is 0 out of 5 stars",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StarRating>;

export const Default: Story = (props: StarRatingProps) => {
  return <StarRating {...props} />;
};

Default.args = {};

Default.argTypes = {
  value: {
    control: {
      type: "range",
      min: 0,
      max: 5,
      step: 0.5,
    },
  },
  onChange: {
    action: "onChange",
  },
};

export const InteractiveExample: Story = (props: StarRatingProps) => {
  const [value, setValue] = useState(0);
  return <StarRating {...props} value={value} onChange={setValue} />;
};

InteractiveExample.parameters = {
  of: "Default",
  docs: {
    source: {
      code: `
  import StarRating from '@ui/starRating';
  
  const MyComponent = () => {
  
    const [value, setValue] = useState(0);
    
    return <StarRating value={value} onChange={setValue} />;
  }; 
        `,
    },
  },
};

InteractiveExample.argTypes = {
  value: {
    table: {
      disable: true,
    },
  },
  onChange: {
    table: {
      disable: true,
    },
  },
};
