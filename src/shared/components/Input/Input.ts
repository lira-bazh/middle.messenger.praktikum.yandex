import { Block, store } from '@/shared/framework';
import { BlockProps, IStore } from '@/types';

export interface InputProps extends BlockProps {
  name: string;
  type: string;
  placeholder: string;
  value?: string;
  required?: boolean;
  onBlur?: (e: Event) => void;
  getValueFromState?: (state: IStore) => string | undefined;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        blur: (e: Event) => props.onBlur && props.onBlur(e),
      },
    });

    const { getValueFromState } = props;

    if (typeof getValueFromState === 'function') {
      store.subscribe(state => {
        const value = getValueFromState(state);
        if (value) {
          this.setProps({ value });
        }
      });
    }
  }

  override render(): string {
    return `
      <input
        class="text-field"
        name={{name}}
        type={{ type }}
        placeholder={{{ placeholder }}}
        {{#if value}}
          value={{value}}
        {{/if}}
        {{#if required}}
          required
        {{/if}}
      >`;
  }
}
