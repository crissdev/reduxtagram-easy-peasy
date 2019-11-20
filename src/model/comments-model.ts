import { Action, action, Computed, computed } from 'easy-peasy';
import { v4 } from 'uuid';
import comments from '../data/comments';

export interface Comment {
  id: string;
  text: string;
  user: string;
}

export interface PostComments {
  [postId: string]: Comment[] | undefined;
}

export interface AddCommentPayload extends Omit<Comment, 'id'> {
  postId: string;
}

export interface RemoveCommentPayload {
  postId: string;
  commentId: string;
}

export interface CommentsModel {
  comments: PostComments;

  byPostId: Computed<CommentsModel, (postId: string) => Comment[]>;

  addComment: Action<CommentsModel, AddCommentPayload>;
  removeComment: Action<CommentsModel, RemoveCommentPayload>;
}

export const commentsModel: CommentsModel = {
  comments,

  byPostId: computed(state => (postId: string): Comment[] => {
    return state.comments[postId] || [];
  }),

  addComment: action((state, payload) => {
    const { postId, text, user } = payload;
    let comments = state.comments[postId];

    if (!Array.isArray(comments)) {
      comments = state.comments[postId] = [];
    }

    comments.push({
      id: v4(),
      text,
      user,
    });
  }),

  removeComment: action((state, payload) => {
    const { postId, commentId } = payload;
    const comments = state.comments[postId];

    if (Array.isArray(comments)) {
      const index = comments.findIndex(comment => comment.id === commentId);
      if (index > -1) {
        comments.splice(index, 1);
      }
    }
  }),
};
