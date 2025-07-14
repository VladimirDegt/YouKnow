import { COLORS } from '@/src/constants/colors';
import { contentService } from '@/src/services/api';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';

const SupportTab = () => {
  const {t} = useTranslation();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!email || !message) {
      Alert.alert(t('profile.support.error.title'), t('profile.support.error.emptyFields'));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert(t('profile.support.error.title'), t('profile.support.error.invalidEmail'));
      return;
    }

    try {
      setIsSubmitting(true);
      await contentService.sendSupportMessage({email, message});
      
      Alert.alert(t('profile.support.success.title'), t('profile.support.success.message'));
      setEmail('');
      setMessage('');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('profile.support.error.submit');
      Alert.alert(t('profile.support.error.title'), errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.container, isTablet && styles.containerTablet]}>
          <Text style={[styles.content, isTablet && styles.contentTablet]}>{t('profile.support.info')}</Text>
          <View style={[styles.form, isTablet && styles.formTablet]}>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, isTablet && styles.labelTablet]}>{t('profile.support.email.label')}</Text>
              <TextInput
                style={[styles.input, isTablet && styles.inputTablet]}
                value={email}
                onChangeText={setEmail}
                placeholder={t('profile.support.email.placeholder')}
                placeholderTextColor={COLORS.text_gray}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={[styles.label, isTablet && styles.labelTablet]}>{t('profile.support.message.label')}</Text>
              <TextInput
                style={[styles.textArea, isTablet && styles.textAreaTablet]}
                value={message}
                onChangeText={setMessage}
                placeholder={t('profile.support.message.placeholder')}
                placeholderTextColor={COLORS.text_gray}
                multiline
                numberOfLines={5}
                maxLength={1000}
                textAlignVertical="top"
              />
              <Text style={[styles.characterCount, isTablet && styles.characterCountTablet]}>
                {message.length}/1000
              </Text>
            </View>
            
            <TouchableOpacity
              style={[styles.submitButton, isTablet && styles.submitButtonTablet, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={[styles.submitButtonText, isTablet && styles.submitButtonTextTablet]}>
                {isSubmitting ? t('profile.support.submitting') : t('profile.support.submit')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  containerTablet: {
    paddingTop: 40,
    paddingHorizontal: 32,
  },
  content: {
    fontSize: 16,
    color: COLORS.text_black,
    lineHeight: 24,
    marginBottom: 24,
  },
  contentTablet: {
    fontSize: 22,
    lineHeight: 32,
    marginBottom: 32,
  },
  form: {
    gap: 20,
  },
  formTablet: {
    gap: 28,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text_black,
  },
  labelTablet: {
    fontSize: 22,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 17,
    color: COLORS.text_black,
    backgroundColor: COLORS.background,
  },
  inputTablet: {
    height: 56,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 20,
  },
  textArea: {
    height: 120,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    fontSize: 17,
    color: COLORS.text_black,
    backgroundColor: COLORS.background,
  },
  textAreaTablet: {
    height: 160,
    borderRadius: 12,
    padding: 16,
    fontSize: 20,
  },
  characterCount: {
    fontSize: 13,
    color: COLORS.text_gray,
    textAlign: 'right',
    marginTop: 4,
  },
  characterCountTablet: {
    fontSize: 16,
    marginTop: 8,
  },
  submitButton: {
    height: 50,
    backgroundColor: COLORS.btn_background,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonTablet: {
    height: 64,
    borderRadius: 12,
    marginTop: 16,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text_white,
  },
  submitButtonTextTablet: {
    fontSize: 22,
  },
});

export default SupportTab;
