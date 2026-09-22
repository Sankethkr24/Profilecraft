import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import { generateProfileHTML } from '../utils/htmlGenerator';

export const pdfService = {
  async generatePDF(profile) {
    try {
      const htmlContent = generateProfileHTML(profile);
      const options = {
        html: htmlContent,
        fileName: `${profile.name || 'Profile'}_ProfileCraft`,
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      return file.filePath;
    } catch (error) {
      console.error('Error generating PDF document', error);
      throw error;
    }
  },

  async sharePDF(filePath, profileName = 'Profile') {
    try {
      const shareOptions = {
        title: `Share ${profileName} Profile`,
        url: `file://${filePath}`,
        type: 'application/pdf',
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Share action dismissed or failed', error);
    }
  },
};
