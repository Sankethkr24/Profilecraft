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
    <View style={styles.cardContainer}>
      <View style={styles.avatarSection}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.avatarBox, !!photoUri && styles.avatarBoxFilled]}
          onPress={() => setModalVisible(true)}
        >
          {photoUri ? (
            <>
              <Image source={{ uri: photoUri }} style={styles.image} resizeMode="cover" />
              <View style={styles.editBadge}>
                <Feather name="camera" size={13} color="#FFF" />
              </View>
            </>
          ) : (
            <View style={styles.placeholder}>
              <View style={styles.cameraIconCircle}>
                <Feather name="camera" size={26} color={COLORS.primary} />
              </View>
              <View style={styles.addPlusBadge}>
                <Feather name="plus" size={12} color="#FFF" />
              </View>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.textDetails}>
          <Typography variant="body" bold color={COLORS.textPrimary}>
            {photoUri ? 'Profile Photo' : 'Upload Profile Picture'}
          </Typography>
          <Typography variant="caption" color={COLORS.textSecondary} style={styles.subHint}>
            {photoUri
              ? 'Tap avatar or buttons below to edit'
              : 'Add a clear headshot to increase profile appeal'}
          </Typography>

          {photoUri ? (
            <View style={styles.actionButtonsRow}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.changePill}
                activeOpacity={0.7}
              >
                <Feather name="edit-2" size={12} color={COLORS.primary} style={styles.pillIcon} />
                <Typography variant="caption" bold color={COLORS.primary}>
                  Change
                </Typography>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleRemove}
                style={styles.removePill}
                activeOpacity={0.7}
              >
                <Feather name="trash-2" size={12} color={COLORS.error} style={styles.pillIcon} />
                <Typography variant="caption" bold color={COLORS.error}>
                  Remove
                </Typography>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.uploadPromptPill}
              activeOpacity={0.7}
            >
              <Feather name="upload" size={12} color={COLORS.primary} style={styles.pillIcon} />
              <Typography variant="caption" bold color={COLORS.primary}>
                Select Photo
              </Typography>
            </TouchableOpacity>
          )}
        </View>
      </View>

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
              Upload Photo
            </Typography>
            <Typography variant="caption" align="center" color={COLORS.textSecondary} style={styles.modalSub}>
              Choose a photo source for your profile picture
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
                  Select an existing portrait from library
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
                  Capture a fresh shot with your camera
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
                    Clear photo and use default avatar
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
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md + 4,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBox: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#F5F3FF',
    borderWidth: 2,
    borderColor: COLORS.primaryLight,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarBoxFilled: {
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cameraIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  addPlusBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: COLORS.primary,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 3,
  },
  textDetails: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  subHint: {
    marginTop: 2,
    lineHeight: 16,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs + 4,
    gap: 8,
  },
  changePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: RADIUS.full,
  },
  removePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: RADIUS.full,
  },
  uploadPromptPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: RADIUS.full,
    marginTop: SPACING.xs + 4,
  },
  pillIcon: {
    marginRight: 4,
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
    paddingVertical: SPACING.sm + 4,
    paddingHorizontal: SPACING.sm + 2,
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
