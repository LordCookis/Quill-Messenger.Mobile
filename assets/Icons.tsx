import * as React from 'react'
import { ComponentProps } from 'react'
import Svg, { Path, G } from "react-native-svg"

interface IconProps extends ComponentProps<'svg'> {}

const Quill = (props: IconProps) => {
  return(
    <Svg width={26} height={26} {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G><Path fillRule="evenodd" clipRule="evenodd" d="M22.8013 1.74899C22.6665 1.22946 22.1457 0.908925 21.6212 1.02275C8.65054 3.83745 2.58949 13.7685 0.052924 22.7276C-0.0695134 23.16 0.111594 23.621 0.495639 23.8545C0.671767 23.9616 0.870732 24.0087 1.06614 23.9987C1.30094 22.8623 2.3183 22.0061 3.53976 22L3.82845 21.7288C4.23095 21.3506 4.25066 20.7177 3.87248 20.3153C3.65552 20.0843 3.35472 19.9794 3.06169 20.0033L3.10053 19.9025C3.13285 19.8568 3.16175 19.8078 3.18671 19.7556C3.39169 19.327 3.62105 19.0828 3.85127 18.9282C4.08827 18.769 4.38857 18.663 4.7947 18.6054C5.20936 18.5467 5.69118 18.5437 6.27396 18.5637C6.4627 18.5702 6.66791 18.5794 6.8832 18.5891L6.88328 18.5891C7.29482 18.6077 7.74319 18.6279 8.18371 18.6335C9.57215 18.6515 11.1777 18.5382 12.8464 17.8022C14.5236 17.0625 16.1803 15.7318 17.7487 13.451C17.9918 13.0974 17.9823 12.6281 17.7249 12.2846C17.6946 12.2443 17.6617 12.2067 17.6266 12.1721C18.6722 11.5802 19.5909 10.7793 20.3487 9.88147C21.3629 8.6798 22.1246 7.27154 22.5618 5.86914C22.9956 4.47728 23.1309 3.02041 22.8013 1.74899ZM6.34251 16.5649C5.75764 16.5449 5.15144 16.5409 4.57221 16.6173C7.63752 10.6611 12.7418 5.34921 20.9846 3.22857C20.9893 3.84429 20.8812 4.53976 20.6524 5.27392C20.2948 6.42083 19.663 7.59302 18.8203 8.59148C17.1301 10.5941 14.7335 11.7666 12.0659 10.9528C11.6664 10.8309 11.2332 10.9702 10.9795 11.3021C10.7259 11.634 10.7053 12.0885 10.9278 12.442C11.5713 13.4641 12.8696 14.1643 14.5192 14.2379C13.6686 15.0806 12.8349 15.6214 12.0393 15.9723C10.7466 16.5425 9.46928 16.65 8.20953 16.6337C7.79588 16.6284 7.41308 16.611 7.02596 16.5934H7.02595C6.80185 16.5832 6.57631 16.5729 6.34251 16.5649Z" fill="#dadde0"/></G>
    </Svg>
  )
}

const Messages = (props: IconProps) => {
  return(
    <Svg width={26} height={26} {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G><Path opacity="0.4" d="M22 6.25V11.35C22 12.62 21.58 13.69 20.83 14.43C20.09 15.18 19.02 15.6 17.75 15.6V17.41C17.75 18.09 16.99 18.5 16.43 18.12L15.46 17.48C15.55 17.17 15.59 16.83 15.59 16.47V12.4C15.59 10.36 14.23 9 12.19 9H5.39999C5.25999 9 5.13 9.01002 5 9.02002V6.25C5 3.7 6.7 2 9.25 2H17.75C20.3 2 22 3.7 22 6.25Z" fill="#cccccc"/><Path d="M15.59 12.4V16.47C15.59 16.83 15.55 17.17 15.46 17.48C15.09 18.95 13.87 19.87 12.19 19.87H9.47L6.45 21.88C6 22.19 5.39999 21.86 5.39999 21.32V19.87C4.37999 19.87 3.53 19.53 2.94 18.94C2.34 18.34 2 17.49 2 16.47V12.4C2 10.5 3.18 9.19002 5 9.02002C5.13 9.01002 5.25999 9 5.39999 9H12.19C14.23 9 15.59 10.36 15.59 12.4Z" fill="#cccccc"/></G>
    </Svg>
  )
}
const MessagesActive = (props: IconProps) => {
  return(
    <Svg width={26} height={26} {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G><Path opacity="0.4" d="M22 6.25V11.35C22 12.62 21.58 13.69 20.83 14.43C20.09 15.18 19.02 15.6 17.75 15.6V17.41C17.75 18.09 16.99 18.5 16.43 18.12L15.46 17.48C15.55 17.17 15.59 16.83 15.59 16.47V12.4C15.59 10.36 14.23 9 12.19 9H5.39999C5.25999 9 5.13 9.01002 5 9.02002V6.25C5 3.7 6.7 2 9.25 2H17.75C20.3 2 22 3.7 22 6.25Z" fill="#9385ca"/><Path d="M15.59 12.4V16.47C15.59 16.83 15.55 17.17 15.46 17.48C15.09 18.95 13.87 19.87 12.19 19.87H9.47L6.45 21.88C6 22.19 5.39999 21.86 5.39999 21.32V19.87C4.37999 19.87 3.53 19.53 2.94 18.94C2.34 18.34 2 17.49 2 16.47V12.4C2 10.5 3.18 9.19002 5 9.02002C5.13 9.01002 5.25999 9 5.39999 9H12.19C14.23 9 15.59 10.36 15.59 12.4Z" fill="#9385ca"/></G>
    </Svg>
  )
}
const People = (props: IconProps) => {
  return(
    <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G><Path opacity="0.4" d="M17.5291 7.77C17.4591 7.76 17.3891 7.76 17.3191 7.77C15.7691 7.72 14.5391 6.45 14.5391 4.89C14.5391 3.3 15.8291 2 17.4291 2C19.0191 2 20.3191 3.29 20.3191 4.89C20.3091 6.45 19.0791 7.72 17.5291 7.77Z" fill="#cccccc"/><Path opacity="0.4" d="M20.7896 14.6999C19.6696 15.4499 18.0996 15.7299 16.6496 15.5399C17.0296 14.7199 17.2296 13.8099 17.2396 12.8499C17.2396 11.8499 17.0196 10.8999 16.5996 10.0699C18.0796 9.86992 19.6496 10.1499 20.7796 10.8999C22.3596 11.9399 22.3596 13.6499 20.7896 14.6999Z" fill="#cccccc"/><Path opacity="0.4" d="M6.44039 7.77C6.51039 7.76 6.58039 7.76 6.65039 7.77C8.20039 7.72 9.43039 6.45 9.43039 4.89C9.43039 3.3 8.14039 2 6.54039 2C4.95039 2 3.65039 3.29 3.65039 4.89C3.66039 6.45 4.89039 7.72 6.44039 7.77Z" fill="#cccccc"/><Path opacity="0.4" d="M6.54914 12.8501C6.54914 13.8201 6.75914 14.7401 7.13914 15.5701C5.72914 15.7201 4.25914 15.4201 3.17914 14.7101C1.59914 13.6601 1.59914 11.9501 3.17914 10.9001C4.24914 10.1801 5.75914 9.8901 7.17914 10.0501C6.76914 10.8901 6.54914 11.8401 6.54914 12.8501Z" fill="#cccccc"/><Path d="M12.1208 15.87C12.0408 15.86 11.9508 15.86 11.8608 15.87C10.0208 15.81 8.55078 14.3 8.55078 12.44C8.55078 10.54 10.0808 9 11.9908 9C13.8908 9 15.4308 10.54 15.4308 12.44C15.4308 14.3 13.9708 15.81 12.1208 15.87Z" fill="#cccccc"/><Path d="M8.87078 17.9399C7.36078 18.9499 7.36078 20.6099 8.87078 21.6099C10.5908 22.7599 13.4108 22.7599 15.1308 21.6099C16.6408 20.5999 16.6408 18.9399 15.1308 17.9399C13.4208 16.7899 10.6008 16.7899 8.87078 17.9399Z" fill="#cccccc"/></G>
    </Svg>
  )
}
const PeopleActive = (props: IconProps) => {
  return(
    <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G><Path opacity="0.4" d="M17.5291 7.77C17.4591 7.76 17.3891 7.76 17.3191 7.77C15.7691 7.72 14.5391 6.45 14.5391 4.89C14.5391 3.3 15.8291 2 17.4291 2C19.0191 2 20.3191 3.29 20.3191 4.89C20.3091 6.45 19.0791 7.72 17.5291 7.77Z" fill="#9385ca"/><Path opacity="0.4" d="M20.7896 14.6999C19.6696 15.4499 18.0996 15.7299 16.6496 15.5399C17.0296 14.7199 17.2296 13.8099 17.2396 12.8499C17.2396 11.8499 17.0196 10.8999 16.5996 10.0699C18.0796 9.86992 19.6496 10.1499 20.7796 10.8999C22.3596 11.9399 22.3596 13.6499 20.7896 14.6999Z" fill="#9385ca"/><Path opacity="0.4" d="M6.44039 7.77C6.51039 7.76 6.58039 7.76 6.65039 7.77C8.20039 7.72 9.43039 6.45 9.43039 4.89C9.43039 3.3 8.14039 2 6.54039 2C4.95039 2 3.65039 3.29 3.65039 4.89C3.66039 6.45 4.89039 7.72 6.44039 7.77Z" fill="#9385ca"/><Path opacity="0.4" d="M6.54914 12.8501C6.54914 13.8201 6.75914 14.7401 7.13914 15.5701C5.72914 15.7201 4.25914 15.4201 3.17914 14.7101C1.59914 13.6601 1.59914 11.9501 3.17914 10.9001C4.24914 10.1801 5.75914 9.8901 7.17914 10.0501C6.76914 10.8901 6.54914 11.8401 6.54914 12.8501Z" fill="#9385ca"/><Path d="M12.1208 15.87C12.0408 15.86 11.9508 15.86 11.8608 15.87C10.0208 15.81 8.55078 14.3 8.55078 12.44C8.55078 10.54 10.0808 9 11.9908 9C13.8908 9 15.4308 10.54 15.4308 12.44C15.4308 14.3 13.9708 15.81 12.1208 15.87Z" fill="#9385ca"/><Path d="M8.87078 17.9399C7.36078 18.9499 7.36078 20.6099 8.87078 21.6099C10.5908 22.7599 13.4108 22.7599 15.1308 21.6099C16.6408 20.5999 16.6408 18.9399 15.1308 17.9399C13.4208 16.7899 10.6008 16.7899 8.87078 17.9399Z" fill="#9385ca"/></G>
    </Svg>
  )
}
const Settings = (props: IconProps) => {
  return(
    <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G><Path opacity="0.4" d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z" fill="#cccccc"/><Path d="M12 15.25C13.7949 15.25 15.25 13.7949 15.25 12C15.25 10.2051 13.7949 8.75 12 8.75C10.2051 8.75 8.75 10.2051 8.75 12C8.75 13.7949 10.2051 15.25 12 15.25Z" fill="#cccccc"/></G>
    </Svg>
  )
}
const SettingsActive = (props: IconProps) => {
  return(
    <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G><Path opacity="0.4" d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z" fill="#9385ca"/><Path d="M12 15.25C13.7949 15.25 15.25 13.7949 15.25 12C15.25 10.2051 13.7949 8.75 12 8.75C10.2051 8.75 8.75 10.2051 8.75 12C8.75 13.7949 10.2051 15.25 12 15.25Z" fill="#9385ca"/></G>
    </Svg>
  )
}
const Logout = (props: IconProps) => {
  return(
    <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G><Path opacity="0.4" d="M9 7.2V16.79C9 20 11 22 14.2 22H16.79C19.99 22 21.99 20 21.99 16.8V7.2C22 4 20 2 16.8 2H14.2C11 2 9 4 9 7.2Z" fill="#cccccc"/><Path d="M5.56945 8.12002L2.21945 11.47C1.92945 11.76 1.92945 12.24 2.21945 12.53L5.56945 15.88C5.85945 16.17 6.33945 16.17 6.62945 15.88C6.91945 15.59 6.91945 15.11 6.62945 14.82L4.55945 12.75H15.2495C15.6595 12.75 15.9995 12.41 15.9995 12C15.9995 11.59 15.6595 11.25 15.2495 11.25H4.55945L6.62945 9.18002C6.77945 9.03002 6.84945 8.84002 6.84945 8.65002C6.84945 8.46002 6.77945 8.26002 6.62945 8.12002C6.33945 7.82002 5.86945 7.82002 5.56945 8.12002Z" fill="#cccccc"/></G>
    </Svg>
  )
}

const Discover = (props: IconProps) => {
  return(
    <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G><Path opacity="0.4" d="M20.9808 3.0201C20.1108 2.1501 18.8808 1.8101 17.6908 2.1101L7.89084 4.5601C6.24084 4.9701 4.97084 6.2501 4.56084 7.8901L2.11084 17.7001C1.81084 18.8901 2.15084 20.1201 3.02084 20.9901C3.68084 21.6401 4.55084 22.0001 5.45084 22.0001C5.73084 22.0001 6.02084 21.9701 6.30084 21.8901L16.1108 19.4401C17.7508 19.0301 19.0308 17.7601 19.4408 16.1101L21.8908 6.3001C22.1908 5.1101 21.8508 3.8801 20.9808 3.0201Z" fill="#cccccc"/><Path d="M11.9991 15.8801C14.142 15.8801 15.8791 14.143 15.8791 12.0001C15.8791 9.85725 14.142 8.12012 11.9991 8.12012C9.85628 8.12012 8.11914 9.85725 8.11914 12.0001C8.11914 14.143 9.85628 15.8801 11.9991 15.8801Z" fill="#cccccc"/></G>
    </Svg>
  )
}

const DiscoverActive = (props: IconProps) => {
  return(
    <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G><Path opacity="0.4" d="M20.9808 3.0201C20.1108 2.1501 18.8808 1.8101 17.6908 2.1101L7.89084 4.5601C6.24084 4.9701 4.97084 6.2501 4.56084 7.8901L2.11084 17.7001C1.81084 18.8901 2.15084 20.1201 3.02084 20.9901C3.68084 21.6401 4.55084 22.0001 5.45084 22.0001C5.73084 22.0001 6.02084 21.9701 6.30084 21.8901L16.1108 19.4401C17.7508 19.0301 19.0308 17.7601 19.4408 16.1101L21.8908 6.3001C22.1908 5.1101 21.8508 3.8801 20.9808 3.0201Z" fill="#9385ca"/><Path d="M11.9991 15.8801C14.142 15.8801 15.8791 14.143 15.8791 12.0001C15.8791 9.85725 14.142 8.12012 11.9991 8.12012C9.85628 8.12012 8.11914 9.85725 8.11914 12.0001C8.11914 14.143 9.85628 15.8801 11.9991 15.8801Z" fill="#9385ca"/></G>
    </Svg>
  )
}

const Pin = (props: IconProps) => {
  return(
    <Svg fill="#909090" width={15} height={15} viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
      <G><Path d="M1154.976 0 988.342 166.52c-60.448 60.447-63.436 153.418-15.4 220.646L670.359 689.751c-4.022 4.022-6.55 8.964-9.079 13.79-147.212-61.022-328.671-34.246-444.626 81.709l-98.027 98.141 418.31 418.195-520.129 520.129c-22.41 22.409-22.41 58.724 0 81.248 11.262 11.147 25.972 16.778 40.682 16.778s29.42-5.63 40.567-16.778l520.128-520.129 418.195 418.31 98.142-98.142c75.962-75.847 117.793-176.862 117.793-284.313 0-56.195-12.067-110.208-33.787-160.198 2.758-1.839 5.861-2.988 8.275-5.516l303.963-303.964c29.19 21.145 63.896 33.097 100.67 33.097 46.083 0 89.293-17.928 121.93-50.565L1920 764.909 1154.976 0Z" fillRule="evenodd"/></G>
    </Svg>
  )
}

const Letter = (props: IconProps) => {
  return(
    <Svg fill="none" width={15} height={15} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <G><Path opacity="0.4" d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z" fill="#dddddd"/><Path d="M12.0008 12.87C11.1608 12.87 10.3108 12.61 9.66076 12.08L6.53075 9.57997C6.21075 9.31997 6.15076 8.84997 6.41076 8.52997C6.67076 8.20997 7.14076 8.14997 7.46076 8.40997L10.5908 10.91C11.3508 11.52 12.6407 11.52 13.4007 10.91L16.5308 8.40997C16.8508 8.14997 17.3308 8.19997 17.5808 8.52997C17.8408 8.84997 17.7908 9.32997 17.4608 9.57997L14.3308 12.08C13.6908 12.61 12.8408 12.87 12.0008 12.87Z" fill="#dddddd"/></G>
    </Svg>
  )
}

const DoubleCheck = (props: IconProps) => {
  return(
    <Svg fill="none" width={15} height={15} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <G><Path d="M2 12L7.25 17C7.25 17 8.66939 15.3778 9.875 14" stroke="#9385ca" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><Path d="M8 12L13.25 17L22 7" stroke="#9385ca" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><Path d="M16 7L12.5 11" stroke="#9385ca" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></G>
    </Svg>
  )
}

const AddUser = (props: IconProps) => {
  return(
    <Svg fill="none" width={36} height={36} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <G><Path opacity="0.4" d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2Z" fill="#00000000"/><Path d="M16 11.25H12.75V8C12.75 7.59 12.41 7.25 12 7.25C11.59 7.25 11.25 7.59 11.25 8V11.25H8C7.59 11.25 7.25 11.59 7.25 12C7.25 12.41 7.59 12.75 8 12.75H11.25V16C11.25 16.41 11.59 16.75 12 16.75C12.41 16.75 12.75 16.41 12.75 16V12.75H16C16.41 12.75 16.75 12.41 16.75 12C16.75 11.59 16.41 11.25 16 11.25Z" fill="#cccccc"/></G>
    </Svg>
  )
}

const SendArrow = (props: IconProps) => {
  return(
    <Svg fill="none" width={40} height={40} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <G><Path opacity="0.4" d="M9.50929 4.22989L18.0693 8.50989C21.9093 10.4299 21.9093 13.5699 18.0693 15.4899L9.50929 19.7699C3.74929 22.6499 1.39929 20.2899 4.27929 14.5399L5.14929 12.8099C5.39929 12.2999 5.39929 11.7099 5.14929 11.1999L4.27929 9.45989C1.39929 3.70989 3.75929 1.34989 9.50929 4.22989Z" fill="#cccccc"/><Path d="M14.8395 12.75H9.43945C9.02945 12.75 8.68945 12.41 8.68945 12C8.68945 11.59 9.02945 11.25 9.43945 11.25H14.8395C15.2495 11.25 15.5895 11.59 15.5895 12C15.5895 12.41 15.2495 12.75 14.8395 12.75Z" fill="#cccccc"/></G>
    </Svg>
  )
}

const Loading = (props: IconProps) => {
  return(
    <Svg fill="#9385ca" width={40} height={40} id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 399.389 399.389">
      <G><Path d="M340.896,58.489C303.18,20.773,253.031,0.001,199.693,0.001c-53.34,0-103.487,20.771-141.204,58.488 C20.772,96.207,0,146.355,0,199.694c0,53.34,20.772,103.489,58.49,141.206c37.717,37.717,87.864,58.488,141.204,58.488 c53.339,0,103.486-20.771,141.205-58.488c37.717-37.717,58.49-87.865,58.49-141.206C399.387,146.355,378.613,96.207,340.896,58.489 z M77.457,199.694c0-67.401,54.835-122.236,122.236-122.236S321.93,132.293,321.93,199.694s-54.836,122.237-122.237,122.237 S77.457,267.096,77.457,199.694z M328.061,328.063c-34.289,34.287-79.877,53.17-128.368,53.17v-41.147 c77.413,0,140.389-62.979,140.389-140.391c0-77.412-62.979-140.391-140.389-140.391c-4.593,0-9.134,0.229-13.615,0.662V18.655 c4.508-0.332,9.049-0.5,13.615-0.5c48.491,0,94.079,18.883,128.368,53.171c34.289,34.289,53.172,79.878,53.172,128.368 C381.232,248.187,362.35,293.776,328.061,328.063z"/></G>
    </Svg>
  )
}
// strokeWidth
// strokeLinecap
// strokeLinejoin

const Icon = {
  Quill, Messages, MessagesActive, People,
  PeopleActive, Settings, SettingsActive,
  Logout, Discover, DiscoverActive, Pin,
  Letter, DoubleCheck, AddUser, SendArrow,
  Loading,
}

export default Icon