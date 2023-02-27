export type user = {
  name: string;
  age: number;
  married: Boolean;
};

export type userSchema = user & {
  _id: string;
  // name: string;
  // age: number;
  // married: Boolean;
};

export type commentSchema = {
  _id: string;
  name: string;
  comment: string;
};

export type userItemProps = {
  user: userSchema;
  onIdSelected: (_id: string) => void;
};

export type commentItemProps = {
  comment: commentSchema;
};

export type userListsProps = {
  userItems: Array<userSchema> | null;
  onIdSelected: (_id: string) => void;
};

export type commentListsProps = {
  commentItems: Array<commentSchema> | null;
};

export type mainProps = {
  userItems: Array<userSchema> | null;
  commentItems: Array<commentSchema> | null;
};

export type userRegisterProps = {
  onRegister: (user: user) => void;
};
