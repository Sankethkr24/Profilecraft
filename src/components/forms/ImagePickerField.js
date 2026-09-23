import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Modal, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants/colors';
import { RADIUS, SPACING, SHADOWS } from '../../constants/theme';
import { Typography } from '../common/Typography';
import { imagePickerService } from '../../services/imagePickerService';

export const ImagePickerField = ({ photoUri, onImageSelected, onImageRemoved }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenGallery = async () => {
    setModalVisible(false);
    const uri = await imagePickerService.pickFromGallery();
    if (uri && onImageSelected) {
      onImageSelected(uri);
    }
  };

  const handleTakePhoto = async () => {
    setModalVisible(false);
    const uri = await imagePickerService.takePhoto();
    if (uri && onImageSelected) {
      onImageSelected(uri);
    }
  };

  const handleRemove = () => {
    setModalVisible(false);
    if (onImageRemoved) {
      onImageRemoved();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.avatarBox, !!photoUri && styles.avatarBoxFilled]}
        onPress={() => setModalVisible(true)}
      >
        {photoUri ? (
          <>
            <Image source={{ uri: photoUri }} style={styles.image} resizeMode="cover" />
            <View style={styles.editBadge}>
              <Feather name="edit-2" size={13} color="#FFF" />
            </View>
          </>
        ) : (
          <View style={styles.placeholder}>
            <View style={styles.cameraIconCircle}>
              <Feather name="camera" size={24} color={COLORS.primary} />
            </View>
            <Typography variant="caption" color={COLORS.primary} bold style={styles.text}>
              Add Photo
            </Typography>
          </View>
        )}
      </TouchableOpacity>

      {photoUri && (
        <View style={styles.actionLinks}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.linkBtn}>
            <Typography variant="caption" bold color={COLORS.primary}>
              Change Photo
            </Typography>
          </TouchableOpacity>
          <Typography variant="caption" color={COLORS.textMuted}> • </Typography>
          <TouchableOpacity onPress={handleRemove} style={styles.linkBtn}>
            <Typography variant="caption" bold color={COLORS.error}>
              Remove
            </Typography>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Sheet Picker Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Typography variant="h3" bold align="center" style={styles.modalTitle}>
              Profile Picture
            </Typography>
            <Typography variant="caption" align="center" color={COLORS.textSecondary} style={styles.modalSub}>
              Choose an option to set your profile photo
            </Typography>

            <TouchableOpacity style={styles.modalOption} onPress={handleOpenGallery}>
              <View style={[styles.optionIconCircle, { backgroundColor: '#EDE9FE' }]}>
                <Feather name="image" size={20} color={COLORS.primary} />
              </View>
              <View style={styles.optionTextWrap}>
                <Typography variant="body" bold color={COLORS.textPrimary}>
                  Choose from Gallery
                </Typography>
                <Typography variant="caption" color={COLORS.textSecondary}>
                  Select an existing photo from your library
                </Typography>
              </View>
              <Feather name="chevron-right" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalOption} onPress={handleTakePhoto}>
              <View style={[styles.optionIconCircle, { backgroundColor: '#E0F2FE' }]}>
                <Feather name="camera" size={20} color="#0284C7" />
              </View>
              <View style={styles.optionTextWrap}>
                <Typography variant="body" bold color={COLORS.textPrimary}>
                  Take Photo
                </Typography>
                <Typography variant="caption" color={COLORS.textSecondary}>
                  Capture a new photo with camera
                </Typography>
              </View>
              <Feather name="chevron-right" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            {photoUri && (
              <TouchableOpacity style={styles.modalOption} onPress={handleRemove}>
                <View style={[styles.optionIconCircle, { backgroundColor: '#FEE2E2' }]}>
                  <Feather name="trash-2" size={20} color={COLORS.error} />
                </View>
                <View style={styles.optionTextWrap}>
                  <Typography variant="body" bold color={COLORS.error}>
                    Remove Current Photo
                  </Typography>
                  <Typography variant="caption" color={COLORS.textSecondary}>
                    Clear this profile picture
                  </Typography>
                </View>
                <Feather name="chevron-right" size={18} color={COLORS.textMuted} />
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
              <Typography variant="body" bold align="center" color={COLORS.textSecondary}>
                Cancel
              </Typography>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  avatarBox: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: '#F3F0FF',
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarBoxFilled: {
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: COLORS.primary,
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    elevation: 2,
  },
  text: {
    marginTop: 2,
  },
  editBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: COLORS.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 4,
  },
  actionLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs + 2,
  },
  linkBtn: {
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    padding: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: SPACING.sm,
  },
  modalTitle: {
    marginTop: SPACING.xs,
  },
  modalSub: {
    marginBottom: SPACING.lg,
    marginTop: 2,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm + 2,
    paddingHorizontal: SPACING.sm,
    backgroundColor: '#F8FAFC',
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
  },
  optionIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  optionTextWrap: {
    flex: 1,
  },
  cancelBtn: {
    marginTop: SPACING.sm,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: '#F1F5F9',
  },
});
