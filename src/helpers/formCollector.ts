export const collectionFormData = (form: EventTarget | null): Record<string, string> | undefined => {
  if (form instanceof HTMLFormElement) {
    const collection: Record<string, string> = {};

    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i];
      if (element instanceof HTMLInputElement) {
        collection[element.name] = element.value;
      }
    }

    return collection;
  }

  return;
};
