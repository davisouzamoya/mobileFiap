import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181e2a', // fundo escuro
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  forgotPasswordText: {
    color: '#19e6e6',
    fontSize: 14,
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
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  registerText: {
    color: '#fff',
    fontSize: 14,
  },
  registerLink: {
    color: '#19e6e6',
    fontSize: 14,
    fontWeight: 'bold',
  },
  authState: {
    color: '#d1d5db',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default styles; 