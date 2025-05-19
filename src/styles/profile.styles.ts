import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181e2a',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181e2a',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#d1d5db',
    marginBottom: 24,
  },
  userInfoCard: {
    backgroundColor: '#232b3b',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#23b5b5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#d1d5db',
    marginBottom: 4,
  },
  userType: {
    fontSize: 14,
    color: '#23b5b5',
    marginBottom: 16,
  },
  editButton: {
    borderColor: '#23b5b5',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  editButtonText: {
    color: '#23b5b5',
    fontSize: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#232b3b',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: '#23b5b5',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d1d5db',
  },
  tabButtonTextActive: {
    color: '#23b5b5',
  },
  infoCard: {
    backgroundColor: '#232b3b',
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  infoLabel: {
    fontSize: 16,
    color: '#d1d5db',
    flex: 1,
    marginRight: 8,
  },
  infoValue: {
    fontSize: 16,
    color: '#fff',
    flex: 2,
  },
  createContentButton: {
    backgroundColor: '#23b5b5',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  createContentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#23b5b5',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  searchFilterContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#1a1f2b',
    borderRadius: 6,
    padding: 12,
    color: '#fff',
  },
  filterButton: {
    backgroundColor: '#1a1f2b',
    borderRadius: 6,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#fff',
  },
  postItem: {
    backgroundColor: '#1a1f2b',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  postItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  postItemDescription: {
    fontSize: 14,
    color: '#d1d5db',
    marginBottom: 8,
  },
  postItemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  postItemDetailText: {
    fontSize: 12,
    color: '#d1d5db',
  },
  postItemActions: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  viewButton: {
    backgroundColor: '#23b5b5',
  },
  editButtonPost: {
    backgroundColor: '#374151',
  },
  deleteButton: {
    backgroundColor: '#dc2626',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  settingsSection: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1f2b',
  },
  settingsSectionLast: {
    marginBottom: 16,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingsTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  settingsDescription: {
    fontSize: 14,
    color: '#d1d5db',
  },
  settingsButton: {
    backgroundColor: '#1a1f2b',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  settingsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteAccountButton: {
    backgroundColor: 'transparent',
  },
  deleteAccountButtonText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    color: '#d1d5db',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  },
})
