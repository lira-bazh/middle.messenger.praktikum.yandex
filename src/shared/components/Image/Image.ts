import { Block, store } from '@/shared/framework';
import { COMMON_URL } from '@/constants';
import { BlockProps, IStore } from '@/types';

interface ImageProps extends BlockProps {
  className: string;
  alt: string;
  defaultImage?: string;
  getSrc: (state?: IStore) => string | undefined | null;
}

export class Image extends Block {
  constructor(props: ImageProps) {
    super({
      ...props,
    });

    store.subscribe(state => {
      const src = props.getSrc(state);
      if (src) {
        this.setProps({ src: `${COMMON_URL}/resources${src}` });
      }
    });
  }

  override render(): string {
    return `
    <div class="{{{ className }}}-wrapper">
      {{#if src}}
        <img
          class="{{{ className }}}"
          alt="{{ alt }}"
          src="{{src}}"
          >
      {{else}}
        {{#if defaultImage}}
          <img
            class="{{{ className }}}"
            alt="{{ alt }}"
            src="{{{ defaultImage }}}"
            >
        {{/if}}
      {{/if}}
    </div>`;
  }
}
