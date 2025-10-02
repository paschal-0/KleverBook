// src/index.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// import whatever your navigation file exports
import RootNav from './navigation';

/**
 * This wrapper makes sure we render a proper navigator even if
 * ./navigation exports an object like { HomeStack } instead of
 * a direct default React component.
 *
 * We avoid explicit JSX types to prevent "Cannot find namespace 'JSX'" errors
 * when TypeScript's JSX namespace isn't available in the environment.
 */
export default function AppRoot() {
  const navExport: any = (RootNav && (RootNav as any).default) ? (RootNav as any).default : RootNav;

  // If navigation/index exports an object (e.g. { HomeStack }), try HomeStack
  if (navExport && typeof navExport === 'object') {
    const HomeStack = navExport.HomeStack ?? navExport.homeStack;
    if (HomeStack) {
      const HomeComp: any = HomeStack;
      return (
        <NavigationContainer>
          <HomeComp />
        </NavigationContainer>
      );
    }
    // fallback: render an empty NavigationContainer (no children)
    return <NavigationContainer>{null}</NavigationContainer>;
  }

  // Normal case: navExport is a component (Stack / Tab / etc.)
  const RootComponent: any = navExport;
  return (
    <NavigationContainer>
      <RootComponent />
    </NavigationContainer>
  );
}
