import { setupShallowTest } from '../tests/enzyme-util/shallow';
import { ExtensionRigConsole } from './component';

describe('<ExtensionRigConsole />', () => {
  const setupShallow = setupShallowTest(ExtensionRigConsole, () => ({}));

  it('renders correctly', () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders log messages correctly', () => {
    const { wrapper } = setupShallow();
    expect(wrapper.find('ExtensionRigConsoleLog').exists()).toEqual(false);
    wrapper.setState({
      logHistory: [
        {
          log: 'test',
          frame: 'test-frame',
        },
      ],
    });
    wrapper.update();
    expect(wrapper.find('ExtensionRigConsoleLog').exists()).toEqual(true);
  });
});
