export interface EntityState<T> {
  entities: { [id: number]: T };
  ids: number[];
}
