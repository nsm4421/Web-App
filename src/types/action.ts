export type ActionData<T> = {
  ok: boolean;
  data? : T;
  error?: object | null;
};
