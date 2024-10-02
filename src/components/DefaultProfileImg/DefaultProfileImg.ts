import { Block } from '../../framework';

export class DefaultProfileImg extends Block {
  override render(): string {
    return '<img class="default-profile" alt="Изображение профиля по умолчанию в виде схематично нарисованного портрета человека" src="/default-avatar.svg">';
  }
}
