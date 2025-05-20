import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181e2a',
    padding: 16,
    paddingTop: 100,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181e2a',
  },
  card: {
    backgroundColor: '#232b3b',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#d1d5db',
    marginBottom: 16,
  },
  formContainer: {

  },
  input: {
    backgroundColor: '#1a1f2b',
    borderRadius: 6,
    padding: 12,
    color: '#fff',
    marginBottom: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  imagePickerButton: {
    backgroundColor: '#23b5b5',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  imagePickerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imagePreviewContainer: {
    marginBottom: 12,
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%', 
    height: 200, 
    resizeMode: 'contain',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#23b5b5',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#4b5563',
  },
  cancelButton: {
    backgroundColor: '#4b5563',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 