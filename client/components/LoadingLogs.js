import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const LoadingLogs = () => {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator size='large' color='#5637DD' />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingView: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loadingText: {
    color: '#5637DD',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoadingLogs;
