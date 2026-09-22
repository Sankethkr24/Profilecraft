import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING } from '../../constants/theme';
import { Typography } from '../common/Typography';

export const ImagePickerField = ({ photoUri, onPickImage }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} style={styles.avatarBox} onPress={onPickImage}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Feather name="camera" size={28} color={COLORS.primary} />
            <Typography variant="caption" color={COLORS.primary} style={styles.text}>
              Add Photo
            </Typography>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  avatarBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryLight + '20',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: 4,
    fontWeight: '600',
  },
});
