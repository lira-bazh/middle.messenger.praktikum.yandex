import { Block, store } from '@/framework';
import { COMMON_URL } from '@/constants';
import { BlockProps } from '@/types';

interface ProfileImgProps extends BlockProps {
  src?: string;
}

export class ProfileImg extends Block {
  constructor(props?: ProfileImgProps) {
    super({
      ...props,
    });

    store.subscribe(state => {
      const src = state.user?.avatar;
      if (src) {
        this.setProps({ src: `${COMMON_URL}/resources${src}` });
      }
    });
  }

  override render(): string {
    return `
    <div class="profile-img-wrapper">
      <img
        class="profile-img"
        alt="Изображение профиля"
        {{#if src}}
          src={{src}}
        {{else}}
          src="/default-avatar.svg"
        {{/if}}
        >
    </div>`;
  }
}
