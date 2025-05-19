import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181e2a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181e2a',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#23b5b5',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 15,
  },
  info: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
    marginTop: 16,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 12,
    gap: 12,
  },
  tab: {
    color: '#d1d5db',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#23b5b5',
    color: '#fff',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  welcomeCard: {
    backgroundColor: '#232b3b',
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#23b5b5',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    color: '#d1d5db',
    fontSize: 15,
    marginBottom: 6,
  },
  actionBtn: {
    backgroundColor: '#23b5b5',
    borderRadius: 6,
    padding: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  activityCard: {
    backgroundColor: '#232b3b',
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
  },
  statsCard: {
    backgroundColor: '#232b3b',
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
  },
  accountCard: {
    backgroundColor: '#232b3b',
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
  },
  editBtn: {
    borderColor: '#23b5b5',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  editBtnText: {
    color: '#23b5b5',
    fontWeight: 'bold',
    fontSize: 16,
  },
  summaryCard: {
    backgroundColor: '#232b3b',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 4,
    minWidth: 90,
  },
  summaryLabel: {
    color: '#d1d5db',
    fontSize: 14,
    marginBottom: 4,
  },
  summaryValue: {
    color: '#23b5b5',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default styles; 