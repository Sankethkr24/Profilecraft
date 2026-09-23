import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import { SPACING, RADIUS } from '../../constants/theme';
import { AppHeader } from '../../components/common/AppHeader';
import { AppButton } from '../../components/common/AppButton';
import { Typography } from '../../components/common/Typography';
import { TraditionalTemplate } from '../../components/templates/TraditionalTemplate';
import { ModernTemplate } from '../../components/templates/ModernTemplate';
import { MinimalTemplate } from '../../components/templates/MinimalTemplate';
import { ElegantTemplate } from '../../components/templates/ElegantTemplate';
import { pdfService } from '../../services/pdfService';

export const ProfilePreviewScreen = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();
  const { templateId } = route.params || {};

  const activeProfile = useSelector(
    (state) => state.profiles.activeProfile || state.profiles.list[0]
  );
  const selectedTemplateId = templateId || activeProfile?.templateId || 'trad-classic-01';

  const [exporting, setExporting] = useState(false);

  const renderTemplate = () => {
    switch (selectedTemplateId) {
      case 'trad-classic-01':
        return <TraditionalTemplate profile={activeProfile} />;
      case 'elegant-modern-02':
      case 'professional-resume-05':
        return <ModernTemplate profile={activeProfile} />;
      case 'minimal-clean-04':
      case 'creative-portfolio-06':
        return <MinimalTemplate profile={activeProfile} />;
      case 'royal-theme-03':
      default:
        return <ElegantTemplate profile={activeProfile} />;
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack && navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('MainTabs');
    }
  };

  const handleSaveAsPDF = async () => {
    try {
      setExporting(true);
      const filePath = await pdfService.generatePDF(activeProfile);
      setExporting(false);
      Alert.alert(
        'PDF Generated Successfully! 🎉',
        `File saved at:\n${filePath}`,
        [
          { text: 'Share PDF', onPress: () => pdfService.sharePDF(filePath, activeProfile?.name) },
          { text: 'OK' },
        ]
      );
    } catch (error) {
      setExporting(false);
      Alert.alert('Export Failed', 'Unable to generate PDF document.');
    }
  };

  const handleShare = async () => {
    try {
      setExporting(true);
      const filePath = await pdfService.generatePDF(activeProfile);
      setExporting(false);
      await pdfService.sharePDF(filePath, activeProfile?.name);
    } catch (error) {
      setExporting(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="Preview"
        onBack={handleBack}
        rightAction={
          <AppButton
            title="Edit"
            variant="text"
            size="sm"
            onPress={() =>
              navigation.navigate('ProfileForm', { profileId: activeProfile?.id })
            }
          />
        }
      />

      {/* Render Template Canvas */}
      <View style={styles.previewCanvas}>{renderTemplate()}</View>

      {/* Floating Bottom Action Bar matching poster Screen 3 */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, SPACING.sm + 4) }]}>
        <AppButton
          title={exporting ? 'Exporting...' : 'Save as PDF'}
          variant="primary"
          size="md"
          loading={exporting}
          onPress={handleSaveAsPDF}
          icon={<Feather name="download" size={16} color={COLORS.surface} />}
          style={styles.savePdfBtn}
        />

        <View style={styles.iconActions}>
          <AppButton
            title="Share"
            variant="outline"
            size="sm"
            onPress={handleShare}
            icon={<Feather name="share-2" size={16} color={COLORS.primary} />}
            style={styles.actionBtn}
          />
          <AppButton
            title="More"
            variant="text"
            size="sm"
            onPress={() => Alert.alert('Options', 'Duplicate, Print or Delete profile.')}
            icon={<Feather name="more-horizontal" size={18} color={COLORS.textSecondary} />}
            style={styles.actionBtn}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  previewCanvas: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 4,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    elevation: 8,
  },
  savePdfBtn: {
    flex: 1,
    marginRight: SPACING.sm,
    borderRadius: RADIUS.xl,
  },
  iconActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    marginLeft: SPACING.xs,
  },
});
