import React, { Component } from 'react';
import { ScrollView, Text, Animated, StyleSheet } from 'react-native';
import {
  Tile,
  Header,
  Card,
  Button,
  Icon,
  View,
  Rating
} from 'react-native-elements';

// function RenderItem(props) {
//   const { item } = props;
//   if (props.isLoading) {
//     return <Loading />;
//   }
//   if (props.errMess) {
//     return (
//       <View>
//         <Text>{props.errMess}</Text>
//       </View>
//     );
//   }
//   if (item) {
//     return (
//       <Tile title={item.name} imageSrc={{ uri: baseUrl + item.image }}>
//         <Rating
//           startingValue={item.rating}
//           imageSize={20}
//           style={{ alignItems: 'flex-left' }}
//           style={{ paddingVertical: 10, backgroundColor: 'white' }}
//           readonly
//         />
//         <Button
//           buttonStyle={{
//             backgroundColor: '#86927B',
//             padding: 5,
//             borderWidth: 1,
//             borderColor: '#413F41'
//           }}
//           title={item.price}
//           type='solid'
//           raised='true'
//         />
//       </Tile>
//     );
//   }
//   // return <View />;
// }
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scaleValue: new Animated.Value(0)
    };
  }
  animate() {
    Animated.timing(this.state.scaleValue, {
      toValue: 1,
      duration: 1500
    }).start();
  }
  componentDidMount() {
    this.animate();
  }
  static navigationOptions = {
    title: 'Home'
  };
  render() {
    return (
      <ScrollView>
        <Rating
          startingValue='5'
          imageSize={20}
          style={{ alignItems: 'flex-left' }}
          style={{ paddingVertical: 10 }}
          backingColor='black'
        />
        <Header
          containerStyle={{
            backgroundColor: '#31AD96',
            justifyContent: 'space-around'
          }}
        />
        {/* <RenderItem
          item={
            this.props.campsites.campsites.filter(
              campsite => campsite.featured
            )[0]
          }
          isLoading={this.props.campsites.isLoading}
          errMess={this.props.campsites.errMess}
        /> */}
        {/* <RenderItem
          item={
            this.props.promotions.promotions.filter(
              promotion => promotion.featured
            )[0]
          }
          isLoading={this.props.promotions.isLoading}
          errMess={this.props.promotions.errMess}
        /> */}
        {/* <RenderItem
          item={
            this.props.partners.partners.filter(partner => partner.featured)[0]
          }
          
          errMess='BROKEN'
        /> */}
        <Header
          containerStyle={{
            backgroundColor: '#31AD96',
            justifyContent: 'space-around',
            paddingBottom: 0
          }}
        />
        <Tile
          style={{ margin: 0, paddingTop: 0 }}
          title='Connect With Us'
          containerStyle={{
            backgroundColor: '#DD7848',
            justifyContent: 'space-around'
          }}
        >
          <Text style={{ marginBottom: 10, color: 'white' }}>Help</Text>
          <Text style={{ marginBottom: 10, color: 'white' }}>Stores</Text>
          <Text style={{ marginBottom: 10, color: 'white' }}>App</Text>
          <Text style={{ marginBottom: 10, color: 'white' }}>Social</Text>
          <Button title='Contact Us' type='outline' raised='true' />
        </Tile>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default Test;
