import { setupShallowTest } from '../tests/enzyme-util/shallow';
import { RigConfigurationsDialog } from './component';

describe('<RigConfigurationsDialog />', () => {
  const setupShallow = setupShallowTest(RigConfigurationsDialog, () => ({
    show: true,
    config: {},
    closeConfigurationsHandler: jest.fn(),
    refreshConfigurationsHandler: jest.fn()
  }));

  it('renders correctly', () => {
    const { wrapper } = setupShallow();
    expect(wrapper).toMatchSnapshot();
  });

  it('should be null if show is false', () => {
    const { wrapper } = setupShallow({
      show: false,
    });
    expect(wrapper.type()).toBe(null);
  })
  it('expect no config', () => {
    const { wrapper } = setupShallow();
    expect(wrapper.find('.rig-configurations-view__content').text().trim()).toBe('{}');
  });

  it('should have some configurations', () => {
    const { wrapper } = setupShallow({
      config: {
        test: 'config'
      }
    });
    expect(wrapper.find('.rig-configurations-view__content').text().trim()).toBe('{\n  "test": "config"\n}');
  });

  it('fires closeConfigurationsHandler when top exit button is clicked', () => {
    const { wrapper } = setupShallow();
    wrapper.find('.top-bar-container__escape').simulate('click');
    expect(wrapper.instance().props.closeConfigurationsHandler).toHaveBeenCalled();
  });

  it('fires closeConfigurationsHandler when cancel button is clicked', () => {
    const { wrapper } = setupShallow();
    wrapper.find('.bottom-bar__cancel').simulate('click');
    expect(wrapper.instance().props.closeConfigurationsHandler).toHaveBeenCalled();
  });

  it('fires refreshConfigurationsHandler when refresh button is clicked', () => {
    const { wrapper } = setupShallow();
    wrapper.find('.bottom-bar__refresh').simulate('click');
    expect(wrapper.instance().props.refreshConfigurationsHandler).toHaveBeenCalled();
  });
});
