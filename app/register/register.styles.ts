import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181e2a',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 380,
    backgroundColor: '#232b3b',
    borderRadius: 10,
    padding: 32,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#fff2',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#fff',
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#d1d5db',
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    gap: 12,
  },
  label: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 2,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#181e2a',
    padding: 12,
    borderRadius: 6,
    fontSize: 16,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#2dd4bf',
    marginBottom: 4,
  },
  radioGroup: {
    flexDirection: 'row',
    gap: 24,
    marginVertical: 8,
    marginBottom: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#19e6e6',
    marginRight: 8,
    backgroundColor: '#232b3b',
  },
  radioSelected: {
    backgroundColor: '#19e6e6',
  },
  radioLabel: {
    color: '#fff',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#19e6e6',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#181e2a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    color: '#fff',
    fontSize: 14,
  },
  loginLink: {
    color: '#19e6e6',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default styles; 