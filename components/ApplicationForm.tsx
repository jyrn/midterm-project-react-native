import React, { useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Animated,KeyboardAvoidingView,Platform,Keyboard,Dimensions
} from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

type ApplicationFormProps = {
  onSubmit: (values: { name: string; email: string; contactNumber: string; whyHireMe: string }) => void;
  onCancel: () => void;
  themeColors: {
    background: string;
    text: string;
    buttonBackground: string;
    buttonText: string;
    cardBackground: string;
  };
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email must contain "@" and "."')
    .required('Email is required'),
  contactNumber: Yup.string()
    .matches(/^09\d{9}$/, 'Contact number must start with "09" and be 11 digits long')
    .required('Contact number is required'),
  whyHireMe: Yup.string()
    .min(20, 'Please provide a detailed response (at least 20 characters)')
    .required('This field is required'),
});

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onSubmit, onCancel, themeColors }) => {
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRefs = useRef<{
    name: TextInput | null;
    email: TextInput | null;
    contactNumber: TextInput | null;
    whyHireMe: TextInput | null;
  }>({
    name: null,
    email: null,
    contactNumber: null,
    whyHireMe: null,
  });
  const inputPositions = useRef<{[key: string]: number}>({});

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, 
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleSubmit = (
    values: { name: string; email: string; contactNumber: string; whyHireMe: string },
    { resetForm }: FormikHelpers<{ name: string; email: string; contactNumber: string; whyHireMe: string }>
  ) => {
    onSubmit(values);
    resetForm();
    Keyboard.dismiss();
  };

  const handleInputFocus = (fieldName: string) => {
    setTimeout(() => {
      if (inputPositions.current[fieldName] && scrollViewRef.current) {
        const scrollTo = inputPositions.current[fieldName] - 100;
        scrollViewRef.current.scrollTo({ y: scrollTo, animated: true });
      }
    }, 100);
  };

  const handleLayout = (fieldName: string, event: any) => {
    const { y } = event.nativeEvent.layout;
    inputPositions.current[fieldName] = y;
  };

  return (
    <View style={styles.overlayContainer}>
      <Animated.View style={[styles.overlay, {transform: [{ translateY: slideAnim }],}]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.container, { backgroundColor: themeColors.cardBackground }]}>
            <Text style={[styles.title, { color: themeColors.text }]}>Application Form</Text>
              <Formik
                initialValues={{ name: '', email: '', contactNumber: '', whyHireMe: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <>
                    {/* Name Field */}
                    <View onLayout={(e) => handleLayout('name', e)}>
                      <Text style={[styles.label, { color: themeColors.text }]}>Name</Text>
                      <TextInput
                        ref={ref => inputRefs.current.name = ref}
                        style={[styles.input, { backgroundColor: themeColors.background, color: themeColors.text }]}
                        placeholder="Enter your name"
                        placeholderTextColor="#888"
                        value={values.name}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        onFocus={() => handleInputFocus('name')}
                        onSubmitEditing={() => inputRefs.current.email?.focus()}
                        returnKeyType="next"
                      />
                      {touched.name && errors.name && (
                        <Text style={styles.errorText}>{errors.name}</Text>
                      )}
                    </View>

                    {/* Email Field */}
                    <View onLayout={(e) => handleLayout('email', e)}>
                      <Text style={[styles.label, { color: themeColors.text }]}>Email</Text>
                      <TextInput
                        ref={ref => inputRefs.current.email = ref}
                        style={[styles.input, { backgroundColor: themeColors.background, color: themeColors.text }]}
                        placeholder="Enter your email"
                        placeholderTextColor="#888"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        onFocus={() => handleInputFocus('email')}
                        keyboardType="email-address"
                        onSubmitEditing={() => inputRefs.current.contactNumber?.focus()}
                        returnKeyType="next"
                      />
                      {touched.email && errors.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      )}
                    </View>

                    {/* Contact Number Field */}
                    <View onLayout={(e) => handleLayout('contactNumber', e)}>
                      <Text style={[styles.label, { color: themeColors.text }]}>Contact Number</Text>
                      <TextInput
                        ref={ref => inputRefs.current.contactNumber = ref}
                        style={[styles.input, { backgroundColor: themeColors.background, color: themeColors.text }]}
                        placeholder="Enter your contact number (e.g., 09123456789)"
                        placeholderTextColor="#888"
                        value={values.contactNumber}
                        onChangeText={handleChange('contactNumber')}
                        onBlur={handleBlur('contactNumber')}
                        onFocus={() => handleInputFocus('contactNumber')}
                        keyboardType="phone-pad"
                        maxLength={11}
                        onSubmitEditing={() => inputRefs.current.whyHireMe?.focus()}
                        returnKeyType="next"
                      />
                      {touched.contactNumber && errors.contactNumber && (
                        <Text style={styles.errorText}>{errors.contactNumber}</Text>
                      )}
                    </View>

                    {/* Why Hire Me Field */}
                    <View onLayout={(e) => handleLayout('whyHireMe', e)}>
                      <Text style={[styles.label, { color: themeColors.text }]}>Why should we hire you?</Text>
                      <TextInput
                        ref={ref => inputRefs.current.whyHireMe = ref}
                        style={[
                          styles.input,
                          styles.multilineInput,
                          { backgroundColor: themeColors.background, color: themeColors.text },
                        ]}
                        placeholder="Explain why you're the best fit for this role"
                        placeholderTextColor="#888"
                        value={values.whyHireMe}
                        onChangeText={handleChange('whyHireMe')}
                        onBlur={handleBlur('whyHireMe')}
                        onFocus={() => handleInputFocus('whyHireMe')}
                        multiline
                        numberOfLines={4}
                        returnKeyType="done"
                        onSubmitEditing={() => Keyboard.dismiss()}
                      />
                      {touched.whyHireMe && errors.whyHireMe && (
                        <Text style={styles.errorText}>{errors.whyHireMe}</Text>
                      )}
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={[styles.button, { backgroundColor: themeColors.buttonBackground }]}
                        onPress={() => handleSubmit()}
                      >
                        <Text style={[styles.buttonText, { color: themeColors.buttonText }]}>Submit</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#ccc' }]}
                        onPress={onCancel}
                      >
                        <Text style={[styles.buttonText, { color: '#000' }]}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
  },
  overlay: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    bottom: 0
  },
  keyboardAvoidingView: {
    width: '90%',
    maxWidth: 400,
    maxHeight: Dimensions.get('window').height * 0.8,
  },
  container: {
    width: '100%',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 8,
  },
});

export default ApplicationForm;