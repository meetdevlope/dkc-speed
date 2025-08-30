export const copyToClipboard = async (content: string): Promise<boolean> => {
  if (!navigator?.clipboard) {
    console.warn("Clipboard API not supported");
    return false;
  }

  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch (err) {
    console.error("Failed to copy to clipboard:", err);
    return false;
  }
};
