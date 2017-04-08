/**
 * Created by tony on 4/7/17.
 */
import React from 'react'
import {connect} from 'dongbao'

// const
let EASE_FUNCTION_ELASTIC = "cubic-bezier(.03,1.6,.46,1.6)"

let overlayInitialStyle = {
  display: "none"
}
let initialState = {
  component: undefined,
  options: undefined
}


let defaultInactiveOverlayStyleCreator = ({
  background = "black",
  backgroundOpacity = 0.6,
  minwidth = "200px",
  minheight = "130px",
  duration = "0.25s",
  inEase = EASE_FUNCTION_ELASTIC,
  outEase = ""
} = {}) => {
  return {
    position: "absolute",
    top: "0",
    background: background,
    zIndex: "8000",
    opacity: 0,
    height: "0px",
    width: "100%",
    transition: `opacity ${duration}, height 0s ${duration}`,
  }
}

let defaultActiveOverlayStyleCreator = ({
  background = "black",
  backgroundOpacity = 0.6,
  minwidth = "200px",
  minheight = "130px",
  duration = "0.25s",
  inEase = EASE_FUNCTION_ELASTIC,
  outEase = ""
} = {}) => {
  return {
    position: "absolute",
    top: "0",
    background: background,
    zIndex: "8000",
    opacity: backgroundOpacity,
    height: "100%",
    width: "100%",
    transition: `opacity ${duration}, height 0s`
  }
}

let defaultInactiveWindowStyleCreator = ({
  background = "black",
  backgroundOpacity = 0.6,
  minwidth = "200px",
  minheight = "130px",
  duration = "0.25s",
  inEase = EASE_FUNCTION_ELASTIC,
  outEase = ""
} = {}) => {
  return {
    position: "absolute",
    opacity: 0,
    height: "auto",
    width: "auto",
    minWidth: minwidth,
    // minHeight:minheight,
    top: "40%",
    left: "50%",
    transform: "translate(-50%,-100%) scale(0.7)",
    padding: "0",
    zIndex: "8001",
    transition: `${duration} ${outEase}`,
  }
}

let defaultActiveWindowStyleCreator = ({
  background = "black",
  backgroundOpacity = 0.6,
  minwidth = "200px",
  minheight = "130px",
  duration = "0.25s",
  inEase = EASE_FUNCTION_ELASTIC,
  outEase = ""
} = {}) => {
  return {
    position: "absolute",
    opacity: 1,
    height: "auto",
    width: "auto",
    minWidth: minwidth,
    // minHeight:minheight,
    top: "30%",
    left: "50%",
    transform: "translate(-50%,-50%) scale(1) ",
    padding: "0",
    zIndex: "8001",
    transition: `${duration} ${inEase}`,
    
  }
}

// let modelStyleCreator = (
//   {
//     background = "black",
//     backgroundOpacity = 0.6,
//     minwidth   = "200px",
//     minheight  = "130px",
//     duration   = "0.25s",
//     inEase       = EASE_FUNCTION_ELASTIC,
//     outEase       = ""
//   } = {}
// )=>{
//   return {
//     // inactive layout style
//     overlayInactiveStyle:{
//       position: "absolute",
//       top: "0",
//       background: background,
//       zIndex: "8000",
//       opacity:0,
//       height:"0px",
//       width:"100%",
//       transition: `opacity ${duration}, height 0s ${duration}`,
//     },
//     overlayActiveStyle:{
//       position: "absolute",
//       top: "0",
//       background:background,
//       zIndex: "8000",
//       opacity:backgroundOpacity,
//       height:"100%",
//       width:"100%",
//       transition: `opacity ${duration}, height 0s`
//     },
//     windowInactiveStyle:{
//       position: "absolute",
//       opacity: 0,
//       height: "auto",
//       width: "auto",
//       minWidth: minwidth,
//       // minHeight:minheight,
//       top: "40%",
//       left: "50%",
//       transform: "translate(-50%,-100%) scale(0.7)",
//       padding: "0",
//       zIndex: "8001",
//       transition: `${duration} ${outEase}`,
//     },
//     windowActiveStyle:{
//       position: "absolute",
//       opacity: 1,
//       height: "auto",
//       width: "auto",
//       minWidth: minwidth,
//       // minHeight:minheight,
//       top: "30%",
//       left: "50%",
//       transform: "translate(-50%,-50%) scale(1) ",
//       padding: "0",
//       zIndex: "8001",
//       transition: `${duration} ${inEase}` ,
//
//     }
//   }
//
// }

let defaultWindowStyle = {
  padding: "15px",
  background: "white",
  borderRadius: "5px"
}

let defaultWillClose = () => true
let defaultDidClose = () => {
}

// config
// register wrapper windows (can accept willClose and didClose as props, can render props.children)
let windowMapper = {}
class DefaultWindow extends React.Component {
  render() {
    return (
      <div style={defaultWindowStyle}>
        {this.props.children}
      </div>
    )
  }
}

windowMapper["default"] = DefaultWindow
export let addWindow = (name, component) => {
  windowMapper[name] = component
}

// register modal style creators, used to change style of modal's
let modalStyleMapper = {}
export let addModalStyle = (name,{
  activeOverlay = defaultActiveOverlayStyleCreator,
  inactiveOverlay = defaultInactiveOverlayStyleCreator,
  activeWindow = defaultActiveWindowStyleCreator,
  inactiveWindow = defaultInactiveWindowStyleCreator
}) =>{
  modalStyleMapper[name] = {
    activeOverlay,
    activeWindow,
    inactiveOverlay,
    inactiveWindow
  }
}

modalStyleMapper["default"] = {
  activeOverlay:defaultActiveOverlayStyleCreator,
  activeWindow: defaultActiveWindowStyleCreator,
  inactiveOverlay:defaultInactiveOverlayStyleCreator,
  inactiveWindow: defaultInactiveWindowStyleCreator
}


// state
export let modalStateConfig = {
  path:"modal",
  initial: initialState,
  actions: {
    /**
     *
     * @param state
     * @param payload {component and options}
     * @return {*}
     */
    showModal(state, payload){
      
      let {options = {}} = payload
      let closeFn = () => {
        let {willClose = defaultWillClose, didClose = defaultDidClose} = options
        return Promise.resolve(willClose()).then((canClose) => {
          if (canClose) {
            return Promise.resolve(didClose()).then(() => {
              modalState.updateModalClosed(options)
            })
          }
        }).catch(() => {
        })
      }
      
      let nextState = {
        ...payload,
        closeFn
      }
      
      return nextState
    },
    // we need payload here because we need to control the animation of close modal
    updateModalClosed(state, payload){
      return {
        options: payload,
        component: undefined,
      }
    }
  },
  effects: {
    closeModal(payload, getState){
      return getState().closeFn()
    }
  }
}


// let overlayInitialStyle = {
//   display:"none"
// }
//
// let overlayInactiveStyle = {
//   position: "absolute",
//   top: "0",
//   background: "black",
//   zIndex: "8000",
//   opacity:0,
//   height:"0px",
//   width:"100%",
//   transition: "opacity 0.2s, height 0s 0.2s",
// }
//
//
//
// let overlayActiveStyle = {
//   position: "absolute",
//   top: "0",
//   background:"black",
//   zIndex: "8000",
//   opacity:0.5,
//   height:"100%",
//   width:"100%",
//   transition: "opacity 0.2s, height 0s"
// }
//
//
// let windowInactiveStyle = {
//   position: "absolute",
//   opacity: 0,
//   height: "auto",
//   width: "auto",
//   minWidth: "200px",
//   top: "40%",
//   left: "50%",
//   transform: "translate(-50%,-100%) scale(0.7)",
//   padding: "20px",
//   borderRadius: "10px",
//   background: "white",
//   zIndex: "8001",
//   transition: "0.2s ",
//
// }
//
// let windowStyle = {
//   position: "absolute",
//   opacity: 1,
//   height: "auto",
//   width: "auto",
//   minWidth: "200px",
//   top: "30%",
//   left: "50%",
//   transform: "translate(-50%,-50%) scale(1) ",
//   zIndex: "8001",
//   transition: "0.2s cubic-bezier(.03,1.6,.46,1.6)",
//
// }


// modal component
export let ModalContainer = connect({
  path: __dirname,
})(
  class Container extends React.Component {
    
    constructor() {
      super()
      this.isFrist = true
    }
    
    componentDidMount() {
      this.isFrist = false
    }
    
    render() {
      
      let {component:ContentComponent, options = {}, closeFn} = this.props.state
      
      
      //calc modal style
      let overlayActiveStyle, overlayInactiveStyle, windowActiveStyle, windowInactiveStyle
      let modalStyleCreator = modalStyleMapper[options.style || "default"]
      
      // create styles for overlay and window state
      if (ContentComponent) {
        overlayActiveStyle = modalStyleCreator.activeOverlay(options)
        windowActiveStyle = modalStyleCreator.activeWindow(options)
      }
      else {
        overlayInactiveStyle = modalStyleCreator.inactiveOverlay(options)
        windowInactiveStyle = modalStyleCreator.inactiveWindow(options)
      }
      
      
      // get style for active overlay
      let overlayStyle
      if (ContentComponent) {
        overlayStyle = overlayActiveStyle
      }
      else {
        if (this.isFrist) {
          overlayStyle = overlayInitialStyle
        }
        else {
          
          overlayStyle = overlayInactiveStyle
        }
      }
      
      // choose window wrapper
      let WindowWrapper
      if (options.window === undefined) {
        WindowWrapper = windowMapper["default"]
      }
      else {
        WindowWrapper = windowMapper[options.window]
        if (!WindowWrapper) {
          throw new Error(`can't find '${options.window}' in registered windows`)
        }
      }
      
      
      return (<div>
        <div style={overlayStyle} onClick={closeFn}></div>
        <div style={ContentComponent ? windowActiveStyle : windowInactiveStyle}>
          <WindowWrapper close={closeFn}>
            {ContentComponent ? <ContentComponent close={closeFn}></ContentComponent> : null}
          </WindowWrapper>
        </div>
      </div>)
      
    }
  }
)