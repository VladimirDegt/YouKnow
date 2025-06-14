import { COLORS } from '@/src/constants/colors';
import { contentService } from '@/src/services/api';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SupportTab = () => {
  const {t} = useTranslation();
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
    <View style={styles.container}>
      <Text style={styles.content}>{t('profile.support.info')}</Text>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t('profile.support.email.label')}</Text>
          <TextInput
            style={styles.input}
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
          <Text style={styles.label}>{t('profile.support.message.label')}</Text>
          <TextInput
            style={styles.textArea}
            value={message}
            onChangeText={setMessage}
            placeholder={t('profile.support.message.placeholder')}
            placeholderTextColor={COLORS.text_gray}
            multiline
            numberOfLines={5}
            maxLength={1000}
            textAlignVertical="top"
          />
          <Text style={styles.characterCount}>
            {message.length}/1000
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? t('profile.support.submitting') : t('profile.support.submit')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  content: {
    fontSize: 16,
    color: COLORS.text_black,
    lineHeight: 24,
    marginBottom: 24,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text_black,
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
  characterCount: {
    fontSize: 13,
    color: COLORS.text_gray,
    textAlign: 'right',
    marginTop: 4,
  },
  submitButton: {
    height: 50,
    backgroundColor: COLORS.btn_background,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.text_white,
  },
});

export default SupportTab;
