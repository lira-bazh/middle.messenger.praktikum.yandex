import { Block } from '@/shared/framework';
import { TrashIcon } from '@/shared/components';
import { removeUserFromChat } from '@/shared/actions';
import { BlockProps, IUser } from '@/types';

interface UserItemProps extends BlockProps {
  user: IUser;
  onClick?: (e: Event) => void;
}

export class UserItem extends Block {
  constructor(props: UserItemProps) {
    super({
      ...props,
      TrashIcon: new TrashIcon({
        onClick: (e: Event) => {
          e.preventDefault();
          removeUserFromChat(props.user.id);
        },
      }),
      events: {
        click: (e: Event) => props.onClick && props.onClick(e),
      },
    });
  }

  override render(): string {
    return `
      <div class="chat-user">
        <div class="chat-user-name">{{{ user.first_name }}} {{{ user.second_name }}} ({{{ user.login }}})</div> {{{ TrashIcon }}}
      </div>`;
  }
}
