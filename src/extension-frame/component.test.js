import { setupShallowTest } from '../tests/enzyme-util/shallow';
import { ExtensionForTest } from '../tests/constants/extension';
import { ExtensionFrame } from './component';

const { ExtensionViewType, ExtensionAnchor, ExtensionMode } = window['extension-coordinator'];

describe('<ExtensionFrame />', () => {
  const setupShallow = setupShallowTest(ExtensionFrame, () => ({
    iframeClassName: 'rig-frame frameid-0',
    extension: ExtensionForTest,
    type: ExtensionAnchor.Panel,
    mode: ExtensionMode.Viewer,
  }));

  it('prevents the default when double clicked', () => {
    const mockEvent = {};
    mockEvent.preventDefault = jest.fn();
    const { wrapper } = setupShallow();
    wrapper.instance()._onFrameDoubleClick(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('onIdentityLink prop is called', () => {
    const { wrapper } = setupShallow({
      onIdentityLinked: jest.fn()
    });
    wrapper.instance()._onIdentityLinked();
    expect(wrapper.instance().props.onIdentityLinked).toHaveBeenCalled();
  });

  it('parentElement is set when _iframeHostRefHandler is called', () => {
    const { wrapper } = setupShallow();
    const mockParent = 'test';
    wrapper.instance()._iframeHostRefHandler(mockParent);
    expect(wrapper.instance().parentElement).toBe(mockParent);
  });

  describe('when in live config mode', () => {
    it('renders correctly', () => {
      const { wrapper } = setupShallow({
        type: ExtensionViewType.LiveConfig,
        mode: ExtensionMode.Dashboard,
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when in config mode', () => {
    it('renders correctly', () => {
      const { wrapper } = setupShallow({
        type: ExtensionViewType.Config,
        mode: ExtensionMode.Config,
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when in panel mode', () => {
    it('renders correctly', () => {
      const { wrapper } = setupShallow({
        type: ExtensionAnchor.Panel,
        mode: ExtensionMode.Viewer,
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when in video overlay mode', () => {
    it('renders correctly', () => {
      const { wrapper } = setupShallow({
        type: ExtensionAnchor.Overlay,
        mode: ExtensionMode.Viewer,
      });
      expect(wrapper).toMatchSnapshot();
    });
  });
});
