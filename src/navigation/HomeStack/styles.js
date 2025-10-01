import React from "react";
import {Image} from 'react-native';
import theme from "../../themes";
import utils from "../../utils";

const bc=theme.color.borderspilitColor
const bw=0.6


const iconFocusColor=theme.color.AppHeaderTextColor
const iconunFocusColor=theme.color.unSelectColor

//routes
let r1="Home"
let r2="Library" 
let r3="Search"
let r4="Wishlist"
let r5="Profile"

  
//tab bar screen options
//   const  BottomTaboptions=({ route }) => ({

//   tabBarIcon: ({ focused, color, size }) => {
//     let routes=route.name;
//     let isize=27
//     let icolor=focused  ?iconFocusColor:iconunFocusColor
//     let iconName = 
//     routes==r1?"home"
//     :routes==r2?"library-music"
//     :routes==r3?"search"
//     :routes==r4?"cards-heart"
//     :routes==r5?"account-circle"
//     :""
    
//     if(route.name=="Home")
//     return <utils.vectorIcon.Entypo  name={iconName} size={isize} color={icolor}/>
//     else if(route.name=="Search")
//     return  <utils.vectorIcon.Octicons name={iconName} size={isize} color={icolor}/>
//     else if(route.name=="Library")
//     return  <utils.vectorIcon.MaterialIcons  name={iconName} size={isize} color={icolor}/>
//     else if(route.name=="Wishlist")
//     return  <utils.vectorIcon.MaterialCommunityIcons name={iconName} size={isize} color={icolor}/>
//     else if(route.name=="Profile")
//     return  <utils.vectorIcon.MaterialIcons  name={iconName} size={isize} color={icolor}/>
//   },
// })

const StackHeaderoption={
  
  title: theme.Name.appNameH,
  headerStyle: {
    backgroundColor: theme.color.AppHeaderColor,
    // justifyContent:"center",
    // alignItems:"center",
    borderBottomColor:bc,
    borderWidth:bw,
    borderColor:theme.color.AppHeaderColor
  },
  headerTintColor: theme.color.AppHeaderTextColor,
  headerTitleStyle: {
    fontFamily:theme.fonts.fontMedium,
    alignSelf:"center",
    color:theme.color.AppHeaderTextColor,
    textTransform:"capitalize"
  }
}

const StackHeaderoptionLibrary={
  title: '',
  headerStyle: {
    backgroundColor: theme.color.mainColor,
    borderBottomColor:theme.color.mainColor,
    borderWidth:bw,
    borderColor:theme.color.mainColor
  },
  headerTintColor: theme.color.mainTextColor,
  headerTitleStyle: {
    fontFamily:theme.fonts.fontMedium,
    color:theme.color.mainTextColor,
    textTransform:"capitalize"
  }
}

 
 
const styles={
  // BottomTaboptions,
  StackHeaderoption,
  StackHeaderoptionLibrary
}

export default styles;


 