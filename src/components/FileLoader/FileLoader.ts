import { Block } from '@/framework';
import { BlockProps } from '@/types';

export interface FileLoaderProps extends BlockProps {
  onChange?: (e: Event) => void;
  content: Block;
}

export class FileLoader extends Block {
  constructor(props: FileLoaderProps) {
    super({
      ...props,
      events: {
        change: (e: Event) => props.onChange && props.onChange(e),
      },
    });
  }

  override render(): string {
    return `
      <div class="file-loader">
        {{{ content }}}
        <input
          class="file-loader-input"
          type="file"
          accept="image/*"
        >
      </div>`;
  }
}
