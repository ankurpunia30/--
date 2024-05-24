import React from 'react'
import type { PropsWithChildren } from 'react'
// icon is used to display the circle and cross
import Icon from 'react-native-vector-icons/FontAwesome'
// IconsProps is a type that takes a name prop of type string
// and returns a JSX.Element

type IconsProps = PropsWithChildren<{
    name: string;
}>
// Icons is a functional component that takes a name prop of type string
// and returns a JSX.Element

const Icons = ({name} : IconsProps) => {
  // switch case to check the name of the icon
  // and return the respective icon
  
    switch (name) {
    case 'circle':
        return <Icon name="circle-thin" size={38} color="#F7CD2E" />
        break;
    case 'cross':
        return <Icon name="times" size={38} color="#38CC77" />
        break;
  
    default:
      return <Icon name="pencil" size={38} color="#0D0D0D" />

  }
}

export default Icons