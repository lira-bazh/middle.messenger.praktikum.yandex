import { Block } from '@/shared/framework';
import { BlockProps, IUser } from '@/types';

interface FoundUserProps extends BlockProps {
  user: IUser;
  onClick?: (e: Event) => void;
}

export class FoundUser extends Block {
  constructor(props: FoundUserProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => props.onClick && props.onClick(e),
      },
    });
  }

  override render(): string {
    return `
      <div class="found-user">
        {{{ user.first_name }}} {{{ user.second_name }}} ({{{ user.login }}})
      </div>`;
  }
}
