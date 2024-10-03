import { Block } from '../../framework';
import { BlockProps } from '../../types';

interface ErrorPageProps extends BlockProps {
  code: number;
  description: string;
}
export class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super({
      ...props,
    });
  }

  override render() {
    return `
    <main class="page">
      <div class="error-title">{{code}}</div>
      <div class="error-description">{{description}}</div>
    </main>`;
  }
}
