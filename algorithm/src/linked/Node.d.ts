export type Nodeable = Node | null;

export interface Node {
  value: any;
  next: Nodeable;
}
