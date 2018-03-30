import { setupShallowTest } from '../tests/enzyme-util/shallow';
import { ExtensionViewDialog } from './component';
import { DEFAULT_EXTENSION_TYPE } from '../constants/extension-types.js'
import { DEFAULT_OVERLAY_SIZE } from '../constants/overlay_sizes.js'
import { DEFAULT_VIEWER_TYPE } from '../constants/viewer-types.js'
const { ExtensionAnchor } = window['extension-coordinator'];

describe('<ExtensionViewDialog />', () => {
  const setupShallow = setupShallowTest(ExtensionViewDialog, () => ({
    extensionViews: {
      panel: {},
      videoOverlay: {},
    },
    closeHandler: jest.fn(),
    saveHandler: jest.fn(),
    show:true
  }));

  it('when top nav close button is clicked closeHandler is called', () => {
    const { wrapper } = setupShallow();
    wrapper.find('.top-bar-container__escape').simulate('click');
    expect(wrapper.instance().props.closeHandler).toHaveBeenCalled();
  });

  it('when bottom bar close button is clicked closeHandler is called', () => {
    const { wrapper } = setupShallow();
    wrapper.find('.bottom-bar__cancel').simulate('click');
    expect(wrapper.instance().props.closeHandler).toHaveBeenCalled();
  });

  it('when save button is clicked saveHanler is called', () => {
    const { wrapper } = setupShallow();
    wrapper.find('.bottom-bar__save').simulate('click');
    expect(wrapper.instance().props.saveHandler).toHaveBeenCalled();
  });

  // it('on change is fired when toggling between view options', () => {
  //   const { wrapper } = setupShallow({
  //     extensionViews: {
  //       panel: {},
  //       videoOverlay: {},
  //     }
  //   });
  //   wrapper.instance().onChange = jest.fn();
  //   wrapper.find('RadioOption[value="Logged-Out Viewer"]').simulate('click');
  //   expect(wrapper.instance().onChange).toHaveBeenCalled();
  // })
  describe('for an extension that supports video overlays and panels', () => {
    const { wrapper } = setupShallow();

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('has the correct default state', () => {
      expect(wrapper.state('extensionViewType')).toBe(DEFAULT_EXTENSION_TYPE);
      expect(wrapper.state('overlaySize')).toBe(DEFAULT_OVERLAY_SIZE);
      expect(wrapper.state('viewerType')).toBe(DEFAULT_VIEWER_TYPE);
    });

    it('has the correct selected UI elements', () => {
      expect(wrapper.find('DivOption[value="video_overlay"][checked=true]')).toHaveLength(1);
      expect(wrapper.find('DivOption[checked=false]')).toHaveLength(1);

      expect(wrapper.find('RadioOption[value="640x480"][checked=true]')).toHaveLength(1);
      expect(wrapper.find('RadioOption[name="overlaySize"][checked=false]')).toHaveLength(4);

      expect(wrapper.find('RadioOption[value="Broadcaster"][checked=true]')).toHaveLength(1);
      expect(wrapper.find('RadioOption[name="viewerType"][checked=false]')).toHaveLength(2);

      expect(wrapper.find('RadioOption[name="identityOption"]')).toHaveLength(0);
    });
  });

  describe('for an extension that only supports panels', () => {
    const { wrapper } = setupShallow({
      extensionViews: {
        panel: {},
      }
    });
    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('has the correct default state', () => {
      expect(wrapper.state('extensionViewType')).toBe('panel');
      expect(wrapper.state('overlaySize')).toBe(DEFAULT_OVERLAY_SIZE);
      expect(wrapper.state('viewerType')).toBe(DEFAULT_VIEWER_TYPE);
    });

    it('has the correct selected UI elements', () => {
      expect(wrapper.find('DivOption[value="panel"][checked=true]')).toHaveLength(1);
      expect(wrapper.find('DivOption[checked=false]')).toHaveLength(0);

      expect(wrapper.find('RadioOption[value="640x480"][checked=true]')).toHaveLength(1);
      expect(wrapper.find('RadioOption[name="overlaySize"][checked=false]')).toHaveLength(4);

      expect(wrapper.find('RadioOption[value="Broadcaster"][checked=true]')).toHaveLength(1);
      expect(wrapper.find('RadioOption[name="viewerType"][checked=false]')).toHaveLength(2);

      expect(wrapper.find('RadioOption[name="identityOption"]')).toHaveLength(0);
    });
  });
});
