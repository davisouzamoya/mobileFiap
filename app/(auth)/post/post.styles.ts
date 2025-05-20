import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181e2a',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingTop: 20,
  },
  backButton: {
    padding: 8,
  },
  menuButton: {
    padding: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#181e2a',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  postCard: {
    backgroundColor: '#232b3b',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#23b5b5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  authorDetails: {
    justifyContent: 'center',
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'semibold',
    color: '#fff',
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 12,
    color: '#d1d5db',
  },
  optionsButton: {
    padding: 8, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#d1d5db',
    marginBottom: 16,
  },
  imageContainer: {
    marginBottom: 16,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1a1f2b', 
  },
  postImage: {
    width: '100%',
    height: 250, 
    resizeMode: 'contain',
  },
   imageLoading: {
    width: '100%',
    height: 250, 
    backgroundColor: '#2a3344',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContent: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#1a1f2b',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#d1d5db',
  },
  likedButton: {
  },
  likedButtonText: {
    color: '#dc2626',
  },
  commentsSection: {
    marginTop: 20,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  newCommentContainer: {
    backgroundColor: '#232b3b',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#1a1f2b',
    borderRadius: 6,
    padding: 12,
    color: '#fff',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#23b5b5',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  commentList: {
    gap: 12,
  },
  commentItem: {
    backgroundColor: '#232b3b',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#23b5b5',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  commentAuthorName: {
    fontSize: 14,
    fontWeight: 'semibold',
    color: '#fff',
  },
  commentTimestamp: {
    fontSize: 10,
    color: '#d1d5db',
  },
  commentContent: {
    fontSize: 14,
    color: '#d1d5db',
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  commentActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  commentActionButtonText: {
     fontSize: 12,
    color: '#d1d5db',
  },
  emptyComments: {
    textAlign: 'center',
    fontSize: 16,
    color: '#d1d5db',
    paddingVertical: 20,
  },
})
