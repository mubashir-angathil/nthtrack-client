// ColorSelectorProps: Interface defining the props for the ColorSelector component.

export interface ColorSelectorProps {
  // Function to be called on color selection, taking the selected color as an argument
  // eslint-disable-next-line no-unused-vars
  onColorSelect: (color: string) => void;
  // Currently active color
  activeColor: string;
}
