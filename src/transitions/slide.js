import { injectGlobal, keyframes } from 'styled-components'

const transitionClassName = 'slide'
const duration = 1200

const slideOut = keyframes`
0% { }
25% {  transform: translateZ(-500px); }
75% {  transform: translateZ(-500px) translateX(-100%); }
100% {  transform: translateZ(-500px) translateX(-100%);  }
`
const slideIn = keyframes`
0%, 25% {  transform: translateZ(-500px) translateX(100%);  }
75% {  transform: translateZ(-500px); }
100% {  transform: translateZ(0) translateX(0); }
`
injectGlobal`
.${transitionClassName}-exit-active {
    
  animation: ${slideOut} ${duration}ms both ease;
}
.${transitionClassName}-enter-active {
   
  animation: ${slideIn} ${duration}ms both ease;
}
`

export default { transition: transitionClassName, duration }