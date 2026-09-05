"use client";

import * as React from "react";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Carousel } from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form-field";
import { Field } from "@/components/ui/field";
import { Toggle } from "@/components/ui/toggle";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { MultiSelect } from "@/components/ui/multi-select";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { DividerWithText } from "@/components/ui/divider-with-text";
import { InputGroup } from "@/components/ui/input-group";
import { ButtonGroup } from "@/components/ui/button-group";
import { Item } from "@/components/ui/item";
import { LoadingButton } from "@/components/ui/loading-button";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { Listbox } from "@/components/ui/listbox";
import { DropdownMenuV2 } from "@/components/ui/dropdown-menu-v2";

export const wave1Previews: Record<string, React.ComponentType> = {
  "alert-dialog": () => {
    return (
      <AlertDialog
        open={true}
        onOpenChange={() => {}}
        title="Delete item"
        description="This action is irreversible. Are you sure?"
        confirmLabel="Delete"
        cancelLabel="Keep"
      />
    );
  },

  carousel: () => {
    const items = [
      {
        title: "Summer Sale",
        description: "Get 20% off on all items. Use code SUMMER20 at checkout.",
        children: <div>Summer</div>,
      },
      {
        title: "New Arrivals",
        description: "Check out our latest collection arriving this week.",
        children: <div>New</div>,
      },
      {
        title: "Clearance",
        description: "Last chance to buy at these prices.",
        children: <div>Clearance</div>,
      },
    ];

    return <Carousel items={items} autoplay interval={5000} />;
  },

  label: () => {
    return (
      <Label htmlFor="username" required>
        Username
      </Label>
    );
  },

  "form-field": () => {
    return (
      <FormField
        label="Email address"
        htmlFor="email-input"
        description="We'll never share your email"
        error="Please enter a valid email address"
        required
      >
        <input id="email-input" type="email" />
      </FormField>
    );
  },

  field: () => {
    return (
      <Field
        htmlFor="username"
        required
        label="Username"
        description="Choose a username for your account"
        error="Username must be at least 3 characters"
      >
        <input id="username" type="text" defaultValue="johndoe" />
      </Field>
    );
  },

  toggle: () => {
    const [pressed, setPressed] = React.useState(false);

    return (
      <Toggle
        pressed={pressed}
        onPressedChange={setPressed}
        variant="default"
        size="default"
      />
    );
  },

  "navigation-menu": () => {
    const items = [
      { id: "1", label: "Home" },
      { id: "2", label: "Products", panel: <div className="p-4">Products panel</div> },
      { id: "3", label: "About", panel: <div className="p-4">About panel</div> },
      { id: "4", label: "Contact", panel: <div className="p-4">Contact panel</div> },
    ];

    return <NavigationMenu items={items} />;
  },

  "multi-select": () => {
    const options = [
      { value: "1", label: "Option A" },
      { value: "2", label: "Option B" },
      { value: "3", label: "Option C" },
      { value: "4", label: "Option D" },
    ];

    const [selected, setSelected] = React.useState<string[]>(["1"]);

    return (
      <MultiSelect
        options={options}
        selected={selected}
        onSelectionChange={(sel) => setSelected(Array.isArray(sel) ? sel : [sel])}
        searchable
      />
    );
  },

  "avatar-group": () => {
    const names = ["Alice", "Bob", "Charlie", "Diana", "Eve"];

    return <AvatarGroup names={names} max={3} size="default" />;
  },

  "divider-with-text": () => {
    return (
      <DividerWithText>
        <span>Our Mission</span>
      </DividerWithText>
    );
  },

  "input-group": () => {
    return (
      <InputGroup placeholder="Enter your email">
        <span className="absolute left-0 flex items-center text-muted-foreground">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="mr-2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11l5 5 5-5" />
          </svg>
          Email
        </span>
      </InputGroup>
    );
  },

  "button-group": () => {
    return (
      <ButtonGroup>
        <button className="py-2">Default</button>
        <button className="py-2">Primary</button>
        <button className="py-2">Secondary</button>
      </ButtonGroup>
    );
  },

  item: () => {
    return (
      <Item
        media={<div className="bg-border h-full w-full rounded-md flex items-center justify-center">Icon</div>}
        title="Product Name Goes Here"
        description="This is a longer description of the product that spans multiple lines"
        actions={
          <>
            <button>Edit</button>
            <button>Delete</button>
          </>
        }
      />
    );
  },

  "loading-button": () => {
    const [loading, setLoading] = React.useState(true);

    return (
      <LoadingButton
        loading={loading}
        loadingText="Saving changes..."
        onClick={() => setTimeout(() => setLoading(false), 2000)}
      />
    );
  },

  "checkbox-group": () => {
    const options = [
      { value: "1", label: "Option A" },
      { value: "2", label: "Option B" },
      { value: "3", label: "Option C" },
    ];

    const [value, setValue] = React.useState<string[]>(["1"]);

    return (
      <CheckboxGroup
        options={options}
        value={value}
        onValueChange={setValue}
      />
    );
  },

  listbox: () => {
    const items = [
      { value: "1", label: "Option A" },
      { value: "2", label: "Option B" },
      { value: "3", label: "Option C" },
      { value: "4", label: "Option D" },
    ];

    const [selected, setSelected] = React.useState<string[]>(["1"]);

    return (
      <Listbox
        items={items}
        multiple
        selected={selected}
        onSelectionChange={(sel) => setSelected(Array.isArray(sel) ? sel : [sel])}
      />
    );
  },

  "dropdown-menu-v2": () => {
    const items = [
      { id: "1", label: "New project", shortcut: "⌘N" },
      { id: "2", label: "Open…", shortcut: "⌘O" },
      { id: "sep-1", label: "sep-1", separator: true },
      {
        id: "3",
        label: "Recent",
        submenu: [
          { id: "3a", label: "Project 1", shortcut: "⌘1" },
          { id: "3b", label: "Project 2", shortcut: "⌘2" },
          { id: "sep-1", label: "sep-1", separator: true },
          { id: "3c", label: "Project 3", shortcut: "⌘3" },
        ],
      },
      { id: "4", label: "Export", checkbox: true },
      { id: "5", label: "Dangerous action", danger: true },
      { id: "6", label: "Edit settings", radioGroup: "profile", radioValue: "edit" },
    ];

    return <DropdownMenuV2 items={items} />;
  },
};