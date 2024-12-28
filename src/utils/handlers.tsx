import type { KeyboardEvent } from "react";

export function handleKeyUp(
  { key }: KeyboardEvent<HTMLElement>,
  action: () => void
) {
  if (key === "Enter") {
    action();
  }
}
