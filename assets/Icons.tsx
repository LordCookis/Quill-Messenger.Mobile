import * as React from 'react'
import { ComponentProps } from 'react'
import Svg, { Path, G } from "react-native-svg"
import { Image } from 'react-native'
import FastImage from 'react-native-fast-image'

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
  const {...SvgProps} = props
  return(
    <Svg fill="none" width={40} height={40} {...SvgProps} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
    <Svg fill="#9385ca" id="Capa_1" xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 399.389 399.389">
      <G id="SVGRepo_bgCarrier" strokeWidth="0"/>
      <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
      <G id="SVGRepo_iconCarrier"><G><Path d="M340.896,58.489C303.18,20.773,253.031,0.001,199.693,0.001c-53.34,0-103.487,20.771-141.204,58.488 C20.772,96.207,0,146.355,0,199.694c0,53.34,20.772,103.489,58.49,141.206c37.717,37.717,87.864,58.488,141.204,58.488 c53.339,0,103.486-20.771,141.205-58.488c37.717-37.717,58.49-87.865,58.49-141.206C399.387,146.355,378.613,96.207,340.896,58.489 z M77.457,199.694c0-67.401,54.835-122.236,122.236-122.236S321.93,132.293,321.93,199.694s-54.836,122.237-122.237,122.237 S77.457,267.096,77.457,199.694z M328.061,328.063c-34.289,34.287-79.877,53.17-128.368,53.17v-41.147 c77.413,0,140.389-62.979,140.389-140.391c0-77.412-62.979-140.391-140.389-140.391c-4.593,0-9.134,0.229-13.615,0.662V18.655 c4.508-0.332,9.049-0.5,13.615-0.5c48.491,0,94.079,18.883,128.368,53.171c34.289,34.289,53.172,79.878,53.172,128.368 C381.232,248.187,362.35,293.776,328.061,328.063z"/></G></G>
    </Svg>
  )
}

const AnimatedPen = (props: IconProps) => {
  return(<FastImage source={require("../public/animated/anim-pen.gif")} style={[{height: 20, width: 20}]}/>)
}

const AudioCall = () => {
  return(
    <Svg width={25} height={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G id="SVGRepo_bgCarrier" strokeWidth="0"/>
      <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
      <G id="SVGRepo_iconCarrier"> <Path d="M17.62 10.7501C17.19 10.7501 16.85 10.4001 16.85 9.9801C16.85 9.6101 16.48 8.8401 15.86 8.1701C15.25 7.5201 14.58 7.1401 14.02 7.1401C13.59 7.1401 13.25 6.7901 13.25 6.3701C13.25 5.9501 13.6 5.6001 14.02 5.6001C15.02 5.6001 16.07 6.1401 16.99 7.1101C17.85 8.0201 18.4 9.1501 18.4 9.9701C18.4 10.4001 18.05 10.7501 17.62 10.7501Z" fill="#cccccc"/> <Path d="M21.2298 10.75C20.7998 10.75 20.4598 10.4 20.4598 9.98C20.4598 6.43 17.5698 3.55 14.0298 3.55C13.5998 3.55 13.2598 3.2 13.2598 2.78C13.2598 2.36 13.5998 2 14.0198 2C18.4198 2 21.9998 5.58 21.9998 9.98C21.9998 10.4 21.6498 10.75 21.2298 10.75Z" fill="#cccccc"/> <Path opacity="0.4" d="M11.79 14.21L8.52 17.48C8.16 17.16 7.81 16.83 7.47 16.49C6.44 15.45 5.51 14.36 4.68 13.22C3.86 12.08 3.2 10.94 2.72 9.81C2.24 8.67 2 7.58 2 6.54C2 5.86 2.12 5.21 2.36 4.61C2.6 4 2.98 3.44 3.51 2.94C4.15 2.31 4.85 2 5.59 2C5.87 2 6.15 2.06 6.4 2.18C6.66 2.3 6.89 2.48 7.07 2.74L9.39 6.01C9.57 6.26 9.7 6.49 9.79 6.71C9.88 6.92 9.93 7.13 9.93 7.32C9.93 7.56 9.86 7.8 9.72 8.03C9.59 8.26 9.4 8.5 9.16 8.74L8.4 9.53C8.29 9.64 8.24 9.77 8.24 9.93C8.24 10.01 8.25 10.08 8.27 10.16C8.3 10.24 8.33 10.3 8.35 10.36C8.53 10.69 8.84 11.12 9.28 11.64C9.73 12.16 10.21 12.69 10.73 13.22C11.09 13.57 11.44 13.91 11.79 14.21Z" fill="#cccccc"/> <Path d="M21.9696 18.33C21.9696 18.61 21.9196 18.9 21.8196 19.18C21.7896 19.26 21.7596 19.34 21.7196 19.42C21.5496 19.78 21.3296 20.12 21.0396 20.44C20.5496 20.98 20.0096 21.37 19.3996 21.62C19.3896 21.62 19.3796 21.63 19.3696 21.63C18.7796 21.87 18.1396 22 17.4496 22C16.4296 22 15.3396 21.76 14.1896 21.27C13.0396 20.78 11.8896 20.12 10.7496 19.29C10.3596 19 9.96961 18.71 9.59961 18.4L12.8696 15.13C13.1496 15.34 13.3996 15.5 13.6096 15.61C13.6596 15.63 13.7196 15.66 13.7896 15.69C13.8696 15.72 13.9496 15.73 14.0396 15.73C14.2096 15.73 14.3396 15.67 14.4496 15.56L15.2096 14.81C15.4596 14.56 15.6996 14.37 15.9296 14.25C16.1596 14.11 16.3896 14.04 16.6396 14.04C16.8296 14.04 17.0296 14.08 17.2496 14.17C17.4696 14.26 17.6996 14.39 17.9496 14.56L21.2596 16.91C21.5196 17.09 21.6996 17.3 21.8096 17.55C21.9096 17.8 21.9696 18.05 21.9696 18.33Z" fill="#cccccc"/> </G>
    </Svg>
  )
}

const VideoCall = () => {
  return(
    <Svg width={25} height={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G id="SVGRepo_bgCarrier" strokeWidth="0"/>
      <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
      <G id="SVGRepo_iconCarrier"> <Path opacity="0.4" d="M13 3.25H7C3.58 3.25 2.25 4.58 2.25 8V16C2.25 18.3 3.5 20.75 7 20.75H13C16.42 20.75 17.75 19.42 17.75 16V8C17.75 4.58 16.42 3.25 13 3.25Z" fill="#cccccc"/> <Path d="M11.4991 11.3801C12.5374 11.3801 13.3791 10.5384 13.3791 9.50012C13.3791 8.46182 12.5374 7.62012 11.4991 7.62012C10.4608 7.62012 9.61914 8.46182 9.61914 9.50012C9.61914 10.5384 10.4608 11.3801 11.4991 11.3801Z" fill="#cccccc"/> <Path d="M21.6505 6.17011C21.2405 5.96011 20.3805 5.72011 19.2105 6.54011L17.7305 7.58011C17.7405 7.72011 17.7505 7.85011 17.7505 8.00011V16.0001C17.7505 16.1501 17.7305 16.2801 17.7305 16.4201L19.2105 17.4601C19.8305 17.9001 20.3705 18.0401 20.8005 18.0401C21.1705 18.0401 21.4605 17.9401 21.6505 17.8401C22.0605 17.6301 22.7505 17.0601 22.7505 15.6301V8.38011C22.7505 6.95011 22.0605 6.38011 21.6505 6.17011Z" fill="#cccccc"/> </G>
    </Svg>
  )
}

const MessageTriangleRight = () => {
  return(
  <Svg width={20} height={20} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(90)">
    <G id="SVGRepo_bgCarrier" strokeWidth="0"/>
    <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
    <G id="SVGRepo_iconCarrier">
    <Path fill="#d06af838" d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z"/>
    </G>
  </Svg>
  )
}

const MessageTriangleLeft = () => {
  return(
  <Svg width={20} height={20} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" transform="rotate(90)matrix(1, 0, 0, -1, 0, 0)">
    <G id="SVGRepo_bgCarrier" strokeWidth="0"/>
    <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
    <G id="SVGRepo_iconCarrier">
    <Path fill="#ffffff11" d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z"/>
    </G>
  </Svg>
  )
}

const Paperclip = (props:IconProps & {color:string})=> {
  const {color, ...SvgProps} = props
  return(
    <Svg fill={color} height={30} width={30} viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
      <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
      <G id="SVGRepo_iconCarrier">
        <Path d="M23.113 7.248h-0.002c0 0 0 0 0 0-0.689 0-1.248 0.558-1.25 1.247v0l-0.029 14.198c0.008 0.114 0.013 0.247 0.013 0.381 0 3.118-2.528 5.646-5.646 5.646-0.071 0-0.142-0.001-0.212-0.004l0.010 0h-0.014c-0.063 0.003-0.138 0.004-0.213 0.004-3.117 0-5.643-2.527-5.643-5.643 0-0.126 0.004-0.25 0.012-0.374l-0.001 0.017v-15.516c-0.004-0.063-0.006-0.136-0.006-0.21 0-2.054 1.665-3.719 3.719-3.719 0.074 0 0.147 0.002 0.219 0.006l-0.010-0c0.063-0.004 0.136-0.006 0.21-0.006 2.053 0 3.717 1.664 3.717 3.717 0 0.073-0.002 0.145-0.006 0.217l0-0.010-0.057 14.272c0.002 0.045 0.004 0.097 0.004 0.15 0 0.719-0.259 1.378-0.689 1.887l0.004-0.004c-0.332 0.333-0.788 0.544-1.293 0.557l-0.002 0c-0.51-0.006-0.966-0.228-1.284-0.578l-0.001-0.002c-0.407-0.5-0.654-1.145-0.654-1.847 0-0.073 0.003-0.145 0.008-0.217l-0.001 0.010v-10.344c0-0.69-0.56-1.25-1.25-1.25s-1.25 0.56-1.25 1.25v0 10.332c-0.018 0.153-0.028 0.33-0.028 0.51 0 2.491 1.964 4.524 4.428 4.634l0.010 0 0.038 0.002c0.003 0 0.006 0 0.009 0 1.214 0 2.308-0.512 3.078-1.332l0.002-0.002c0.852-0.937 1.374-2.189 1.374-3.561 0-0.062-0.001-0.124-0.003-0.186l0 0.009 0.057-14.285c0-8.434-12.844-8.434-12.844 0v15.518c-0.003 0.083-0.005 0.18-0.005 0.277 0 2.4 1.015 4.564 2.64 6.084l0.005 0.004c1.485 1.322 3.452 2.129 5.608 2.129 0.034 0 0.068-0 0.102-0.001l-0.005 0h0.019c0.025 0 0.054 0 0.083 0 2.168 0 4.146-0.817 5.642-2.16l-0.008 0.007c1.614-1.523 2.619-3.676 2.619-6.064 0-0.108-0.002-0.215-0.006-0.322l0 0.015 0.029-14.192c0-0.001 0-0.002 0-0.004 0-0.69-0.559-1.249-1.248-1.249h-0z"></Path>
      </G>
    </Svg>
  )
}

const Menu = (props:IconProps)=> {
  const {color, ...SvgProps} = props
  return(
    <Svg viewBox="0 0 24 24" height={24} width={24} fill="none" xmlns="http://www.w3.org/2000/svg">
      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
      <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
      <G id="SVGRepo_iconCarrier">
        <Path d="M4 6H20M4 12H20M4 18H20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></Path>
      </G>
    </Svg>
  )
}

const Arrow = (props:IconProps & {color:string})=> {
  const {color, ...SvgProps} = props
  return(
    <Svg width={25} height={25} {...SvgProps} viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/Svg">
      <Path d="M1 1L8.29249 8.29249C8.68342 8.68342 8.68342 9.31658 8.29249 9.70711L1 17" stroke={color} stroke-linecap="round"/>
    </Svg>
  )
}

const Cross = ()=> {
  return(
    <Svg viewBox="0 0 24 24" width={36} height={36} fill="none" xmlns="http://www.w3.org/2000/svg">
      <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
      <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
      <G id="SVGRepo_iconCarrier">
        <Path d="M19 5L4.99998 19M5.00001 5L19 19" stroke="#cccccc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></Path>
      </G>
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
  Loading, AnimatedPen, AudioCall, VideoCall,
  MessageTriangleRight, MessageTriangleLeft,
  Paperclip, Menu, Arrow, Cross,
}

export default Icon