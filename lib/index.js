'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.createModal = createModal;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dongbao = require('dongbao');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EASE_FUNCTION_ELASTIC = "cubic-bezier(.03,1.6,.46,1.6)";

var overlayInitialStyle = {
  display: "none"
};
var initialState = {
  component: undefined,
  options: undefined
};

var defaultInactiveOverlayStyleCreator = function defaultInactiveOverlayStyleCreator() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$background = _ref.background,
      background = _ref$background === undefined ? "black" : _ref$background,
      _ref$backgroundOpacit = _ref.backgroundOpacity,
      backgroundOpacity = _ref$backgroundOpacit === undefined ? 0.6 : _ref$backgroundOpacit,
      _ref$minwidth = _ref.minwidth,
      minwidth = _ref$minwidth === undefined ? "200px" : _ref$minwidth,
      _ref$minheight = _ref.minheight,
      minheight = _ref$minheight === undefined ? "130px" : _ref$minheight,
      _ref$duration = _ref.duration,
      duration = _ref$duration === undefined ? "0.25s" : _ref$duration,
      _ref$inEase = _ref.inEase,
      inEase = _ref$inEase === undefined ? EASE_FUNCTION_ELASTIC : _ref$inEase,
      _ref$outEase = _ref.outEase,
      outEase = _ref$outEase === undefined ? "" : _ref$outEase;

  return {
    position: "absolute",
    top: "0",
    background: background,
    zIndex: "8000",
    opacity: 0,
    height: "0px",
    width: "100%",
    transition: 'opacity ' + duration + ', height 0s ' + duration
  };
};

var defaultActiveOverlayStyleCreator = function defaultActiveOverlayStyleCreator() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$background = _ref2.background,
      background = _ref2$background === undefined ? "black" : _ref2$background,
      _ref2$backgroundOpaci = _ref2.backgroundOpacity,
      backgroundOpacity = _ref2$backgroundOpaci === undefined ? 0.6 : _ref2$backgroundOpaci,
      _ref2$minwidth = _ref2.minwidth,
      minwidth = _ref2$minwidth === undefined ? "200px" : _ref2$minwidth,
      _ref2$minheight = _ref2.minheight,
      minheight = _ref2$minheight === undefined ? "130px" : _ref2$minheight,
      _ref2$duration = _ref2.duration,
      duration = _ref2$duration === undefined ? "0.25s" : _ref2$duration,
      _ref2$inEase = _ref2.inEase,
      inEase = _ref2$inEase === undefined ? EASE_FUNCTION_ELASTIC : _ref2$inEase,
      _ref2$outEase = _ref2.outEase,
      outEase = _ref2$outEase === undefined ? "" : _ref2$outEase;

  return {
    position: "absolute",
    top: "0",
    background: background,
    zIndex: "8000",
    opacity: backgroundOpacity,
    height: "100%",
    width: "100%",
    transition: 'opacity ' + duration + ', height 0s'
  };
};

var defaultInactiveWindowStyleCreator = function defaultInactiveWindowStyleCreator() {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref3$background = _ref3.background,
      background = _ref3$background === undefined ? "black" : _ref3$background,
      _ref3$backgroundOpaci = _ref3.backgroundOpacity,
      backgroundOpacity = _ref3$backgroundOpaci === undefined ? 0.6 : _ref3$backgroundOpaci,
      _ref3$minwidth = _ref3.minwidth,
      minwidth = _ref3$minwidth === undefined ? "200px" : _ref3$minwidth,
      _ref3$minheight = _ref3.minheight,
      minheight = _ref3$minheight === undefined ? "130px" : _ref3$minheight,
      _ref3$duration = _ref3.duration,
      duration = _ref3$duration === undefined ? "0.25s" : _ref3$duration,
      _ref3$inEase = _ref3.inEase,
      inEase = _ref3$inEase === undefined ? EASE_FUNCTION_ELASTIC : _ref3$inEase,
      _ref3$outEase = _ref3.outEase,
      outEase = _ref3$outEase === undefined ? "" : _ref3$outEase;

  return {
    position: "absolute",
    opacity: 0,
    height: "auto",
    width: "auto",
    minWidth: minwidth,

    top: "40%",
    left: "50%",
    transform: "translate(-50%,-100%) scale(0.7)",
    padding: "0",
    zIndex: "8001",
    transition: duration + ' ' + outEase
  };
};

var defaultActiveWindowStyleCreator = function defaultActiveWindowStyleCreator() {
  var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref4$background = _ref4.background,
      background = _ref4$background === undefined ? "black" : _ref4$background,
      _ref4$backgroundOpaci = _ref4.backgroundOpacity,
      backgroundOpacity = _ref4$backgroundOpaci === undefined ? 0.6 : _ref4$backgroundOpaci,
      _ref4$minwidth = _ref4.minwidth,
      minwidth = _ref4$minwidth === undefined ? "200px" : _ref4$minwidth,
      _ref4$minheight = _ref4.minheight,
      minheight = _ref4$minheight === undefined ? "130px" : _ref4$minheight,
      _ref4$duration = _ref4.duration,
      duration = _ref4$duration === undefined ? "0.25s" : _ref4$duration,
      _ref4$inEase = _ref4.inEase,
      inEase = _ref4$inEase === undefined ? EASE_FUNCTION_ELASTIC : _ref4$inEase,
      _ref4$outEase = _ref4.outEase,
      outEase = _ref4$outEase === undefined ? "" : _ref4$outEase;

  return {
    position: "absolute",
    opacity: 1,
    height: "auto",
    width: "auto",
    minWidth: minwidth,

    top: "30%",
    left: "50%",
    transform: "translate(-50%,-50%) scale(1) ",
    padding: "0",
    zIndex: "8001",
    transition: duration + ' ' + inEase

  };
};

var defaultWindowStyle = {
  padding: "15px",
  background: "white",
  borderRadius: "5px"
};

var defaultWillClose = function defaultWillClose() {
  return true;
};
var defaultDidClose = function defaultDidClose() {};

var windowMapper = {};

var DefaultWindow = function (_React$Component) {
  (0, _inherits3.default)(DefaultWindow, _React$Component);

  function DefaultWindow() {
    (0, _classCallCheck3.default)(this, DefaultWindow);
    return (0, _possibleConstructorReturn3.default)(this, (DefaultWindow.__proto__ || Object.getPrototypeOf(DefaultWindow)).apply(this, arguments));
  }

  (0, _createClass3.default)(DefaultWindow, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: defaultWindowStyle },
        this.props.children
      );
    }
  }]);
  return DefaultWindow;
}(_react2.default.Component);

windowMapper["default"] = DefaultWindow;
var addWindow = function addWindow(name, component) {
  windowMapper[name] = component;
};

var modalStyleMapper = {};
var addModalStyle = function addModalStyle(name, _ref5) {
  var _ref5$activeOverlay = _ref5.activeOverlay,
      activeOverlay = _ref5$activeOverlay === undefined ? defaultActiveOverlayStyleCreator : _ref5$activeOverlay,
      _ref5$inactiveOverlay = _ref5.inactiveOverlay,
      inactiveOverlay = _ref5$inactiveOverlay === undefined ? defaultInactiveOverlayStyleCreator : _ref5$inactiveOverlay,
      _ref5$activeWindow = _ref5.activeWindow,
      activeWindow = _ref5$activeWindow === undefined ? defaultActiveWindowStyleCreator : _ref5$activeWindow,
      _ref5$inactiveWindow = _ref5.inactiveWindow,
      inactiveWindow = _ref5$inactiveWindow === undefined ? defaultInactiveWindowStyleCreator : _ref5$inactiveWindow;

  modalStyleMapper[name] = {
    activeOverlay: activeOverlay,
    activeWindow: activeWindow,
    inactiveOverlay: inactiveOverlay,
    inactiveWindow: inactiveWindow
  };
};

modalStyleMapper["default"] = {
  activeOverlay: defaultActiveOverlayStyleCreator,
  activeWindow: defaultActiveWindowStyleCreator,
  inactiveOverlay: defaultInactiveOverlayStyleCreator,
  inactiveWindow: defaultInactiveWindowStyleCreator
};

var DEFAULT_PATH = "modal";

function createModal() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_PATH;

  var modalState = void 0;

  var modalStateConfig = {
    path: path,
    initial: initialState,
    actions: {
      showModal: function showModal(state, payload) {
        var _payload$options = payload.options,
            options = _payload$options === undefined ? {} : _payload$options;

        var closeFn = function closeFn() {
          var _options$willClose = options.willClose,
              willClose = _options$willClose === undefined ? defaultWillClose : _options$willClose,
              _options$didClose = options.didClose,
              didClose = _options$didClose === undefined ? defaultDidClose : _options$didClose;

          return Promise.resolve(willClose()).then(function (canClose) {
            if (canClose) {
              return Promise.resolve(didClose()).then(function () {
                modalState.updateModalClosed(options);
              });
            }
          }).catch(function () {});
        };

        var nextState = Object.assign({}, payload, {
          closeFn: closeFn
        });

        return nextState;
      },
      updateModalClosed: function updateModalClosed(state, payload) {
        return {
          options: payload,
          component: undefined
        };
      }
    },
    effects: {
      closeModal: function closeModal(payload, getState) {
        return getState().closeFn();
      }
    }
  };

  modalState = (0, _dongbao.State)(modalStateConfig);

  var ModalContainer = (0, _dongbao.connect)({
    path: path
  })(function (_React$Component2) {
    (0, _inherits3.default)(Container, _React$Component2);

    function Container() {
      (0, _classCallCheck3.default)(this, Container);

      var _this2 = (0, _possibleConstructorReturn3.default)(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this));

      _this2.isFrist = true;
      return _this2;
    }

    (0, _createClass3.default)(Container, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.isFrist = false;
      }
    }, {
      key: 'render',
      value: function render() {
        var _props$state = this.props.state,
            ContentComponent = _props$state.component,
            _props$state$options = _props$state.options,
            options = _props$state$options === undefined ? {} : _props$state$options,
            closeFn = _props$state.closeFn;

        var overlayActiveStyle = void 0,
            overlayInactiveStyle = void 0,
            windowActiveStyle = void 0,
            windowInactiveStyle = void 0;
        var modalStyleCreator = modalStyleMapper[options.style || "default"];

        if (ContentComponent) {
          overlayActiveStyle = modalStyleCreator.activeOverlay(options);
          windowActiveStyle = modalStyleCreator.activeWindow(options);
        } else {
          overlayInactiveStyle = modalStyleCreator.inactiveOverlay(options);
          windowInactiveStyle = modalStyleCreator.inactiveWindow(options);
        }

        var overlayStyle = void 0;
        if (ContentComponent) {
          overlayStyle = overlayActiveStyle;
        } else {
          if (this.isFrist) {
            overlayStyle = overlayInitialStyle;
          } else {

            overlayStyle = overlayInactiveStyle;
          }
        }

        var WindowWrapper = void 0;
        if (options.window === undefined) {
          WindowWrapper = windowMapper["default"];
        } else {
          WindowWrapper = windowMapper[options.window];
          if (!WindowWrapper) {
            throw new Error('can\'t find \'' + options.window + '\' in registered windows');
          }
        }

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('div', { style: overlayStyle, onClick: closeFn }),
          _react2.default.createElement(
            'div',
            { style: ContentComponent ? windowActiveStyle : windowInactiveStyle },
            _react2.default.createElement(
              WindowWrapper,
              { close: closeFn },
              ContentComponent ? _react2.default.createElement(ContentComponent, { close: closeFn }) : null
            )
          )
        );
      }
    }]);
    return Container;
  }(_react2.default.Component));

  return {
    modalState: modalState,
    addModalStyle: addModalStyle,
    addWindow: addWindow,
    ModalContainer: ModalContainer
  };
}