import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Dimensions,
  Button,
  View,
  ScaledSize,
} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const Stack = createNativeStackNavigator();

const categories = [
  {
    categoryName: 'Drinks',
    items: [
      {
        name: 'Cheese Burger',
        id: 1,
      },
      {
        name: ' Burger',
        id: 2,
      },
    ],
  },
  {
    categoryName: 'Chips',
    items: [
      {
        name: 'Mayo',
        id: 1,
      },
    ],
  },
  {
    categoryName: 'Coke',
    items: [
      {
        name: 'Diet',
        id: 1,
      },
    ],
  },
];

const Test = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MyTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

function MyTabs() {
  return (
    <Tab.Navigator>
      {/* {categories.map(category => ( */}
      <Tab.Screen
        name={'test'}
        initialParams={categories[0]}
        component={LeftDrawerScreen}
      />
      {/* ))} */}
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function HomeScreen(props) {
  console.log(props, 'here2');

  const navigation = useNavigation();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {props.route.params.items?.map(data => (
        <View>
          <Text>{data?.name}</Text>
          <Button
            onPress={() => {
              // setData(data?.name);
              props.navigation?.openDrawer();
            }}
            title="Open drawer"
          />
        </View>
      ))}
    </View>
  );
}

function RightDrawerContent(props: DrawerContentComponentProps) {
  console.log(props.params);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{props?.data ?? 'tada'}</Text>
    </View>
  );
}

const LeftDrawerScreen = props => {
  console.log(props.route.params, 'here');

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        initialParams={props?.route.params}
        name={props?.route.params.categoryName}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

const QuickItem = () => {
  return (
    <View>
      <Text>Quick Item</Text>
    </View>
  );
};

const TabsNavigatorDrawer = createDrawerNavigator();

const TabsNavigatore = () => {
  return (
    <TabsNavigatorDrawer.Navigator
      defaultScreenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <RightDrawerContent {...props} />}
      backBehavior="none"
      id="omer2"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {
          width: 300,
        },
        drawerType: 'front',
      }}>
      <TabsNavigatorDrawer.Screen name="Tabstest" component={MyTabs} />
    </TabsNavigatorDrawer.Navigator>
  );
};

const Right = createDrawerNavigator();

const Cart = createDrawerNavigator();
const CartStack = createNativeStackNavigator();

const CartScreen = () => {
  return (
    <Right.Navigator
      drawerContent={props => <RightDrawerContent {...props} />}
      backBehavior="none"
      defaultStatus="open"
      id="omer123"
      screenOptions={{
        headerShown: false,
        drawerPosition: 'right',
        drawerStyle: {
          width: 100,
        },
        drawerType: 'permanent',
      }}>
      <Right.Screen name="Quick Item2" component={MyTabs} />
    </Right.Navigator>
  );
};

const RightNavigation = () => {
  const hasCart = true;
  return (
    <CartStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <CartStack.Screen name="Tabs" component={CartScreen} />
    </CartStack.Navigator>
  );
};

const App = () => {
  const [dimensions, setDimensions] = React.useState(Dimensions.get('window'));

  React.useEffect(() => {
    const onDimensionsChange = ({window}: {window: ScaledSize}) => {
      setDimensions(window);
    };

    Dimensions.addEventListener('change', onDimensionsChange);

    return () => Dimensions.removeEventListener('change', onDimensionsChange);
  }, []);
  const isLargeScreen = dimensions.width >= 1024;
  return (
    <NavigationContainer>
      <Drawer.Navigator
        backBehavior="none"
        defaultStatus="open"
        defaultScreenOptions={{
          headerShown: false,
        }}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: 100,
          },
          drawerType: 'permanent',
        }}>
        <Drawer.Screen name="Right" component={RightNavigation} />
        <Drawer.Screen name="New Order" component={Test} />

        <Drawer.Screen name="Quick Item" component={QuickItem} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
