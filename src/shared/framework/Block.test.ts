import { expect } from 'chai';
import { Block } from './Block';
import { BlockProps } from '@/types';
import Sinon from 'sinon';

describe('Тестирование класса Block', () => {
  let blockClass: typeof Block;

  beforeEach(() => {
    class Button extends Block {
      constructor(props: BlockProps) {
        super({
          ...props,
          events: {
            click: (e: Event) => props.click && props.click(e),
          },
        });
      }

      render() {
        return '<button>{{{ text }}}</button>';
      }
    }

    blockClass = Button;
  });

  it('render props', () => {
    const textData = 'text button';
    const buttonComponent = new blockClass({
      text: textData,
    });
    const res = buttonComponent.element?.innerHTML;

    expect(res).to.be.eq(textData);
  });

  it('render click', () => {
    const handler = Sinon.stub();

    const buttonComponent = new blockClass({
      text: 'text button',
      click: handler,
    });
    const event = new MouseEvent('click');
    buttonComponent.element?.dispatchEvent(event);

    expect(handler.calledOnce).to.be.eq(true);
  });

  it('Invoke _render', () => {
    const buttonComponent = new blockClass({});
    const spyDCM = Sinon.spy(buttonComponent, '_render' as keyof Block);

    buttonComponent.setProps({ text: 'text button' });

    expect(spyDCM.calledOnce).to.be.eq(true);
  });

});
