import { setupShallowTest } from '../tests/enzyme-util/shallow';
import { RigNav } from './component';
import { EXTENSION_VIEWS } from '../constants/nav-items';

describe('<RigNav />', () => {
  const setupShallow = setupShallowTest(RigNav, () => ({
    openConfigurationsHandler: jest.fn(),
    viewerHandler: jest.fn(),
    configHandler: jest.fn(),
    liveConfigHandler: jest.fn(),
    selectedView: 'test',
    error: '',
  }));

  it('renders correctly', () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders an error', () => {
    const { wrapper } = setupShallow({
      error: 'test error',
    });
    expect(wrapper.find('.top-nav-error').text().trim()).toBe('test error');
  });

  it('correctly handles clicks on each tab', () => {
    const { wrapper } = setupShallow();
    wrapper.find('a.top-nav-item').forEach(tab => {
      tab.simulate('click');
    });
    expect(wrapper.instance().props.viewerHandler).toHaveBeenCalled();
    expect(wrapper.instance().props.configHandler).toHaveBeenCalled();
    expect(wrapper.instance().props.liveConfigHandler).toHaveBeenCalled();
    expect(wrapper.instance().props.openConfigurationsHandler).toHaveBeenCalled();
  });
});
