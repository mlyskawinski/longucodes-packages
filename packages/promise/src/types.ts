declare global {
  interface Type<T = any> extends Function {
    new (...args: any[]): T;
  }

  interface TransformOptions {
    groups: string[];
  }

  interface Promise<T> {
    rethrowAs<TSource extends Type<Error>, TDest extends Type<Error>>(
      source: TSource,
      dest: TDest
    ): this;

    failed(): Promise<boolean>;

    transform<TDest extends Type>(
      to: TDest,
      options?: Partial<TransformOptions>
    ): Promise<
      T extends Array<any> ? InstanceType<TDest>[] : InstanceType<TDest>
    >;

    extract<TProperty extends keyof T>(
      property: TProperty
    ): Promise<T[TProperty]>;

    wrap<TProperty extends string | symbol | number>(
      property: TProperty
    ): Promise<Record<TProperty, T>>;

    tap(callback: (value: T) => void): Promise<T>;
  }
}

export {};

// eslint-disable-next-line no-var
